import mongoose from "mongoose"

const configOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
export const connectToDB = async () => {
    const connectionUrl = "mongodb+srv://linktoqudoos:abdul33202@cluster0.zxljozz.mongodb.net/?retryWrites=true&w=majority"
    //  const connectionUrl="mongodb://127.0.0.1:27017/nextecomerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
    // const connectionUrl="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
    await mongoose.connect(connectionUrl, configOption)
        .then(() => console.log("mongodb connected successfully"))
        .catch((error) => console.log(`getting error in connecting mongodb ${error.message}`))

}