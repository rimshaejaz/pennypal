import income from '../models/income-model.js'


export const retrieveIncome = async (req, res) => {
    try {
        const allIncomes = await income.find().sort({createdAt: -1});
        console.log(allIncomes);
        res.status(200).json(allIncomes);

    } catch (error){
        res.status(400).json({message: 'Bad request. Could not retrieve income.'})

    }
};

export const createIncome = async (req, res) => {
    const { title, amount, date, description, category } = req.body; 

    const addIncome = new income ({ title, amount, date, description, category });
    try {
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'The amount must be a positive number.'})
        }
        await addIncome.save();
        res.status(201).json(addIncome);

    } catch (error) {
        console.log(error);
        res.status(400).json({ Error: 'Bad request. The income is missing a required parameter.' });
    }
};

// Handles deleting income by id 
export const deleteIncomeById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        // Attempt to delete the income item
        const result = await income.deleteOne({ _id: id });

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Income deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Income not found.' });
        }
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Internal server error. Could not delete the income.' });
    }
};