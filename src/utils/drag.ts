import { PluginMessageEnum } from '../constants';

export default async function drag() {
  const nodes = figma.currentPage.selection;

  const svgs = await Promise.all(
    nodes.map(async (node) => {
      const svgFile = await node.exportAsync({ format: 'SVG' });
      return { name: node.name, svg: svgFile };
    })
  );

  figma.ui.postMessage({ type: PluginMessageEnum.SELECTED_SVGS, svgs: svgs });
}
