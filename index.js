const express = require("express");
const app = express();
app.use(express.json());

const MyList = [
        {id: "1", productName: "milk"},
        {id: "2", productName: "bread"},
        {id: "3", productName:"cheese"},
        {id: "4", productName: "water"},
        {id: "5", productName: "oil"}
    ];

app.get("/products", (req, res) => {
    res.send(MyList);
  });

app.get("/products/:productId", (req, res) => {
      MyList.forEach( (item) => {
           if (item.id === req.params.productId) {
              res.send(item.productName);
          }
      });
  });

  app.post("/products", (req, res) => {
      MyList.push(req.body);             
    res.send(req.body);
  });

  app.put("/products/:productId", (req, res) => {
    MyList.forEach((item) => {
        if (item.id === req.params.productId) {
           MyList.splice(MyList.indexOf(item),1,req.body)
           res.send(MyList);
       }
   });
});



app.delete("/products/:productId", (req, res) => {
    MyList.forEach((item) => {
        if (item.id === req.params.productId) {
           MyList.splice(MyList.indexOf(item),1);
           res.send(MyList);
       } 
   });
});



app.listen(3000);

















































