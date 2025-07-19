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
    const customer = customers.find(c => c.id === customerId || c.name === customerId);
    if (customer) {
      setForm({
        ...form,
        customer: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerId: customer.id
      });
    } else {
      setForm({
        ...form,
        customer: '',
        customerPhone: '',
        customerAddress: '',
        customerId: null
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
    <div className="max-w-4xl mx-auto">
      <div className="advanced-card p-8 fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
        <span className="text-4xl mr-3">💰</span>
        Add Sales Entry
        <span className="text-4xl ml-3">📊</span>
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
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              className="advanced-input"
              placeholder=" "
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
              step="0.01"
              className="advanced-input"
              required
            />
            <label className="floating-label">Quantity (Units)</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <input 
              name="price" 
              value={form.price} 
              onChange={handleChange} 
              placeholder=" "
              type="number" 
              step="0.01"
              className="advanced-input"
              required
            />
            <label className="floating-label">Unit Price (QAR)</label>
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
          
          <div className="input-group">
            <input 
              name="route" 
              value={form.route} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Route Name</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <select 
              onChange={handleCustomerSelect}
              className="advanced-input"
              value=""
            >
              <option value="">Select existing customer</option>
              {customers.map(customer => (
                <option key={customer.id || customer.name} value={customer.id || customer.name}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
            <label className="floating-label">Select Customer</label>
          </div>
          
          <div className="input-group">
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
            <label className="floating-label">Payment Method</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <input 
              name="customer" 
              value={form.customer} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Customer Name</label>
          </div>
          
          <div className="input-group">
            <input 
              name="customerPhone" 
              value={form.customerPhone} 
              onChange={handleChange} 
              placeholder=" "
              className="advanced-input"
            />
            <label className="floating-label">Customer Phone</label>
          </div>
          
          <div className="input-group">
            <input 
              name="stockLoaded" 
              value={form.stockLoaded} 
              onChange={handleChange} 
              placeholder=" "
              type="number"
              className="advanced-input"
            />
            <label className="floating-label">Stock Loaded</label>
          </div>
        </div>

        <div className="input-group">
          <input 
            name="customerAddress" 
            value={form.customerAddress} 
            onChange={handleChange} 
            placeholder=" "
            className="advanced-input"
          />
          <label className="floating-label">Customer Address</label>
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

        <div className="advanced-card p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <p className="text-xl font-semibold">
            Total: QAR {((parseFloat(form.quantity) || 0) * (parseFloat(form.price) || 0)).toFixed(2)}
          </p>
        </div>

        <button type="submit" className="w-full btn-gradient py-3 flex items-center justify-center gap-2 rounded-lg shadow-xl hover:shadow-2xl transition-all">
          <Save className="w-5 h-5" />
          Add Sales Entry
        </button>
      </form>
    </div>
    </div>
  );
}

export default SalesForm;
