const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express ();
app.use(cors());
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

app.get('/getVegetableList', async (req, res) => {
    // const userSchema = new mongoose.Schema({
    //     id: Object,
    //     name: String,
    //     address: String,
    //     rollNo: Number,
    //     author: String
    // })
    // const newUserData = mongoose.model('Users', userSchema);
    // const result = await newUserData.find({});
    const result = [{
        vegeName: "Mango",
        price: 200
    },
    {
        vegeName: "Palak",
        price: 10
    },
    {
        vegeName: "Paneer",
        price: 15
    },
    {
        vegeName: "Peas",
        price: 22
    },
    {
        vegeName: "Drumstick",
        price: 27
    },
    {
        vegeName: "Coriander",
        price: 5
    },
    {
        vegeName: "Methi",
        price: 30
    },
    {
        vegeName: "Pineapple",
        price: 40
    },
    {
        vegeName: "Matki",
        price: 20
    },
    {
        vegeName: "Matar",
        price: 30
    }
]

    let status = {
        data: result,
        code:200
    };
    console.log("userList", result)
    res.send(status)
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


app.post("/populationInfo", async (request, response) => {
    const body = request.body;
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        }, 
        gender: String,
        age: Number,
        religion: String,
        caste: String,
        maritalStatus: String,
        language: String,
        address: String,
        city: String,
        pincode: Number,
        dist: String,
        state: String,
        country: String,
        housingType: String,
        phoneNo: Number,
        highestEducation: String,
        schoolCollegeName: String,
        occupation: String,
        partTimeFullTime: String,
        comapany: String,
        annualIncome: Number,
        medicalCondition: String,
        noOfFamilyMembers: String,
        familyIncome: Number,
        annualIncomeOfFamily: Number,
        voterId: Number,
        rationCard: Number,
        panCard: Number,
        aadharCard: Number,
        nameOfOfficer: String,
        date: Date,
    })

    var newElectionInfoData;

    if (mongoose.models.ElectionInfo) {
        newElectionInfoData =  mongoose.model('ElectionInfo');
    } else {
        newElectionInfoData =  mongoose.model('ElectionInfo', userSchema);
    }
    
    // const newElectionInfoData = new mongoose.model('ElectionInfo', userSchema)

    // const newUser = new newUserData({
    //     name: body.name,
    //     address: body.address,
    //     rollNo: body.rollNo,
    //     author: body.author
    // })

    const newElectionInfo = new newElectionInfoData({
        name: body.personalInfo.name,
        gender: body.personalInfo.gender,
        age: body.personalInfo.age,
        religion: body.personalInfo.religion,
        caste: body.personalInfo.caste,
        maritalStatus: body.personalInfo.maritalStatus,
        language: body.personalInfo.language,
        address: body.contactDetails.address,
        city: body.contactDetails.city,
        pincode: body.contactDetails.pincode,
        dist: body.contactDetails.dist,
        state: body.contactDetails.state,
        country: body.contactDetails.country,
        housingType: body.contactDetails.housingType,
        phoneNo: body.contactDetails.phoneNo,
        highestEducation: body.educational.highestEducation,
        schoolCollegeName: body.educational.schoolCollegeName,
        occupation: body.occupational.occupation,
        partTimeFullTime: body.occupational.partTimeFullTime,
        company: body.occupational.company,
        annualIncome: body.occupational.annualIncome,
        medicalCondition: body.health.medicalCondition,
        noOfFamilyMembers: body.family.noOfFamilyMembers,
        familyIncome: body.family.familyIncome,
        annualIncomeOfFamily: body.family.annualIncomeOfFamily,
        voterId: body.voterId,
        rationCard: body.rationCard,
        panCard: body.panCard,
        aadharCard: body.aadharCard,
        nameOfOfficer: body.nameOfOfficer,
        date: body.date,
    })

    let status = '';
    await newElectionInfo.save().then(() => {
        status = {
            message: "Election Info Added Successfully",
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


app.get('/getPopulationInfo', async (req, res) => {
    const userSchema = new mongoose.Schema({
        id: Object,
        gender: String,
        age: Number,
        religion: String,
        caste: String,
        maritalStatus: String,
        language: String,
        address: String,
        city: String,
        pincode: Number,
        dist: String,
        state: String,
        country: String,
        housingType: String,
        phoneNo: Number,
        highestEducation: String,
        schoolCollegeName: String,
        occupation: String,
        partTimeFullTime: String,
        comapany: String,
        annualIncome: Number,
        medicalCondition: String,
        noOfFamilyMembers: String,
        familyIncome: Number,
        annualIncomeOfFamily: Number,
        voterId: Number,
        rationCard: Number,
        panCard: Number,
        aadharCard: Number,
        nameOfOfficer: String,
        date: Date
    })
    var electionList;

if (mongoose.models.ElectionInfo) {
    electionList =  mongoose.model('ElectionInfo');
} else {
    electionList =  mongoose.model('ElectionInfo', userSchema);
}
    // const electionList = mongoose.model('ElectionInfo', userSchema);
    const result = await electionList.find({});

    let status = {
        data: result,
        code:200
    };
    console.log("electionList", result)
    res.send(status)
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

const a = {
    personalInfo: {
        "name": "Kiran",
        "gender": "Male",
        "age": 20,
        "religion": "hindu",
        "caste": "maratha",
        "maritalStatus": "married",
        "language": "marathi",
    },
    contactDetails: {
        address: "UK",
        city: "Pune",
        pincode:412202,
        dist: "Pune",
        state: "Pune",
        country: "Pune",
        housingType: "Pune",
        phoneNo: "Pune",
    },
    education: {
        highestEducation: "Pune",
        schoolCollegeName: "Pune",
    },
    occupational: {
        occupation: "Pune",
        partTimeFullTime: "Pune",
        company: "Pune",
        annualIncome: 1200,
    },
    health: {
        "medicalCondition": "good",
    },
    family: {
        "noOfFamilyMembers": 5,
        "familyIncome": 10000,
        "annualIncomeOfFamily": 50000
    },
   "voterId": 123,
    "rationCard": 456,
    "panCard": 123,
    "aadharCard": 123,
    "nameOfOfficer": "XYZ",
    "date": 12/12/2023
}