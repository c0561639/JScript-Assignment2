Requirements Missed:
    Hey Terry! I know the app is intended to be a "User" based CRUD app, however if you remember I accidently did it as a book catalog (oops I didn't read the instructions!). Since I already had the app created, and you said in the instructions that we could use our exisitng EXPRESS app, I made the assumption that it would be alright if I continued with it being a Book Catalog. Hopefully this is acceptable.

    - Web Page should have 3 pages
        - I actually made the entire form interactable and all functional on 1 single page. I know this goes against your requirements, but I wanted to learn & create a modern functional app that was a pleasent user experience. I do meet the criteria that the 3 pages would've had, just condensed into 1 page.

Planning:
    - Use exisitng EXPRESS app (BOOK CATALOG) and extend it to function with REACT
    - Reorganize file structure for simplicity & REACT compatibility
    - Create REACT app (npx create-react-app frontend)
    - Allow REACT to talk to EXPRESS (server.js)
    - Install & Configure CORS
    - Create service file to call API (api.js)
    - Swap BACKEND port to 5000, and set FRONTEND port to 3000 (Common practice)
    - Create REACT UI/UX 
        - Copy original Book Catalog design
        - Import Bootstrap
        - Port REACT functionality to original design
        - Create Interactive UI/UX
        - Re-Add client side validation
            - Realized I need a Try/Catch in BookController to prevent backend crashing
        - Swap Bootstrap table into AG-GRID REACT table
            - Re-Style AG Table with CSS to closely match layout
    - Import tons of Book Data (booklist.json)

Usage:
    Ensure MongoDB Compass is installed
    The following packages are required for this app to work..
    - Express
    - Mongoose
    - Dotenv
    - Bootstrap
    - cors
    - react

    I've included a booklist.json that can be easily imported into MongoDB Compass as well.

    Connect to MongoDB 
        URI: mongodb://localhost:27017

    Start Program
        1. Open console for backend
            - Type "npm start"
        2. Open console for frontend
            - Type "npm start"

    Add a Book
        1. Click – “Add New Book” button
        2. Enter Title
        3. Enter Author
        4. Enter Year
        5. Click – “Add” button

    Update a book
        1. Click the “Edit” button beside the book you would like to edit
        2. Update the information you would like updated
        3. Click – “Update” button

    Delete a book
        1. Click the “Delete” button beside the book you would like to delete

    Filter the List of Books
        1. Enter query into “Search Bar” (Title name, Author Name, or Year)