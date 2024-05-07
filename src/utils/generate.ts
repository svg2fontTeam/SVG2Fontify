import SVGIcons2SVGFontStream from 'svgicons2svgfont';
// import webfontsGenerator from 'webfonts-generator';
import { Readable, Writable } from 'stream';
import svg2ttf from 'svg2ttf';
import ttf2eot from 'ttf2eot';
import ttf2woff from 'ttf2woff';
// import ttf2woff2 from 'ttf2woff2';
// import saveZip from './download';
interface ReadableWithMetadata extends Readable {
  metadata?: {
    unicode: string[];
    name: string;
  };
}

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

// figma node -> svg로 변환
export async function generateSVGCode(target = figma) {
  // const svgs = getselectedItems(target);
  const svgs = target.currentPage.selection;
  const svgCodeList = await Promise.all(
    svgs.map(async (svg, idx) => {
      const glyph: any = await svg.exportAsync({
        format: 'SVG_STRING',
      });

      return {
        content: glyph,
        metadata: {
          name: svg.name,
          unicode: [String.fromCharCode(0xea01 + idx)],
        },
      };
    })
  );

  return svgCodeList;
}

// Function to create a Readable stream with metadata from a string
export async function svgsToSvgFont(svgs: any, options: any) {
  console.log(svgs);
  let fontData = '';
  const fontStream = new SVGIcons2SVGFontStream(options);
  const fontDataCollector = new Writable({
    write(chunk, encoding, callback) {
      fontData += chunk.toString();
      callback();
    },
  });
  return new Promise((resolve, reject) => {
    let result = '';
    fontStream
      // .pipe(fontDataCollector)
      .on('data', (chunk) => {
        console.log(chunk, 'chunk');
        result += chunk;
      })
      .on('finish', () => {
        console.log(result, 'result');
        resolve(result);
      })
      // .on('end', () => resolve(result))
      .on('error', (err) => console.log('stream err on generate.ts 88', err));

    for (const svg of svgs) {
      console.log('SVG: ', svg);
      const { metadata, content } = svg;
      const glyph = createStreamFromString(content, metadata);
      fontStream.write(glyph);
    }

    fontStream.end();
  });
}

// TODO: 추후 타입 정의 필요 일단 급해서 any 처리
export const iconToFont = async (svgList: any) => {
  const svgFont = await svgsToSvgFont(svgList, {
    fontName: 'test',
    fontHeight: 1000,
    normalize: true,
  });

  const ttf = svgFontToTTF(svgFont as any);
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
