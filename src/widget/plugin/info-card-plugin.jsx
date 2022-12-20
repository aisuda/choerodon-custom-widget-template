/**
 * @file 编辑器扩展, 增加自定义组件
 */
import { registerAmisEditorPlugin } from 'amis-widget';

export class InfoCardPlugin {
  rendererName = 'react-info-card';
  $schema = '/schemas/UnkownSchema.json';
  name = 'react-info-card';
  description = '信息展示卡片';
  tags = ['自定义'];
  icon = 'fa fa-file-code-o';
  scaffold = {
    type: 'react-info-card',
    label: 'react-info-card',
    name: 'react-info-card',
    contextMenus: [
      {
        link: '组件',
        href: 'https://aisuda.bce.baidu.com/amis/zh-CN/components/html',
      },
      {
        link: '样式',
        href: 'https://aisuda.bce.baidu.com/amis/zh-CN/style/index',
      },
      {
        link: '示例',
        href: 'https://aisuda.bce.baidu.com/amis/examples/index',
      }
    ],
    echartTitle: 'ECharts 入门示例',
    xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ],
  };
  previewSchema = {
    type: 'react-info-card',
    label: 'react-info-card',
  };

  panelTitle = '配置';

  panelControls = [
    {
      type: "combo",
      name: "contextMenus",
      multiLine: true,
      multiple: true,
      minLength: 1,
      label: "右键菜单",
      addButtonText: '添加右键菜单',
      items: [
        {
          name: "link",
          label: "菜单名字",
          type: "input-text"
        },
        {
          name: "href",
          label: "菜单地址",
          type: "input-url"
        }
      ]
    },
    {
      type: 'text',
      name: 'echartTitle',
      label: 'ECharts Title'
    },
    {
      type: 'json-editor',
      name: 'xAxis',
      label: '图表横轴'
    },
    {
      type: 'json-editor',
      name: 'series',
      label: '图表数据'
    },
  ];
}

registerAmisEditorPlugin(InfoCardPlugin, {
  rendererName: 'react-info-card',
  name: 'react-info-card',
  // description: '信息展示卡片',
  // tags: ['展示'],
  order: 99,
  // icon: 'fa fa-file-code-o',
  // panelTitle: '配置'
});

export default InfoCardPlugin;
