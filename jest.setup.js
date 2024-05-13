const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.figma = {
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
};
