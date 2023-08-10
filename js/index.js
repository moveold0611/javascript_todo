window.onload = () => {
    TodoListService.getInstance().todayDateSetter();
    TodoListService.getInstance().updateTodoList();
    Routes.getInstance().loadCalendarYm();
}

