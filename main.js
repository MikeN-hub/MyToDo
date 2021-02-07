// select elements
const refreshBtn = document.getElementById('refreshBtn');
const dateElement = document.getElementById('dateElement');
const toDoList = document.getElementById('toDoList');
const input = document.getElementById('input');

// define elements view by adding special classes
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'line-through';

// add Variables
let LIST = [];
let id = 0;

// show proper date
let date = new Date();
let options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
dateElement.innerHTML = date.toLocaleDateString('en-us', options);

// clear local storage
refreshBtn.onclick = ()=>{
    localStorage.clear();
    location.reload();
}

// read from local storage
let data = localStorage.getItem('TODO');
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else{
    LIST = [];
    id = 0;
}

// show things to user
function loadList(array){
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash)
    });
}

// events
document.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        let toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false)
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem('TODO', JSON.stringify(LIST)); //save to local storage
            id++;
        }
        input.value = '';
    }
})

toDoList.addEventListener('click', (e)=>{
    let element = e.target;
    let elementJob = element.attributes.job.value;
    if(elementJob == 'complete'){
        completeToDo(element)
    }
    else if(elementJob == 'delete'){
        removeToDo(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST)); //save to local storage
});

// functions
function addToDo(toDo, id, done, trash){
    if(trash) return;

    let DONE = done ? CHECK : UNCHECK;
    let LINE = done ? LINE_THROUGH : '';

    let item = `<li class="item">
    <i class="far ${DONE}" job="complete" id=${id}></i>
    <p class="toDoText ${LINE}">${toDo}</p>
    <i class="far fa-trash-alt" job="delete" id=${id}></i>
    </li>`;
    if(toDo){
        toDoList.insertAdjacentHTML('beforeend', item);
    }
}

function completeToDo(elem){
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.toDoText').classList.toggle(LINE_THROUGH);

    LIST[elem.id].done = LIST[elem.id].done ? false : true;
}

function removeToDo(elem){
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    LIST[elem.id].trash = true;
}