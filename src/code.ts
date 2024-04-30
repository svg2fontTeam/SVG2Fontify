import validationChkAction from './utils/input';
import drag from './utils/drag';
import { generateSVGCode, svgsToSvgFont } from './utils/generate';
import { createVersionPage } from './utils/versionPage';

figma.showUI(__html__, { width: 360, height: 640 });
// figma.on('selectionchange', async () => await drag());

// // const postMessage = () => {
// //   figma.ui.postMessage({
// //     data: figma.currentPage.selection.length,
// //   });

// // };
// // figma.on('selectionchange', postMessage);

// // postMessage();
// drag();

// eslint-disable-next-line no-inner-declarations

figma.on('selectionchange', () => {
  drag();
});

drag();

figma.ui.onmessage = async (msg: { type: string; version: string }) => {
  if (msg.type === 'create-page') {
    createVersionPage(msg.version);
  }

  const svgList = await generateSVGCode(figma);
  const test = await svgsToSvgFont(svgList, {
    fontName: 'test',
    fontHeight: 1000,
    normalize: true,
  });
  // figma.closePlugin();
  figma.ui.postMessage({
    type: 'SVG TEST!!!',
    data: { svgs: svgList, fontName: 'fontName' },
  });
};

figma.ui.onmessage = (msg: { type: string; isErr: boolean; postVal: string }) => {
  const rtnVal = validationChkAction(msg.type, msg.isErr, msg.postVal);
  figma.ui.postMessage({ rtnVal });
};

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
