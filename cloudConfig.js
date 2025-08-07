const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({//we are linkin backened to our cloud
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


const storage = new CloudinaryStorage({//defining storage on cloudaniry
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowerFormats: ["png","jpg","jpeg"], 
  },
});

module.exports={
    cloudinary,
    storage,
}