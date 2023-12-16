const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;
const initializeServerAndDb = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3005, () => {
            console.log("Server started on http://localhost:3005");
        });
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};
initializeServerAndDb();

app.get("/books", async (req, res) => {
    const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;

    try {
        const booksArray = await db.all(getBooksQuery);
        res.send(booksArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/books/:book_id", async (req, res) => {
    const bookId = req.params.book_id;
    const getBookByIdQuery = `SELECT * FROM book WHERE book_id = ?`;

    try {
        const book = await db.get(getBookByIdQuery, [bookId]);

        if (book) {
            res.send(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/authors", async (req, res) => {
    const getAuthorsQuery = `SELECT * FROM author ORDER BY author_id`;

    try {
        const authorsArray = await db.all(getAuthorsQuery);
        res.send(authorsArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/authors/:author_id", async (req, res) => {
    const authorId = req.params.author_id;
    const getAuthorByIdQuery = `SELECT * FROM author WHERE author_id = ?`;
    try {
        const author = await db.get(getAuthorByIdQuery, [authorId])
        if (author) {
            res.send(author);
        } else {
            res.status(404).send("Author not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
