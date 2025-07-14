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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 p-6 relative overflow-hidden"><center>
      {/* Animated Van Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 animate-pulse">
          <div className="text-6xl opacity-20 animate-bounce">🚐</div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <div className="text-4xl opacity-15 animate-bounce">🚚</div>
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <div className="text-5xl opacity-10 animate-bounce">🚛</div>
        </div>
        
        {/* Moving Van Animation */}
        <div className="absolute top-1/2 left-0 w-full">
          <div className="animate-van-drive">
            <div className="text-8xl opacity-5">🚐💨</div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-1/4 animate-float">
          <div className="text-3xl opacity-20">💰</div>
        </div>
        <div className="absolute top-60 right-1/4 animate-float delay-500">
          <div className="text-3xl opacity-20">📊</div>
        </div>
        <div className="absolute bottom-60 left-1/3 animate-float delay-1000">
          <div className="text-3xl opacity-20">📈</div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
            🚐 Al Majid Food Service Sales Dashboard 📊
          </h1>
          <p className="text-xl text-blue-100 drop-shadow-md">Real-time insights for your van sales operations</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
          
          {/* Today's Sales */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl animate-pulse">
                <DollarSign className="w-6 h-6 text-emerald-600 animate-bounce" />
              </div>
              <div className="flex items-center text-emerald-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {salesGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Today's Sales</p>
              <p className="text-3xl font-bold text-gray-900">QAR {todaysSales.toLocaleString()}</p>
            </div>
          </div>

          {/* Today's Expenses */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-xl animate-pulse">
                <TrendingUp className="w-6 h-6 text-red-600 animate-bounce" />
              </div>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <ArrowDown className="w-4 h-4 mr-1" />
                {Math.abs(expenseGrowth)}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Today's Expenses</p>
              <p className="text-3xl font-bold text-gray-900">QAR {todaysExpenses.toLocaleString()}</p>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl animate-pulse">
                <Users className="w-6 h-6 text-blue-600 animate-bounce" />
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {customerGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{totalCustomers.toLocaleString()}</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl animate-pulse">
                <MapPin className="w-6 h-6 text-purple-600 animate-bounce" />
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {routeGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Routes</p>
              <p className="text-3xl font-bold text-gray-900">{activeRoutes}</p>
            </div>
          </div>
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Weekly Sales Overview</h3>
                <p className="text-gray-600 text-sm">Sales performance over the last 7 days</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-500 group-hover:scale-110 shadow-lg relative animate-pulse"
                    style={{ 
                      height: `${(day.sales / maxSales) * 200 + 20}px`,
                      minHeight: '20px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
                <div className={`flex items-center text-sm font-medium ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
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
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-blue-600 text-sm font-medium">+{entries.length}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">{entries.length.toLocaleString()}</p>
              </div>
            </div>

            {/* Stock Movements Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-blue-200 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-purple-600 text-sm font-medium">+{stockMovements.length}</span>
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
