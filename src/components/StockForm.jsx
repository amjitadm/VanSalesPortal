import React, { useState } from 'react';
import { Package, Save } from 'lucide-react';

function StockForm({ onSubmit, user }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    product: '',
    type: 'load',
    quantity: '',
    van: '',
    location: '',
    reason: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovement = { 
      ...form, 
      salesperson: user.username,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    onSubmit(newMovement);
    setForm({
      date: new Date().toISOString().split('T')[0],
      product: '',
      type: 'load',
      quantity: '',
      van: '',
      location: '',
      reason: '',
      remarks: ''
    });
  };

  const movementTypes = [
    { value: 'load', label: 'Load Stock' },
    { value: 'unload', label: 'Unload Stock' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'return', label: 'Return' },
    { value: 'damage', label: 'Damage/Loss' }
  ];

  return (
    <div className="max-w-4xl mx-auto"><center>
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-white bg-clip-text bg-gradient-warning">
        <span className="text-4xl pulse-animation mr-3">📦</span>
        Stock Movement
        <span className="text-4xl pulse-animation ml-3">📋</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Date</label>
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="date" 
              className="advanced-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Movement Type</label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange}
              className="advanced-input"
              required
            >
              {movementTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Van Number</label>
            <input 
              name="van" 
              value={form.van} 
              onChange={handleChange} 
              placeholder="Van #"
              className="advanced-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Product</label>
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              placeholder="Product name"
              className="advanced-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Quantity</label>
            <input 
              name="quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              placeholder="0" 
              type="number"
              className="advanced-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Location</label>
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              placeholder="Warehouse/Location"
              className="advanced-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Reason</label>
            <input 
              name="reason" 
              value={form.reason} 
              onChange={handleChange} 
              placeholder="Reason for movement"
              className="advanced-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700 mb-1">Remarks</label>
          <textarea 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            placeholder="Additional notes..."
            rows="3"
            className="advanced-input"
          />
        </div>

        <button type="submit" className="w-full btn-warning py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Record Movement
        </button>
      </form>
    </div></center>
    </div>
  );
}

export default StockForm;
