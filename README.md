# Shopping-list fullstack app
 
## backend
- a GET request to / returns HTML file
- a GET request to /shop sends the product list array
- a GET request to /products returns a list of products object from a static array
- a GET request to /products/{id} returns the details of product {id} from the static array
- a POST request to /products saves the cart array in the static array and return the newly saved the cart array
- a POST request to /new adds new item to the product list
- a PUT request to /products/{id} get in the body params updated product object, update product object and return the updated product
- a DELETE request to /products/{id} delete a product from the static array

## frontend
- shop who loads products list from the server and let the customer add to the cart by clicking the item
- cart who loads saved cart from server and can be hidden or visible by pressing cart button
- save button which saves the cart to server
- input to add new items to the products list, saved in server
