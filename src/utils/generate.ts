import SVGIcons2SVGFontStream from 'svgicons2svgfont';
// import webfontsGenerator from 'webfonts-generator';
import { Readable, Writable } from 'stream';
// import saveZip from './download';
interface ReadableWithMetadata extends Readable {
  metadata?: {
    unicode: string[];
    name: string;
  };
}

// figma node -> svg로 변환
export async function generateSVGCode(target = figma) {
  // const svgs = getselectedItems(target);
  const svgs = target.currentPage.selection;
  const svgCodeList = await Promise.all(
    svgs.map(async (svg, idx) => {
      const glyph = await svg.exportAsync({
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

// // svg -> IconFont 변환
// export function svgsToSvgFont(svgs: any, options: any) {
//   let result = '';
//   const fontStream = new SVGIcons2SVGFontStream(options)
//     .on('end', () => {
//       console.log('RESULT: ', result);
//     })
//     .on('data', (data) => {
//       result += data;
//       console.log('DATA:', data);
//     })
//     .on('error', (err) => console.log('ERROR:', err));

//   for (const svg of svgs) {
//     console.log('SVG: ', svg);
//     // fs모듈
//     const svgStream = new Readable();
//     svgStream.push(svg.code);
//     svgStream.push(null); // 왜 넣는거주ㅣ../?

//     const glyph1 = svgStream;
//     glyph1.metadata = {
//       unicode: ['\uE001\uE002'],
//       name: 'icon1',
//     };

//     fontStream.write(glyph1);
//     fontStream.write(svgStream);
//   }

//   fontStream.end();
// }

// Function to create a Readable stream with metadata from a string
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

// svg -> IconFont 변환
export async function svgsToSvgFont(svgs: any, options: any) {
  let fontData = '';
  const fontStream = new SVGIcons2SVGFontStream(options);
  const fontDataCollector = new Writable({
    write(chunk, encoding, callback) {
      fontData += chunk.toString();
      callback();
    },
  });

  fontStream
    .pipe(fontDataCollector)
    .on('finish', () => console.log('Font successfully created!'))
    .on('error', (err) => console.log('stream err on generate.ts 88', err));

  for (const svg of svgs) {
    console.log('SVG: ', svg);
    const { metadata, content } = svg;
    const glyph = createStreamFromString(content, {
      unicode: ['\uE001'],
      name: metadata.name,
    });
    fontStream.write(glyph);
  }

  fontStream.end();

  // Capture the output of SVGIcons2SVGFontStream into a buffer
  // const buffers: Buffer[] = [];
  // fontStream.on('data', (chunk) => buffers.push(chunk));
  // await new Promise((resolve) => fontStream.on('end', resolve));

  // const svgFontBuffer = Buffer.concat(buffers);

  // const fonts = await webfontsGenerator({
  //   files: [svgFontBuffer],
  //   fontName: 'testName',
  //   types: ['ttf', 'woff', 'woff2', 'eot', 'svg'],
  //   writeFiles: false, // Do not write to disk
  // });

  // saveZip(fonts);
}

// TODO: 추후 타입 정의 필요 일단 급해서 any 처리
export const iconToFont = async (svgList: any) => {
  const svgFont = await svgsToSvgFont(svgList, {
    fontName: 'test',
    fontHeight: 1000,
    normalize: true,
  });

  console.log(svgFont, 'svgfont');
  const ttf = svgFontToTTF(svgFont as unknown as string);

  return {
    ttf,
  };
};

export const svgFontToTTF = (svgFont: string) => {
  // return Buffer.from(svg2ttf(svgFont, { copyright: 'test' }).buffer);
};
