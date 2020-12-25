
import './App.css';
import React, {
  Component
} from 'react'

import { Layout, Menu, Avatar, List, Divider, Collapse, Input } from 'antd'
import {

  CloseCircleOutlined,
  UserOutlined,

} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;


// let listChoosed = 1
let todoList = [
  {
    listName: '每日任务',
    count: 3,
    id: 0,
    items: [
      {
        text: "hello",
        id: 0,
        check: false
      },
      {
        text: "hello",
        id: 1,
        check: false
      },
      {
        text: "hello",
        id: 2,
        check: false
      },
    ]
  },
  {
    listName: '读书清单',
    count: 3,

    id: 1,
    items: [
      {
        text: "nihao",
        id: 0,
        check: false
      },
      {
        text: "hello",
        id: 1,
        check: false
      },
      {
        text: "hello",
        id: 2,
        check: false
      },
    ]
  }
]


// 新增事项控件
function AddItem(props) {
  const style = {
    'margin': '0px 30px 0px 30px',
    'position': 'fixed',
    'bottom': '20px',
    'width': 'inherit',
    'line-height': '20px',
  }

  const inputstyle = {
    'background': 'rgba(81, 84, 87, 0)',
    'line-height': '20px'
  }

  return (
    <div style={style} >
      <Input bordered={false} size='large' placeholder='Add a new item'></Input>
    </div>
  )
}

// 事项列表
function Items(props) {
  return (
    <div>
      <List dataSource={todoList[1].items}
        bordered={false}
        split={false}
        renderItem={item => (
          <div className='itembox'>
            <List.Item
              actions={[<CloseCircleOutlined />]}>
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
function Lists(props) {
  return (
    <div>
      <List dataSource={props.data.Lists}
        bordered={false}
        split={false}
        renderItem={item => {
          let classname = "listbox"
          if (item.id == props.data.listSeleted) {
            classname = "listChoosed"
          }

          let template = (
            <div className={classname}>
              <List.Item
                actions={[<text>{item.items.length}</text>]}>

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



const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


function App(props) {
  console.log("props:", props);
  return (
    <div className="App">
      <Layout>
        {/* 清单栏 */}
        <Sider width='300'>
          <div className='InsideBox'>
            <User />
            <Lists data={props.data} />
          </div>
        </Sider>

        {/* 事项栏 */}
        <Content>
          <Layout>
            <Header>
              清单1
            </Header>
            <Content>
              <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="待完成列表" key="1">
                  <Items />
                </Panel>
                <Panel header="已完成列表" key="2">
                  <Items />
                </Panel>
              </Collapse>
              <AddItem />
            </Content>
          </Layout>
        </Content>

        {/* 详情栏 */}
        <Sider width='350' >
          <div className='InsideBox'>
            <Input allowClear value={"itemname"} size='large' bordered={false}>
            </Input>
          </div>
        </Sider>
      </Layout>

    </div >
  );
}

export default App;
