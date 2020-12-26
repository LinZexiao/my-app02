// 测试用的数据

// let listChoosed = 1
let todoList = [{
        id: 0,
        listName: '每日任务',
        count: 3,
        nextID: [],
        items: [{
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
                check: true
            },
        ]
    },
    {
        listName: '读书清单',
        count: 3,
        nextID: [],
        id: 1,
        items: [{
                text: "nihao",
                id: 0,
                check: true
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

let testdata = {
    Lists: todoList,
    listSeleted: todoList[0],
    itemSelected: todoList[0].items[0]
}

export default testdata;