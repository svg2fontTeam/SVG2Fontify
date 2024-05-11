import { SVGListType } from '../types';
import {
  generateFontFaceScript,
  generateClassStyleScript,
  generateIconStyleScript,
  checkProperties,
} from '../utils/generate-css'; // Update the path as necessary

describe('CSS Generation', () => {
  describe('글꼴을 생성한다.', () => {
    it('should generate a correct font-face CSS rule', () => {
      const fontName = 'MyFont';
      const output = generateFontFaceScript(fontName);
      checkProperties(output, [
        "font-family: 'MyFont';",
        'src: url("../font/MyFont.ttf") format("truetype")',
        'url("../font/MyFont.eot") format("embedded-opentype")',
        'url("../font/MyFont.woff") format("woff")',
        'url("../font/MyFont.woff2") format("woff2")',
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
      const suffix = 'svg';
      // {
      //   content: string;
      //   metadata: {
      //       unicode: string[];
      //       name: string;
      //   };
      const icons = [
        { content: '', metadata: { name: 'home', unicode: ['e001'] } },
        { content: '', metadata: { name: 'settings', unicode: ['e002'] } },
      ] as SVGListType[];
      const expectedOutput = [
        `.icon-home-svg:before { content: "\\e001"; }`,
        `.icon-settings-svg:before { content: "\\e002"; }`,
      ];
      const output = generateIconStyleScript(prefix, suffix, icons);
      expect(output).toEqual(expectedOutput);
    });
  });
});
