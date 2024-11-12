// controllers/locationController.js
const pubilcLocations = require('../models/PublicLocationModel');

// Add a new location
exports.publicLocationController = async (req,res)=>{
  console.log("Inside publicLocationController");
  console.log(req.userId);
  const {name,link,contact} = req.body
  console.log(name,link,contact);
   // Ensure both files are provided
   const locationImgFile = req.files?.locationImg?.[0];
   const locationVideoFile = req.files?.locationVideo?.[0];
 
   if (!locationImgFile || !locationVideoFile) {
       return res.status(400).json("Both image and video files are required");
   }
 
   try {
       const existingLocation = await pubilcLocations.findOne({ link });
       if (existingLocation) {
           return res.status(406).json("Location already available in our Database... Please Add Another!!");
       }
 
       const newPublicLocation = new pubilcLocations({
           name,          
           link,
           locationImg: locationImgFile.filename,
           locationVideo: locationVideoFile.filename,
           contact,
           userId: req.userId
       });
 
       await newPublicLocation.save();
       res.status(200).json(newPublicLocation);
   } catch (err) {
       console.log("inside catch");
       res.status(401).json(err);
   }
  
  // res.status(200).json("Add Project Request recieved!!!")
  
} 

// home project - no authentication required
exports.gethomeLocationController = async (req,res)=>{
    console.log("Inside gethomeLocationController");
    try {
        const homeLocations = await pubilcLocations.find().limit(3)
        res.status(200).json(homeLocations)
    } catch (err) {
        res.status(401).json(err)
    }   
}


// getAllPublicLocationController - authentication required
exports.getAllPublicLocationController = async (req,res)=>{
    console.log("Inside getAllPublicLocationController");
    try {
        const allPubliclocation = await pubilcLocations.find()
        res.status(200).json(allPubliclocation)
    } catch (err) {
        res.status(401).json(err)
    }   
}

// userpubliclocation - authentication required
exports.getUserPublicLocationController = async (req,res)=>{
    console.log("Inside getUserPublicLocationController");
    const userId = req.userId
    try {
        const allUserPublicLocation = await pubilcLocations.find({userId})
        res.status(200).json(allUserPublicLocation)
    } catch (err) {
        res.status(401).json(err)
    }   
}

// remove location - authentication required
exports.removePublicLocationController = async (req,res)=>{
    console.log("Inside removePublicLocationController");
    const {pid} = req.params
    
    try {
        const removepublicLocation = await pubilcLocations.findByIdAndDelete({_id:pid})
        res.status(200).json(removepublicLocation)
    } catch (err) {
        res.status(401).json(err)
    }
}

// edit project - authentication required
exports.editPubliclocationController = async (req, res) => {
    const { pid } = req.params;
    const { name, link, contact } = req.body;
    const userId = req.userId;
  
    // Check if there are uploaded files, and assign accordingly
    const uploadImg = req.files && req.files.locationImg ? req.files.locationImg[0].filename : req.body.locationImg;
    const uploadVideo = req.files && req.files.locationVideo ? req.files.locationVideo[0].filename : req.body.locationVideo;
  
    try {
      const updatePublicLocation = await pubilcLocations.findByIdAndUpdate(
        { _id: pid },
        {
          name,
          link,
          locationImg: uploadImg,
          locationVideo: uploadVideo,
          contact,
          userId,
        },
        { new: true }
      );
      await updatePublicLocation.save();
      res.status(200).json(updatePublicLocation);
    } catch (err) {
      res.status(500).json({ message: 'Error updating location', error: err });
    }
  };
  
