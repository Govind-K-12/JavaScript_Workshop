/*
const express = require('express');

const app = express();

app.get("/date",(request,response)=>{
    const date = new Date();
    response.send("Hi how are you!");
});

app.listen(3005);
*/
const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname,"goodreads.db");

let db = null;
const initializeServerAndDb = async(req,res)=>{
    try {
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(3005,()=>{
            console.log("server started")
        });
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}
initializeServerAndDb();
app.get("/books",async(req,res)=>{
    const getBookQuery = ` select * FROM book order by book_id `;

    const booksArray = await db.all(getBookQuery);
    res.send(booksArray);
})

app.get("/books/:book_id",async(req,res)=>{
    const booksID = select book_id from book;
    const getBookID = await db.all(booksID);
});
