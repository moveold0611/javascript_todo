const calendarLeftButtonOnClickHandle = () => {
    const getMonthQs = document.querySelector(".calendar-month");
    const getYearQs = document.querySelector(".calendar-year");
    const newMonth = parseInt(getMonthQs.innerHTML) - 1;

    if(newMonth === 0) {
        getYearQs.innerHTML = parseInt(getYearQs.innerHTML) - 1;
        getMonthQs.innerHTML = 12;
        CalendarService.getInstance().calendarInfoChanger(getYearQs.innerHTML, 12);
    }else {
        getMonthQs.innerHTML = newMonth;
        CalendarService.getInstance().calendarInfoChanger(parseInt(getYearQs.innerHTML), newMonth);

    }
}




const calendarRightButtonOnClickHandle = () => {
    const getMonthQs = document.querySelector(".calendar-month"); 
    const getYearQs = document.querySelector(".calendar-year"); 
    const newMonth = parseInt(getMonthQs.innerHTML) + 1;

    if(newMonth === 13) {
        getYearQs.innerHTML = parseInt(getYearQs.innerHTML) + 1;
        getMonthQs.innerHTML = 1;
        CalendarService.getInstance().calendarInfoChanger(getYearQs.innerHTML, 1);

    }else {
    getMonthQs.innerHTML = newMonth;
    CalendarService.getInstance().calendarInfoChanger(parseInt(getYearQs.innerHTML), newMonth);
    }   
}








// CLASS
class CalendarService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CalendarService();
        }
        return this.#instance;
    }

    DateList = new Array();








calendarInfoChanger(year, month) {
    const calendarDate = CalendarService.getInstance().calendarFirstDateObject(year, month);
    CalendarService.getInstance().setCalendartable(calendarDate);
    CalendarService.getInstance().filterYmdAtCalendarDate();
}








calendarFirstDateObject(year, month) {
    const maxDate = this.findMaxDate(month)

    const calendarDate = {
        year,
        month, 
        date: 1, 
        maxDate,
        day: new Date(year + '-' + month + '-' + 1).getDay()
    }
    return calendarDate;
}







findMaxDate(month) {
    if(month === 1 || month === 3 || month === 5 || month === 7 || 
        month === 8 || month === 10 || month === 12) {
            return 31;
        }else if(month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        }else {
            return 29;
        }
}









filterYmdAtCalendarDate() {
    const todoList = TodoListService.getInstance().todoListGetter();
    const getMonthQs = document.querySelector(".calendar-month"); 
    const getYearQs = document.querySelector(".calendar-year");
    var getCalendarDateTable = document.querySelectorAll(".calendar-table td");
      
    todoList.forEach(todo => {
        if(parseInt(todo.year) === parseInt(getYearQs.innerHTML)
        && parseInt(todo.month) === parseInt(getMonthQs.innerHTML)) {         

            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(parseInt(todo.day) === parseInt(getCalendarDateTable[i].innerHTML)) {
                    getCalendarDateTable[i].insertAdjacentHTML("beforeend", `<p class="calendar-text">${todo.content}</p>`)
                }
            }
        }
    });
}











    setCalendartable(calendarDate) {
        var getCalendarDateTable = document.querySelectorAll(".calendar-table td");
        const selectCalendarTbQs = document.querySelector(".calendar-table");
        selectCalendarTbQs.innerHTML = `
        <table class="calendar-table">
            <thead>
                <th class="calendar-sunday">일</th>
                <th>월</th>
                <th>화</th>                 
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </thead>
            <tbody class="calendar-day">
            </tbody>
            <tfoot >
                <tr class="calendar-table-foot">
                </tr>
            </tfoot>
        `

        const selectCalendarQs = document.querySelector(".calendar-day");
        const date =  calendarDate.date;
        const day = calendarDate.day;

        switch (day) {
            case 1:
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td>${date}</td>  
                <td>${date + 1}</td>
                <td>${date + 2}</td>
                <td>${date + 3}</td>
                <td>${date + 4}</td>
                <td>${date + 5}</td>
                </tr>
            `)
            let nextWeekLineDate = date + 6;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate}</td>
                    <td>${nextWeekLineDate+1}</td>
                    <td>${nextWeekLineDate+2}</td>
                    <td>${nextWeekLineDate+3}</td>
                    <td>${nextWeekLineDate+4}</td>
                    <td>${nextWeekLineDate+5}</td>
                    <td>${nextWeekLineDate+6}</td>
                </tr>
                ` )
                nextWeekLineDate += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate}</td>`);
                nextWeekLineDate++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;






            case 2: 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td></td>  
                <td>${date}</td>
                <td>${date + 1}</td>
                <td>${date + 2}</td>
                <td>${date + 3}</td>
                <td>${date + 4}</td>
                </tr>
            `)
            let nextWeekLineDate2 = date + 5;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate2}</td>
                    <td>${nextWeekLineDate2+1}</td>
                    <td>${nextWeekLineDate2+2}</td>
                    <td>${nextWeekLineDate2+3}</td>
                    <td>${nextWeekLineDate2+4}</td>
                    <td>${nextWeekLineDate2+5}</td>
                    <td>${nextWeekLineDate2+6}</td>
                </tr>
                ` )
                nextWeekLineDate2 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate2}</td>`);
                nextWeekLineDate2++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;








            case 3: 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td></td>  
                <td></td>
                <td>${date}</td>
                <td>${date + 1}</td>
                <td>${date + 2}</td>
                <td>${date + 3}</td>
                </tr>
            `)
            let nextWeekLineDate3 = date + 4;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate3}</td>
                    <td>${nextWeekLineDate3+1}</td>
                    <td>${nextWeekLineDate3+2}</td>
                    <td>${nextWeekLineDate3+3}</td>
                    <td>${nextWeekLineDate3+4}</td>
                    <td>${nextWeekLineDate3+5}</td>
                    <td>${nextWeekLineDate3+6}</td>
                </tr>
                ` )
                nextWeekLineDate3 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate3}</td>`);
                nextWeekLineDate3++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;









            case 4: 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td></td>  
                <td></td>
                <td></td>
                <td>${date}</td>
                <td>${date + 1}</td>
                <td>${date + 2}</td>
                </tr>
            `)
            let nextWeekLineDate4 = date + 3;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate4}</td>
                    <td>${nextWeekLineDate4+1}</td>
                    <td>${nextWeekLineDate4+2}</td>
                    <td>${nextWeekLineDate4+3}</td>
                    <td>${nextWeekLineDate4+4}</td>
                    <td>${nextWeekLineDate4+5}</td>
                    <td>${nextWeekLineDate4+6}</td>
                </tr>
                ` )
                nextWeekLineDate4 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate4}</td>`);
                nextWeekLineDate4++;
            }

            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }

            break;









            case 5: 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td></td>  
                <td></td>
                <td></td>
                <td></td>
                <td>${date}</td>
                <td>${date + 1}</td>
                </tr>
            `)
            let nextWeekLineDate5 = date + 2;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate5}</td>
                    <td>${nextWeekLineDate5+1}</td>
                    <td>${nextWeekLineDate5+2}</td>
                    <td>${nextWeekLineDate5+3}</td>
                    <td>${nextWeekLineDate5+4}</td>
                    <td>${nextWeekLineDate5+5}</td>
                    <td>${nextWeekLineDate5+6}</td>
                </tr>
                ` )
                nextWeekLineDate5 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate5}</td>`);
                nextWeekLineDate5++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;













            case 6:
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td></td>
                <td></td>  
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${date}</td>
                </tr>
            `)
            let nextWeekLineDate6 = date + 1;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate6}</td>
                    <td>${nextWeekLineDate6+1}</td>
                    <td>${nextWeekLineDate6+2}</td>
                    <td>${nextWeekLineDate6+3}</td>
                    <td>${nextWeekLineDate6+4}</td>
                    <td>${nextWeekLineDate6+5}</td>
                    <td>${nextWeekLineDate6+6}</td>
                </tr>
                ` )
                nextWeekLineDate6 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate6}</td>`);
                nextWeekLineDate6++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;








            case 0:
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                <td>${date}</td>
                <td>${date + 1}</td>  
                <td>${date + 2}</td>
                <td>${date + 3}</td>
                <td>${date + 4}</td>
                <td>${date + 5}</td>
                <td>${date + 6}</td>
                </tr>
            `)
            let nextWeekLineDate7 = date + 7;
            for(let i = 0; i < 4; i++) { 
                selectCalendarQs.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${nextWeekLineDate7}</td>
                    <td>${nextWeekLineDate7 + 1}</td>
                    <td>${nextWeekLineDate7 + 2}</td>
                    <td>${nextWeekLineDate7 + 3}</td>
                    <td>${nextWeekLineDate7 + 4}</td>
                    <td>${nextWeekLineDate7 + 5}</td>
                    <td>${nextWeekLineDate7 + 6}</td>
                </tr>
                ` )
                nextWeekLineDate7 += 7;
            }
            for(let i = 0; i < 7; i++){
                const selectCalendarfootQs = document.querySelector(".calendar-table-foot")
                selectCalendarfootQs.insertAdjacentHTML("beforeend", `<td>${nextWeekLineDate7}</td>`);
                nextWeekLineDate7++;
            }
            getCalendarDateTable = document.querySelectorAll(".calendar-table td");
            for(let i = 0; i < getCalendarDateTable.length; i++) {
                if(getCalendarDateTable[i].innerHTML > calendarDate.maxDate) {
                    getCalendarDateTable[i].innerHTML = ``;
                }
            }
            break;
            }

        }








}