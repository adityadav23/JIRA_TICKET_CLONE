let addBtn = document.querySelector(".add-btn")
let removeBtn = document.querySelector(".remove-btn")
let modalCont = document.querySelector(".modal-cont")
let textAreaCont = document.querySelector(".textarea-cont")
let allPriorityColors = document.querySelectorAll(".priority-color")
let toolBoxColors = document.querySelectorAll(".color");

let colors = ["lightpink", "lightblue", "lightgreen", "black"]
let modalPriorityColor = colors[colors.length - 1]
let mainCont = document.querySelector(".main-cont")

// flag for modal-container
let addFlag = false;

// flag to remove tickets
let removeFlag = false

let lockClass = 'fa-lock';
let unlockClass = 'fa-lock-open'

let ticketsArr =[];

for(let i = 0; i< toolBoxColors.length; i++ ){
    toolBoxColors[i].addEventListener("click",(e)=>{
        let currentToolBoxColor = toolBoxColors[i].classList[0];
        let filteredTickets = ticketsArr.filter((ticketObj, idx)=>{
            return currentToolBoxColor === ticketObj.ticketColor ;
        })

        //remove  previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i =0; i < allTicketsCont.length; i++){
            allTicketsCont[i].remove()
        }

        //Display new filtered tickets
        filteredTickets.forEach((ticketObj, idx)=>{
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId)
        })
        
        toolBoxColors[i].addEventListener("dblclick",(e)=>{
            let allTicketsCont = document.querySelectorAll(".ticket-cont");
            for(let i =0; i< allTicketsCont.length; i++){
                allTicketsCont[i].remove()
            }

            ticketsArr.forEach((ticketObj, idx)=>{
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId)
            })
        })
    })

}

//Listener for modal coloring
allPriorityColors.forEach((colorElem, index)=>{
    colorElem.addEventListener("click", (e)=>{
        allPriorityColors.forEach((priorityColorElem, index)=>{
            priorityColorElem.classList.remove("border")
        })
        colorElem.classList.add("border")

        modalPriorityColor = colorElem.classList[0]
    })
})

//Listener for opening modal container
addBtn.addEventListener('click', (e)=>{

    addFlag = !addFlag
    if(addFlag){
        modalCont.style.display = "flex"
    }else{
        modalCont.style.display =  "none"
        addFlag = false
        modalCont.value = ""
    }

})

removeBtn.addEventListener("click", (e)=>{
    removeFlag = !removeFlag

})

modalCont.addEventListener('keydown',(e)=>{
    let key = e.key
    if(key === "Shift"){
        createTicket(modalPriorityColor, textAreaCont.value, shortid());
        addFlag = false;
        setModalToDefault();
    }
})

function createTicket(ticketColor, ticketTask, ticketId){
    let id = ticketId || shortid();
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute("class", "ticket-cont")
    ticketCont.innerHTML =`
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task-cont"></div>
        <div class="task-area">
        ${ticketTask}
        </div>
        <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>`;

    mainCont.appendChild(ticketCont)

    // create object of ticket and add to array
    if(!ticketId) ticketsArr.push({ticketColor, ticketTask, ticketId: id});


    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

function handleRemoval(ticket){
    // removeFlag = true -> remove 
    if(removeFlag){
        ticket.remove()
    }
}

function handleLock(ticket){
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click",(e)=>{
        if(ticketLock.classList.contains(lockClass)){
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", 'true');
        }else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", 'false');
        }
    })
}

function handleColor(ticket){
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e)=>{
        let currentTicketColor = ticketColor.classList[1];
        // Get current ticket color index
        let currentTicketColorIdx = colors.findIndex((color)=>{
            return (currentTicketColor === color)
        })
    
        currentTicketColorIdx++;
    
        let newTicketColorIdx = currentTicketColorIdx % colors.length ;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor)
    })
}

function  setModalToDefault(){
    modalCont.style.display =  "none";
    textAreaCont.value = "";
    modalPriorityColor = colors[colors.length - 1];
    allPriorityColors.forEach((priorityColorElem, idx)=>{
        priorityColorElem.classList.remove("border")
    })

    allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}