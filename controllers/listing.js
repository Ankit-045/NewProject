const Listing = require("../models/listing");
const axios = require("axios");
// const axios = require("axios");

module.exports.index = async (req, res) => {
    const { q } = req.query;
    let allListings;
    if (q && q.trim() !== "") {
        const searchRegex = new RegExp(q, "i");
        allListings = await Listing.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { country: searchRegex }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }
    res.render("./listings/index", { allListings, q });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new");
}
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"

            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("./listings/show", { listing });
}

// module.exports.createListing = async (req, res, next) => {

//     let url = req.file.path;
//     let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename }

//     await newListing.save();
//     req.flash("success", "New Listing created");
//     res.redirect("/listings");
// }

module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        const { location } = req.body.listing;

        // Get coordinates from MapTiler Geocoding API, limit to 1 result
        const geoResponse = await axios.get(
            "https://api.maptiler.com/geocoding/" + encodeURIComponent(location) + ".json",
            {
                params: {
                    key: process.env.MAP_TOKEN,
                    limit: 1
                }
            }
        );


        const geoFeature = geoResponse.data.features[0];

        if (!geoFeature || !geoFeature.geometry || !geoFeature.geometry.coordinates) {
            req.flash("error", "Could not determine coordinates for the given location.");
            return res.redirect("/listings/new");
        }

        const coordinates = geoFeature.geometry.coordinates;


        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = {
            type: "Point",
            coordinates: coordinates
        };

        await newListing.save();
        req.flash("success", "New Listing created");
        res.redirect("/listings");
    } catch (error) {
        console.error("Error in creating listing:", error);
        req.flash("error", "Something went wrong while creating listing");
        res.redirect("/listings/new");
    }
}




module.exports.renderEditform = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImg = listing.image.url;
    originalImg = originalImg.replace("/upload", "/upload/w_250")
    res.render("./listings/edit", { listing, originalImg });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save()

    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", " Listing Deleted");
    res.redirect("/listings");
}