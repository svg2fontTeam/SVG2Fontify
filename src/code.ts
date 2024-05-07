import { generateSVGCode, iconToFont } from './utils/generate';
import validationChkAction from './utils/input';
import { createVersionPage } from './utils/versionPage';
import drag from './utils/drag';
import { PluginMessageEnum } from './constants';

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; isErr: boolean; postVal: string }) => {
  console.log('ON_MSG : ', msg);

  if (msg.type === PluginMessageEnum.SUBMIT) {
    const rtnVal = validationChkAction(msg.type, msg.isErr, msg.postVal);
    figma.ui.postMessage({ type: 'INPUT', data: rtnVal });

    // TODO: 추후 version, fontName input 데이터로 분기
    const version = false;
    const fontName = 'fontName';
    if (version) {
      createVersionPage('title', figma);
    }

    const svgList = await generateSVGCode(figma);
    const fontOptions = {
      fontName,
      fontHeight: 1000,
      normalize: true,
    };
    const fontStream = await iconToFont(svgList, fontOptions);

    figma.ui.postMessage({
      type: PluginMessageEnum.SAVE_ICONFONT,
      data: { svgs: svgList, fontName, ...fontStream },
    });
  }
};

figma.on('selectionchange', () => {
  drag();
});

drag();
