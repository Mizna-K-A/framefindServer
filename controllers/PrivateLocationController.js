// controllers/locationController.js
const privateLocations = require('../models/PrivateLocationModel');

// Add a new location
exports.privateLocationController = async (req, res) => {
  console.log("Inside privateLocationController");
  console.log(req.userId);
  const { name, rent, link, contact } = req.body;
  console.log(name, rent, link, contact);

  // Ensure both files are provided
  const locationImgFile = req.files?.locationImg?.[0];
  const locationVideoFile = req.files?.locationVideo?.[0];

  if (!locationImgFile || !locationVideoFile) {
      return res.status(400).json("Both image and video files are required");
  }

  try {
      const existingLocation = await privateLocations.findOne({ link });
      if (existingLocation) {
          return res.status(406).json("Location already available in our Database... Please Add Another!!");
      }

      const newPrivateLocation = new privateLocations({
          name,          
          rent,
          link,
          locationImg: locationImgFile.filename,
          locationVideo: locationVideoFile.filename,
          contact,
          userId: req.userId
      });

      await newPrivateLocation.save();
      res.status(200).json(newPrivateLocation);
  } catch (err) {
      console.log("inside catch");
      res.status(401).json(err);
  }
};


// getAllPrivateLocationController - authentication required
exports.getAllPrivateLocationController = async (req,res)=>{
    console.log("Inside getAllPrivateLocationController");
    try {
        const allPrivatelocation = await privateLocations.find()
        res.status(200).json(allPrivatelocation)
    } catch (err) {
        res.status(401).json(err)
    }   
}


// user publiclocation - authentication required
exports.getUserPrivateLocationController = async (req,res)=>{
    console.log("Inside getUserPrivateLocationController");
    const userId = req.userId
    try {
        const allUserPrivateLocation = await privateLocations.find({userId})
        res.status(200).json(allUserPrivateLocation)
    } catch (err) {
        res.status(401).json(err)
    }   
}

// remove private location - authentication required
exports.removePrivateLocationController = async (req,res)=>{
    console.log("Inside removePrivateLocationController");
    const {pid} = req.params
    
    try {
        const removeprivateLocation = await privateLocations.findByIdAndDelete({_id:pid})
        res.status(200).json(removeprivateLocation)
    } catch (err) {
        res.status(401).json(err)
    }
}


// edit project - authentication required
exports.editPrivateLocationController = async (req, res) => {
    console.log("Inside editPrivateLocationController");
    const { pid } = req.params;
    const { name, rent, link, contact } = req.body;
  
    // Check if files are uploaded
    const uploadImg = req.files.locationImg ? req.files.locationImg[0].filename : req.body.locationImg;
    const uploadVideo = req.files.locationVideo ? req.files.locationVideo[0].filename : req.body.locationVideo;
  
    const userId = req.userId;
  
    try {
      const updatePrivateLocation = await privateLocations.findByIdAndUpdate(
        { _id: pid },
        {
          name,
          rent,
          link,
          locationImg: uploadImg,
          locationVideo: uploadVideo,
          contact,
          userId,
        },
        { new: true }
      );
      await updatePrivateLocation.save();
      res.status(200).json(updatePrivateLocation);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  
