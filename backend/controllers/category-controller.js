import category from "../models/category-model.js";


export const retrieveCategory = async (req, res) => {
    try {
        const allCategories = await category.find();
        console.log(allCategories);
        res.status(200).json(allCategories);

    } catch (error){
        res.status(400).json({message: 'Bad request. Could not retrieve categories.'})

    }
};

export const createCategory= async (req, res) => {
    const { title, type } = req.body; 

    const addCategory = new category({ title, type });

    // Validate type 
    if ( typeof title !== "string" || title.trim() === ''){
        return res.status(400).json({message: 'The category must be a string.'})
    }
    
    if (type !== "Expense" && type !== "Income") {
        return res.status(400).json({ message: 'The category type must be either "Expense" or "Income".' });
    }

    try {
        await addCategory.save();
        res.status(201).json(addCategory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error. The category could not be created.' });
    }
};

// Handler to retrieve categories by type
export const retrieveCategoryByType = async (req, res) => {
    const { type } = req.query; // Expecting 'type' in query string

    // Validate type
    if (type !== 'Expense' && type !== 'Income') {
        return res.status(400).json({ message: 'The category type must be either "Expense" or "Income".' });
    }

    try {
        const categoriesByType = await category.find({ type });
        console.log(`Retrieved categories by type (${type}):`, categoriesByType);  
        res.status(200).json(categoriesByType);
    } catch (error) {
        console.error(`Error retrieving categories by type (${type}):`, error);  
        res.status(500).json({ message: 'Internal server error. Could not retrieve categories by type.' });
    }
};


