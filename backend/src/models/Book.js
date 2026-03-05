/* Sean Clarke
    c0561639
    10/28/2025
*/
import mongoose from "mongoose";

//Setting up Book object schema with restructions
const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 200 },
        author: { type: String, required: true, trim: true, maxlength: 150 },
        year: { type: Number, min: 0, max: 2100, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
