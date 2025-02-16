document.addEventListener('DOMContentLoaded',()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasksList'));
    console.log("Retrieved from localStorage:", storedTasks);
    if(storedTasks){
        tasksList = storedTasks;
        console.log("Updated tasksList:", tasksList);
            
        updatetasksListinUI();
        updateStats();
    }
})
let tasksList = [];
const addTask= ()=>{
    const taskInput1 = document.querySelector('#taskInput');
    const text= taskInput1.value.trim();
    if(text){
        tasksList.push({text:text,completed:false});
        console.log("Saved to localStorage:", localStorage.getItem('tasksList'));
        updatetasksListinUI();
        updateStats();
        saveTasks();
        taskInput1.value="";
    } 
};
const saveTasks=()=>{
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
}
const updatetasksListinUI= ()=>{
    const listInUI= document.getElementById('taskList');
    listInUI.innerHTML="";

    tasksList.forEach((task,index)=>{
        const listItem= document.createElement("li");
        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed?'completed':''}">
                <input type="checkbox" class="checkbox" ${task.completed?'checked':""}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash-can" onclick="deleteTask(${index})"></i>
            </div>
        </div>
        `;
        listItem.addEventListener("change",()=>toggleTaskComplete(index));
        listInUI.append(listItem);
    });
};

function updateStats(){
    const completeTasks = tasksList.filter(task=>task.completed).length;
    const totalTasks = tasksList.length;
    const progress = totalTasks===0 ? 0 :(completeTasks/totalTasks)*100;
    const progressBar= document.getElementById("progress");
    progressBar.style.width= `${progress}%`;

    document.getElementById("number").textContent= totalTasks===0?"0":`${completeTasks} / ${totalTasks}`;

    if(tasksList.length && completeTasks === totalTasks ){
        blastconfetti();
    }
    
}

document.addEventListener("DOMContentLoaded",updateStats);

function editTask(index){
    const edit= document.getElementById('taskInput');
    edit.value =tasksList[index].text;
    tasksList.splice(index,1);
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    updatetasksListinUI();
    updateStats();
    saveTasks();
};



function deleteTask(index){
    tasksList.splice(index,1);
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    updatetasksListinUI();
    updateStats();
    saveTasks();
};

function toggleTaskComplete(index){
    tasksList[index].completed= !tasksList[index].completed;
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    updatetasksListinUI();
    updateStats();  
    saveTasks();      
};
  
document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});

const blastconfetti=()=>{
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,    
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};