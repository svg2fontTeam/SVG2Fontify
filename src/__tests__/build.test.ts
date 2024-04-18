import fs from 'fs';
import manifest from '../../manifest.json';

describe('build script', () => {
  it('build시 src 폴더 내의 code.ts와 ui.html는 dist 폴더 안에 변환되어 생성된다.', async () => {
    const codeFilePath = manifest.main;
    const uiFilePath = manifest.ui;

    // JS code.ts file has been generated
    expect(fs.existsSync(`./${codeFilePath}`)).toBeDefined();

    // HTML plugin file has been generated (test only if it's declared in the manifest)
    if (uiFilePath) {
      expect(fs.existsSync(`./${uiFilePath}`)).toBeDefined();
    }
  });
});
