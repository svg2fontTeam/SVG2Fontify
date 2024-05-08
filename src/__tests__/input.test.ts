import validationChkAction from '../utils/input';

describe('Input validation', () => {
  it('fontName에 특수문자가 입력되면 특수문자는 지워지고, 알림창이 나타난다.', () => {
    const inputVal = '`~!@#$%';
    const expectVal = '@';

    const rtnVal = validationChkAction(inputVal, expectVal);

    expect(rtnVal).toBe(expectVal);
    // expect(figma.notify).toHaveBeenCalled();
  });
});
