const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
}

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifySubmitButtonOnClick = (id) => {
    const newContent = document.querySelector(".modal-main-text-input").value;
    const newDate = document.querySelector(".modal-date-modify").value;
    const todo = TodoListService.getInstance().getTodoById(id);

    var date = TodoListService.getInstance().todoDateByYmd(newDate);

    const newTodo = {
        ...todo,
        content: newContent,
        year: date[0],
        month: date[1],
        day: date[2]
    }
    TodoListService.getInstance().setTodo(newTodo);

    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}


const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    const todoDate = TodoListService.getInstance().ymdByTodo(todo);
    modal.innerHTML = `
    <div class="modal-container">
        <div class="modal-container-top">
            <header class="modal-header">
                <h1 class="modal-title">
                    일정 수정
                </h1>
            </header>
        </div>

        <div class="modal-container-main">
            <input type="text" class="text-input w-f modal-main-text-input" value="${todo.content}">                 
        </div>
        <div class="modal-container-foot">
            <input type="date" class="modal-date-modify" value="${todoDate}">
            <div class="modal-foot-btn">
                <button class="btn" value="${todo.id}" onclick="modifySubmitButtonOnClick(this.value)">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </div>
        </div>
    </div>`;
}