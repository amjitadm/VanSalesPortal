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
    <div className="max-w-4xl mx-auto">
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        <span className="text-4xl mr-3">💸</span>
        Add Expense
        <span className="text-4xl ml-3">📉</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="date" 
              className="advanced-input"
              placeholder=" "
              required
            />
            <label className="floating-label">Date</label>
          </div>
          
          <div className="input-group">
            <select 
              name="category" 
              value={form.category} 
              onChange={handleChange}
              className="advanced-input"
              required
            >
              {expenseCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <label className="floating-label">Category</label>
          </div>
          
          <div className="input-group">
            <input 
              name="amount" 
              value={form.amount} 
              onChange={handleChange} 
              placeholder=" "
              type="number" 
              step="0.01"
              className="advanced-input"
              required
            />
            <label className="floating-label">Amount (QAR)</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <input 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
              required
            />
            <label className="floating-label">Description</label>
          </div>
          
          <div className="input-group">
            <input 
              name="van" 
              value={form.van} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Van Number</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <input 
              name="receipt" 
              value={form.receipt} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Receipt Number</label>
          </div>
          
          <div className="input-group">
            <input 
              name="remarks" 
              value={form.remarks} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Remarks</label>
          </div>
        </div>

        <button type="submit" className="w-full btn-danger py-3 flex items-center justify-center gap-2 rounded-lg shadow-xl hover:shadow-2xl transition-all">
          <Save className="w-5 h-5" />
          Add Expense
        </button>
      </form>
    </div>
    </div>
  );
}

export default ExpenseForm;
