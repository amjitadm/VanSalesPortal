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
    <div className="max-w-4xl mx-auto">
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
        <span className="text-4xl mr-3">📦</span>
        Stock Movement
        <span className="text-4xl ml-3">📋</span>
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
            <label className="floating-label">Movement Type</label>
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
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
              required
            />
            <label className="floating-label">Product Name</label>
          </div>
          
          <div className="input-group">
            <input 
              name="quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              placeholder=" "
              type="number"
              className="advanced-input"
              required
            />
            <label className="floating-label">Quantity</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Location</label>
          </div>
          
          <div className="input-group">
            <input 
              name="reason" 
              value={form.reason} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Reason for Movement</label>
          </div>
        </div>

        <div className="input-group">
          <textarea 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            placeholder=" "
            rows="3"
            className="advanced-input"
          />
          <label className="floating-label">Remarks</label>
        </div>

        <button type="submit" className="w-full btn-warning py-3 flex items-center justify-center gap-2 rounded-lg shadow-xl hover:shadow-2xl transition-all">
          <Save className="w-5 h-5" />
          Record Movement
        </button>
      </form>
    </div>
    </div>
  );
}

export default StockForm;
