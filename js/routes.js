class Routes {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Routes();
        }
        return this.#instance;
    }

    routeStatus = "welcome"

    show() {

        this.clear();

        switch(this.routeStatus) {
            case "welcome": 
                const welcomePage = document.querySelector(".welcome-page-container");
                welcomePage.classList.remove("invisible");
                break;
            case "todolist":
                const todolistPage = document.querySelector(".todolist-page-container");
                todolistPage.classList.remove("invisible");
                break;
            case "calendar":
                const calendarPage = document.querySelector(".calendar-page-container");
                calendarPage.classList.remove("invisible");

        }
    }

    clear() {
        const pages = document.querySelectorAll(".main-container > div");
        pages.forEach(page => {
            page.classList.add("invisible");
        });
    }


    loadCalendarYm() {
        const setterY = document.querySelector(".calendar-year")
        const setterM = document.querySelector(".calendar-month")
        setterY.innerHTML = new Date().toISOString().substring(0, 4);
        setterM.innerHTML = parseInt(new Date().toISOString().substring(5, 7));


        
    }


}