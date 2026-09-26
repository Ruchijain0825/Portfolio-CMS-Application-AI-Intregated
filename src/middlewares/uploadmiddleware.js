import multer from "multer";
const storage = multer.memoryStorage({
    storage,
    limits:{
        fileSize:5*1024*5024,

    },
    fileFilter:(req,res,cb)=>
    {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg"
        ]
        if(allowedTypes.includes(file.mimetype))
        {
            cb(null,true);
        }
        else{
            cb(new Error("Only jpeg,jpg,png,webp images are allowed"))
        }
    }
})
export default upload;