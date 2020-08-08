
let myInput = document.getElementById("textInput");
let addButton = document.getElementById("addButton");
addButton.value = "HI";





let list = document.getElementById("listhtml");



async function getList() {
        const { data } = await axios.get(`http://localhost:3000/products`);

        data.forEach(product => {
                let currentItem = document.createElement("li")
                currentItem.innerHTML = product.productName;
                list.appendChild(currentItem);
        });        
        } 
        getList();



async function getItem() {
const { data } = await axios.get(`http://localhost:3000/products/${myInput.value}`);
        console.log(data);
        let showItem = document.createElement("li");
        showItem.innerText = data.productName;
        while( list.firstChild ){
                list.removeChild( list.firstChild );
              }
        list.appendChild(showItem); 
} 

// let currentItem = document.createElement("li")
// currentItem.innerHTML = data[myInput.value].productName;
// list.appendChild(currentItem);



function addTaskToScreen(){

        let currentTask = myInput.value;
        let newTaskElm = document.createElement("div");
        let textDiv = document.createElement("span");
        let deleteButton = document.createElement("button");

        textDiv.innerText = currentTask;    // CHANGE THIS LINE!!!
        console.log(textDiv.innerText);
        deleteButton.innerHTML = "Delete";

        newTaskElm.appendChild(textDiv);
        newTaskElm.appendChild(deleteButton);

        // deleteButton.addEventListener("click", deleteItem);
        document.body.appendChild(newTaskElm)

        myInput.value = "";
        myInput.focus();
}



addButton.addEventListener("click", getItem);

