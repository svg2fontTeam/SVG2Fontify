import { createPage, getselectedItems } from '../utils/versionPage';

describe('createPage', () => {
  it('입력한 버전 명으로 페이지가 생성된다', () => {
    const pageTitle = 'test page';
    const mockFigma = {
      createPage: jest.fn((title) => ({
        name: title,
        loadAsync: jest.fn(),
        appendChild: jest.fn(),
      })),
    } as unknown as PluginAPI;

    const newPage = createPage(pageTitle, mockFigma);

    expect(newPage.name).toBe(pageTitle);
    expect(newPage.backgrounds[0].type).toBe('SOLID');
  });
});

describe('getselectedItems', () => {
  const selectedItem = [
    {
      id: '14:15',
      clone: jest.fn(),
    },
    {
      id: '14:18',
      clone: jest.fn(),
    },
  ];
  const mockPage = { currentPage: { selection: selectedItem } } as unknown as PluginAPI;

  it('선택된 요소가 없으면 에러를 내뱉는다', () => {
    const mockPage = { currentPage: { selection: [] } } as unknown as PluginAPI;
    expect(() => getselectedItems(mockPage)).toThrowError('파일이 선택되지 않았습니다.');
  });

  it('복사한 아이템들을 배열로 return한다.', () => {
    expect(getselectedItems(mockPage)).not.toBe(mockPage.currentPage.selection);
  });

  it('복사한 아이템들은 기존의 아이템과 다른 참조 값을 가진다', () => {
    expect(getselectedItems(mockPage)).not.toBe(mockPage.currentPage.selection);
  });
});
