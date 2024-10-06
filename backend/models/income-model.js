import mongoose from "mongoose";

// SCHEMA: Define the collection's schema.
const incomeSchema = mongoose.Schema(
  {
    title:       { type: String, required: true },
    amount:      { type: Number, required: true },
    date:        { type: Date, required: true },
    description: { type: String, required: true },
    type:        { type: String, default: "Income" },
    category:    { type: String, required: true },

  },{ timestamps: true });


const income = mongoose.model('income', incomeSchema);
export default income;