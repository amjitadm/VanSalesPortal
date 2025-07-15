import React from 'react';
import { TrendingUp, DollarSign, Package, Users, Calendar, MapPin, ArrowUp, ArrowDown } from 'lucide-react';

function Dashboard({ entries, expenses, customers, stockMovements }) {
  const today = new Date().toISOString().split('T')[0];
  
  const todaysSales = entries
    .filter(entry => entry.date === today)
    .reduce((sum, entry) => sum + (parseFloat(entry.total) || 0), 0);
  
  const todaysExpenses = expenses
    .filter(expense => expense.date === today)
    .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);
  
  const totalCustomers = customers.length;
  const activeRoutes = [...new Set(entries.map(entry => entry.route).filter(Boolean))].length;
  
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const sales = entries
      .filter(entry => entry.date === dateStr)
      .reduce((sum, entry) => sum + (parseFloat(entry.total) || 0), 0);
    
    return {
      date: dateStr,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      sales
    };
  }).reverse();

  const maxSales = Math.max(...weeklyData.map(d => d.sales), 1);
  const netProfit = todaysSales - todaysExpenses;

  // Calculate growth percentages (mock data for demo)
  const salesGrowth = 12.5;
  const expenseGrowth = -8.2;
  const customerGrowth = 15.3;
  const routeGrowth = 5.7;

  return (
    <div className="min-h-screen"><center>
      <div className="max-w-6xl mx-auto space-y-8 px-4">
        
        {/* Header Section */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
            Sales Dashboard
          </h1>
          <p className="text-lg text-gray-600">Real-time insights for your van sales operations</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 slide-in-up">
          
          {/* Today's Sales */}
          <div className="advanced-card metric-card p-6" style={{background: 'var(--gradient-success)'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {salesGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white opacity-90 mb-1">Today's Sales</p>
              <p className="text-3xl font-bold text-white">QAR {todaysSales.toLocaleString()}</p>
            </div>
          </div>

          {/* Today's Expenses */}
          <div className="advanced-card metric-card p-6" style={{background: 'var(--gradient-danger)'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <ArrowDown className="w-4 h-4 mr-1" />
                {Math.abs(expenseGrowth)}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white opacity-90 mb-1">Today's Expenses</p>
              <p className="text-3xl font-bold text-white">QAR {todaysExpenses.toLocaleString()}</p>
            </div>
          </div>

          {/* Total Customers */}
          <div className="advanced-card metric-card p-6" style={{background: 'var(--gradient-info)'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {customerGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white opacity-90 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-white">{totalCustomers.toLocaleString()}</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="advanced-card metric-card p-6" style={{background: 'var(--gradient-warning)'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {routeGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white opacity-90 mb-1">Active Routes</p>
              <p className="text-3xl font-bold text-white">{activeRoutes}</p>
            </div>
          </div>
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 slide-in-left">
          
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-2 advanced-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-primary">
                  Weekly Sales Overview
                </h3>
                <p className="text-gray-600 text-sm">Sales performance over the last 7 days</p>
              </div>
              <div className="p-2 bg-gradient-primary rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div 
                    className="chart-bar w-full relative"
                    style={{ 
                      height: `${(day.sales / maxSales) * 200 + 20}px`,
                      minHeight: '20px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 advanced-card text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      QAR {day.sales.toFixed(0)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-3">{day.day}</span>
                  <span className="text-xs text-gray-500">QAR {day.sales.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            
            {/* Net Profit Card */}
            <div className="advanced-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-success rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className={`status-badge ${netProfit >= 0 ? 'success' : 'danger'}`}>
                  {netProfit >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {Math.abs((netProfit / (todaysSales || 1)) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Net Profit Today</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  QAR {netProfit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Total Entries Card */}
            <div className="advanced-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-primary rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="status-badge info">+{entries.length}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">{entries.length.toLocaleString()}</p>
              </div>
            </div>

            {/* Stock Movements Card */}
            <div className="advanced-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-warning rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="status-badge warning">+{stockMovements.length}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Stock Movements</p>
                <p className="text-2xl font-bold text-gray-900">{stockMovements.length.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

       
      </div></center>
    </div>
  );
}

export default Dashboard;
