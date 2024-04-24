import { createVersionPage } from '../utils/version';

describe('createPage', () => {
  it('입력한 버전 명으로 페이지가 생성된다.', async () => {
    const pageTitle = 'Test Page';
    const newPage = await createVersionPage(pageTitle);

    expect(newPage.name).toBe(pageTitle);
  });
});
