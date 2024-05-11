import { handleDuplicateNames } from '../utils/generate';

describe('duplicate-fontnames', () => {
  it('이름이 중복된 node가 있다면 인덱싱을 추가해준다.', () => {
    const nameList = ['test', 'test', 'test'];
    const nameList2 = ['svg'];
    const nameList3 = ['test', 'test', 'svg', 'svg', 'svg'];

    expect(handleDuplicateNames(nameList)).toEqual(['test2', 'test1', 'test']);
    expect(handleDuplicateNames(nameList2)).toEqual(['svg']);
    expect(handleDuplicateNames(nameList3)).toEqual(['test1', 'test', 'svg2', 'svg1', 'svg']);
  });
});
