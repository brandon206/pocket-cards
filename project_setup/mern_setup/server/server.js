const express = require('express');
const mysql = require ('mysql');
const app = express();
// const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
        'host': 'localhost',
        'user': 'root',
        'password': 'root',
        'database': 'pocketcards',
        'port': 3306,
        insecureAuth: true
    });


db.connect((err) => {
    if (err) throw err;

    console.log('Database Connected');

});

// module.exports = db;


//middleware 
app.use(express.static(resolve(__dirname,'client','dist')));
app.use(express.json());
app.use(express.urlendcoded({extended: false}));


//Endpoints 

//get avatar & username from users
app.get('api/:userID/userhome', (req, res, next) => {
    let { userID } = req.params;
    let query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
    let inserts = ['displayName', 'avatar', 'users', 'ID', userID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);
    
    db.query(sql, (err, results, fields) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });
});


app.get('/api/:userID/userhome', (req, res) => {
    let { userID } = req.params;
    //get category from sets
    let query = 'SELECT ?? FROM ?? WHERE ?? = ?';
    let inserts = ['category', 'sets', 'userID', userID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });
});


//post category
app.post('/api/:userID/input_category', (req, res, next)=>{
    const { userID } = req.body;
    let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?)';
    let inserts = ['sets', 'userID', 'category', userID, category];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });
});


//post sub category
app.post('/api/:setID/input_category',(req, res)=>{
    const { setID } = req.body;
    let query = 'INSERT INTO ??(??, ??) VALUES (?, ?)';
    let inserts = ['topics', 'setID', 'subCategory', setID, category];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });

});


//post to front cards and back
app.post('/api/:topicID/create_card', (req, res)=>{
    const { topicID } = req.body;
    let query = 'INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)';
    let inserts = ['cards', 'topicID', 'frontText', 'backText', topicID, frontText, backText];
    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });


});

app.get('/api/:topicID/card', (req, res)=>{
    const { topicID } = req.params;
    //get card front and back
    let query = 'SELECT * FROM ?? WHERE ??= ?';
    let inserts = ['cards', 'topicID', topicID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });
});


//update front of car
app.patch('/api/:topicID/update_card_front', (req, res)=>{
    const { topicID } = req.params;
    
    let query = 'UPDATE ?? SET ??=? WHERE ??= ?';
    let inserts = ['cards', 'frontText', frontText, 'topicID', topicID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });

});

//update back of card
app.patch('api/:topicID/update_card_back', (req, res)=>{
    const { topicID } = req.params;
    let query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
    let inserts = ['cards', 'backText', backText, 'topicID', topicID]

    console.log("This is the formated SQL", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });

});

//get category from sets
app.get('/api/:userID/set_managing', (req, res, next)=> {
    const { userID } = req.params;
    let query = 'SELECT ?? FROM ?? WHERE ?? = ?';
    let inserts = ['category', 'sets', 'userID', userID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formatted sql", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });

});

app.get('/api/:setID/set_managing', (req, res)=> {
    const { setID } = req.params;
    //get sub category from topics
    let query = 'SELECT ?? FROM ?? WHERE ?? = ?';
    let inserts = ['subCategory', 'topics', 'setID', setID];

    let sql = mysql.format(query, inserts);

    console.log("This is the formatted sql", sql);

    //error handling
    db.query(sql, (err, results, fields)=>{
        if(err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });

});

// app.delete('/api/set_managing', (req, res)=>{
//     //delete functionality for cards

// });

// add routes to express app
routes(app);

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log("I'm listening to your ginger soul");
});