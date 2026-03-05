/* Sean Clarke
    c0561639
    10/28/2025
*/
import mongoose from "mongoose";

export async function connectDB(uri) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
}
