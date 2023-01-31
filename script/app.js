
//declare variables from HTML elements
let getRandom = document.getElementById("getRandom");
let showLastFive = document.getElementById("showLastFive");

let injectNameHere = document.getElementById("injectNameHere");
let inject5NamesHere = document.getElementById("inject5NamesHere");

//declare variables to track info
let studentList = [];
let currentStudent;
let last5list = [];

//functions
//fetch call for json data
async function GetStudentNamesList(){
    const promise = await fetch("./data/data.json");
    const data = await promise.json();
    studentList = data;
}

//function for getting random numbers -- will be used with pulling random classmate names
function GetRandomInt(max){
    return Math.floor(Math.random() * max);
}
//44 total datapoints

async function SelectRandomName(){
    await GetStudentNamesList();
    let randomNum = GetRandomInt(studentList.studentNames.length);
    currentStudent = studentList.studentNames[randomNum].name;
    console.log(currentStudent);
    injectNameHere.innerHTML = `<span class=\"underline\">Name</span>: ${currentStudent}`;
    PopulateLast5Array();
    console.log(last5list);
    if (inject5NamesHere.innerHTML != ""){
        InjectLast5Names();
    }
}

function PopulateLast5Array(){
    if (last5list.length >= 5){
        const firstElement = last5list.shift();
    } 
    last5list.push(currentStudent);
}

function InjectLast5Names(){
    inject5NamesHere.innerHTML = "";
    let injectionStuff = "<span class=\"underline\">Last Five</span>:<br>";
    for (let i = 0; i < last5list.length; i++){
        injectionStuff += last5list[i] + "<br>";
    }
    inject5NamesHere.innerHTML = injectionStuff;
}

//event listeners
getRandom.addEventListener("click", function(){
    SelectRandomName();
});

showLastFive.addEventListener("click", function(){
    if (inject5NamesHere.innerHTML != ""){
        inject5NamesHere.innerHTML = "";
        showLastFive.textContent = "SHOW LAST FIVE";
    } else {
        InjectLast5Names();
        showLastFive.textContent = "HIDE LAST FIVE";
    }
});