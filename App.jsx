import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './src/styles/advanced-theme.css';
import './src/styles/main.css';
import { useSupabaseData } from './src/hooks/useSupabaseData';
import { 
  LayoutDashboard, 
  Plus, 
  Minus, 
  Users, 
  Package, 
  FileText, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';

import Dashboard from './src/components/Dashboard';
import SalesForm from './src/components/SalesForm';
import ExpenseForm from './src/components/ExpenseForm';
import CustomerForm from './src/components/CustomerForm';
import StockForm from './src/components/StockForm';
import DataTables from './src/components/DataTables';

const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'fsuser', password: 'fsuser456', role: 'salesperson' }
];

function VanSalesPortal() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbError, setDbError] = useState(null);

  // Use Supabase data hook
  const {
    data: { customers, sales: entries, expenses, stockMovements, products },
    loading,
    error,
    loadData,
    addCustomer,
    addSalesEntry,
    addExpense,
    addStockMovement,
    addProduct
  } = useSupabaseData();

  const handleLogin = () => {
    const username = prompt("Username:");
    const password = prompt("Password:");
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      setActiveTab('dashboard');
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setSidebarOpen(false);
  };

  const handleAddSalesEntry = async (entryData) => {
    try {
      // Find customer by name if provided
      let customerId = null;
      if (entryData.customer) {
        const customer = customers.find(c => c.name === entryData.customer);
        customerId = customer?.id || null;
      }

      const salesEntry = {
        ...entryData,
        customer_id: customerId,
        customer_name: entryData.customer,
        customer_phone: entryData.customerPhone,
        customer_address: entryData.customerAddress
      };

      await addSalesEntry(salesEntry);
    } catch (err) {
      console.error('Error adding sales entry:', err);
      setDbError('Failed to add sales entry. Please try again.');
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await addExpense(expenseData);
    } catch (err) {
      console.error('Error adding expense:', err);
      setDbError('Failed to add expense. Please try again.');
    }
  };

  const handleAddCustomer = async (customerData) => {
    try {
      await addCustomer(customerData);
    } catch (err) {
      console.error('Error adding customer:', err);
      setDbError('Failed to add customer. Please try again.');
    }
  };

  const handleAddStockMovement = async (movementData) => {
    try {
      await addStockMovement(movementData);
    } catch (err) {
      console.error('Error adding stock movement:', err);
      setDbError('Failed to add stock movement. Please try again.');
    }
  };

  const exportToExcel = (type = 'sales') => {
    let data, filename;
    
    switch (type) {
      case 'sales':
        data = entries;
        filename = 'van_sales.xlsx';
        break;
      case 'expenses':
        data = expenses;
        filename = 'van_expenses.xlsx';
        break;
      case 'customers':
        data = customers;
        filename = 'van_customers.xlsx';
        break;
      case 'stock':
        data = stockMovements;
        filename = 'van_stock_movements.xlsx';
        break;
      default:
        data = entries;
        filename = 'van_sales.xlsx';
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, type.charAt(0).toUpperCase() + type.slice(1));
    XLSX.writeFile(wb, filename);
  };

  const importFromExcel = (e, type = 'sales') => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      
      switch (type) {
        case 'sales':
          setEntries(json);
          break;
        case 'expenses':
          setExpenses(json);
          break;
        case 'customers':
          setCustomers(json);
          break;
        case 'stock':
          setStockMovements(json);
          break;
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = ''; // Reset file input
  };

  // Show loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--md-grey-100)'}}>
        <div className="md-card md-elevation-4 p-8 md-text-center">
          <div className="md-loading mb-4"></div>
          <p className="md-body1">Connecting to database...</p>
        </div>
      </div>
    );
  }

  // Show database error
  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--md-grey-100)'}}>
        <div className="md-card md-elevation-4 p-8 md-text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="md-h6 mb-4 md-text-error">Database Connection Error</h2>
          <p className="md-body2 mb-4" style={{color: 'var(--md-grey-600)'}}>
            Please click "Connect to Supabase" in the top right to set up your database.
          </p>
          <p className="md-caption" style={{color: 'var(--md-grey-500)'}}>
            Error: {error}
          </p>
        </div>
      </div>
    );
  }
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Add Sales', icon: Plus },
    { id: 'expenses', label: 'Add Expense', icon: Minus },
    { id: 'customers', label: 'Add Customer', icon: Users },
    { id: 'stock', label: 'Stock Movement', icon: Package },
    { id: 'data', label: 'View Data', icon: FileText }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))'}}>
        <div className="advanced-card p-8 w-full max-w-md fade-in text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Al Majid Food Service" 
                className="h-20 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-3xl shadow-lg">
                🚐
              </div>
            </div>
            <h1 className="text-4xl font-bold text-blue-800 mb-2">
              Van Sales Portal
            </h1>
            <p className="text-gray-600">Al Majid Jawad Van Sales Management System</p>
          </div>
          
          <div className="flex justify-center">
            <button onClick={handleLogin} className="btn-gradient py-4 px-8 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
            <span className="mr-2">🔐</span>
            Login to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))'}}>
      {/* Company Logo Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl">
        <div className="flex items-center justify-center py-4 px-6">
          <div className="w-full flex justify-center items-center">
            <div className="flex items-center">
              <center><img src="src/assets/image.png" alt="Al Majid Food Service" 
                className="h-12 w-auto mr-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              /></center>
              <div className="hidden items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 text-white text-2xl mr-4 shadow-lg">
                🚐
              </div>
              <center><div className="text-center">
                <h1 className="md-h5 text-white mb-0">
                  Al Majid Jawad Food Service
                </h1>
                <p className="md-caption text-white opacity-90 mb-0">Professional Van Sales Management System</p>
              </div></center>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 top-16 z-50 w-64 glass-card transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 slide-in-left`}>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🚐
                </div>
                <span className="text-xl font-semibold text-white">Sales Dashboard</span></div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-gray-200 ml-auto"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="mt-6 px-3">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-all hover:bg-white hover:bg-opacity-10 ${
                          activeTab === item.id ? 'bg-white bg-opacity-20 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.username} ({user.role})
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg py-2 px-4 text-sm font-medium hover:shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0 max-w-full">
            {/* Header */}
            <div className="advanced-card border-b border-gray-200">
              <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden btn-gradient p-2 mr-4 rounded-lg"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="text-xl font-semibold text-blue-800">
                    {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="btn-success cursor-pointer text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    Import Excel
                    <input 
                      type="file" 
                      accept=".xlsx, .xls" 
                      onChange={(e) => importFromExcel(e, activeTab === 'data' ? 'sales' : activeTab)} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <main className="p-6 fade-in max-w-6xl mx-auto">
              {/* Database Error Alert */}
              {dbError && (
                <div className="mb-6 advanced-card p-4 border-l-4 border-red-500 bg-red-50">
                  <div className="flex items-center">
                    <div className="text-red-500 mr-3">⚠️</div>
                    <div>
                      <p className="text-sm text-red-800">{dbError}</p>
                      <button 
                        onClick={() => setDbError(null)}
                        className="text-red-600 hover:text-red-800 text-sm mt-2 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {loading && (
                <div className="mb-6 advanced-card p-4 text-center">
                  <div className="loading-spinner inline-block mr-3"></div>
                  <span className="text-sm">Syncing with database...</span>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <Dashboard 
                  entries={entries} 
                  expenses={expenses} 
                  customers={customers} 
                  stockMovements={stockMovements} 
                />
              )}
              
              {activeTab === 'sales' && (
                <SalesForm 
                  onSubmit={handleAddSalesEntry} 
                  customers={customers} 
                  user={user} 
                />
              )}
              
              {activeTab === 'expenses' && (
                <ExpenseForm 
                  onSubmit={handleAddExpense} 
                  user={user} 
                />
              )}
              
              {activeTab === 'customers' && (
                <CustomerForm 
                  onSubmit={handleAddCustomer} 
                />
              )}
              
              {activeTab === 'stock' && (
                <StockForm 
                  onSubmit={handleAddStockMovement} 
                  user={user} 
                />
              )}
              
              {activeTab === 'data' && (
                <DataTables 
                  entries={entries} 
                  expenses={expenses} 
                  customers={customers} 
                  stockMovements={stockMovements} 
                  onExport={exportToExcel} 
                />
              )}
            </main>
          </div>
        </div>
      </div>
    
  );
}

export default VanSalesPortal;
