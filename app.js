const express = require("express");
const {connectToMongoDB} = require('./mongo');


const app = express();

app.use(express.json());

async function startServer() {
    try {
        const db =  await connectToMongoDB();
        app.locals.db=db;
        app.listen(3000, () =>{
        console.log("The server has started on port 3000");
        })
    } catch (error) {
        console.log("There is a connection issue");
        throw error;
    }
}

app.get('/api', async (req,res)=>{
    try {
       
        const books = await app.locals.db.collection('books').find().sort({nameOfBook:-1}).toArray();
        res.json(books);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
} );

app.post('/api' , async (req,res)=>{
    try {
        const book = req.body;
        const db = await connectToMongoDB();
        const addedBook = await app.locals.db.collection('books').insertOne(book);
        res.json(addedBook);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "There is a adding problem on server" });
    }
   
})

app.get('/', (req,res)=>{
    res.json({mesaj: "it's working"});
} )

startServer();