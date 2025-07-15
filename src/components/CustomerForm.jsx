import React, { useState } from 'react';
import { UserPlus, Save } from 'lucide-react';

function CustomerForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    creditLimit: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = { 
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      totalPurchases: 0,
      lastPurchase: null
    };
    onSubmit(newCustomer);
    setForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      creditLimit: '',
      notes: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md-card md-elevation-6 p-8 md-fade-in">
      <h2 className="md-h4 mb-8 md-text-center md-text-success">
        <span className="text-4xl mr-3">👥</span>
        Add New Customer
        <span className="text-4xl ml-3">🌟</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
              required
            />
            <label className="md-input-label">Customer Name</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
              required
            />
            <label className="md-input-label">Phone Number</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder=" "
              type="email"
              className="md-input"
            />
            <label className="md-input-label">Email Address</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">City</label>
          </div>
        </div>

        <div className="md-input-group">
          <input 
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            placeholder=" "
            className="md-input"
          />
          <label className="md-input-label">Full Address</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <input 
              name="creditLimit" 
              value={form.creditLimit} 
              onChange={handleChange} 
              placeholder=" "
              type="number"
              step="0.01"
              className="md-input"
            />
            <label className="md-input-label">Credit Limit (QAR)</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="notes" 
              value={form.notes} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Customer Notes</label>
          </div>
        </div>

        <button type="submit" className="w-full md-button md-button-contained md-button-success py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Add Customer
        </button>
      </form>
    </div>
    </div>
  );
}

export default CustomerForm;