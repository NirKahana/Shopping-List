console.log("main.js is on!");

let shoppingList = [];
let id = 5;

/** Adds product to the cart
 * @param {*} event the event who set the listener
 */
const addProduct = (event) => {
  let product = event.target;
  if (product.classList[0] !== "product") return;
  let amount = parseInt(product.classList[1]);
  productToAdd = {
    id: product.id,
    product: product.innerHTML,
    amount: amount,
  };
  if (shoppingList.length === 0) {
    shoppingList.push(productToAdd);
  } else {
    let check = 0;
    shoppingList.forEach((item, i) => {
      if (item.id === product.id) {
        shoppingList[i].amount++;
        check++;
      }
    });
    if (!check) {
      shoppingList.push(productToAdd);
    }
  }
  updateCart();
  console.log(shoppingList);
};

/** Cart is hidden by default, by using this function it shows it
 */
const showCart = () => {
  let cart = document.querySelector("#cart");
  cart.hidden = cart.hidden ? false : true;
  if (cart.hidden) {
    cart.style.visibility = "visible";
  } else {
    cart.style.visibility = "hidden";
  }
};

/** Gets the product list from server
 */
async function getProductsList() {
  try {
    const products = await axios.get(`http://localhost:3000/shop`);
    console.log(products.data);
    printProductsList(products.data);
  } catch (err) {
    console.error(`Couldn't get product list! error: ${err}`);
  }
}

/** Saves the items in the cart to the server
 */
async function saveCart() {
  try {
    const products = await axios.post(
      `http://localhost:3000/products`,
      shoppingList
    );
    console.log(products.data);
  } catch (err) {
    console.error(`Couldn't save product list! error: ${err}`);
  }
}

/** Gets the cart from server with the items saved
 */
async function getItemsFromServer() {
  try {
    const products = await axios.get(`http://localhost:3000/products`);
    shoppingList = products.data;
    updateCart();
  } catch (err) {
    console.error(`Couldn't get product list! error: ${err}`);
  }
}

/** Adds item to product list of the shop on server
 */
async function addProductToShop() {
  let newItem = document.querySelector("#newItem");
  try {
    if (newItem.value === "") throw "Cant be empty!";
    id++;
    const products = await axios.post(`http://localhost:3000/new`, {
      id: `${id}`,
      product: newItem.value,
    });
    console.log({ id: id, product: newItem.value });
    console.log(products.data);
    getProductsList();
    newItem.value = "";
  } catch (err) {
    console.error(`Couldn't add product! error: ${err}`);
  }
}

/** Creates a table and prints the items
 */
function updateCart() {
  let cart = document.querySelector("#cart");
  cart.innerHTML = "";
  createElementWithData("", "cartTable", "table", "#cart");
  createElementWithData("", "headTr", "tr", "#cartTable");
  createElementWithData("ID", "idSlot", "th", "#headTr");
  createElementWithData("Product", "productSlot", "th", "#headTr");
  createElementWithData("Amount", "amountSlot", "th", "#headTr");
  shoppingList.forEach((item) => {
    createElementWithData("", `${item.product}`, "tr", "#cartTable");
    createElementWithData(item.id, "", "td", `#${item.product}`);
    createElementWithData(item.product, "", "td", `#${item.product}`);
    createElementWithData(item.amount, "", "td", `#${item.product}`);
  });
}

/** Creates the hidden cart on loading
 */
function printCart() {
  let cart = createElementWithData("Cart is empty!", "cart");
}

/** Prints the shopping list with products from server
 * @param {Json} products
 */
function printProductsList(products) {
  let shop = document.querySelector("#productsShop");
  shop.innerHTML = "";
  products.forEach((item) => {
    let productDiv = createElementWithData(
      item.product,
      item.id,
      "div",
      "#productsShop"
    );
    productDiv.className = "product 1";
  });
}

/** Removes item from cart and from server
 * @param {*} event Event who sets the listener
 */
function removeItem(event) {
  if (event.target.tagName !== "TD") return;
  let itemRemove = event.target.parentElement;
  let itemProductName = itemRemove.id;
  itemRemove.remove();
  console.log(event.target.id);
  shoppingList.forEach((item) => {
    if (item.product === itemProductName) {
      shoppingList.splice(shoppingList.indexOf(item), 1);
    }
  });
}

/** Uses query to find an element and adds an event listener to it
 * @param {string} element the item to find in the HTML page
 * @param {function} callback function to use as callback in the event listener
 * @param {string} type of event to listen to
 */
function myQueryAndEventListener(element, callback, type = "click") {
  let itemAddEvent = document.querySelector(element);
  itemAddEvent.addEventListener(type, callback);
}

/** Creates element in the html and adds to it innerHTML and id and can choose what type of object and where to place
 * @param {string} data The data to place inside the object
 * @param {string} id The id of the object
 * @param {string} type Type of object' div\span for example
 * @param {string} father Where to append the element
 */
function createElementWithData(
  data = "",
  id = "",
  type = "div",
  father = "body"
) {
  let fatherElement = document.querySelector(father);
  let element = document.createElement(type);
  element.innerHTML = data;
  element.id = id;
  fatherElement.appendChild(element);
  return element;
}

printCart();
getItemsFromServer();
myQueryAndEventListener("#saveCart", saveCart);
myQueryAndEventListener("#shopButton", getProductsList);
myQueryAndEventListener("#cartButton", showCart);
myQueryAndEventListener("#addButton", addProductToShop);
document.addEventListener("click", addProduct);
document.addEventListener("click", removeItem);
