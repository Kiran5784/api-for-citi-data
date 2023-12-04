const express = require('express');
const mongoose = require('mongoose');

const app = express ();
app.use(express.json());

const port = 3000;


app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});


mongoose.connect('mongodb://localhost:27017/Citi')
.then(()=>{
        console.log("Database connection is Ready "
        + "and Server is Listening on Port ", port);

})
.catch((err)=>{
    
    console.log("A error has been occurred while"
        + " connecting to database.");   
    throw err;
})

app.post("/status", async (request, response) => {
    const body = request.body;
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        }, 
        address: String,
        rollNo: Number,
        author: String
    })
    
    const newUserData = new mongoose.model('Users', userSchema)

    const newUser = new newUserData({
        name: body.name,
        address: body.address,
        rollNo: body.rollNo,
        author: body.author
    })

    let status = '';
    await newUser.save().then(() => {
        status = {
            message: "User Added Successfully",
            code:200
        };
            console.log("Saved Successfully");
    }, error => {
        status = error;
    });

    if (status) {
        response.send(status);
    } else {
        throw status;
    }

});

app.get('/usersList', async (req, res) => {
    const userSchema = new mongoose.Schema({
        id: Object,
        name: String,
        address: String,
        rollNo: Number,
        author: String
    })
    const newUserData = mongoose.model('Users', userSchema);
    const result = await newUserData.find({});

    let status = {
        data: result,
        code:200
    };
    console.log("userList", result)
    res.send(status)
});

app.delete('/deleteUser/:id', async (req, res) => {
    console.log("req", req.params.id)
    // const id= req.params.id;
    const userSchema = new mongoose.Schema({
        id: Object,
        name: String,
        address: String,
        rollNo: Number,
        author: String
    })
    const newUserData = mongoose.model('Users', userSchema);
    const result = await newUserData.remove({ id: { '$oid' :'656cb4cc7f31260d0919d99f'} });
    console.log("result", result)

    // let status = {
    //     data: result,
    //     code:200
    // };
    // console.log("userList", result)
    // res.send(status)
});


    


// app.get("/status", (request, response) => {
//     // console.log(request)
//     const status = {
//        "Status": "Running",
//        "code":200
//     };
    
//     response.send(status);
// });

// // app.post('/create', insertController.createData);

// app.get("/signup1", (request, response) => {
//     mongoose.connect('mongodb://localhost:27017/citi')
//     .then((database)=>{
//         console.log("Database connection is Ready "
//         + "and Server is Listening on Port ", port);
//     // console.log(database.collection)
//         // var myobj = { name: "Company Inc", address: "Highway 37" };
//         // database.collection("customers").insertOne(myobj, function(err, res) {
//         //     if (err) throw err;
//         //     console.log("1 document inserted");
//         //     db.close();
//         // });
//     });

// });

// app.get("/signup", (request, response) => {
//     // mongoose.connect('mongodb://localhost:27017/citi')
//     // .then((database)=>{
//     //         console.log("Database connection is Ready "
//     //         + "and Server is Listening on Port ", port);
//     //     console.log(database)
//     //     // var dbo = database.db("Citi");
//     //     var myobj = { name: "Company Inc", address: "Highway 37" };
//     //     database.collection("customers").insertOne(myobj, function(err, res) {
//     //         if (err) throw err;
//     //         console.log("1 document inserted");
//     //         db.close();
//     //     });

//     //     const status = {
//     //         "Status": "Running",
//     //         "code":200
//     //      };
//     //     response.send(status);
//     // })
//     // .catch((err)=>{
       
//     //     console.log("A error has been occurred while"
//     //         + " connecting to database.");   
//     //     throw err;
//     // })
  
// });