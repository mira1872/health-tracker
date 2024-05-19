import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect('mongodb://127.0.0.1:27017/Project')
        .then(result => {
            console.log(`DB connected ............Done`);
        }).catch(err => {
            console.log(`Fail to connectDB ,,,,,,,,, ${err}`);
        })
}
export default connectDB


