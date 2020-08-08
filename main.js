
let myInput = document.getElementById("textInput");
let viewButton = document.getElementById("viewButton");
let addButton = document.getElementById("add");
let clearButton = document.getElementById("empty");
addButton.value = "HI";





let list = document.getElementById("listhtml");



async function getList() {
        const { data } = await axios.get(`http://localhost:3000/products`);

        data.forEach(product => {
                let currentItem = document.createElement("li")
                let itemText = document.createElement("span");
                itemText.innerText = product.productName;
                // ***
                let deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                currentItem.appendChild(itemText);
                currentItem.appendChild(deleteButton);
                // ***

                list.appendChild(currentItem);
        });  
}       
        getList();

async function getItem() {
const { data } = await axios.get(`http://localhost:3000/products/${myInput.value}`);
        let showItem = document.createElement("li");
        showItem.innerText = data.productName;
        while( list.firstChild ){
                list.removeChild( list.firstChild );
              }
        list.appendChild(showItem); 
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
                  id: `${myInput.value}`, //// Change Here
                  productName: `${myInput.value}`
                }
              });

        let newLi = document.createElement("li");
        let textDiv = document.createElement("span");
        let deleteButton = document.createElement("button");

        textDiv.innerText = data.productName;   
        deleteButton.innerHTML = "Delete";

        newLi.appendChild(textDiv);
        newLi.appendChild(deleteButton);
        deleteButton.addEventListener("click", deleteItem);
        list.appendChild(newLi)

        myInput.value = "";
        myInput.focus();
}

async function deleteItem(event) {
        let x = event.target               // Change Here
        console.log("x");
}



viewButton.addEventListener("click", getItem);
addButton.addEventListener("click", addProduct);
clearButton.addEventListener("click", deleteAll);



