import { Readable, Writable } from 'stream';
import svg2ttf from 'svg2ttf';
import SVGIcons2SVGFontStream from 'svgicons2svgfont';
import ttf2eot from 'ttf2eot';
import ttf2woff from 'ttf2woff';
import { UNICODE } from '../constants';
import { FontOptionsType, ReadableWithMetadata, SVGListType } from '../types';
import { RegexpName } from '../constants';
// import ttf2woff2 from 'ttf2woff2';

function createStreamFromString(
  str: string,
  metadata: { unicode: string[]; name: string }
): ReadableWithMetadata {
  const stream = new Readable({
    read() {}, // Implement the read method to avoid the "_read" not implemented error
  }) as ReadableWithMetadata;
  stream.push(str);
  stream.push(null); // End of the stream
  stream.metadata = metadata;
  return stream;
}

export function handleDuplicateNames(names: string[]) {
  const nameCount: Record<string, number> = {};

  names.forEach((name) => {
    nameCount[name] = (nameCount[name] || 0) + 1;
  });

  const renamedNames = names.map((name) => {
    if (nameCount[name] > 1) {
      const count = nameCount[name] - 1;
      nameCount[name]--;
      return `${name}${count}`;
    } else {
      return name;
    }
  });
  return renamedNames;
}

// figma node -> svg로 변환
export async function generateSVGCode(target = figma) {
  const svgs = target.currentPage.selection;

  const svgNames = svgs.map((svg) => svg.name);
  const uniqueSvgNames = handleDuplicateNames(svgNames);
  const svgCodeList = await Promise.all(
    svgs.map(async (svg, idx) => {
      const name = uniqueSvgNames[idx];
      const glyph: any = await svg.exportAsync({
        format: 'SVG_STRING',
      });

      let regTf = false;
      if (RegexpName.test(name)) {
        regTf = true;
      }

      return {
        content: glyph,
        metadata: {
          name: regTf ? name.replace(RegexpName, '') : name,
          unicode: [String.fromCharCode(UNICODE + idx)],
        },
      };
    })
  );

  return svgCodeList;
}

// Function to create a Readable stream with metadata from a string
export async function svgsToSvgFont(svgs: SVGListType[], fontOptions: FontOptionsType) {
  console.log(svgs);
  let fontData = '';
  const fontStream = new SVGIcons2SVGFontStream(fontOptions);
  const fontDataCollector = new Writable({
    write(chunk, encoding, callback) {
      fontData += chunk.toString();
      callback();
    },
  });
  return new Promise((resolve, reject) => {
    let result = '';
    fontStream
      .on('data', (chunk) => {
        result += chunk;
      })
      .on('finish', () => {
        resolve(result);
      })
      // .on('end', () => resolve(result))
      .on('error', (err) => {
        reject();
        console.log('stream err on generate.ts 88', err);
      });

    for (const svg of svgs) {
      const { metadata, content } = svg;
      const glyph = createStreamFromString(content, {
        unicode: metadata.unicode,
        name: metadata.name,
      });
      fontStream.write(glyph);
    }

    fontStream.end();
  });
}

export const iconToFont = async (svgList: SVGListType[], fontOptions: FontOptionsType) => {
  const svgFont = await svgsToSvgFont(svgList, {
    ...fontOptions,
  });

  const ttf = svgFontToTTF(svgFont as string);
  const eot = svgFontToEOT(ttf);
  const woff = svgFontToWOFF(ttf);
  // const woff2 = svgFontToWOFF2(ttf);

  return {
    svgFont,
    ttf,
    eot,
    woff,
    // woff2,
  };
};

export const svgFontToTTF = (svgFont: string) => {
  return Buffer.from(svg2ttf(svgFont, {}).buffer);
};

export const svgFontToWOFF = (ttf: Buffer) => {
  return ttf2woff(ttf);
};

// export const svgFontToWOFF2 = (ttf: Buffer) => {
//   return ttf2woff2(ttf);
// };

export const svgFontToEOT = (ttf: Buffer) => {
  return ttf2eot(ttf);
};
