// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// Runs this code if the plugin is run in Figma
import validationChkAction from './utils/input';
import drag from './utils/drag';
import { generateSVGCode, iconToFont, svgsToSvgFont } from './utils/generate';
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
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string; version: string }) => {
  if (msg.type === 'create-page') {
    // createVersionPage(msg.version);
  }

  const svgList = await generateSVGCode(figma);
  const test = await iconToFont(svgList);

  figma.ui.postMessage({
    type: 'SVG TEST!!!',
    data: { svgs: svgList, fontName: 'fontName', ...test },
  });
};

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
