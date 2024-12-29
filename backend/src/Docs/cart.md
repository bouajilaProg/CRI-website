**GET**
1. **Get all orders**  
   - **Path:** `/all`  
   - **Method:** GET  

2. **Get current orders for a user**  
   - **Path:** `/current`  
   - **Method:** GET  

3. **Get order quantity for a specific material from a specific order**  
   - **Path:** `/orderItem`  
   - **Method:** GET  

4. **Get material list from a specific order (cart)**  
   - **Path:** `/cart/list/:cartId`  
   - **Method:** GET  

5. **Get orders for a specific user**  
   - **Path:** `/:user`  
   - **Method:** GET  

6. **Get all orders for a specific user**  
   - **Path:** `/user/:userid`  
   - **Method:** GET  

**POST**
1. **Create a new order**  
   - **Path:** `/new`  
   - **Method:** POST  

2. **Add materials to an order**  
   - **Path:** `/add`  
   - **Method:** POST  

**PUT**
1. **Update material quantity in an order**  
   - **Path:** `/update`  
   - **Method:** PUT  

2. **Send an order**  
   - **Path:** `/send`  
   - **Method:** PUT  

3. **Change the state of an order (admin)**  
   - **Path:** `/admin`  
   - **Method:** PUT  

**DELETE**
1. **Delete material from an order**  
   - **Path:** `/delete/:orderid/:materielid`  
   - **Method:** DELETE  

2. **Delete an order**  
   - **Path:** `/delete/:orderid`  
   - **Method:** DELETE  
