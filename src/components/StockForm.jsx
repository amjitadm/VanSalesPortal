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
      <div className="md-card md-elevation-6 p-8 md-fade-in">
      <h2 className="md-h4 mb-8 md-text-center md-text-warning">
        <span className="text-4xl mr-3">📦</span>
        Stock Movement
        <span className="text-4xl ml-3">📋</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md-input-group">
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="date" 
              className="md-input"
              placeholder=" "
              required
            />
            <label className="md-input-label">Date</label>
          </div>
          
          <div className="md-input-group">
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange}
              className="md-input"
              required
            >
              {movementTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <label className="md-input-label">Movement Type</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="van" 
              value={form.van} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Van Number</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
              required
            />
            <label className="md-input-label">Product Name</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              placeholder=" "
              type="number"
              className="md-input"
              required
            />
            <label className="md-input-label">Quantity</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Location</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="reason" 
              value={form.reason} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Reason for Movement</label>
          </div>
        </div>

        <div className="md-input-group">
          <textarea 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            placeholder=" "
            rows="3"
            className="md-input"
          />
          <label className="md-input-label">Remarks</label>
        </div>

        <button type="submit" className="w-full md-button md-button-contained md-button-warning py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Record Movement
        </button>
      </form>
    </div>
    </div>
  );
}

export default StockForm;
