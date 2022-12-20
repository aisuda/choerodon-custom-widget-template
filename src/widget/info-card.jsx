import React from 'react';
import {openContextMenus} from 'amis-ui';
import * as echarts from 'echarts';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myEchartRef = React.createRef();
  }

  myChart;

  myChartDefaultData = {
    xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }

  handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {contextMenus} = this.props;
    // 整理右键菜单数据
    const curMenus = [];
    contextMenus.forEach(item => {
      curMenus.push({
        label: item.link,
        onSelect: () => window.location.href = item.href
      });
    });
    // 打开 amis右键菜单
    openContextMenus({
      x: e.clientX,
      y: e.clientY
    },
    curMenus,
    () => {
      // 关闭右键菜单时需要执行的方法放这里;
    });
  }

  isString(str) {
    return Object.prototype.toString.call(str).slice(8, -1) === 'String';
  }

  componentDidMount() {
    const {echartTitle, xAxis, series} = this.props;
    // 基于准备好的dom，初始化echarts实例
    if (this.myEchartRef) {
      this.myChart = echarts.init(this.myEchartRef.current);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: echartTitle || 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: xAxis || this.myChartDefaultData.xAxis
        },
        yAxis: {},
        series: series || this.myChartDefaultData.series
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {echartTitle, xAxis, series} = this.props;
    let curXAxis = xAxis || this.myChartDefaultData.xAxis;
    let curSeries = series || this.myChartDefaultData.series;

    // 自动转换json字符串
    if (curXAxis && this.isString(curXAxis)) {
      curXAxis = JSON.parse(curXAxis);
    }
    if (curSeries && this.isString(curSeries)) {
      curSeries = JSON.parse(curSeries);
    }

    if (this.myChart && curXAxis && curSeries) {
      this.myChart.setOption({
        title: {
          text: echartTitle || 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: curXAxis
        },
        yAxis: {},
        series: curSeries
      });
    }
  }

  render() {
    return (
      <div className="demo">
        <h2>右键菜单</h2>
        <div onContextMenu={this.handleContextMenu}>
          在此处点击鼠标右键
        </div>
        <div className='myEchart' ref={this.myEchartRef}></div>
      </div>
    );
  }
}

export default App;