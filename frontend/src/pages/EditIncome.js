import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';

function EditIncome({ setIncome }) {

    const [income, setIncomeState] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const redirect = useNavigate();
    const location = useLocation();
    
    // Retrieve the income data from IncomeLog with initial category 
    useEffect(() => {
        const incomeData = location.state?.income;
        if (incomeData) {
            setIncomeState(incomeData);
            setCategory(incomeData.category || "");
        } else {
            // Redirect to the income log if no income is found
            redirect('/IncomeLog');
        }
    }, [location.state, redirect]);

    // Handle the data (before update)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncomeState(prevIncome => ({ ...prevIncome, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedIncome = { ...income, category };
            const response = await fetch(`/incomes/${income.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedIncome),
            });

            if (response.ok) {
                console.log("Update successful");
                setIncome(updatedIncome)
                redirect('/IncomeLog');
            } else {
                console.error('Failed to update income.');
            }
        } catch (error) {
            console.error('An error occurred while updating the income:', error);
        }
    };

    // Fetch categories 
    useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await fetch('/category/type?type=Income'); 
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
          redirect('/category'); 
      } else {
          setCategory(selectedValue);
      }
  };

  return (
    <article>
        <Navigation />
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Edit Income</legend>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={income?.title || ''} 
                    onChange={handleChange} 
                />

                <label htmlFor="amount">Amount</label>
                <input 
                    type="number" 
                    name="amount" 
                    value={income?.amount || ''} 
                    onChange={handleChange} 
                />
                
                <label htmlFor="date">Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value={income?.date || ''} 
                    onChange={handleChange} 
                />
                
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    name="description" 
                    value={income?.description || ''} 
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
                    <Link to="/IncomeLog">Income Page</Link>
                </button>
            </fieldset>
        </form>
    </article>
);
}

export default EditIncome;
