import { ComponentGeneratorParameter, SVGListType } from '../types';

export const toPascalCase = (str: string) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
};

export const addSufClass = (suffix: string) => {
  const suffixTf = suffix === '';
  let classContent = '';
  if (!suffixTf) {
    classContent = `-${suffix}`;
  }
  return classContent;
};

export const generateReactImport = (fontName: string) => {
  return `import React from 'react';\nimport from './css/${fontName}.css';\n`;
};
export const generateEnum = (icons: SVGListType[]) => {
  return `export enum Icons {\n${icons
    .map((icon) => `${toPascalCase(icon.metadata.name)} = '${icon.metadata.name}'`)
    .join(',\n')}\n}\n`;
};
export const generateReactInterface = () => {
  return `export interface IconInterface {\nname: Icons;\n}\n`;
};

export const generateReactFunctionComponentFile = ({
  fontName,
  prefix,
  suffix,
  icons,
}: ComponentGeneratorParameter) => {
  const suffixClass = addSufClass(suffix);

  return (
    `${generateReactImport(fontName)}
  ${generateEnum(icons)}
  ${generateReactInterface()}
  export const Icon = ({name}: IconInterface) => <i className={\`${prefix} ${prefix}-\${name}` +
    suffixClass +
    `\`}></i>;`
  );
};

export const generateReactClassComponentFile = ({
  fontName,
  prefix,
  suffix,
  icons,
}: ComponentGeneratorParameter) => {
  const suffixClass = addSufClass(suffix);
  return (
    `${generateReactImport(fontName)}
  ${generateEnum(icons)}
  ${generateReactInterface()}
  export class Icon extends React.Component<IconInterface> {
    render() {
      return <i className={\`${prefix} ${prefix}-\${this.props.name}` +
    suffixClass +
    `\`}></i>;
    }
  }`
  );
};

export const generateVueComponentFile = ({
  fontName,
  prefix,
  suffix,
  icons,
}: ComponentGeneratorParameter) => {
  const suffixClass = addSufClass(suffix);
  return (
    `
  <template>
    <i :class="\`${prefix} ${prefix}-\${name}` +
    suffixClass +
    `\`"></i>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  ${generateEnum(icons)}
  
  export default defineComponent({
    name: '${fontName}',
    props: {
      name: {
        type: String as PropType<Icons>,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  @import './css/${fontName}.css';
  </style>
    `
  );
};
