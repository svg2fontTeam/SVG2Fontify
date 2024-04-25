// import drag from '../utils/drag';

describe('icon drag', () => {
  it('객체를 드래그하면 드래그 이벤트가 발생한다.', () => {
    const event = new MouseEvent('dragstart');
    const spy = jest.fn();
    document.addEventListener('dragstart', spy);
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });
  it('SVG 요소 필터링: 가져온 요소들 중 SVG만을 선택합니다.', () => {
    const selection = figma.currentPage.selection;
    const svgs = selection.filter((node) => node.type === 'VECTOR' || node.type === 'FRAME');
    expect(svgs).toEqual(selection);
  });
  it('선택한 SVG 파일 갯수가 생성버튼에 표시된다.', () => {
    const svgFiles = ['icon.svg', 'logo.svg'];
    const buttonLabel = `생성 (${svgFiles.length} 개의 파일)`;
    expect(buttonLabel).toEqual('생성 (2 개의 파일)');
  });
});

// - 드레그한 SVG파일들이 제작한 플러그인에 반영이 된다.
// - 선택한 SVG 파일 갯수가 생성버튼에 표시된다.
