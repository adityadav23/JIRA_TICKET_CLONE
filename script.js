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
        createTicket()
        addFlag = false
        modalCont.style.display =  "none"

    }
})

function createTicket(){
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute("class", "ticket-cont")
    ticketCont.innerHTML =`
        <div class="ticket-color"></div>
        <div class="ticket-id">#qwerrt</div>
        <div class="task-cont"></div>
        <div class="task-area">
        This is the text area</div>`;

    mainCont.appendChild(ticketCont)
}