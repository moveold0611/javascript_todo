var month = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]
var week = [
    "월", "화", "수", "목", "금", "토", "일"
]



const testOnClick = () => {
    // const test = TestClass.getInstance().setCalendarMonth();
    const time = new Date().toISOString().substring(0, 10);
    
    // const time = new Date().getDay().substring(0, 3);
    
    console.log(time);
    // var calendarday = [];
    // const setter = document.querySelector(".test-table");

    // for(let i = 0; i < 31; i++) {
    //     calendarday[i] = i + 1; 

    //     if(i === 0) {
    //         setter.innerHTML += "<tr> <td>"
    //     }

    //     setter.innerHTML += calendarday[i] + "</td><td>";

    //     if(i === 30) {
    //         setter.innerHTML += "</tr>"
    //     }
    // }

}


window.onload =()=> {
    TestClass.getInstance().setCalendarWeek();
}






