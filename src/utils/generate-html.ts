import { ConvertFont, SVGListType } from '../types';
import { addSufClass } from './generate-component';

// Function to generate and save the HTML content
export function generateAndSaveHTML(convertFont: ConvertFont): string {
  let htmlContent: string = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/${convertFont.name}.css">
        <title>Icon Display</title>
        <style>
            body { background: gray; }
            .container { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
            .item { background: #fff; text-align: center; display: flex; flex-direction: column; border-radius: 5px; padding: 10px; }
        </style>
    </head>
    <body>
        <div class="container">`;
  const classContent = addSufClass(convertFont.suffix);

  convertFont.svgList.forEach((icon: SVGListType) => {
    htmlContent +=
      `
        <div class="item">
            <i class="${convertFont.prefix} ${convertFont.prefix}-${icon.metadata.name}` +
      classContent +
      `"></i>${icon.metadata.name}
        </div>`;
  });

  htmlContent += `
        </div>
    </body>
    </html>`;
  return htmlContent;
}
