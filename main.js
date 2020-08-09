
let myInput = document.getElementById("textInput");
let viewButton = document.getElementById("viewButton");
let addButton = document.getElementById("add");
let clearButton = document.getElementById("empty");



let list = document.getElementById("listhtml");



async function getList() {
        const { data } = await axios.get(`http://localhost:3000/products`);

        data.forEach(product => {
                let currentItem = document.createElement("li")
                let itemText = document.createElement("span");
                let idSpan = document.createElement("span");
                idSpan.setAttribute("class", "id"); 
                idSpan.innerText = product.id;
                itemText.innerText = product.productName;
                let deleteButton = document.createElement("button");
                let editButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                editButton.innerHTML = "Edit";
                currentItem.appendChild(itemText);
                currentItem.appendChild(idSpan);
                currentItem.appendChild(deleteButton);
                currentItem.appendChild(editButton);
                deleteButton.addEventListener("click", deleteItem);
                editButton.addEventListener("click", editItem);
                list.appendChild(currentItem);
        });  
}       
        getList();

async function getItem() {
        console.log("getItem is called");
const { data } = await axios.get(`http://localhost:3000/products/${myInput.value}`);
        let listAsArray = list.querySelectorAll("li");
        console.log(listAsArray);
        let showItem;
        console.log(showItem);
        for (let i = 0; i < listAsArray.length; i++) {
                if(listAsArray[i].querySelectorAll("span")[1].innerText === myInput.value) {
                console.log("condition is true");
                showItem = listAsArray[i];
                console.log(showItem);
                }
        } if (showItem === undefined) {
               console.log("no item found"); 
               showItem = document.createElement("li");
               showItem.innerText = "no item found";
        }

        
        while( list.firstChild ){
                list.removeChild( list.firstChild );
              }
        list.appendChild(showItem);
        //
        // need to create a return button
        //
        myInput.value = "";
        myInput.focus();
} 


async function deleteAll() {
        const { data } = await axios.delete(`http://localhost:3000/products/`);
        list.querySelectorAll('li').forEach(n => n.remove());

} 

async function addProduct(){
        // let numOfItems = document.querySelectorAll('ul li').length
        const { data } = await axios({
                method: 'post',
                url: 'http://localhost:3000/products/',
                data: {
                  productName: `${myInput.value}`
                }
              });

        let newLi = document.createElement("li");
        let textSpan = document.createElement("span");
        let idSpan = document.createElement("span");
        idSpan.setAttribute("class", "id");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");

        textSpan.innerText = data.productName;   
        idSpan.innerText = data.id;   
        deleteButton.innerHTML = "Delete";
        editButton.innerHTML = "Edit";
        deleteButton.addEventListener("click", deleteItem);
        editButton.addEventListener("click", editItem);


        newLi.appendChild(textSpan);
        newLi.appendChild(idSpan);
        newLi.appendChild(deleteButton);
        newLi.appendChild(editButton);
        list.appendChild(newLi)

        myInput.value = "";
        myInput.focus();
}

async function deleteItem(event) {

        let clickedButton = event.target;
        let requiredID = clickedButton.parentElement.getElementsByTagName('span')[1].innerText;
        console.log(requiredID);
        console.log(typeof requiredID);
        console.log(clickedButton);
        const { data } = await axios.delete(`http://localhost:3000/products/${requiredID}`);


        console.log(clickedButton.parentElement);
        clickedButton.parentElement.remove();
}
async function updateProduct(event) {
        let clickedButton = event.target;
        let requiredID = clickedButton.parentElement.getElementsByTagName('span')[1].innerText;
        /// ######### change here
        let newName = clickedButton.parentElement.getElementsByTagName('input')[0].value;
        const { data } = await axios({
                method: 'put',
                url: `http://localhost:3000/products/${requiredID}`,
                data: {
                  productName: newName,  // needs to be changed
                  id: parseInt(requiredID)
                }
              });
             
        // update screen and remove popInput and saveButton
        clickedButton.parentElement.getElementsByTagName('span')[0].innerText = newName;
        clickedButton.parentElement.getElementsByTagName('input')[0].remove();
        clickedButton.remove();
        //
}
function editItem(event) {
        let popInput = document.createElement("input");
        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        event.target.parentElement.appendChild(popInput);
        event.target.parentElement.appendChild(saveButton);
        saveButton.addEventListener("click", updateProduct)
        
}



viewButton.addEventListener("click", getItem);
addButton.addEventListener("click", addProduct);
clearButton.addEventListener("click", deleteAll);



