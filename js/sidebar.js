const sidebarToggleButtonOnClickHandle = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

    if(sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen");
        sidebarToggleButton.innerHTML = '▶';
    }else {
        sidebar.classList.add("isSidebarOpen");
        sidebarToggleButton.innerHTML = '◀';
    }
}


const sidebarMenuOnClickHandle = (target) => {
    switch(target.innerHTML) {
        case "메인메뉴": 
            Routes.getInstance().routeStatus = "welcome";
            break;  
        case "ToDoList":
            Routes.getInstance().routeStatus = "todolist";
            break;
        case "캘린더" :
            Routes.getInstance().routeStatus = "calendar"
            CalendarService.getInstance().calendarInfoChanger(
                parseInt(new Date().toISOString().substring(0, 4)),
                parseInt(new Date().toISOString().substring(5, 7))
            );
    }

    Routes.getInstance().show();
    sidebarToggleButtonOnClickHandle();
}

