document.addEventListener('DOMContentLoaded',()=>{
    
const button=document.getElementById("bttn");
const input = document.getElementById("input");
const toDolist=document.getElementById("to-do-list");
let tasks= JSON.parse(localStorage.getItem('task'))||[];
tasks.forEach(task => {
     readStorage(task);
});
button.addEventListener('click',()=>{
    let taskValue = input.value;
    if(taskValue === "")
        return;
    const newTask = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };
    tasks.push(newTask);
    taskTrack();
    readStorage(newTask)
    input.value="";
    console.log(tasks);
})
function taskTrack(){
    localStorage.setItem('task', JSON.stringify(tasks));
}
function readStorage(task)
{
    const li=document.createElement('li')
    li.setAttribute('data-id',task.id);
    if(task.completed){
        li.classList.add("completed");
    }
    li.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>`;
    li.addEventListener('click',(e)=>{
        if(e.target.tagName=='BUTTON')
            return;
        task.completed= !task.completed;
        li.classList.toggle('completed');
        taskTrack();
    })
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation();
        const id1 = parseInt(li.getAttribute('data-id'));
        tasks = tasks.filter((t) => t.id!==id1)
        li.remove();
        taskTrack();
    })
    toDolist.appendChild(li);
}
});