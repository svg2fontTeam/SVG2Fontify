import validationChkAction from '../utils/input';

describe('Input validation', () => {
  it('FONT NAME에 특수문자가 입력되면 특수문자는 지워지고, 알림창이 나타난다.', () => {
    const inputVal = '`~!@#$%';
    const expectVal = '@';

    const rtnVal = validationChkAction('fontName', inputVal);

    expect(rtnVal).toBe(expectVal);
    expect(figma.notify).toHaveBeenCalled();
  });

  it('CLASS PREFIX에 특수문자가 입력되면 특수문자는 지워지고, 알림창이 나타난다.', () => {
    const inputVal = '`pre~!@#$%';
    const expectVal = 'pre@';

    const rtnVal = validationChkAction('preClass', inputVal);

    expect(rtnVal).toBe(expectVal);
    expect(figma.notify).toHaveBeenCalled();
  });

  it('CLASS SUFFIX에 특수문자가 입력되면 특수문자는 지워지고, 알림창이 나타난다.', () => {
    const inputVal = '`suf~!@#$%';
    const expectVal = 'suf@';

    const rtnVal = validationChkAction('sufClass', inputVal);

    expect(rtnVal).toBe(expectVal);
    expect(figma.notify).toHaveBeenCalled();
  });

  it('VERSION에 특수문자가 입력되면 특수문자는 지워지고, 알림창이 나타난다.', () => {
    const inputVal = '`test0~!@#.$0%.1';
    const expectVal = '0.0.1';

    const rtnVal = validationChkAction('version', inputVal);

    expect(rtnVal).toBe(expectVal);
    expect(figma.notify).toHaveBeenCalled();
  });
});
