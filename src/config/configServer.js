import mongoose from "mongoose";

const uri = "mongodb+srv://gimenezjesus18:pachon1234@cluster0.rnpaq.mongodb.net/newdb?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = () =>{
    try {
        mongoose.connect(uri)
        console.log("base de dato conectada");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB