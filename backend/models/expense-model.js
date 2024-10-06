import mongoose from "mongoose";

// SCHEMA: Define the collection's schema.
const expenseSchema = mongoose.Schema(
  {
    title:       { type: String, required: true },
    amount:      { type: Number, required: true },
    date:        { type: Date, required: true },
    description: { type: String, required: true },
    type:        { type: String, default: "Expense" },
    category:    { type: String, required: true },

  },{ timestamps: true });


const expense = mongoose.model('expense', expenseSchema);
export default expense;