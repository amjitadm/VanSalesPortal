import React, { useState } from 'react';
import { Minus, Save } from 'lucide-react';

function ExpenseForm({ onSubmit, user }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'fuel',
    description: '',
    amount: '',
    van: '',
    receipt: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { 
      ...form, 
      salesperson: user.username,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    onSubmit(newExpense);
    setForm({
      date: new Date().toISOString().split('T')[0],
      category: 'fuel',
      description: '',
      amount: '',
      van: '',
      receipt: '',
      remarks: ''
    });
  };

  const expenseCategories = [
    { value: 'fuel', label: 'Fuel' },
    { value: 'maintenance', label: 'Vehicle Maintenance' },
    { value: 'tolls', label: 'Tolls & Parking' },
    { value: 'meals', label: 'Meals' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'repairs', label: 'Repairs' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Minus className="w-5 h-5" />
        Add Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              name="category" 
              value={form.category} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              {expenseCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input 
              name="amount" 
              value={form.amount} 
              onChange={handleChange} 
              placeholder="0.00" 
              type="number" 
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              placeholder="Expense description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Van Number</label>
            <input 
              name="van" 
              value={form.van} 
              onChange={handleChange} 
              placeholder="Van #"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
            <input 
              name="receipt" 
              value={form.receipt} 
              onChange={handleChange} 
              placeholder="Receipt #"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <input 
              name="remarks" 
              value={form.remarks} 
              onChange={handleChange} 
              placeholder="Additional notes"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save className="w-5 h-5" />
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;