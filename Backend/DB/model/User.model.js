import { Schema, Types, model, mongoose } from "mongoose";

//name , pass , email , phone , description , role

/*  
username
password
phone
email
role
gender
birthDate
nationalID

height
weight
bloodType
suffers
currentMedicine

family

surgicalHistory: {
        surgeryType,
        dateOfSurgery,}


allergies
chronicDisease
*/

const userSchema = new Schema({
    profilePic: Object,
    username: {
        type: String,
        required: [true, 'Username is required'],
        min: [2, 'Username must be at least 2 characters'],
        max: [20, 'Username cannot exceed 20 characters'],
        lower: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phone: {
        type: String,
        required: [true, 'phone is required']
    },
    email: {
        type: String,
        unique: [true, 'email already in use'],
        require: [true, 'Email field can not be empty']
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthDate: {
        type: Date //'1990-01-01'
    },
    nationalID: {
        type: String,
        length: 14,
        unique: [true, 'email already in use'],
        require: [true, 'Email field can not be empty']
    },

    //personal history
    height: { type: String },// 999
    weight: { type: String },
    bloodType: { type: String },
    suffers: { type: String },
    currentMedicine: { type: String },

    // family history
    family: {
        rev: { type: String },
        _id: { type: Types.ObjectId, ref: "User" }
    },
    //{mom : id ,
    // dad : id ,
    // bro : id ,}

    //Surgical history
    surgicalHistory: {
        surgeryType: { type: String },
        dateOfSurgery: { type: String },
    },

    //Past history
    chronicDisease: { type: String },
    allergies: { type: String },

});

const userModel = mongoose.models.User || model('User', userSchema);
export default userModel

