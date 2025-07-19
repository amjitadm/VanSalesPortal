import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';

function DataTables({ entries, expenses, customers, stockMovements, onExport }) {
  const [activeTab, setActiveTab] = useState('sales');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filterData = (data, type) => {
    let filtered = data;

    // Apply time filter
    if (filter !== 'all') {
      const now = new Date();
      filtered = data.filter(item => {
        const itemDate = new Date(item.date);
        if (filter === 'today') {
          return itemDate.toDateString() === now.toDateString();
        }
        if (filter === 'week') {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return itemDate >= weekAgo && itemDate <= now;
        }
        if (filter === 'month') {
          const monthAgo = new Date(now);
          monthAgo.setMonth(now.getMonth() - 1);
          return itemDate >= monthAgo && itemDate <= now;
        }
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const searchFields = type === 'sales' 
          ? [item.product, item.customer, item.route, item.salesperson]
          : type === 'expenses'
          ? [item.description, item.category, item.van]
          : type === 'customers'
          ? [item.name, item.phone, item.email, item.city]
          : [item.product, item.van, item.location, item.type];
        
        return searchFields.some(field => 
          field && field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return filtered;
  };

  const SalesTable = () => {
    const filteredSales = filterData(entries, 'sales');
    
    return (
      <div className="overflow-x-auto">
        <table className="advanced-table">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700">Date</th>
              <th className="p-4 text-left font-semibold text-gray-700">Product</th>
              <th className="p-4 text-left font-semibold text-gray-700">Customer</th>
              <th className="p-4 text-left font-semibold text-gray-700">Qty</th>
              <th className="p-4 text-left font-semibold text-gray-700">Price (QAR)</th>
              <th className="p-4 text-left font-semibold text-gray-700">Total (QAR)</th>
              <th className="p-4 text-left font-semibold text-gray-700">Payment</th>
              <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200">{entry.date}</td>
                <td className="p-4 border-b border-gray-200">{entry.product}</td>
                <td className="p-4 border-b border-gray-200">{entry.customer || 'N/A'}</td>
                <td className="p-4 border-b border-gray-200">{entry.quantity}</td>
                <td className="p-4 border-b border-gray-200">QAR {entry.price}</td>
                <td className="p-4 border-b border-gray-200 font-medium">QAR {parseFloat(entry.total).toFixed(2)}</td>
                <td className="p-4 border-b border-gray-200">
                  <span className={`status-badge ${
                    entry.paymentMethod === 'cash' ? 'success' :
                    entry.paymentMethod === 'credit' ? 'warning' :
                    'info'
                  }`}>
                    {entry.paymentMethod || 'cash'}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSales.length === 0 && (
          <div className="text-center py-8 text-gray-500">No sales entries found</div>
        )}
      </div>
    );
  };

  const ExpensesTable = () => {
    const filteredExpenses = filterData(expenses, 'expenses');
    
    return (
      <div className="overflow-x-auto">
        <table className="advanced-table">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700">Date</th>
              <th className="p-4 text-left font-semibold text-gray-700">Category</th>
              <th className="p-4 text-left font-semibold text-gray-700">Description</th>
              <th className="p-4 text-left font-semibold text-gray-700">Amount (QAR)</th>
              <th className="p-4 text-left font-semibold text-gray-700">Van</th>
              <th className="p-4 text-left font-semibold text-gray-700">Receipt</th>
              <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-200">{expense.date}</td>
                <td className="p-4 border-b border-gray-200">
                  <span className="status-badge danger">
                    {expense.category}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-200">{expense.description}</td>
                <td className="p-4 border-b border-gray-200 font-medium text-red-600">QAR {parseFloat(expense.amount).toFixed(2)}</td>
                <td className="p-4 border-b border-gray-200">{expense.van || 'N/A'}</td>
                <td className="p-4 border-b border-gray-200">{expense.receipt || 'N/A'}</td>
                <td className="p-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="text-center py-8 text-gray-500">No expenses found</div>
        )}
      </div>
    );
  };

  const CustomersTable = () => {
    const filteredCustomers = filterData(customers, 'customers');
    
    return (
      <div className="overflow-x-auto">
        <table className="md-table">
          <thead className="md-table-head">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
              <th>Credit Limit (QAR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="md-table-body">
            {filteredCustomers.map((customer, idx) => (
              <tr key={idx}>
                <td className="font-medium">{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email || 'N/A'}</td>
                <td>{customer.city || 'N/A'}</td>
                <td>QAR {customer.creditLimit || '0.00'}</td>
                <td>
                  <div className="flex space-x-2">
                    <button className="md-text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="md-text-success">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && (
          <div className="md-text-center py-8" style={{color: 'var(--md-grey-500)'}}>No customers found</div>
        )}
      </div>
    );
  };

  const StockTable = () => {
    const filteredStock = filterData(stockMovements, 'stock');
    
    return (
      <div className="overflow-x-auto">
        <table className="md-table">
          <thead className="md-table-head">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Van</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="md-table-body">
            {filteredStock.map((movement, idx) => (
              <tr key={idx}>
                <td>{movement.date}</td>
                <td>
                  <span className={`md-chip ${
                    movement.type === 'load' ? 'md-chip-success' :
                    movement.type === 'unload' ? 'md-chip-primary' :
                    movement.type === 'damage' ? 'md-chip-error' :
                    'md-chip-warning'
                  }`}>
                    {movement.type}
                  </span>
                </td>
                <td>{movement.product}</td>
                <td>{movement.quantity}</td>
                <td>{movement.van || 'N/A'}</td>
                <td>{movement.location || 'N/A'}</td>
                <td>
                  <div className="flex space-x-2">
                    <button className="md-text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="md-text-success">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStock.length === 0 && (
          <div className="md-text-center py-8" style={{color: 'var(--md-grey-500)'}}>No stock movements found</div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'sales', label: 'Sales', count: entries.length },
    { id: 'expenses', label: 'Expenses', count: expenses.length },
    { id: 'customers', label: 'Customers', count: customers.length },
    { id: 'stock', label: 'Stock', count: stockMovements.length }
  ];

  return (
    <div className="min-h-screen">
      <div className="advanced-card max-w-6xl mx-auto fade-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-blue-800">
              Data Management
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="advanced-input pl-10"
                />
              </div>
              
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="advanced-input"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              
              {/* Export */}
              <button
                onClick={() => onExport(activeTab)}
                className="btn-gradient flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs status-badge ${
                  activeTab === tab.id ? 'info' : ''
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Table Content */}
        <div className="p-6">
          {activeTab === 'sales' && <SalesTable />}
          {activeTab === 'expenses' && <ExpensesTable />}
          {activeTab === 'customers' && <CustomersTable />}
          {activeTab === 'stock' && <StockTable />}
        </div>
      </div>
    </div>
  );
}

export default DataTables;