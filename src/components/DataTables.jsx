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
        <table className="md-table">
          <thead className="md-table-head">
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Qty</th>
              <th>Price (QAR)</th>
              <th>Total (QAR)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="md-table-body">
            {filteredSales.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.date}</td>
                <td>{entry.product}</td>
                <td>{entry.customer || 'N/A'}</td>
                <td>{entry.quantity}</td>
                <td>QAR {entry.price}</td>
                <td className="font-medium">QAR {parseFloat(entry.total).toFixed(2)}</td>
                <td>
                  <span className={`md-chip ${
                    entry.paymentMethod === 'cash' ? 'md-chip-success' :
                    entry.paymentMethod === 'credit' ? 'md-chip-warning' :
                    'md-chip-primary'
                  }`}>
                    {entry.paymentMethod || 'cash'}
                  </span>
                </td>
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
        {filteredSales.length === 0 && (
          <div className="md-text-center py-8" style={{color: 'var(--md-grey-500)'}}>No sales entries found</div>
        )}
      </div>
    );
  };

  const ExpensesTable = () => {
    const filteredExpenses = filterData(expenses, 'expenses');
    
    return (
      <div className="overflow-x-auto">
        <table className="md-table">
          <thead className="md-table-head">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (QAR)</th>
              <th>Van</th>
              <th>Receipt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="md-table-body">
            {filteredExpenses.map((expense, idx) => (
              <tr key={idx}>
                <td>{expense.date}</td>
                <td>
                  <span className="md-chip md-chip-error">
                    {expense.category}
                  </span>
                </td>
                <td>{expense.description}</td>
                <td className="font-medium text-red-600">QAR {parseFloat(expense.amount).toFixed(2)}</td>
                <td>{expense.van || 'N/A'}</td>
                <td>{expense.receipt || 'N/A'}</td>
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
        {filteredExpenses.length === 0 && (
          <div className="md-text-center py-8" style={{color: 'var(--md-grey-500)'}}>No expenses found</div>
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
      <div className="md-card md-elevation-6 max-w-6xl mx-auto md-fade-in">
        {/* Header */}
        <div className="p-6 border-b" style={{borderColor: 'var(--md-grey-200)'}}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="md-h6 md-text-primary">
              Data Management
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{color: 'var(--md-grey-400)'}} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md-input pl-10"
                />
              </div>
              
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" style={{color: 'var(--md-grey-400)'}} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="md-input"
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
                className="md-button md-button-contained flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b" style={{borderColor: 'var(--md-grey-200)'}}>
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'md-text-primary'
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? 'var(--md-primary-500)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--md-primary-500)' : 'var(--md-grey-500)'
                }}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs md-chip ${
                  activeTab === tab.id ? 'md-chip-primary' : ''
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