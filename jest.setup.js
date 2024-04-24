// jest.setup.js
global.figma = {
  // 필요한 메서드나 속성을 모의로 추가
  closePlugin: jest.fn(),
  notify: jest.fn(),
  ui: {
    postMessage: jest.fn(),
  },
  // 추가적으로 필요한 API 모의
};
