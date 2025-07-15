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
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-success">
        <span className="text-4xl pulse-animation mr-3">👥</span>
        Add New Customer
        <span className="text-4xl pulse-animation ml-3">🌟</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Full name"
              className="advanced-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              placeholder="Phone number"
              className="advanced-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Email address"
              type="email"
              className="advanced-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              placeholder="City"
              className="advanced-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input 
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            placeholder="Full address"
            className="advanced-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (QAR)</label>
            <input 
              name="creditLimit" 
              value={form.creditLimit} 
              onChange={handleChange} 
              placeholder="0.00"
              type="number"
              step="0.01"
              className="advanced-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input 
              name="notes" 
              value={form.notes} 
              onChange={handleChange} 
              placeholder="Customer notes"
              className="advanced-input"
            />
          </div>
        </div>

        <button type="submit" className="w-full btn-success py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Add Customer
        </button>
      </form>
    </div>
    </div>
  );
}

export default CustomerForm;