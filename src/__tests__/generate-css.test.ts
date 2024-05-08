import { JSDOM } from 'jsdom';
import { SVGListType } from '../types';
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

  describe('CSS 파일을 생성한다.', () => {
    it('should generate a correct CSS file', () => {
      const prefix = 'icon';
      const fontName = 'MyFont';
      const suffix = 'svg';
      const icons = [
        { content: '', metadata: { name: 'home', unicode: ['e001'] } },
        { content: '', metadata: { name: 'settings', unicode: ['e002'] } },
      ] as SVGListType[];
      // CSS 파일 생성
      const cssContent = generateCssFile(prefix, fontName, suffix, icons);
      // jsdom 환경 설정
      const dom = new JSDOM(
        `
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
      <i class="${prefix} ${prefix}-home-${suffix}"></i>
      <i class="${prefix} ${prefix}-settings-${suffix}"></i>
      </body>
      </html>
    `,
        {
          includeNodeLocations: true,
          runScripts: 'outside-only',
        }
      );

      const styleElement = dom.window.document.createElement('style');
      styleElement.textContent = cssContent;
      dom.window.document.head.appendChild(styleElement);

      // 스타일이 적용된 요소 선택
      const homeIcon = document.querySelector(`.${prefix}.${prefix}-home-${suffix}`);
      const settingsIcon = document.querySelector(`.${prefix}.${prefix}-settings-${suffix}`);
      // 가상 요소 스타일 계산
      const homeStyle = dom.window.getComputedStyle(homeIcon, '::before');
      const settingsStyle = dom.window.getComputedStyle(settingsIcon, '::before');

      // 기대 결과 검증
      expect(homeStyle.content).toBe('"\\e001"');
      expect(settingsStyle.content).toBe('"\\e002"');
    });
  });
});
