import { SVGListType } from '../types';
export const generateFontFaceScript = (fontName: string) => {
  return `
    @font-face {\n
      font-family: '${fontName}';\n
      src: url("../font/${fontName}.ttf") format("truetype"),\n
      url("../font/${fontName}.eot") format("embedded-opentype"),\n
      url("../font/${fontName}.woff") format("woff");\n
      url("../font/${fontName}.woff2") format("woff2");\n
      }\n`;
};
export const generateClassStyleScript = (prefix: string, fontName: string) => {
  return `
    .${prefix} {\n
        font-family: '${fontName}' !important;\n
        font-size: 18px;\n
        font-style:normal;\n
        -webkit-font-smoothing: antialiased;\n
        -moz-osx-font-smoothing: grayscale;\n
      }\n
  `;
};
export const generateIconStyleScript = (prefix: string, suffix: string, svg: SVGListType[]) => {
  return svg.map(
    (svgData) =>
      `.${prefix}-${svgData.metadata.name}-${suffix}:before { content: "\\${svgData.metadata.unicode[0]}"; }`
  );
};

export const generateCssFile = (
  prefix: string,
  fontName: string,
  suffix: string,
  icon: SVGListType[]
) => {
  return `
    ${generateFontFaceScript(fontName)}
    ${generateClassStyleScript(prefix, fontName)}
    ${generateIconStyleScript(prefix, suffix, icon)}
  `;
};
