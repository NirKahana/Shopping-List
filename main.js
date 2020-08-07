

let myInput = document.getElementById("textInput");
let addButton = document.getElementById("addButton");
addButton.value = "HI";

// async function myFunc() {

// await axios.get()

// } 

// let myCounterElement = document.getElementById("counter");


function addTaskToScreen(){

        let currentTask = myInput.value;
        let newTaskElm = document.createElement("div");
        let textDiv = document.createElement("span");
        let deleteButton = document.createElement("button");

        textDiv.innerText = currentTask;    // CHANGE THIS LINE!!!
        console.log(textDiv);
        deleteButton.innerHTML = "Delete";

        newTaskElm.appendChild(textDiv);
        newTaskElm.appendChild(deleteButton);

        // deleteButton.addEventListener("click", deleteItem);
        document.body.appendChild(newTaskElm)

        myInput.value = "";
        myInput.focus();
}







// function deleteItem () {
//         var nodes = Array.prototype.slice.call( document.getElementById('myList').children ),
//         liRef =  this.parentElement;
//         let toDeleteIndex = (nodes.indexOf( liRef ));
//         tasksArray.splice(toDeleteIndex,1);

//         //update counter
//         myCounterElement.innerHTML = tasksArray.length + "ToDo's";

//         this.parentElement.remove();
// }


addButton.addEventListener("click", addTaskToScreen);
