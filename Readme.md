API Endpoints POST /menu - Add or Update Menu Item URL: http://localhost:5000/menu

Request Body (Raw JSON):

{ "id": "1", "name": "Pizza", "price": 100, "category": "fast food" } Expected Response :

json { "message": "menu item added" }

GET /menu - Retrieve All Menu Items URL: http://localhost:5000/menu

Expected Response:

json [ { "id": "1", "name": "Pizza", "price": 100, "category": "fast food" } ]

POST /order - Place an Order URL: http://localhost:5000/order

Request Body (Raw JSON):

{ "items": ["1"] } Expected Response:

{ "id": "1", "items": [ "1" ], "status": "Preparing"  }

 Expected Response (Error: Invalid Item):

{ "error": "Item with ID '5' does not exist." }

Fetch Order Details URL: http://localhost:5000/order/:id (Replace {:id} with your actual order ID)

Method: GET

{ "id": "1", "items": [ "1" ], "status": "Out for Delivery", } 
Expected Response (Error: Order Not Found):

{ "error": "Order not found." }