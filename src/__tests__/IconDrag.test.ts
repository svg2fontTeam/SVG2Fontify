import drag from '../utils/drag';

describe('icon drag', () => {
  it('드레그한 SVG파일들이 제작한 플러그인에 반영이 된다.', () => {
    // figma.notify가 호출되었는지 검증
    drag();

    console.log(figma.notify);
    expect(figma.notify).toHaveBeenCalledWith('Operation completed successfully!');
  });
  it('선택한 SVG 파일 갯수가 생성버튼에 표시된다.', () => {});
});

// - 드레그한 SVG파일들이 제작한 플러그인에 반영이 된다.
// - 선택한 SVG 파일 갯수가 생성버튼에 표시된다.
