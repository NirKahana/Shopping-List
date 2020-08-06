const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/src`));
app.use(logger);

let requestID = 0;

function logger(req, res, next) {
  requestID++;
  console.log(`Request fired: ${req.url} 
Method: ${req.method}
Request #${requestID}
`);
  next();
}

const MyList = [
  { id: "1", product: "milk" },
  { id: "2", product: "bread" },
  { id: "3", product: "cheese" },
  { id: "4", product: "water" },
  { id: "5", product: "oil" },
];

let shoppingList = [];

// Home entry point, loads HTML
app.get("/", (req, res) => {
  console.log("Welcome to my shopping list app!");
  res.sendFile("src/index.html");
});

// Sends the product list
app.get("/shop", (req, res) => {
  res.send(MyList);
});

// Sends customer's added items list
app.get("/products", (req, res) => {
  res.send(shoppingList);
});

app.get("/products/:productId", (req, res) => {
  MyList.forEach((item) => {
    if (item.id === req.params.productId) {
      res.send(item);
    }
  });
});

// Saves customers cart (added items) in the server
app.post("/products", (req, res) => {
  shoppingList = [];
  if (req.body.length > 1) {
    req.body.forEach((productToInsert) => {
      shoppingList.push(productToInsert);
    });
  } else {
    shoppingList.push(req.body);
  }
  res.send(shoppingList);
});

// Adding new item to the product list
app.post("/new", (req, res) => {
  if (req.body.length > 1) {
    req.body.forEach((productToAdd) => {
      MyList.push(productToAdd);
    });
  } else {
    MyList.push(req.body);
  }
  res.send(MyList);
});

app.put("/products/:productId", (req, res) => {
  MyList.forEach((item) => {
    if (item.id === req.params.productId) {
      MyList.splice(MyList.indexOf(item), 1, req.body);
      res.send(MyList);
    }
  });
});

app.delete("/products/:productId", (req, res) => {
  MyList.forEach((item) => {
    if (item.id === req.params.productId) {
      MyList.splice(MyList.indexOf(item), 1);
      res.send(MyList);
    }
  });
});

app.listen(3000, () => console.log("Listening to customer on port #3000!"));
