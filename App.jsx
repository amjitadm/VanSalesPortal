import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './src/styles/material-theme.css';
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
  
  // Data states
  const [entries, setEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stockMovements, setStockMovements] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('vanSalesEntries');
    const savedExpenses = localStorage.getItem('vanSalesExpenses');
    const savedCustomers = localStorage.getItem('vanSalesCustomers');
    const savedStock = localStorage.getItem('vanSalesStock');

    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    if (savedStock) setStockMovements(JSON.parse(savedStock));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('vanSalesEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('vanSalesExpenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('vanSalesCustomers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('vanSalesStock', JSON.stringify(stockMovements));
  }, [stockMovements]);

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

  const addSalesEntry = (entry) => {
    setEntries(prev => [...prev, entry]);
    
    // Update customer purchase history if customer exists
    if (entry.customer) {
      setCustomers(prev => prev.map(customer => {
        if (customer.name === entry.customer) {
          return {
            ...customer,
            totalPurchases: (customer.totalPurchases || 0) + parseFloat(entry.total),
            lastPurchase: entry.date
          };
        }
        return customer;
      }));
    }
  };

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const addCustomer = (customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const addStockMovement = (movement) => {
    setStockMovements(prev => [...prev, movement]);
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
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{backgroundColor: 'var(--md-grey-100)'}}>
        <div className="md-card md-elevation-8 p-8 w-full max-w-md md-fade-in md-text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Al Majid Food Service" 
                className="h-20 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center w-20 h-20 rounded-full md-bg-primary text-white text-3xl">
                🚐
              </div>
            </div>
            <h1 className="md-h4 md-text-primary mb-2">
              Van Sales Portal
            </h1>
            <p className="md-body2" style={{color: 'var(--md-grey-600)'}}>Al Majid Jawad Van Sales Management System</p>
          </div>
          
          <div className="flex justify-center">
            <button onClick={handleLogin} className="md-button md-button-contained py-4 px-8 text-lg">
            <span className="mr-2">🔐</span>
            Login to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--md-grey-50)'}}><center>
      {/* Company Logo Header */}
      <header className="md-app-bar">
        <div className="md-toolbar">
          <div className="w-full flex justify-center items-center">
            <div className="flex items-center">
              <center><img src="/logo.png" alt="Al Majid Food Service" 
                className="h-12 w-auto mr-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              /></center>
              <div className="hidden items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 text-white text-2xl mr-4">
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
          <div className={`fixed inset-y-0 left-0 top-16 z-50 w-64 md-card md-elevation-16 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 md-slide-up`}>
            <div className="md-drawer-header">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-2xl">
                  🚐
                </div>
                <center><span className="md-h6 text-white">Sales Dashboard</span></center>
              </div>
            </div>
            
            <nav className="mt-6 px-3">
              <ul className="md-nav-list">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full md-nav-item ${
                          activeTab === item.id ? 'active' : ''
                        }`}
                      >
                        <Icon className="md-nav-icon" />
                        <span className="md-body2">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="absolute bottom-0 w-full p-4 border-t" style={{borderColor: 'var(--md-grey-200)'}}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 md-bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="md-body2 font-medium" style={{color: 'var(--md-grey-900)'}}>
                    {user.username} ({user.role})
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full md-button md-button-contained md-button-error text-sm py-2"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0 max-w-full">
            {/* Header */}
            <div className="md-card md-elevation-2 border-b" style={{borderColor: 'var(--md-grey-200)'}}>
              <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden md-button md-button-contained p-2 mr-4"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="md-h6 md-text-primary">
                    {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="md-button md-button-contained md-button-success cursor-pointer text-sm">
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
            <main className="p-6 md-fade-in max-w-6xl mx-auto">
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
                  onSubmit={addSalesEntry} 
                  customers={customers} 
                  user={user} 
                />
              )}
              
              {activeTab === 'expenses' && (
                <ExpenseForm 
                  onSubmit={addExpense} 
                  user={user} 
                />
              )}
              
              {activeTab === 'customers' && (
                <CustomerForm 
                  onSubmit={addCustomer} 
                />
              )}
              
              {activeTab === 'stock' && (
                <StockForm 
                  onSubmit={addStockMovement} 
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

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default VanSalesPortal;
