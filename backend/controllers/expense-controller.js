import expense from '../models/expense-model.js'


export const retrieveExpense = async (req, res) => {
    try {
        const allExpenses = await expense.find().sort({createdAt: -1});
        console.log(allExpenses);
        res.status(200).json(allExpenses);

    } catch (error){
        res.status(400).json({message: 'Bad request. Could not retrieve expenses.'})

    }
};

export const createExpense = async (req, res) => {
    const { title, amount, date, description, category } = req.body; 

    const addExpense = new expense({ title, amount, date, description, category });
    try {
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'The amount must be a positive number.'})
        }
        await addExpense.save();
        res.status(201).json(addExpense);

    } catch (error) {
        console.log(error);
        res.status(400).json({ Error: 'Bad request. The expense is missing a required parameter.' });
    }
};

// Handles deleting expense by id 
export const deleteExpenseById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        // Attempt to delete the expense item
        const result = await expense.deleteOne({ _id: id });

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Expense deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Expense not found.' });
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Internal server error. Could not delete the expense.' });
    }
};