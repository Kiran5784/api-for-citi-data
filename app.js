const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const e = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});

mongoose
  .connect("mongodb://localhost:27017/Citi")
  .then(() => {
    console.log(
      "Database connection is Ready " + "and Server is Listening on Port ",
      port
    );
  })
  .catch((err) => {
    console.log("A error has been occurred while" + " connecting to database.");
    throw err;
  });

app.post("/status", async (request, response) => {
  const body = request.body;
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: String,
    rollNo: Number,
    author: String,
  });

  const newUserData = new mongoose.model("Users", userSchema);

  const newUser = new newUserData({
    name: body.name,
    address: body.address,
    rollNo: body.rollNo,
    author: body.author,
  });

  let status = "";
  await newUser.save().then(
    () => {
      status = {
        message: "User Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.get("/getVegetableList", async (req, res) => {
  // const userSchema = new mongoose.Schema({
  //     id: Object,
  //     name: String,
  //     address: String,
  //     rollNo: Number,
  //     author: String
  // })
  // const newUserData = mongoose.model('Users', userSchema);
  // const result = await newUserData.find({});
  const result = [
    {
      vegeName: "Mango",
      price: 200,
    },
    {
      vegeName: "Palak",
      price: 10,
    },
    {
      vegeName: "Paneer",
      price: 15,
    },
    {
      vegeName: "Peas",
      price: 22,
    },
    {
      vegeName: "Drumstick",
      price: 27,
    },
    {
      vegeName: "Coriander",
      price: 5,
    },
    {
      vegeName: "Methi",
      price: 30,
    },
    {
      vegeName: "Pineapple",
      price: 40,
    },
    {
      vegeName: "Matki",
      price: 20,
    },
    {
      vegeName: "Matar",
      price: 30,
    },
  ];

  let status = {
    data: result,
    code: 200,
  };
  console.log("userList", result);
  res.send(status);
});

app.post("/login", async (req, res) => {
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirmPassword: String,
    emailId: String,
    gender: String,
    type: String,
  });
  // const newUserData = mongoose.model("Users", userSchema);
  var allUsers;

  if (mongoose.models.userInfos) {
    allUsers = mongoose.model("userInfos");
  } else {
    allUsers = new mongoose.model("userInfos", userSchema);
  }

  const result = await allUsers.find({});
  console.log(result);
  isLoggedIn = false;
  console.log(req.body);
  if (result.length > 0) {
    result.forEach((item) => {
      if (
        item.username == req.body.username &&
        item.password == req.body.password
      ) {
        isLoggedIn = true;
        type = item.type;
      }
    });
  }

  let status;
  if (isLoggedIn) {
    if (type == "admin") {
      status = {
        data: "Logged In succesful",
        token: "This is your tempory token that you can use for login",
        type: type,
        code: 200,
      };
    } else if (type == "user") {
      status = {
        data: "Logged In succesfully",
        token: "This is your tempory token that you can use for login",
        type: type,
        code: 200,
      };
    }
  } else {
    status = {
      data: "Invalid Username or Password!",
      code: 400,
    };
  }
  res.send(status);
});

app.delete("/deleteUser/:id", async (req, res) => {
  console.log("req", req.params.id);
  // const id= req.params.id;
  const userSchema = new mongoose.Schema({
    id: Object,
    name: String,
    address: String,
    rollNo: Number,
    author: String,
  });
  const newUserData = mongoose.model("Users", userSchema);
  const result = await newUserData.remove({
    id: { $oid: "656cb4cc7f31260d0919d99f" },
  });
  console.log("result", result);

  // let status = {
  //     data: result,
  //     code:200
  // };
  // console.log("userList", result)
  // res.send(status)
});

app.post("/addToWishList", async (request, response) => {
  const body = request.body;
  const wishListSchema = new mongoose.Schema({
    carId: String,
  });

  var wishListData;

  if (mongoose.models.wishList) {
    wishListData = mongoose.model("wishList");
  } else {
    wishListData = mongoose.model("wishList", wishListSchema);
  }

  const newWistList = new wishListData({
    carId: body.carId,
  });

  let status = "";
  await newWistList.save().then(
    () => {
      status = {
        message: "Car Added To WishList",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});
app.get("/getAllWishList", async (request, response) => {
  const body = request.body;
  const wishListSchema = new mongoose.Schema({
    carId: String,
  });

  var wishListData;

  if (mongoose.models.wishList) {
    wishListData = mongoose.model("wishList");
  } else {
    wishListData = mongoose.model("wishList", wishListSchema);
  }

  const result = await wishListData.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("wishList", result);
  response.send(status);
});

app.delete("/deleteWisBookedCard", async (request, response) => {
  const id = request.params.id;
  const couponSchema = new mongoose.Schema({
    carId: String,
  });

  var wishListData;

  if (mongoose.models.wishList) {
    wishListData = mongoose.model("wishList");
  } else {
    wishListData = mongoose.model("wishList", couponSchema);
  }

  await wishListData.deleteOne({ _id: id }).then(
    () => {
      status = {
        message: "Item Deeleted fro wishList successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.post("/createCoupon", async (request, response) => {
  const body = request.body;
  const couponSchema = new mongoose.Schema({
    couponCode: String,
    couponPercentage: Number,
  });

  var counponData;

  if (mongoose.models.couponCode) {
    counponData = mongoose.model("couponCode");
  } else {
    counponData = mongoose.model("couponCode", couponSchema);
  }

  const newCoupon = new counponData({
    couponCode: body.couponCode,
    couponPercentage: body.discount,
  });

  let status = "";
  await newCoupon.save().then(
    () => {
      status = {
        message: "Coupon Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.post("/bookedCarList", async (request, response) => {
  const body = request.body;
  const bookedCarSchema = new mongoose.Schema({
    carId: String,
  });

  var bookedCarData;

  if (mongoose.models.bookedCar) {
    bookedCarData = mongoose.model("bookedCar");
  } else {
    bookedCarData = mongoose.model("bookedCar", bookedCarSchema);
  }

  const bookedCarList = new bookedCarData({
    carId: body.carId,
  });

  let status = "";
  await bookedCarList.save().then(
    () => {
      status = {
        message: "Car Booked Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.delete("/deleteBookedCar/:id", async (request, response) => {
  const id = request.params.id;
  const bookedCarSchema = new mongoose.Schema({
    carId: String,
  });

  var bookedCarData;

  if (mongoose.models.bookedCar) {
    bookedCarData = mongoose.model("bookedCar");
  } else {
    bookedCarData = mongoose.model("bookedCar", bookedCarSchema);
  }

  await bookedCarData.deleteOne({ _id: id }).then(
    () => {
      status = {
        message: "Booked Car deleted successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.get("/getAllBookedCar", async (request, response) => {
  const body = request.body;
  const boookedCarSchema = new mongoose.Schema({
    carId: String,
  });

  var bookedCarData;

  if (mongoose.models.bookedCar) {
    bookedCarData = mongoose.model("bookedCar");
  } else {
    bookedCarData = mongoose.model("bookedCar", boookedCarSchema);
  }

  const result = await bookedCarData.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("wishList", result);
  response.send(status);
});

app.post("/populationInfo", async (request, response) => {
  const body = request.body;
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
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
  });

  var newElectionInfoData;

  if (mongoose.models.ElectionInfo) {
    newElectionInfoData = mongoose.model("ElectionInfo");
  } else {
    newElectionInfoData = mongoose.model("ElectionInfo", userSchema);
  }

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
  });

  let status = "";
  await newElectionInfo.save().then(
    () => {
      status = {
        message: "Election Info Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.get("/getAllCoupons", async (request, response) => {
  const body = request.body;
  const couponSchema = new mongoose.Schema({
    couponCode: String,
    couponPercentage: Number,
  });

  var counponData;

  if (mongoose.models.couponCode) {
    counponData = mongoose.model("couponCode");
  } else {
    counponData = mongoose.model("couponCode", couponSchema);
  }

  const result = await counponData.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("electionList", result);
  response.send(status);
});

app.delete("/deleteCoupons/:id", async (request, response) => {
  const id = request.params.id;
  const couponSchema = new mongoose.Schema({
    couponCode: String,
    couponPercentage: Number,
  });

  var counponData;

  if (mongoose.models.couponCode) {
    counponData = mongoose.model("couponCode");
  } else {
    counponData = mongoose.model("couponCode", couponSchema);
  }

  await counponData.deleteOne({ _id: id }).then(
    () => {
      status = {
        message: "Coupon Deeleted successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.post("/redemCouponCode", async (request, response) => {
  const body = request.body;
  const couponSchema = new mongoose.Schema({
    couponCode: String,
    couponPercentage: Number,
  });

  var counponData;

  if (mongoose.models.couponCode) {
    counponData = mongoose.model("couponCode");
  } else {
    counponData = mongoose.model("couponCode", couponSchema);
  }

  const result = await counponData.find({});
  let redemPercentage = 0;
  result.forEach((item) => {
    if (item.couponCode == request.body.couponCode) {
      redemPercentage = item.couponPercentage;
    }
  });
  let status;
  if (redemPercentage > 0) {
    status = {
      data: {
        message: "Coupon Redem successfully",
        discount: redemPercentage,
      },
      code: 200,
    };
  } else {
    status = {
      data: {
        message: "Coupon Redem Failed no discount applicable",
        discount: 0,
      },
      code: 200,
    };
  }
  response.send(status);
});
app.get("/getPopulationInfo", async (req, res) => {
  const userSchema = new mongoose.Schema({
    id: Object,
    name: String,
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
    company: String,
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
  });
  var electionList;

  if (mongoose.models.ElectionInfo) {
    electionList = mongoose.model("ElectionInfo");
  } else {
    electionList = mongoose.model("ElectionInfo", userSchema);
  }
  // const electionList = mongoose.model('ElectionInfo', userSchema);
  const result = await electionList.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("electionList", result);
  res.send(status);
});
app.get("/getCarsOptions", async (req, res) => {
  const result = [
    {
      brandList: [
        {
          brand: "MarutiSuzuki",
          models: ["Swift", "Baleno", "Alto", "Dzire", "Ciaz"],
        },
        {
          brand: "Toyota",
          models: ["Corolla", "Camry", "Fortuner", "Innova", "Yaris"],
        },
        { brand: "Kia", models: ["Seltos", "Sonet", "Carnival", "Sportage"] },
        {
          brand: "Hyundai",
          models: ["i20", "Creta", "Venue", "Verna", "Tucson"],
        },
        {
          brand: "Honda",
          models: ["Civic", "Accord", "CR-V", "City", "Amaze"],
        },
        {
          brand: "Tata",
          models: ["Tiago", "Nexon", "Harrier", "Altroz", "Safari"],
        },
        {
          brand: "Mahindra",
          models: ["Scorpio", "XUV500", "Thar", "Bolero", "KUV100"],
        },
        {
          brand: "Ford",
          models: ["EcoSport", "Figo", "Endeavour", "Aspire", "Mustang"],
        },
        { brand: "Renault", models: ["Kwid", "Duster", "Triber", "Captur"] },
        { brand: "Volkswagen", models: ["Polo", "Vento", "Tiguan", "Passat"] },
        {
          brand: "Chevrolet",
          models: ["Cruze", "Beat", "Trailblazer", "Sail"],
        },
        { brand: "Fiat", models: ["Punto", "Linea", "500"] },
      ],
      makeYear: [
        2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
        2011,
      ],
      variants: ["Petrol", "Diesel", "CNG"],
      kmDriven: [
        "0 - 10,000 Km",
        "10,000 - 20,000 km",
        "20,000 - 30,000 Km",
        "30,000 - 40,000 Km",
        "40,000 - 50,000 Km",
        "Above 50,000 km",
      ],
      features: [
        "Infotainment system",
        "Airbags",
        "steering mounted controls",
        "Parking sensors",
        "Alloy wheels",
        "Push button start",
        "Sunroof/moonroof",
      ],
      transmissions: ["manual", "automatic"],
      bodyTypes: ["Hatchback", "Sedan", "suv"],
      colors: [
        "Silver",
        "white",
        "Red",
        "Blue",
        "Brown",
        "Orange",
        "Black",
        "Yellow",
        "Green",
        "Purple",
      ],
      seats: ["4 Seater", "5 Seater", "6 Seater", "7 Seater"],
      owners: ["1st owner", "2nd owner", "3rd owner"],
      states: [
        { state: "Maharashtra", codes: ["MH-12", "MH-14", "MH-01", "MH-13"] },
        { state: "Gujrat", codes: ["GJ-01", "GJ-05", "GJ-06"] },
        { state: "Karnataka", codes: ["Ka-01", "KA-02"] },
        { state: "Punjab", codes: ["PB-01", "PB-02"] },
      ],
    },
  ];
  let status = {
    data: result,
    code: 200,
  };
  console.log("getCarsOptions", result);
  res.send(status);
});
//getFoodsOption
app.get("/getFoodsOption", async (req, res) => {
  const result = [
    {
      menu: [
        {
          category: "veg",
          starter: [
            { name: "Paneer Tikka", price: 100 },
            { name: "Aloo Tikki", price: 80 },
            { name: "Veg Manchurian", price: 90 },
            { name: "Corn Cutlet", price: 90 },
            { name: "Hara Bhara Kebab", price: 90 },
            { name: "Onion Bhaji", price: 90 },
            { name: "Mushroom Tikka", price: 90 },
            { name: "Papdi Chaat", price: 90 },
            { name: "Veg Seekh Kebab", price: 90 },
            { name: "Samosa", price: 90 },
          ],
          mainCourse: [
            { name: "Vegetable Biryani", price: 100 },
            { name: "Palak Paneer", price: 200 },
            { name: "Chole Bhature", price: 100 },
            { name: "Kadai Vegetable", price: 100 },
            { name: "Dal Makhani", price: 120 },
            { name: "Paneer Butter Masala", price: 130 },
            { name: "Veg Kofta Curry", price: 120 },
            { name: "Aloo Gobi", price: 100 },
            { name: "Baingan Bharta", price: 150 },
            { name: "Matar Paneer", price: 100 },
          ],
          dessert: [
            { name: "Gulab Jamun", price: 50 },
            { name: "Rasgulla", price: 60 },
            { name: "Coconut Ladoo", price: 50 },
            { name: "Jalebi", price: 30 },
            { name: "Kheer", price: 60 },
            { name: "Badam Halwa", price: 50 },
            { name: "Rasmalai", price: 50 },
            { name: "Moong Dal Halwa", price: 50 },
            { name: "Shahi Tukda", price: 40 },

            { name: "ladoo", price: 80 },
          ],
        },
        {
          category: "non-veg",
          starter: [
            { name: "Chicken Lollipop", price: 100 },
            { name: "Tandoori Chicken", price: 150 },
            { name: "Butter Garlic Prawns", price: 90 },
            { name: "Chicken Reshmi Kebab", price: 80 },
            { name: "Lamb Chops", price: 70 },
            { name: "Chicken Tikka", price: 100 },
            { name: "Chicken 65", price: 80 },
            { name: "Fish Fry", price: 90 },
            { name: "Egg Pakora", price: 90 },
            { name: "Prawn Tempura", price: 100 },
          ],
          mainCourse: [
            { name: "Chicken Tikka Masala", price: 100 },
            { name: "Fish Curry", price: 90 },
            { name: "Mutton Rogan Josh", price: 100 },
            { name: "Chicken Biryani", price: 120 },
            { name: "Egg Curry", price: 120 },
            { name: "Butter Chicken", price: 110 },
            { name: "Prawn Curry", price: 130 },
            { name: "Chicken Korma", price: 150 },
            { name: "Keema Matar", price: 120 },
            { name: "Lamb Biryani", price: 130 },
          ],
          dessert: [
            { name: "Shahi Tukda", price: 100 },
            { name: "Phirni", price: 100 },
            { name: "Badam Kheer", price: 100 },
            { name: "Lab-e-Shireen", price: 100 },
            { name: "Angoori Rabdi", price: 100 },
            { name: "Mango Kulfi", price: 100 },
            { name: "Falooda", price: 100 },
            { name: "Gulab Phirni", price: 100 },
            { name: "Anjeer Halwa", price: 100 },
          ],
        },
        {
          category: "vegan",
          starter: [
            { name: "Vegan Spring Rolls", price: 100 },
            { name: "Crispy Zucchini Fritters", price: 150 },
            { name: "Stuffed Grape Leaves (Dolma)", price: 70 },
            { name: "Vegan Bruschetta with Tomatoes and Basil", price: 80 },
            { name: "Vegan Buffalo Cauliflower Wings", price: 100 },
            { name: "Guacamole with Tortilla Chips", price: 120 },
            { name: "Vegan Sushi Rolls", price: 140 },
            { name: "Spicy Roasted Chickpeas", price: 80 },

            { name: "Sweet Potato Bites", price: 70 },
            { name: "Vegan Spinach and Artichoke Dip", price: 90 },
          ],
          mainCourse: [
            { name: "Vegan Chickpea Curry", price: 220 },
            { name: "Lentil and Vegetable Stew", price: 230 },
            { name: "Vegan Mushroom Risotto", price: 230 },
            { name: "Quinoa and Vegetable Stir-Fry", price: 230 },
            { name: "Vegan Pad Thai", price: 230 },
            { name: "Roasted Vegetable and Hummus Wrap", price: 230 },
            { name: "Vegan Spaghetti Bolognese", price: 230 },
            { name: "Vegan Chickpea and Spinach Stew", price: 230 },
            { name: "Vegan Eggplant Parmesan", price: 230 },
            { name: "Sweet Potato and Black Bean Enchiladas", price: 230 },
          ],
          dessert: [
            { name: "Vegan Chocolate Cake", price: 120 },
            { name: "Vegan Vanilla Cupcakes", price: 100 },
            { name: "Dairy-Free Chocolate Chip Cookies", price: 80 },
            { name: "Vegan Chocolate Avocado Mousse", price: 90 },
            { name: "Vegan Banana Bread", price: 40 },
            { name: "Vegan Coconut Ice Cream", price: 80 },
            { name: "Vegan Berry Sorbet", price: 50 },
            { name: "Vegan Apple Crisp", price: 90 },
            { name: "Vegan Lemon Bars", price: 100 },
            { name: "Vegan Peanut Butter Bliss Balls", price: 80 },
          ],
        },
      ],

      //hotels details:
      hotelDetails: [
        {
          id: 1,
          name: "City View Inn",
          location: "Mumbai",
          cuisines: ["North Indian", "Chinese"],
          time: "11:00 AM - 9:30 PM",
        },
        {
          id: 2,
          name: "Delhi Spice Hub",
          location: "Delhi",
          cuisines: ["Indian", "Mughlai"],
          time: "12:00 PM - 10:00 PM",
        },
        {
          id: 3,
          name: "Bangalore Wok Express",
          location: "Bangalore",
          cuisines: ["Chinese", "Thai"],
          time: "10:30 AM - 9:00 PM",
        },
        {
          id: 4,
          name: "Chennai Tandoori Bites",
          location: "Chennai",
          cuisines: ["North Indian"],
          time: "11:30 AM - 10:30 PM",
        },
        {
          id: 5,
          name: "Kolkata Chow Palace",
          location: "Kolkata",
          cuisines: ["Chinese", "Tibetan"],
          time: "12:00 PM - 9:00 PM",
        },
        {
          id: 6,
          name: "Hyderabad Spice Route Restaurant",
          location: "Hyderabad",
          cuisines: ["South Indian", "North Indian"],
          time: "10:00 AM - 8:30 PM",
        },
        {
          id: 7,
          name: "Jaipur Masala Junction",
          location: "Jaipur",
          cuisines: ["Indian", "Street Food"],
          time: "11:00 AM - 10:00 PM",
        },
        {
          id: 8,
          name: "Pune Sizzling Szechuan",
          location: "Pune",
          cuisines: ["Chinese", "Szechuan"],
          time: "12:30 PM - 9:30 PM",
        },
        {
          id: 9,
          name: "Ahmedabad Flavors of India",
          location: "Ahmedabad",
          cuisines: ["Indian", "Continental"],
          time: "11:00 AM - 8:00 PM",
        },
        {
          id: 10,
          name: "Goa Delight Diner",
          location: "Goa",
          cuisines: ["North Indian", "Italian"],
          time: "11:30 AM - 9:00 PM",
        },
      ],
    },
  ];
  let status = {
    data: result,
    code: 200,
  };
  console.log("getFoodsOption", result);
  res.send(status);
});

app.delete("/deleteCar/:id", async (request, response) => {
  const id = request.params.id;

  const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    makeYear: Number,
    variant: String,
    kmDriven: String,
    features: Array,
    transmission: String,
    bodyType: String,
    color: String,
    seats: String,
    owner: String,
    carBooked: Boolean,
    bookedTime: Date,
    state: String,
    stateCode: String,
    city: String,
    price: Number,
  });
  var newCarData;

  if (mongoose.models.CarData) {
    newCarData = mongoose.model("CarData");
  } else {
    newCarData = mongoose.model("CarData", carSchema);
  }

  await newCarData.deleteOne({ _id: id }).then(
    () => {
      status = {
        message: "Coupon Deeleted successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.post("/postCarInfo", async (request, response) => {
  const body = request.body;
  const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    makeYear: Number,
    variant: String,
    kmDriven: String,
    features: Array,
    transmission: String,
    bodyType: String,
    color: String,
    seats: String,
    owner: String,
    carBooked: Boolean,
    bookedTime: Date,
    state: String,
    stateCode: String,
    city: String,
    price: Number,
  });
  var newCarData;

  if (mongoose.models.CarData) {
    newCarData = mongoose.model("CarData");
  } else {
    newCarData = mongoose.model("CarData", carSchema);
  }

  const newCarInfo = new newCarData({
    brand: body.brand,
    model: body.model,
    makeYear: body.makeYear,
    variant: body.variant,
    kmDriven: body.kmDriven,
    features: body.features,
    transmission: body.transmission,
    bodyType: body.bodyType,
    color: body.color,
    seats: body.seats,
    owner: body.owner,
    state: body.state,
    carBooked: body.carBooked,
    bookedTime: body.bookedDate,
    stateCode: body.stateCode,
    city: body.city,
    price: body.price,
  });

  let status = "";
  await newCarInfo.save().then(
    () => {
      status = {
        message: "Car Info added successfully",
        code: 200,
      };
      console.log("Saved successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.get("/getCarInfo", async (req, res) => {
  const carSchema = new mongoose.Schema({
    id: Object,
    brand: String,
    model: String,
    makeYear: Number,
    variant: String,
    kmDriven: String,
    features: Array,
    transmission: String,
    bodyType: String,
    color: String,
    seats: String,
    owner: String,
    state: String,
    stateCode: String,
    city: String,
    price: Number,
  });
  var carList;

  if (mongoose.models.CarData) {
    carList = mongoose.model("CarData");
  } else {
    carList = mongoose.model("CarData", carSchema);
  }

  const result = await carList.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("CarList", result);
  res.send(status);
});

app.post("/getCarByBrandInfo", async (req, res) => {
  const body = req.body;
  const carSchema = new mongoose.Schema({
    id: Object,
    brand: String,
    model: String,
    makeYear: Number,
    variant: String,
    kmDriven: String,
    features: Array,
    transmission: String,
    bodyType: String,
    color: String,
    seats: String,
    owner: String,
    state: String,
    stateCode: String,
    city: String,
    price: Number,
  });
  var carList;

  if (mongoose.models.CarData) {
    carList = mongoose.model("CarData");
  } else {
    carList = mongoose.model("CarData", carSchema);
  }

  const result = await carList.find({});

  result.data.filter((item) => {
    return item.brand == body.brand;
  });

  let status = {
    data: result,
    code: 200,
  };
  console.log("CarList", result);
  res.send(status);
});

app.post("/registerUser", async (request, response) => {
  const body = request.body;
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirmPassword: String,
    emailId: String,
    gender: String,
    type: String,
  });

  // const userSchema = [{
  //     username : String,
  //     password : String,
  //     confirmPassword : String,
  //     emailId : String,
  //     gender: String
  // }];
  // const usersData = new mongoose.model("userInfo",userSchema);
  var usersData;

  if (mongoose.models.userInfo) {
    usersData = mongoose.model("userInfo");
  } else {
    usersData = new mongoose.model("userInfo", userSchema);
  }

  const result = await usersData.find({});
  isUserNamePresent = false;
  if (result.length > 0) {
    result.forEach((item) => {
      if (item.username == request.body.username) {
        isUserNamePresent = true;
      }
    });
  }

  // if(isUserNamePresent) {
  //   try {
  //     throw new Error(" already exists");
  // } catch(e) {
  //     console.log(e); // [Error]
  //     throw e;
  // }
  //   // throw new  Error(" already exists");
  //   // throw new Error('database failed to connect');
  // }

  const newUser = new usersData({
    username: body.username,
    password: body.password,
    emailId: body.emailId,
    gender: body.gender,
    type: body.type,
  });

  let status = "";
  await newUser.save().then(
    () => {
      status = {
        message: "User Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );
  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});


// API FOR ZOMATO
// id,
// name,
// location,
// cuisines,
// time, 
// Related to Hotels 

// 

      // name: 'Taj Mahal Palace',
      // location: 'Mumbai',
      // type: 'North Indian',
      // time: '9:00 AM-10:00 PM',

/* Create Hotel */
app.post("/createHotel", async (request, response) => {
  const body = request.body;
  const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    type: String,
    cuisines: String,
    time: String
  });

  var hotelData;

  if (mongoose.models.hotel) {
    hotelData = mongoose.model("hotel");
  } else {
    hotelData = mongoose.model("hotel", hotelSchema);
  }

  const newHotel = new hotelData({
    name: body.name,
    location: body.location,
    type: body.type,
    time: body.time,
    cuisines: body.cuisines
  });

  let status = "";
  await newHotel.save().then(
    () => {
      status = {
        message: "Hotel Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }

});

/* Delete Hotel */
app.delete("/deleteHotel/:id", async(request, response) => {
  const id = request.params.id;

  const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    type: String,
    time: String,
    cuisines: String
  });
  var newHotel;

  if (mongoose.models.hotel) {
    newHotel = mongoose.model("hotel");
  } else {
    newHotel = mongoose.model("hotel", hotelSchema);
  }

  await newHotel.deleteOne({ _id:id }).then(
    () => {
      status = {
        message: "Hotel Deleted successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

/* Get Hotel */
app.get("/getHotelInfo", async (req, res) => {
  const hotelSchema = new mongoose.Schema({
    id: Object,
    name: String,
    location: String,
    type: String,
    cuisines: String,
    time: String
  });
  var hotelList;

  if (mongoose.models.hotel) {
    hotelList = mongoose.model("hotel");
  } else {
    hotelList = mongoose.model("hotel", hotelSchema);
  }

  const result = await hotelList.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("HotelList", result);
  res.send(status);
});

/* Add Food */

// id,
// name,
// location,
// cuisines,
// time, 
// Related to Hotels 

app.post("/listFoodItem", async (request, response) => {
  const body = request.body;
  const foodItem = new mongoose.Schema({
    hotelId: String,
    foodName: String,
    foodPrice: Number,
    foodType: String
  });

  var foodData;

  if (mongoose.models.foodItem) {
    foodData = mongoose.model("foodItem");
  } else {
    foodData = mongoose.model("foodItem", foodItem);
  }

  const newFoodItem = new foodData({
    hotelId: body.hotelId,
    foodName: body.foodName,
    foodPrice: body.foodPrice,
    foodType: body.foodType
  });

  let status = "";
  await newFoodItem.save().then(
    () => {
      status = {
        message: "Food Item Added Successfully",
        code: 200,
      };
      console.log("Saved Successfully");
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }

});

app.delete("/deleteHotelItem/:id", async(request, response) => {
  const id = request.params.id;

  const foodItem = new mongoose.Schema({
    hotelId: String,
    foodName: String,
    foodPrice: Number,
    foodType: String
  });
  var newFoodItem;

  if (mongoose.models.foodItem) {
    newFoodItem = mongoose.model("foodItem");
  } else {
    newFoodItem = mongoose.model("foodItem", foodItem);
  }

  await newFoodItem.deleteOne({ _id:id }).then(
    () => {
      status = {
        message: "Food Item Deleted successfully",
        code: 200,
      };
    },
    (error) => {
      status = error;
    }
  );

  if (status) {
    response.send(status);
  } else {
    throw status;
  }
});

app.get("/getFoodItemInfo", async (req, res) => {
  const foodItem = new mongoose.Schema({
    hotelId: String,
    foodName: String,
    foodPrice: Number,
    foodType: String
  });
  var foodItemListList;

  if (mongoose.models.foodItem) {
    foodItemListList = mongoose.model("foodItem");
  } else {
    foodItemListList = mongoose.model("foodItem", foodItem);
  }

  const result = await foodItemListList.find({});

  let status = {
    data: result,
    code: 200,
  };
  console.log("Food ItemList", result);
  res.send(status);
});

/* Fetch Food By Hotel Id */

app.post("/getFoodItemHotelId", async (req, res) => {
  const foodItem = new mongoose.Schema({
    hotelId: String,
    foodName: String,
    foodPrice: Number,
    foodType: String
  });
  var foodItemListList;

  if (mongoose.models.foodItem) {
    foodItemListList = mongoose.model("foodItem");
  } else {
    foodItemListList = mongoose.model("foodItem", foodItem);
  }

  let result = await foodItemListList.find({});
  result = result.filter(item => {
    return item.hotelId == req.body.hotelId;
  })

  let status = {
    data: result,
    code: 200,
  };
  res.send(status);
});

