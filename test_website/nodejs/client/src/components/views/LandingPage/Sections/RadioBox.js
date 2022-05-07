//https://ant.design/components/radio/#header
//https://ant.design/components/collapse/#header
import React, { useState } from 'react'
import {Collapse, Radio} from 'antd';
import RadioButton from 'antd/lib/radio/radioButton';

const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(0)
    //props.list

    const renderRadioBox = () => (
        props.list && props.list.map(value =>(
            <Radio.Button key = {value._id} value= {value._id}> {value.name}</Radio.Button>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }



  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group defaultValue="a" style={{ marginTop: 16 }} onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox