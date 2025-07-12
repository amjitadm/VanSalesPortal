import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Company Logo" className="w-100 h-100 mx-auto mb-4 object-contain" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Van Sales Portal</h1>
            <p className="text-gray-600">Modern Sales Management System</p>
          </div>
          
          <button 
            onClick={handleLogin} 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
          >
            LOGIN
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo Credentials:</p>
            <p>admin / admin123 | fsuser / fsuser456</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-semibold text-gray-900 text-lg">Van Sales</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
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
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors text-sm">
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
        <main className="p-6">
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
    </div>
  );
}

export default VanSalesPortal;