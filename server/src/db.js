import mongoose from "mongoose";
import colors from "colors";
mongoose.set("strictQuery", true);

const connectdb = async () => {
    try{
        //connection
        await mongoose.connect(process.env.MONGODB);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgYellow.white);

    }catch(error){
        console.log(`MongoDB Database Error ${error}`.bgRed.white);
    }
};

export default connectdb;