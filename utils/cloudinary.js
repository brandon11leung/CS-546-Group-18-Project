import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: "joystick-junction",
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_KEY_SECRET,
});

// const SS = ["./images/Pokemon SoulSilver/1 - sjYs7He.jpg",
//             "./images/Pokemon SoulSilver/2 - xHrMU9U.jpg",
//             "./images/Pokemon SoulSilver/3 - K2r6Qnc.jpg",
//             "./images/Pokemon SoulSilver/4 - k2JHBzZ.jpg",
//             "./images/Pokemon SoulSilver/5 - 0Tw1cei.jpg"
//             ]

export const uploadImage = async (imageArr) => {
    let urlArr = [];
    try {
        for (let i = 0; i < imageArr.length; i++) {
            let result = await cloudinary.uploader.upload(imageArr[i]);
            urlArr.push(result.url);
            console.log(result.url);
        }
        return urlArr;
    } catch (error) {
        console.log(error)
    }
} 

//console.log(uploadImage(SS))
