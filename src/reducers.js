import testdata from './testData'

// 数据更新器 
class Reducer {
    constructor() {
        this.childrens = []
        this.exec = function (state, action) {
            this.childrens.forEach(i => i.exec(state, action))
            let type = action.type
            if (!(type in this)) {
                return state
            }
            return this[type](state, action)
        }
        this.push = function (child) {
            this.childrens.push(child)
        }
    }
}


// 事项类，方便编辑操作
class itemDate {
    id = 0
    text = ""
    check = false

    constructor(id, text) {
        this.id = id
        this.text = text
    }
}


let selector = new Reducer()

selector.select = (state, action) => {
    if (action.list) {
        state.listSeleted = state.Lists.find(i => i.id == action.id)
        state.currentItem = state.listSeleted.items[0]
    } else {
        state.itemSelected = state.listSeleted.items.find(i => i.id == action.id)
    }
}

let editor = new Reducer()

// 增加事项
editor.add = (state, action) => {
    //获取当前选中清单，并添加事项
    let currentList = state.listSeleted
    let newID = 0
    if (currentList.nextID.length > 0) {
        newID = currentList.nextID.pop()
    } else {
        newID = currentList.items.length
    }

    currentList.items.push(new itemDate(newID, action.text))
}

// 删除事项
editor.delete = (state, action) => {
    let currentList = state.listSeleted
    if (action.list) {} else {
        let newitems = currentList.items.filter(i => i.id != action.id)
        currentList.items = newitems
        if (state.itemSelected != undefined) {

            if (action.id == state.itemSelected.id) {
                state.itemSelected = currentList.items[0]
            }
        }
    }
    console.log("delete:", action, state.itemSelected);

}


// 主数据修改器
const mainReducer = new Reducer();
mainReducer.push(editor)
mainReducer.push(selector)


// 数据修改器 调用函数
let reducers = function (state, action) {
    if (state == undefined) {
        state = testdata
    }
    let newState = Object.assign({}, state)
    mainReducer.exec(newState, action)
    return newState
}


export default reducers;