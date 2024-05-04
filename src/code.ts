import validationChkAction from './utils/input';
import drag from './utils/drag';
import { generateSVGCode, iconToFont, svgsToSvgFont } from './utils/generate';
import { createVersionPage } from './utils/versionPage';

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; isErr: boolean; postVal: string }) => {
  console.log(msg, 'msg@@@@');
  const rtnVal = validationChkAction(msg.type, msg.isErr, msg.postVal);
  figma.ui.postMessage({ type: 'INPUT', data: rtnVal });

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
