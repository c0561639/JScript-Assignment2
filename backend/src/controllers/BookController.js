/* Sean Clarke
    c0561639
    10/28/2025
*/
import Book from "../models/Book.js";
import mongoose from "mongoose";

//Generates list of all books in DB
export const listBooks = async (req, res, next) => {
    const { q } = req.query;
    const filter = q
        ? {
            $or: [
                { title: { $regex: q, $options: "i" } },
                { author: { $regex: q, $options: "i" } },
                { year: { $regex: q, $options: "i" } }
            ]
        }:{};
    const docs = await Book.find(filter).sort({ createdAt: -1 });
    res.json(docs);
};

//CRUD - "Read"
export const getBook = async (req, res, next) => {
    const doc = await Book.findById(req.params.id);
    res.json(doc);
};

//CRUD - "Create" 
export const createBook = async (req, res, next) => {
    try 
    {
        const doc = await Book.create(req.body);
        res.json(doc);
    }
    catch (err)
    {
        res.status(400).json({ error: err.message });
    }
};

//CRUD - "Update"
export const updateBook = async (req, res, next) => {
    try 
    {
        const doc = await Book.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true });
        res.json(doc);
    }
    catch (err)
    {
        res.status(400).json({ error: err.message });
    }
};

//CRUD - "Delete"
export const deleteBook = async (req, res, next) => {
    const doc = await Book.findByIdAndDelete(req.params.id);
    res.send();
};
