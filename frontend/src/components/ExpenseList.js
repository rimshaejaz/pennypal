import React from 'react';
import Expenses from './Expenses';
// Change the function names and parameters 
// to fit your portfolio topic and schema.

function ExpenseList({ expenses, onDelete, onEdit }) {
    return (
        <div class="table-container">
        <table class="table" id="expenses">
              <caption>View All Expenses</caption>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount $</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {expenses && expenses.map((expense, i) => 
                    <Expenses
                        expense={expense} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
        </div>
    );
}

export default ExpenseList;