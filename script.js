const inputText = document.getElementById("inputText");
const addBTN = document.getElementById("addBTN");
const taskList = document.getElementById("taskList");
let finished = false;
let list = [];

function loadList(){
    
    taskList.innerHTML = "";
    
    for(let i = 0; i < list.length; i++){
        let task = null;
        if(list[i].finished){

            task = `
                <div class="task" id="${i}">
                    <input type="text" value="${list[i].menssage}" readonly class="inputTaskItem finish lthr"
                    onchange="changed(this)">
                    <i class="bx bx-trash"></i>
                </div>
                `
        }else{
            task = `
                <div class="task" id="${i}">
                    <input type="text" value="${list[i].menssage}" readonly class="inputTaskItem"
                    onchange="changed(this)">
                    <i class="bx bx-trash"></i>
                </div>
                `
        }
    
        taskList.innerHTML+= task;
    }
}

addBTN.addEventListener("click", (e)=>{
    e.preventDefault();

    
    if(inputText.value !== ""){
        
        list.push({menssage: inputText.value, finished: false});

        loadList();
        inputText.value = "";
        console.log(list)
    }

})

document.addEventListener("click", (e)=>{
    const targetElement = e.target;
    
    if(targetElement.classList.contains("bx-trash")){
        list.splice(targetElement.parentElement.id, 1);
        loadList();
    }

    if(targetElement.classList.contains("inputTaskItem")){
        if(targetElement.readOnly){
            
            if(list[targetElement.parentElement.id].finished){list[targetElement.parentElement.id].finished = false}
            else {list[targetElement.parentElement.id].finished = true}

            loadList();
        }
    }
    e.stopImmediatePropagation();
})

document.addEventListener("dblclick", (e)=>{
    const targetElement = e.target;
    console.log(targetElement)

    //se o elemento target for o input de uma task.
    if(targetElement.classList.contains("inputTaskItem")){
        targetElement.classList.remove("lthr");
        targetElement.readOnly = false;
        targetElement.addEventListener("blur", ()=>{
            targetElement.readOnly = true;
            if(targetElement.classList.contains("finish")){
                targetElement.classList.add("lthr")
            }
        })
    }
});

function changed(val){
    list[val.parentElement.id].menssage = val.value;
}
/*
<div class="task">
    <input type="text" value="Task Exemplo" readonly>
    <i class="bx bx-trash"></i>
</div>
*/