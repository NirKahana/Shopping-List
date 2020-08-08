const express = require("express");
const app = express();
app.use(express.json());

const MyList = [
        {id: "1", productName: "milk" , firm:"tara"},
        {id: "2", productName: "bread", firm:"bernan"},
        {id: "3", productName:"cheese", firm:"tnuva"},
        {id: "4", productName: "water", firm:"tara"},
        {id: "5", productName: "oil", firm:"tara"}
    ];

app.get("/products", (req, res) => {
    res.send(MyList);
  });

app.get("/products/:productId", (req, res) => {
      MyList.forEach( (item) => {
           if (item.id === req.params.productId) {
              res.send(item);
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

app.delete("/products/", (req, res) => {
    if (MyList.length > 0) {
        MyList.splice(0,MyList.length); 
    res.send(MyList);
    } else {
    res.send("The list is empty");
    }
});



app.listen(3000);

















































