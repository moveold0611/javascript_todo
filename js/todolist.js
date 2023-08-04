const addTodoButtonOnClickHandle = () => {
    generateTodoObj();
}







const addTodoOnKeyIpHandle = () => {
    if(event.keyCode === 13) {
        generateTodoObj();
    }
}






const generateTodoObj = () => {
    const inputContent = document.querySelector(".todolist-header-items .text-input").value;
    const todoObj = {
        id: 0,
        todoContent: inputContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        completStatus: false
    };

    if(todoObj.todoContent === "") {
        return;
    }

    TodoListService.getInstance().addTodo(todoObj);
    console.log(todoObj);
    document.querySelector(".todolist-header-items .text-input").value = "";
}




const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompletStatus(target.vlaue, target.checked);
}



const deleteTodoOnClickHandle = (target) => {
    TodoListService.getInstance().removeTodo(target.value);
}


const modifyTodoOnClickHandle = (target) => {
    console.log("1");
    openModal();
   modifyModal(TodoListService.getInstance().getTodoById(target.value));
}


class TodoListService {
    static #instance = null;
    todoList = null;
    todoIndex = 1;
    rootModify = "수정"


    constructor() {
        this.loadTodoList();
    }


    // JSON.parse(제이슨 문자열) => 제이슨 문자열을 객체로
    // JSON.stringify(객체) => 객체를 제이슨 문자열로
    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ?
         JSON.parse(localStorage.getItem("todoList")) : new Array();

         this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ?
          this.todoList[this.todoList.length - 1].id + 1 : 1;
    }





    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }



    setTodo(todoObj) {
        console.log(todoObj);
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }
        this.saveLocalStorage();
        this.updateTodoList();
    }


    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }





    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });
        this.saveLocalStorage();
    }




    addTodo(todoObj) {
        // spread ...map객체
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }
        this.todoList.push(todo);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.todoIndex++;
        this.updateTodoList();
        
    }



    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }


    modifyTodo(id) {
        console.log(id);
        this.todoList.filter(todo => {
            if(todo.id === parseInt(id)) {
                document.querySelector(".item-center .text-input").classList.remove("invisible");

            }
        });
        this.saveLocalStorage();
        this.updateTodoList();
    }

    getTodoById(id) {
        return this.todoList.filter(todo =>{
            todo.id === parseInt(id)[0];
        })
    }



    updateTodoList() {
        const todoListMainContainer = document.querySelector(".todolist-main-container")

        todoListMainContainer.innerHTML =
        this.todoList.map(todo => {
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs"
                        ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                        <pre class="todolist-contents">${todo.todoContent}</pre>
                        <input class="text-input w-f invisible" placeholder="변경할 내용을 입력하세요.">

                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value=${todo.id} onclick="modifyTodoOnClickHandle(this);">수정</button>
                            <button class="btn btn-remove" value=${todo.id} onclick="deleteTodoOnClickHandle(this);">삭제</button>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
    }



}