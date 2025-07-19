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
      <div className="md-card md-elevation-6 p-8 md-fade-in">
      <h2 className="md-h4 mb-8 md-text-center md-text-primary">
        <span className="text-4xl mr-3">💰</span>
        Add Sales Entry
        <span className="text-4xl ml-3">📊</span>
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
            <input 
              name="product" 
              value={form.product} 
              onChange={handleChange} 
              className="md-input"
              placeholder=" "
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
              step="0.01"
              className="md-input"
              required
            />
            <label className="md-input-label">Quantity (Units)</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md-input-group">
            <input 
              name="price" 
              value={form.price} 
              onChange={handleChange} 
              placeholder=" "
              type="number" 
              step="0.01"
              className="md-input"
              required
            />
            <label className="md-input-label">Unit Price (QAR)</label>
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
          
          <div className="md-input-group">
            <input 
              name="route" 
              value={form.route} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Route Name</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md-input-group">
            <select 
              onChange={handleCustomerSelect}
              className="md-input"
              value=""
            >
              <option value="">Select existing customer</option>
              {customers.map(customer => (
                <option key={customer.id || customer.name} value={customer.id || customer.name}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
            <label className="md-input-label">Select Customer</label>
          </div>
          
          <div className="md-input-group">
            <select 
              name="paymentMethod" 
              value={form.paymentMethod} 
              onChange={handleChange}
              className="md-input"
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="card">Card</option>
              <option value="transfer">Bank Transfer</option>
            </select>
            <label className="md-input-label">Payment Method</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md-input-group">
            <input 
              name="customer" 
              value={form.customer} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Customer Name</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="customerPhone" 
              value={form.customerPhone} 
              onChange={handleChange} 
              placeholder=" "
              className="md-input"
            />
            <label className="md-input-label">Customer Phone</label>
          </div>
          
          <div className="md-input-group">
            <input 
              name="stockLoaded" 
              value={form.stockLoaded} 
              onChange={handleChange} 
              placeholder=" "
              type="number"
              className="md-input"
            />
            <label className="md-input-label">Stock Loaded</label>
          </div>
        </div>

        <div className="md-input-group">
          <input 
            name="customerAddress" 
            value={form.customerAddress} 
            onChange={handleChange} 
            placeholder=" "
            className="md-input"
          />
          <label className="md-input-label">Customer Address</label>
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

        <div className="md-card md-elevation-4 p-4 md-bg-primary text-white">
          <p className="md-h6">
            Total: QAR {((parseFloat(form.quantity) || 0) * (parseFloat(form.price) || 0)).toFixed(2)}
          </p>
        </div>

        <button type="submit" className="w-full md-button md-button-contained py-3 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Add Sales Entry
        </button>
      </form>
    </div>
    </div>
  );
}

export default SalesForm;
