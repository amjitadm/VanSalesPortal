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
    <center><div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 p-8">
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 rounded-3xl shadow-2xl border-4 border-blue-300 max-w-4xl mx-auto backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        <div className="text-4xl animate-bounce">📦</div>
        🚚 Stock Movement 📋
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Movement Type</label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              {movementTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Van Number</label>
            <input 
              name="van" 
              value={form.van} 
              onChange={handleChange} 
              placeholder="Van #"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              placeholder="Product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              name="quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              placeholder="0" 
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              placeholder="Warehouse/Location"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <input 
              name="reason" 
              value={form.reason} 
              onChange={handleChange} 
              placeholder="Reason for movement"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
          <textarea 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            placeholder="Additional notes..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save className="w-5 h-5" />
          Record Movement
        </button>
      </form>
      </div>
    </div></center>
  );
}

export default StockForm;
