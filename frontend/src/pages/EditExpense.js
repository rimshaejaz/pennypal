import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';

function EditExpense({ setExpense }) {

    const [expense, setExpenseState] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const redirect = useNavigate();
    const location = useLocation();
    
    // Retrieve the expense data from ExpenseLog with initial category 
    useEffect(() => {
        const expenseData = location.state?.expense;
        if (expenseData) {
            setExpenseState(expenseData);
            setCategory(expenseData.category || "");
        } else {
            // Redirect to the expense log if no expense is found
            redirect('/ExpenseLog');
        }
    }, [location.state, redirect]);

    // Handle the data (before update)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseState(prevExpense => ({ ...prevExpense, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedExpense = { ...expense, category };
            const response = await fetch(`https://pennypal-backend-7c3h.onrender.com/expenses/${expense.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                console.log("Update successful");
                setExpense(updatedExpense)
                redirect('/ExpenseLog');
            } else {
                console.error('Failed to update expense.');
            }
        } catch (error) {
            console.error('An error occurred while updating the expense:', error);
        }
    };

    // Fetch categories 
    useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await fetch('https://pennypal-backend-7c3h.onrender.com/category/type?type=Expense'); 
              if (response.ok) {
                  const data = await response.json();
                  setCategories(data);
              } else {
                  console.error('Failed to fetch categories', response.status);
              }
          } catch (err) {
              console.error('Error fetching categories:', err);
          }
      };
      fetchCategories();
  }, []);

    // redirect user to add a category 
    const handleCategoryChange = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue === 'add-category') {
          redirect('https://pennypal-backend-7c3h.onrender.com/category'); 
      } else {
          setCategory(selectedValue);
      }
  };

  return (
    <article>
        <Navigation />
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Edit Expense</legend>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={expense?.title || ''} 
                    onChange={handleChange} 
                />

                <label htmlFor="amount">Amount</label>
                <input 
                    type="number" 
                    name="amount" 
                    value={expense?.amount || ''} 
                    onChange={handleChange} 
                />
                
                <label htmlFor="date">Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value={expense?.date || ''} 
                    onChange={handleChange} 
                />
                
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    name="description" 
                    value={expense?.description || ''} 
                    onChange={handleChange} 
                />
                
                <label htmlFor="category">Category</label>
                <select 
                    name="category" 
                    value={category} 
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Option</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat.title}>
                            {cat.title}
                        </option>
                    ))}  
                    <option value="add-category">Add Category</option>
                </select>

                <button 
                    type="submit" 
                    id="submit" 
                    className='add'
                >
                    Submit
                </button>

                <button className='add'>
                    <Link to="/ExpenseLog">Expense Page</Link>
                </button>
            </fieldset>
        </form>
    </article>
);
}

export default EditExpense;
