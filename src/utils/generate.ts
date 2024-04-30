import SVGIcons2SVGFontStream from 'svgicons2svgfont';
import { getselectedItems } from './versionPage';
import { Readable } from 'stream';

// figma node -> svg로 변환
export async function generateSVGCode(target = figma) {
  const svgs = getselectedItems(target);

  const svgCodeList = await Promise.all(
    svgs.map(async (svg) => {
      const convertSVG = await svg.exportAsync({
        format: 'SVG_STRING',
      });
      return { name: svg.name, code: convertSVG };
    })
  );

  return svgCodeList;
}

// svg -> IconFont 변환
export function svgsToSvgFont(svgs: any, options: any) {
  let result = '';
  const fontStream = new SVGIcons2SVGFontStream(options)
    .on('end', () => {
      console.log('RESULT: ', result);
    })
    .on('data', (data) => {
      result += data;
      console.log('DATA:', data);
    })
    .on('error', (err) => console.log('ERROR:', err));

  for (const svg of svgs) {
    console.log('SVG: ', svg);
    // fs모듈
    const svgStream = new Readable();
    svgStream.push(svg.code);
    svgStream.push(null); // 왜 넣는거주ㅣ../?

    fontStream.write(svgStream);
  }

  fontStream.end();
}
