import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';

function SalesForm({ onSubmit, customers, user }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    product: '',
    quantity: '',
    price: '',
    van: '',
    route: '',
    stockLoaded: '',
    customer: '',
    customerPhone: '',
    customerAddress: '',
    paymentMethod: 'cash',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCustomerSelect = (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setForm({
        ...form,
        customer: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address
      });
    } else {
      setForm({
        ...form,
        customer: '',
        customerPhone: '',
        customerAddress: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseFloat(form.quantity || 0) * parseFloat(form.price || 0);
    const newEntry = { 
      ...form, 
      salesperson: user.username, 
      total,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    onSubmit(newEntry);
    setForm({
      date: new Date().toISOString().split('T')[0],
      product: '',
      quantity: '',
      price: '',
      van: '',
      route: '',
      stockLoaded: '',
      customer: '',
      customerPhone: '',
      customerAddress: '',
      paymentMethod: 'cash',
      remarks: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add Sales Entry
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              placeholder="Product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
            <input 
              name="price" 
              value={form.price} 
              onChange={handleChange} 
              placeholder="0.00" 
              type="number" 
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <input 
              name="route" 
              value={form.route} 
              onChange={handleChange} 
              placeholder="Route name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
            <select 
              onChange={handleCustomerSelect}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select existing customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select 
              name="paymentMethod" 
              value={form.paymentMethod} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="card">Card</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input 
              name="customer" 
              value={form.customer} 
              onChange={handleChange} 
              placeholder="Customer name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
            <input 
              name="customerPhone" 
              value={form.customerPhone} 
              onChange={handleChange} 
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Loaded</label>
            <input 
              name="stockLoaded" 
              value={form.stockLoaded} 
              onChange={handleChange} 
              placeholder="Stock quantity"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Address</label>
          <input 
            name="customerAddress" 
            value={form.customerAddress} 
            onChange={handleChange} 
            placeholder="Customer address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
          <textarea 
            name="remarks" 
            value={form.remarks} 
            onChange={handleChange} 
            placeholder="Additional notes..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-800">
            Total: ${((parseFloat(form.quantity) || 0) * (parseFloat(form.price) || 0)).toFixed(2)}
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save className="w-5 h-5" />
          Add Sales Entry
        </button>
      </form>
    </div>
  );
}

export default SalesForm;