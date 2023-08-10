const getDateOnClickHandle = (localdate) => {
    console.log(localdate)
}

const addTodolistOnClickHandle = () => {
    generateTodoObj();
}

//
const modifyTodolistOnClickHandle = (todo) => {
    openModal();
    const id = todo.value;
    modifyModal(TodoListService.getInstance().getTodoById(id));
    TodoListService.getInstance().modifyTodoList(id);
}
//

const deleteTodolistOnClickHandle = (todo) => {
    console.log(todo)
    TodoListService.getInstance().removeTodoList(todo.value);
}



generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-text-area").value;
    const todoDate = document.querySelector(".addlist-dateselector").value;
    const year = todoDate.slice(0, 4);
    const month = todoDate.slice(5, 7);
    const day = todoDate.slice(8, 10);

    const todoObj = {
        id: 0,
        content: todoContent,
        year,
        month,
        day,
        radioStatus: "not-finished",
        finished: "",
        notFinished: "checked",
        completStatus: false
    }
    TodoListService.getInstance().addTodo(todoObj);
}


radioFilterOnClickHandle = () => {
    TodoListService.getInstance().radioFilterUpdate();
}


updateRadioStatus = (target, id) => {
    TodoListService.getInstance().todoRadioStatusUpdate(target.value, id);
}



class TodoListService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;


    constructor() {
        this.loadTodoList();
    }

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1 : 1;
    }



    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }

        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        this.todoIndex++;
    }


    //
    modifyTodoList(id) {
        const todo = this.getTodoById(id);
        const modalDateQs = document.querySelector(".modal-date-modify");
        const modalContentQs = document.querySelector(".modal-main-text-input");


        const date = todo.year + "-" + todo.month + "-" + todo.day;
        
        modalContentQs.value = todo.content;
        modalDateQs.value = date;
    }
//

    removeTodoList(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }


    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }


    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }
        this.saveLocalStorage();
        this.updateTodoList();
    }


    todayDateSetter() {
        const setter = document.querySelector(".addlist-dateselector")
        setter.value = new Date().toISOString().substring(0, 10);
    }

    getTodoById(id) {
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    todoListGetter() {
        return this.todoList;
    }

    radioFilterUpdate() {
        const radioQs = document.querySelectorAll(".todolist-radios .todolist-radio");
        radioQs.forEach((radio) => {
            if(radio.checked) {
                const mainFilterStatus = radio.value;

                if(mainFilterStatus === "on") {
                    const item = document.querySelectorAll(".todolist-items .todolist-item");
                    item.forEach(tem => {
                        tem.classList.remove("invisible");
                    })
                }else if(mainFilterStatus === "finished"){
                    const item = document.querySelectorAll(".todolist-items .not-finished");
                    const item2 = document.querySelectorAll(".todolist-items .finished");
                    item.forEach(tem => {
                        tem.classList.add("invisible");
                    })          
                    item2.forEach(tem => {
                        tem.classList.remove("invisible");
                    }) 
                }else if(mainFilterStatus === "not-finished"){
                    const item = document.querySelectorAll(".todolist-items .finished");
                    const item2 = document.querySelectorAll(".todolist-items .not-finished");
                    item.forEach(tem => {
                        tem.classList.add("invisible");
                    })       
                    item2.forEach(tem => {
                        tem.classList.remove("invisible");
                    }) 
                }
            }
        })
    }


    todoDateByYmd(yyyymmdd) {
        const year = yyyymmdd.slice(0, 4);
        const month = yyyymmdd.slice(5, 7);
        const day = yyyymmdd.slice(8, 10);
        var date = [year, month, day];
        return date;
    }
    ymdByTodo(todoObj) {
        const date = todoObj.year + "-" + todoObj.month + "-" + todoObj.day
        return date;
    }



    todoRadioStatusUpdate(value, id) {
        const todoObj = TodoListService.getInstance().getTodoById(id);
        const todo = {
            ...todoObj,
            radioStatus: value,
        }
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todo.id) {
                this.todoList[i] = todo;
                console.log(this.todoList[i])        

                if(value === "finished") {
                    this.todoList[i] = {
                        ...todo,
                        finished: "checked",
                        notFinished: ""
                    }
                }else if(value === "not-finished") {
                    this.todoList[i] = {
                        ...todo,
                        finished: "",
                        notFinished: "checked"
                    }
                }            
                break;
            }
        }


        this.saveLocalStorage();
        this.updateTodoList();
        this.radioFilterUpdate();
    }
   


    updateTodoList() {
        const todolistItems = document.querySelector(".todolist-items");
        todolistItems.innerHTML = this.todoList.map(todo => {
            return `
            <div class="todolist-item ${todo.radioStatus}">
                <div class="todolist-item-left">
                    <pre class="todolist-item-text">${todo.content}</pre>
                </div>
                <div class="todolist-item-right">
                    <div class="todolist-item-getdate">
                        <pre class="todolist-item-getdate-text">${todo.year}-${todo.month}-${todo.day}</pre>
                    </div>
                    <div class="todolist-item-radio-and-cd">
                        <input type="radio" name="todolist-finish-radio${todo.id}" class="todolist-finish-radio-class rdo1" value="finished" onclick="updateRadioStatus(this, ${todo.id});" ${todo.finished}>완료</input>
                        <input type="radio" name="todolist-finish-radio${todo.id}" class="todolist-finish-radio-class rdo2" value="not-finished" onclick="updateRadioStatus(this, ${todo.id});" ${todo.notFinished}>미완료</input>
                        <button class="btn todolist-item-update-button" value="${todo.id}" onclick="modifyTodolistOnClickHandle(this)">수정</button>
                        <button class="btn todolist-item-delete-button" value="${todo.id}" onclick="deleteTodolistOnClickHandle(this);">삭제</button>
                    </div>
                </div>
            </div>
            `;
        }).join("");
    }



}