import { SVGListType } from '../types';
import { addSufClass } from './generate-component';

export const checkProperties = (output: string, properties: string[]) => {
  properties.forEach((prop) => {
    expect(output).toContain(prop);
  });
};

export const generateFontFaceScript = (fontName: string) => {
  return `
    @font-face {\n
      font-family: '${fontName}';\n
      src: url("../font/${fontName}.ttf") format("truetype"),\n
      url("../font/${fontName}.eot") format("embedded-opentype"),\n
      url("../font/${fontName}.woff") format("woff");\n
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
  const classContent = addSufClass(suffix);
  return svg
    .map(
      (svgData) =>
        `.${prefix}-${svgData.metadata.name}` +
        classContent +
        `:before { content: "\\${svgData.metadata.unicode[0]}"; }`
    )
    .join('\n');
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
