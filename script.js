let addBtn = document.querySelector(".add-btn")
let modalCont = document.querySelector(".modal-cont")
let textAreaCont = document.querySelector(".textarea-cont")
let allPriorityColors = document.querySelectorAll(".priority-color")

let colors = ["lightpink", "lightblue", "lightgreen", "black"]
let modalPriorityColor = colors[colors.length - 1]
let mainCont = document.querySelector(".main-cont")

// flag for modal-container
// true-> modal display
// false-> modal hide
let addFlag = false;

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

//Listener for openinng modal container
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

modalCont.addEventListener('keydown',(e)=>{
    let key = e.key
    if(key === "Shift"){
        createTicket(modalPriorityColor, textAreaCont.value, shortid())
        addFlag = false
        modalCont.style.display =  "none"

    }
})

function createTicket(ticketColor, ticketTask, ticketId){
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute("class", "ticket-cont")
    ticketCont.innerHTML =`
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="task-cont"></div>
        <div class="task-area">
        ${ticketTask}
        </div>
        <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>`;

    mainCont.appendChild(ticketCont)
}