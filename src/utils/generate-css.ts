export const generateFontFaceScript = (fontName: string, fontPath: string) => {
  return `
    @font-face {\n
      font-family: '${fontName}';\n
      src: url("${fontPath}.ttf") format("truetype"),\n
      url("${fontPath}.eot") format("embedded-opentype"),\n
      url("${fontPath}.woff") format("woff");\n
      url("${fontPath}.woff2") format("woff2");\n
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
export const generateIconStyleScript = (prefix: string, icon: Array<Record<string, string>>) => {
  return icon.map(({ name, unicode }) => {
    return `
      .${prefix}-${name}:before {\n
        content: "\\${unicode}";\n
      }\n
      .${prefix}-${name}:before { content: "\\${unicode}"; }`;
  });
};
