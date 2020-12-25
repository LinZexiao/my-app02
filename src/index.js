import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import 'antd/dist/antd.css';

class itemDate {
  id = 0
  text = ""
  check = false

  constructor(id, text) {
    this.id = id
    this.text = text
  }
}


// let listChoosed = 1
let todoList = [
  {
    id: 0,
    listName: '每日任务',
    count: 3,
    nextID: [],
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
    nextID: [],
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


let mydata = {
  Lists: todoList,
  listSeleted: 0,
  itemSelected: 0
}

class Reducer {
  constructor() {
    this.exec = function (state, action) {
      let type = action.type
      if (!(type in this)) {
        return state
      }
      return this[type](state, action)

    }
  }

}



let reducers = function (state, action) {


  if (state == undefined) {
    state = mydata
  }

  let newState = Object.assign({}, state)

  editor.exec(newState, action)

  return newState
}


let editor = new Reducer

// 增加事项
editor.add = (state, action) => {
  //获取当前选中清单，并添加事项
  let curentList = state.Lists[state.listSeleted]
  let newID = 0
  if (curentList.nextID.length > 0) {
    newID = curentList.nextID.pop()
  } else {
    newID = curentList.items.length
  }

  curentList.items.push(new itemDate(newID, action.text))
}




let store = createStore(reducers)

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

console.log("store:", store.getState());
store.dispatch({
  type: 'add',
  text: "nihao"
})


// 停止监听 state 更新
unsubscribe();



let mapStatesToProps = (state) => {

  return {
    data: state
  }
}

let mapActionToProps = {

}

let AppContainer = connect(mapStatesToProps, mapActionToProps)(App)



ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
