class TestClass {
    static #instance = null;
    
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TestClass();
        }
        return this.#instance;
    }
    
    setCalendarYear() {
        const setter = document.querySelector(".year-and-month");

        setter.innerHTML += `"sdf"${}"sdf"`;
    }

    setCalendarWeek() {
        const setter = document.querySelector(".test-thead");
        setter.innerHTML += "<tr><th>월</th><th>화</th><th>수</th>"
       + "<th>목</th><th>금</th><th>토</th><th>일</th></tr>";
     }

    setCalendarMonth() {
        var calendarMonth = [];       
        for(let i = 0; i < 12; i++){
            calendarMonth[i] = i + 1;
        }
    }

    setCalendarDay() {
        var calendarday = [];
        const setter = document.querySelector(".test-table");

        setter.innerHTML += "<tbody><tr>"

        for(let i = 0; i < 31; i++) {
            calendarday[i] = i + 1; 
            if(i === 6 || i === 13 || i === 20 || i === 27) {
                setter.innerHTML += " </tr></tbody> <tbody><tr>"
            }
            setter.innerHTML += "<td>" + calendarday[i] + "</td>";
        }

        setter.innerHTML += "</tr></tbody>"
    }






}