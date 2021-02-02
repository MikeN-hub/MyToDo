const refreshBtn = document.getElementById('refresh');
const dateElement = document.getElementById('dateElement');
const list = document.getElementById('list');
const addTaskBtn = document.getElementById('addTaskBtn');
const input = document.querySelector('input');

let currentDate = new Date();
let dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};
dateElement.innerHTML = currentDate.toLocaleDateString('en-US', dateOptions);

let toDoList;
let id;

// load from local storage
let data = localStorage.getItem('TODO')

if(data){
    toDoList = JSON.parse(data);
    id = toDoList.length;
    loadList(toDoList);
}
else{
    toDoList = [];
    id = 0;
}

// Icons view
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINETHROUGH = "lineThrough";

//load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addTask(item.name, item.id, item.done, item.trash)
    })
}

//refresh local storage
refreshBtn.onclick = function(){
    localStorage.clear()
}

function addTask(taskName, id, done, trash){
    if(trash) return;
    let DONE = done ? CHECK : UNCHECK;
    let LINE = done ? LINETHROUGH : "";
    let task = `<li class="task">
        <i class="far ${DONE}" job="complite" id="${id}"></i>
        <p class="taskText ${LINE}"> ${taskName} </p>
        <i class="far fa-trash-alt" job="delete" id=${id}></i> 
    </li>`;
    list.insertAdjacentHTML("beforeend", task)
}

function compliteToDo(elem){
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.taskText').classList.toggle(LINETHROUGH);

    toDoList[elem.id].done = toDoList[elem.id].done ? false : true;
}

function removeToDo(elem){
    elem.parentNode.parentNode.removeChild(elem.parentNode);

    toDoList[elem.id].trash = true;
}

document.addEventListener('keyup', (e)=>{
    const toDo = input.value;
    if ( e.key == 'Enter' && toDo ){
        addTask(toDo, id, false, false);
        input.value = '';
        let task = {
            name: toDo,
            id: id,
            done: false,
            trash: false
        }
        toDoList.push(task);

        // save to local storage
        localStorage.setItem('TODO', JSON.stringify(toDoList))

        id++;
    }
})

addTaskBtn.addEventListener('click', function(e){
    const toDo = input.value;
    if(input.value){
        addTask(toDo, id, false, false);
        input.value = '';
        let task = {
            name: toDo,
            id: id,
            done: false,
            trash: false
        }
        toDoList.push(task);

        // save to local storage
        localStorage.setItem('TODO', JSON.stringify(toDoList))

        id++;
    }
})

// Target items created dinamically
list.addEventListener('click', (e)=>{
    let element = e.target;
    let elementJob = element.attributes.job.value;
    if(elementJob == 'complite'){
        compliteToDo(element);
    }
    else if(elementJob == 'delete'){
        removeToDo(element);
    }

    // save to local storage
    localStorage.setItem('TODO', JSON.stringify(toDoList))
})

