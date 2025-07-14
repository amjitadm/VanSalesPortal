import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './src/styles/advanced-theme.css';
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="advanced-card glass-card p-8 w-full max-w-md fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-3xl pulse-animation">
              🚐
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              Van Sales Portal
            </h1>
            <p className="text-gray-600">Professional Sales Management System</p>
          </div>
          
          <button onClick={handleLogin} className="w-full btn-gradient py-4 text-lg">
            <span className="mr-2">🔐</span>
            Login to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 advanced-card transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 slide-in-left`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-primary text-white">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
              🚐
            </div>
            <span className="font-semibold text-lg">Sales Dashboard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-primary text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:transform hover:scale-102'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
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
            className="w-full btn-danger text-sm py-2"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="advanced-card shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden btn-gradient p-2 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-primary">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="btn-success cursor-pointer text-sm">
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
        </header>

        {/* Page Content */}
        <main className="p-6 fade-in">
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

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div></center>
    </div>
  );
}

export default VanSalesPortal;
