
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
                deleteButton.innerHTML = "Delete";
                currentItem.appendChild(itemText);
                currentItem.appendChild(idSpan);
                currentItem.appendChild(deleteButton);
                deleteButton.addEventListener("click", deleteItem);
                list.appendChild(currentItem);
        });  
}       
        getList();

async function getItem() {
        console.log("getItem is called");
const { data } = await axios.get(`http://localhost:3000/products/${myInput.value}`);
        let listAsArray = list.querySelectorAll("li");
        console.log(listAsArray);
        for (i = 0; i < list.length; i++) {
                if (listAsArray[i].querySelectorAll("span")[1].innerHTML === myInput.value) {
                        console.log("Hello");   
                } else {
                        console.log("No such item")
                }
                
        }
        while( list.firstChild ){
                list.removeChild( list.firstChild );
              }
        // list.appendChild(showItem); 
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

        textSpan.innerText = data.productName;   
        idSpan.innerText = data.id;   
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", deleteItem);

        newLi.appendChild(textSpan);
        newLi.appendChild(idSpan);
        newLi.appendChild(deleteButton);
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
async function updateProduct() {
        let clickedButton = event.target;
        let requiredID = clickedButton.parentElement.getElementsByTagName('span')[1].innerText;
        const { data } = await axios({
                method: 'post',
                url: `http://localhost:3000/products/${requiredID}`,
                data: {
                //   productName: // needs to be changed
                  id: parseInt(requiredID)
                }
              });

}



viewButton.addEventListener("click", getItem);
addButton.addEventListener("click", addProduct);
clearButton.addEventListener("click", deleteAll);



