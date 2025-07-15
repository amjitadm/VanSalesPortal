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
    <div className="max-w-4xl mx-auto"><center>
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-primary">
        <span className="text-4xl pulse-animation mr-3">💰</span>
        Add Sales Entry
        <span className="text-4xl pulse-animation ml-3">📊</span>
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
              className="advanced-input"
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
              className="advanced-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Units)</label>
            <input 
              name="quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              placeholder="0" 
              type="number" 
              step="0.01"
              className="advanced-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (QAR)</label>
            <input 
              name="price" 
              value={form.price} 
              onChange={handleChange} 
              placeholder="0.00" 
              type="number" 
              step="0.01"
              className="advanced-input"
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
              className="advanced-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <input 
              name="route" 
              value={form.route} 
              onChange={handleChange} 
              placeholder="Route name"
              className="advanced-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
            <select 
              onChange={handleCustomerSelect}
              className="advanced-input"
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
              className="advanced-input"
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
              className="advanced-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
            <input 
              name="customerPhone" 
              value={form.customerPhone} 
              onChange={handleChange} 
              placeholder="Phone number"
              className="advanced-input"
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
              className="advanced-input"
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
            className="advanced-input"
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
            className="advanced-input"
          />
        </div>

        <div className="advanced-card p-4 bg-gradient-primary text-white">
          <p className="text-lg font-semibold">
            Total: QAR {((parseFloat(form.quantity) || 0) * (parseFloat(form.price) || 0)).toFixed(2)}
          </p>
        </div>

        <button type="submit" className="w-full btn-gradient py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Add Sales Entry
        </button>
      </form>
    </div></center>
    </div>
  );
}

export default SalesForm;
