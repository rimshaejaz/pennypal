import React from 'react';
import Income from './Income';

// Change the function names and parameters 
// to fit your portfolio topic and schema.

function IncomeList({ incomes, onDelete, onEdit }) {
    return (
        
        <div class="table-container">
        <table class="table" id="incomes">
        <caption>View All Incomes</caption>
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
                {incomes && incomes.map((income, i) => 
                    <Income
                        income={income} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
        </div>
    );
}

export default IncomeList;