
export function getProjectsList (todos) {
    const projectsArray = todos.map((todo) =>{
        return [...todo.projects]
    })
    const flattenedProjects = projectsArray.flat()
    const projectList = [... new Set(flattenedProjects)];
    
    return projectList;
}

//DATE FORMATTING
export function createDate (selectedDay) {
    const date = selectedDay;
    let dayOfWeek = formatDate(date.getDay(), "dayOfWeek")
    let day = formatDate(date.getDate(), "days")
    let month = formatDate(date.getMonth(), "month")   

    let dateString = `${dayOfWeek}, ${month} ${day}`;
    return dateString;    
}

export function formatDate(number, dateType){
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days =["", "1st", "2nd","3rd"];

    if(dateType==="dayOfWeek"){
        number = daysOfWeek[Number(number)]
    }else if(dateType==="month"){
        number = months[Number(number)]
    }else if(dateType==="days" && number < 4){
        number = days[Number(number)]
    }else if(dateType ==="days" && number > 3){
        number += "th"
    }
    return number
};