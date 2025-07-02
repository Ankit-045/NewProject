const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
//This is the Schema for listing collections
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      // default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,

      // default: [80.9462, 26.8467] // default to Lucknow
    }
  },
  category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic cities", "Mountauns", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"]
  }




});

//  This middleware automattically Deletes all the reviews of that particular listing when that listing get deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
//Creating model using this Listing Schema

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
