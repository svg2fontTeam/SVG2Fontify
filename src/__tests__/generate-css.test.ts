import {
  generateFontFaceScript,
  generateClassStyleScript,
  generateIconStyleScript,
} from '../utils/generate-css';

describe('CSS Generation Scripts', () => {
  describe('generateFontFaceScript', () => {
    it('should generate a correct font-face CSS rule', () => {
      const fontName = 'MyFont';
      const fontPath = '/path/to/font';
      const expectedOutput = `
        @font-face {\n
          font-family: 'MyFont';\n
          src: url("/path/to/font.ttf") format("truetype"),\n
          url("/path/to/font.eot") format("embedded-opentype"),\n
          url("/path/to/font.woff") format("woff");\n
          url("/path/to/font.woff2") format("woff2");\n
          }\n`;
      expect(generateFontFaceScript(fontName, fontPath)).toEqual(expectedOutput);
    });
  });

  describe('generateClassStyleScript', () => {
    it('should generate a correct class style CSS rule', () => {
      const prefix = 'my-class';
      const fontName = 'MyFont';
      const expectedOutput = `
        .my-class {\n
            font-family: 'MyFont' !important;\n
            font-size: 18px;\n
            font-style:normal;\n
            -webkit-font-smoothing: antialiased;\n
            -moz-osx-font-smoothing: grayscale;\n
          }\n
      `;
      expect(generateClassStyleScript(prefix, fontName)).toEqual(expectedOutput);
    });
  });

  describe('generateIconStyleScript', () => {
    it('should generate correct icon style CSS rules', () => {
      const prefix = 'icon';
      const icons = [
        { name: 'home', unicode: 'e001' },
        { name: 'settings', unicode: 'e002' },
      ];
      const expectedOutput = [
        `
          .icon-home:before {\n
            content: "\\e001";\n
          }\n
          .icon-home:before { content: "\\e001"; }`,
        `
          .icon-settings:before {\n
            content: "\\e002";\n
          }\n
          .icon-settings:before { content: "\\e002"; }`,
      ];
      expect(generateIconStyleScript(prefix, icons)).toEqual(expectedOutput);
    });
  });
});
