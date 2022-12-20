import React from 'react';
import { DataSet, Lov, IconPicker } from 'choerodon-ui/pro';
import 'choerodon-ui/dist/choerodon-ui.css';
import 'choerodon-ui/dist/choerodon-ui-pro.css';

import { overwriteDefaultConfig } from 'choerodon-ui/dataset';
import defaults from 'choerodon-ui/lib/configure/default';

overwriteDefaultConfig(defaults);

function handleDataSetChange({ record, name, value, oldValue }) {
  console.log(
    '[dataset]',
    value,
    '[oldValue]',
    oldValue,
    `[record.get('${name}')]`,
    record.get(name),
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.myEchartRef = React.createRef();
  }

  ds = new DataSet({
    autoCreate: true,
    fields: [
      {
        name: 'code',
        textField: 'code',
        type: 'object',
        lovCode: 'LOV_CODE',
        lovPara: { code: '111' },
        required: true,
      },
      {
        name: 'code_string',
        type: 'object',
        lovCode: 'LOV_CODE',
        optionsProps: (dsProps) => {
          console.log(dsProps);
          return dsProps;
        },
        required: true,
      },
      { name: 'code_code', type: 'string', bind: 'code.code' },
      { name: 'code_description', type: 'string', bind: 'code.description' },
    ],
    events: {
      update: handleDataSetChange,
    },
  });

  handleChange = (value, oldValue) => {
    console.log('[datepicker]', value, '[oldValue]', oldValue);
  }

  render() {
    return (
      <div className="choerodon-ui-demo">
        <h2>Lov</h2>
        <div>
          <Lov
            dataSet={this.ds}
            name="code"
            noCache
            tableProps={{ selectionMode: 'rowbox' }}
          />
          <Lov dataSet={this.ds} name="code_string" />
        </div>
        <h2>IconPicker</h2>
        <div>
          <IconPicker onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default App;