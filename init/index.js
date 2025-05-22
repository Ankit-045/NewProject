const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLustt";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
} //

//Function to initialise the database;
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68177ee6ffc3d2116662dc6a",
  }));
  initData.data = initData.data.map((obj) => ({
    ...obj,
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760] // [lng, lat] for Mumbai
    },
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was Initialized");
};

initDB();
