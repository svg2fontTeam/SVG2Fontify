import drag from './utils/drag';
import { generateSVGCode, iconToFont, svgsToSvgFont } from './utils/generate';
import validationChkAction from './utils/input';
import { createVersionPage } from './utils/versionPage';

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; postVal: string; inputVal: object }) => {
  if (msg.type === 'post-input') {
    const inputValue = msg.inputVal;
    console.log(inputValue);
  }

  if (msg.type === 'input-regexp') {
    const rtnVal = validationChkAction(msg.type, msg.postVal);
    figma.ui.postMessage({ type: 'INPUT', data: rtnVal });
  }
  console.log(msg, 'msg@@@@');

  const svgList = await generateSVGCode(figma);
  const test = await iconToFont(svgList);
  console.log('TEST:', test);

  figma.ui.postMessage({
    type: 'save-iconfont',
    data: { svgs: svgList, fontName: 'fontName', ...test },
  });
};

figma.on('selectionchange', () => {
  console.log('selectChange');
  drag();
});

drag();
