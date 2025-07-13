import React from 'react';
import { TrendingUp, DollarSign, Package, Users, Calendar, MapPin } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-semibold">💰 Today's Sales</p>
              <p className="text-3xl font-black animate-pulse">QAR {todaysSales.toFixed(2)}</p>
            </div>
            <div className="text-5xl animate-bounce">💵</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-rose-400 via-pink-500 to-red-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm font-semibold">💸 Today's Expenses</p>
              <p className="text-3xl font-black animate-pulse">QAR {todaysExpenses.toFixed(2)}</p>
            </div>
            <div className="text-5xl animate-bounce">📉</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lime-100 text-sm font-semibold">👥 Total Customers</p>
              <p className="text-3xl font-black animate-pulse">{totalCustomers}</p>
            </div>
            <div className="text-5xl animate-bounce">👨‍👩‍👧‍👦</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm font-semibold">🗺️ Active Routes</p>
              <p className="text-3xl font-black animate-pulse">{activeRoutes}</p>
            </div>
            <div className="text-5xl animate-bounce">🚚</div>
          </div>
        </div>
      </div>

      {/* Weekly Sales Chart */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-2xl border-4 border-gradient-to-r from-blue-400 to-purple-400">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <div className="text-3xl animate-spin">📊</div>
          📈 Weekly Sales Overview 🎯
        </h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500 rounded-t-2xl w-full transition-all duration-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 hover:scale-110 shadow-lg"
                style={{ 
                  height: `${(day.sales / maxSales) * 120 + 20}px`,
                  minHeight: '20px'
                }}
                title={`${day.day}: $${day.sales.toFixed(2)}`}
              ></div>
              <span className="text-sm font-bold text-purple-700 mt-2">{day.day}</span>
              <span className="text-xs font-semibold text-pink-600">QAR {day.sales.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-3xl shadow-2xl border-4 border-yellow-300 hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
          <h4 className="font-bold text-orange-800 mb-2 text-lg">💎 Net Profit Today</h4>
          <p className={`text-2xl font-bold ${todaysSales - todaysExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${(todaysSales - todaysExpenses).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-3xl shadow-2xl border-4 border-cyan-300 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
          <h4 className="font-bold text-blue-800 mb-2 text-lg">📝 Total Entries</h4>
          <p className="text-2xl font-bold text-blue-600">{entries.length}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-2xl border-4 border-purple-300 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
          <h4 className="font-bold text-purple-800 mb-2 text-lg">📦 Stock Movements</h4>
          <p className="text-2xl font-bold text-purple-600">{stockMovements.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;