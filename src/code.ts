import { generateSVGCode, iconToFont } from './utils/generate';
import validationChkAction from './utils/input';
import { createVersionPage } from './utils/versionPage';
import drag from './utils/drag';
import { PluginMessageEnum } from './constants';
import { RegexpObj, data } from './types';

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; regObj: RegexpObj; data: data }) => {
  console.log('ON_MSG : ', msg);

  if (msg.type === PluginMessageEnum.SUBMIT) {
    // TODO: 추후 version, fontName input 데이터로 분기
    const version = msg.data.version || false;
    let fontName = msg.data.fontName;
    const preClass = msg.data.preClass || '';
    const sufClass = msg.data.sufClass || '';
    const react = msg.data.react;
    const vue = msg.data.vue;
    const css = msg.data.css;

    fontName = preClass + fontName + sufClass;

    console.log('react', react);
    console.log('vue', vue);
    console.log('css', css);

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
