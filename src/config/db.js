import mongoose from 'mongoose'

const connectDb = async () => {
    try{
        const connectionInstance  = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    }catch(err){
        console.log('Error connecting to the database: ', err.message);
        process.exit(1)
    }
}

export default connectDb;