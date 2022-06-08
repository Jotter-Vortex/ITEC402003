//https://ant.design/components/checkbox/#header
// https://ant.design/components/collapse/#header
import React, { useState } from 'react'
import {Collapse, Checkbox} from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

      // 누를 것의 index를 구하고
      const currentIndex = Checked.indexOf(value)

      // 전체 Checked된 State에서 현재 누른 checkbox가 이미 있다면
      const newChecked = [...Checked] // Checked에 있는 모든 값을 가져오는거임

      if(currentIndex == -1){
        newChecked.push(value)
      }
      // 빼주고
      else{
        newChecked.splice(currentIndex, 1)  // value값이 해당하는 newChecked에서 삭제가 된 거임.
      }
      // 없다면 State에 넣어준다.
      setChecked(newChecked)
      props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) =>(
        <React.Fragment key = {index}>
          <Checkbox onChange={() => handleToggle(value._id)}
           checked = {Checked.indexOf(value._id) === -1 ? false : true} />  
          {/* checked로 체크 되어있는지 안되어있는지 설정 가능함 */}
                <span>{value.name}</span>
        </React.Fragment>
    ))
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
            {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox