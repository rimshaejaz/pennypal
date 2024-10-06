import mongoose from "mongoose";

// SCHEMA: Define the collection's schema.
const categorySchema = mongoose.Schema(
  {
    title:   { 
      type: String, 
      required: true,
      unique: true 
    },
    
    type: {
      type: String,
      required: true
    }
  });


const category = mongoose.model('category', categorySchema);
export default category;