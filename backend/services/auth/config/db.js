const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB error:", error)
    } 
}   
export default connectDb  