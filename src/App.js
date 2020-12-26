
import './App.css';
import React, {
  Component, useState
} from 'react'

import {
  Layout, Menu, Avatar, List, Divider, Collapse, Input
} from 'antd'

import {
  CloseCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Provider, connect } from 'react-redux'

const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;



// 新增事项 控件
//dispatch
function AddItem(props) {
  const style = {
    'margin': '0px 30px 0px 30px',
    'position': 'fixed',
    'bottom': '40px',
    'width': 'inherit',
    'line-height': '20px',
  }
  const inputstyle = {
    'background': 'rgba(81, 84, 87, 0)',
    'line-height': '20px'
  }

  // const [count, setCount] = useState(0)
  return (
    <div style={style}  >
      <Input bordered={false} size='large' placeholder='Add a new item'
        onPressEnter={e => {
          props.dispatch({
            type: 'add',
            list: false,
            text: e.target.defaultValue
          })
          e.target.defaultValue = ''
          console.log("enter:", e);
        }}

      ></Input>
    </div>
  )
}

// 事项列表
// items : 事项的数组
// dispatch
function Items(props) {
  return (
    <div>
      <List dataSource={props.items}
        bordered={false}
        split={false}
        renderItem={item => (
          <div className='itembox' onClick={(e) => {
            let action = {
              type: 'select',
              list: false,
              id: item.id
            }
            props.dispatch(action)
          }} >
            <List.Item
              actions={[< CloseCircleOutlined onClick={e => {
                e.stopPropagation()
                props.dispatch({
                  type: 'delete',
                  list: false,
                  id: item.id
                })
              }
              } />]}>
              <List.Item.Meta
                title={item.text}
              ></List.Item.Meta>
            </List.Item>
          </div>
        )}
      >
      </List>
    </div>
  )
}


// 清单列表
// 传入参数：
// Lists： 列表数组
// listSeleted：被选中数组序号
// dispatch
function Lists(props) {
  return (
    <div>
      <List dataSource={props.Lists}
        bordered={false}
        split={false}
        renderItem={item => {
          let classname = "listbox"
          if (item.id == props.listSeleted) {
            classname = "listChoosed"
          }

          let template = (
            <div className={classname}>
              <List.Item
                actions={[<text>{item.items.length}</text>]} onClick={(e) => {
                  let action = {
                    type: 'select',
                    list: true,
                    id: item.id
                  }
                  props.dispatch(action)
                }}>
                <List.Item.Meta
                  title={item.listName}
                ></List.Item.Meta>
              </List.Item>
            </div>

          )

          return template
        }
        }
      >
      </List>
    </div>
  )
}


// 用户信息页
function User(props) {
  return (
    <div>
      <Avatar size="large" icon={<UserOutlined />}></Avatar>
      <text style={{
        'padding': '20px',
        'font': '20px'
      }}>User</text>
    </div>
  )
}





function App(props) {
  console.log("props:", props);
  return (
    <div className="App">
      <Layout>
        {/* 清单栏 */}
        <Sider width='300'>
          <div className='InsideBox'>
            <User />
            <Lists Lists={props.data.Lists}
              listSeleted={props.data.listSeleted.id}
              dispatch={props.dispatch}
            />
          </div>
        </Sider>

        {/* 事项栏 */}
        <Content>
          <Layout>
            <Header>
              <h1>{props.currentList.listName}</h1>
            </Header>
            <Content>
              <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="待完成列表" key="1">
                  <Items items={props.curUnchecked}
                    dispatch={props.dispatch}
                  />
                </Panel>
                <Panel header="已完成列表" key="2">
                  <Items items={props.curChecked}
                    dispatch={props.dispatch}
                  />
                </Panel>
              </Collapse>
              <AddItem dispatch={props.dispatch} />
            </Content>
          </Layout>
        </Content>

        {/* 详情栏 */}
        <Sider width='350' >
          <div className='InsideBox'>
            <Input allowClear value={props.currentItem != undefined ? props.currentItem.text : null} size='large' bordered={false}>
            </Input>
          </div>
        </Sider>
      </Layout>

    </div >
  );
}

export default App;
