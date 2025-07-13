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
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 rounded-3xl shadow-2xl border-4 border-gradient-to-r from-green-400 to-emerald-400">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
        <div className="text-4xl animate-bounce">👥</div>
        🤝 Add New Customer 🌟
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit</label>
            <input 
              name="creditLimit" 
              value={form.creditLimit} 
              onChange={handleChange} 
              placeholder="0.00"
              type="number"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input 
              name="notes" 
              value={form.notes} 
              onChange={handleChange} 
              placeholder="Customer notes"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save className="w-5 h-5" />
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;