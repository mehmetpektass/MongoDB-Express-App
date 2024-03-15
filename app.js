const express = require("express");
const connectToMongoDB = require('./connection');
const { db } = require('./connection');


const app = express();

function handleException(res,error){
    console.error("Error: ", error);
    res.status(500).send({ error: 'Internal Server Error!' });
}

(async () =>{
    try {
        await connectToMongoDB();
        app.listen(3000, () =>{
        console.log("The server has started on port 3000");
        })
    } catch (error) {
        console.log("There is a connection issue");
        throw error;
    }
   
})

app.get('/api', async (req,res)=>{
    try {
        const books = await db.collection('books').find().sort({nameOfBook:-1})
        res.json(books);
    } catch (error) {
       handleException(res,error);
    }
} )

app.get('/', (req,res)=>{
    res.json({mesaj: "it's working"});
} )

