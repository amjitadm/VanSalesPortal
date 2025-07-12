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
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Sales</p>
              <p className="text-2xl font-bold">${todaysSales.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Today's Expenses</p>
              <p className="text-2xl font-bold">${todaysExpenses.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Routes</p>
              <p className="text-2xl font-bold">{activeRoutes}</p>
            </div>
            <MapPin className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Weekly Sales Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Sales Overview
        </h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                style={{ 
                  height: `${(day.sales / maxSales) * 120 + 20}px`,
                  minHeight: '20px'
                }}
                title={`${day.day}: $${day.sales.toFixed(2)}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{day.day}</span>
              <span className="text-xs text-gray-500">${day.sales.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <h4 className="font-semibold text-gray-800 mb-2">Net Profit Today</h4>
          <p className={`text-2xl font-bold ${todaysSales - todaysExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${(todaysSales - todaysExpenses).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <h4 className="font-semibold text-gray-800 mb-2">Total Entries</h4>
          <p className="text-2xl font-bold text-blue-600">{entries.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <h4 className="font-semibold text-gray-800 mb-2">Stock Movements</h4>
          <p className="text-2xl font-bold text-purple-600">{stockMovements.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;