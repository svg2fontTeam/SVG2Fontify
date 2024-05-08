import { JSDOM } from 'jsdom';
import {
  generateFontFaceScript,
  generateClassStyleScript,
  generateIconStyleScript,
  generateCssFile,
} from '../utils/generate-css'; // Update the path as necessary

function checkProperties(output, properties) {
  properties.forEach((prop) => {
    expect(output).toContain(prop);
  });
}

describe('CSS Generation', () => {
  describe('글꼴을 생성한다.', () => {
    it('should generate a correct font-face CSS rule', () => {
      const fontName = 'MyFont';
      const fontPath = '/path/to/font';
      const output = generateFontFaceScript(fontName, fontPath);
      checkProperties(output, [
        "font-family: 'MyFont';",
        'src: url("/path/to/font.ttf") format("truetype")',
        'url("/path/to/font.eot") format("embedded-opentype")',
        'url("/path/to/font.woff") format("woff")',
        'url("/path/to/font.woff2") format("woff2")',
      ]);
    });
  });

  describe('접두사클래스를 생성한다.', () => {
    it('should generate a correct class style CSS rule', () => {
      const prefix = 'my-class';
      const fontName = 'MyFont';
      const output = generateClassStyleScript(prefix, fontName);
      checkProperties(output, [
        '.my-class {',
        "font-family: 'MyFont' !important;",
        'font-size: 18px;',
        'font-style:normal;',
        '-webkit-font-smoothing: antialiased;',
        '-moz-osx-font-smoothing: grayscale;',
      ]);
    });
  });

  describe('아이콘배열을 스타일 배열을 생성한다.', () => {
    it('should generate correct icon style CSS rules', () => {
      const prefix = 'icon';
      const icons = [
        { name: 'home', unicode: 'e001' },
        { name: 'settings', unicode: 'e002' },
      ];
      const expectedOutput = [
        `.icon-home:before { content: "\\e001"; }`,
        `.icon-settings:before { content: "\\e002"; }`,
      ];
      const output = generateIconStyleScript(prefix, icons);
      expect(output).toEqual(expectedOutput);
    });
  });

  describe('CSS 파일을 생성한다.', () => {
    it('should generate a correct CSS file', () => {
      const prefix = 'icon';
      const fontName = 'MyFont';
      const fontPath = '/path/to/font';
      const icons = [
        { name: 'home', unicode: 'e001' },
        { name: 'settings', unicode: 'e002' },
      ];

      // CSS 파일 생성
      const cssContent = generateCssFile(prefix, fontName, fontPath, icons);

      // jsdom 환경 설정
      const dom = new JSDOM(
        `
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
        <i class="icon ${prefix}-home">a</i>
        <i class="icon ${prefix}-settings"/>
      </body>
      </html>
    `,
        {
          includeNodeLocations: true,
          runScripts: 'outside-only',
        }
      );

      // 스타일 태그 추가
    });
  });
});
