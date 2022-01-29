const express = require('express');
const mySql = require('mySql');
const nodemon = require('nodemon');

//create connection
const db = mySql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'nodemysql'
    }
);

//connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("mySql connected...");
});

const app = express();

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

//Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    })
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'INSERT INTO posts SET ? ';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post 2 added...');
    })
})

// Select posts
// app.get('/getposts', (req, res) => {
//     let sql = 'SELECT * FROM posts';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.send('posts fetched...');
//     })
// })

// // Select single post
// app.get('/getpost/:id', (req, res) => {
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post fetched...');
//     })
// })

// // Update single post
// app.get('/updatepost/:id', (req, res) => {
//     let newTitle = 'Updated Post One';
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post Updated...');
//     })
// })

// Delete post
// app.get('/deletepost/:id', (req, res) => {
//     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post Deleted...');
//     })
// })

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
  