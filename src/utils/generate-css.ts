export const generateFontFaceScript = (fontName: string, fontPath: string) => {
  return `
  @font-face {
    font-family: '${fontName}';
    src: url("${fontPath}.ttf") format("truetype"),
    url("${fontPath}.eot") format("embedded-opentype"),
    url("${fontPath}.woff") format("woff");
    url("${fontPath}.woff2") format("woff2");
    }`;
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
export const generateIconStyleScript = (prefix: string, icon: Array<Record<string, string>>) => {
  return icon.map(({ name, unicode }) => {
    return `.${prefix}-${name}:before { content: "\\${unicode}"; }`;
  });
};

export const generateCssFile = (
  prefix: string,
  fontName: string,
  fontPath: string,
  icon: Array<Record<string, string>>
) => {
  return `
    ${generateFontFaceScript(fontName, fontPath)}
    ${generateClassStyleScript(prefix, fontName)}
    ${generateIconStyleScript(prefix, icon)}
  `;
};
