import { generateSVGCode, iconToFont } from './utils/generate';
import validationChkAction from './utils/input';
import { createVersionPage } from './utils/versionPage';
import drag from './utils/drag';
import { PluginMessageEnum } from './constants';
import { RegexpObj, Data, ConvertFont } from './types';
import { generateAndSaveHTML } from './utils/generate-html';
import {
  generateClassStyleScript,
  generateFontFaceScript,
  generateIconStyleScript,
} from './utils/generate-css';

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; regObj: RegexpObj; data: Data }) => {
  console.log('ON_MSG : ', msg);

  if (msg.type === PluginMessageEnum.SUBMIT) {
    // TODO: 추후 version, fontName input 데이터로 분기
    const version = msg.data.version || false;
    const fontName = msg.data.fontName || 'name';
    const preClass = msg.data.preClass || 'pre';
    const sufClass = msg.data.sufClass || '';
    const react = msg.data.react;
    const vue = msg.data.vue;
    const css = msg.data.css;

    if (version) {
      createVersionPage('title', figma);
    }

    const svgList = await generateSVGCode(figma);
    const fontOptions = {
      fontName,
      fontHeight: 1000,
      normalize: true,
    };

    const inputValue: ConvertFont = {
      name: fontName,
      prefix: preClass,
      suffix: sufClass,
      svgList: svgList,
    };

    const fontStream = await iconToFont(svgList, fontOptions);
    const htmlFile = generateAndSaveHTML(inputValue);

    let postData: any = { svgs: svgList, fontName, html: htmlFile, ...fontStream };

    if (css) {
      const cssFile =
        generateFontFaceScript(fontName) +
        generateClassStyleScript(preClass, fontName) +
        generateIconStyleScript(preClass, sufClass, svgList);
      postData.css = cssFile;
    }

    figma.ui.postMessage({
      type: PluginMessageEnum.SAVE_ICONFONT,
      data: postData,
    });
  }

  if (msg.type === PluginMessageEnum.CHECK_VALUE) {
    const rtnVal = validationChkAction(msg.regObj.id, msg.regObj.postVal);
    figma.ui.postMessage({
      type: PluginMessageEnum.CHECKED_VALUE,
      data: { id: msg.regObj.id, rtnVal: rtnVal },
    });
  }
};

figma.on('selectionchange', () => {
  drag();
});

drag();
