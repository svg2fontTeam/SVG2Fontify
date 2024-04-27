// jest.setup.js
global.figma = {
  // 필요한 메서드나 속성을 모의로 추가
  root: {
    children: [],
    insertChild: jest.fn(),
  },
  closePlugin: jest.fn(),
  notify: jest.fn(),
  currentPage: jest.fn(() => ({
    selection: [],
  })),
  createPage: jest.fn((title) => ({
    name: title,
    loadAsync: jest.fn(),
    appendChild: jest.fn(),
  })),
  setCurrentPageAsync: jest.fn(),
  ui: {
    postMessage: jest.fn(),
  },
  // 추가적으로 필요한 API 모의
};
