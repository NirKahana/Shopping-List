const express = require("express");
const app = express();
app.use(express.json());

let counter = 0;
const MyList = [

    ];

app.get("/products", (req, res) => {
    res.send(MyList);
  });

app.get("/products/:productId", (req, res) => {

        MyList.forEach( (item) => {
            if (item.id ===  parseInt(req.params.productId)) {
                console.log("condition is true");
                // console.log(typeof MyList[0].id);
               res.send(item);
           }
       });
  });

  app.post("/products", (req, res) => {
      //
    //   let uniqueID = checkTheList();
      //
      counter++;
      req.body.id = counter;
      console.log(req.body.id);
      MyList.push(req.body);             
    res.send(req.body);
  });

  app.put("/products/:productId", (req, res) => {
    MyList.forEach((item) => {
        if (item.id === parseInt(req.params.productId)) {
           MyList.splice(MyList.indexOf(item),1,req.body)
           res.send(MyList);
       }
   });
});



app.delete("/products/:productId", (req, res) => {
    MyList.forEach((item) => {
        if (item.id === parseInt(req.params.productId)) {
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







    
    













































