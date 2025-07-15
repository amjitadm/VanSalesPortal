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
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8 px-4 md-text-center">
        
        {/* Header Section */}
        <div className="mb-8 md-fade-in">
          <h1 className="md-h3 md-text-primary mb-2">
            Sales Dashboard
          </h1>
          <p className="md-subtitle1" style={{color: 'var(--md-grey-600)'}}>Real-time insights for your van sales operations</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md-slide-up">
          
          {/* Today's Sales */}
          <div className="md-metric-card md-metric-card-success">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white md-caption font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {salesGrowth}%
              </div>
            </div>
            <div>
              <p className="md-caption text-white opacity-90 mb-1">Today's Sales</p>
              <p className="md-h4 text-white">QAR {todaysSales.toLocaleString()}</p>
            </div>
          </div>

          {/* Today's Expenses */}
          <div className="md-metric-card md-metric-card-error">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white md-caption font-medium">
                <ArrowDown className="w-4 h-4 mr-1" />
                {Math.abs(expenseGrowth)}%
              </div>
            </div>
            <div>
              <p className="md-caption text-white opacity-90 mb-1">Today's Expenses</p>
              <p className="md-h4 text-white">QAR {todaysExpenses.toLocaleString()}</p>
            </div>
          </div>

          {/* Total Customers */}
          <div className="md-metric-card" style={{background: 'linear-gradient(135deg, var(--md-primary-500), var(--md-primary-600))'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white md-caption font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {customerGrowth}%
              </div>
            </div>
            <div>
              <p className="md-caption text-white opacity-90 mb-1">Total Customers</p>
              <p className="md-h4 text-white">{totalCustomers.toLocaleString()}</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="md-metric-card md-metric-card-warning">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-white md-caption font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                {routeGrowth}%
              </div>
            </div>
            <div>
              <p className="md-caption text-white opacity-90 mb-1">Active Routes</p>
              <p className="md-h4 text-white">{activeRoutes}</p>
            </div>
          </div>
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md-slide-up">
          
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-2 md-card md-elevation-4 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="md-h6 md-text-primary">
                  Weekly Sales Overview
                </h3>
                <p className="md-body2" style={{color: 'var(--md-grey-600)'}}>Sales performance over the last 7 days</p>
              </div>
              <div className="p-2 md-bg-primary rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div 
                    className="w-full relative rounded-t-md transition-all duration-300 hover:scale-110" 
                    style={{ 
                      background: 'linear-gradient(135deg, var(--md-primary-500), var(--md-primary-600))',
                      height: `${(day.sales / maxSales) * 200 + 20}px`,
                      minHeight: '20px'
                    }}
                    style={{ 
                      height: `${(day.sales / maxSales) * 200 + 20}px`,
                      minHeight: '20px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 md-card md-elevation-2 md-caption px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      QAR {day.sales.toFixed(0)}
                    </div>
                  </div>
                  <span className="md-body2 font-medium mt-3" style={{color: 'var(--md-grey-700)'}}>{day.day}</span>
                  <span className="md-caption" style={{color: 'var(--md-grey-500)'}}>QAR {day.sales.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            
            {/* Net Profit Card */}
            <div className="md-card md-elevation-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 md-bg-success rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className={`md-chip ${netProfit >= 0 ? 'md-chip-success' : 'md-chip-error'}`}>
                  {netProfit >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {Math.abs((netProfit / (todaysSales || 1)) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <p className="md-body2 font-medium mb-1" style={{color: 'var(--md-grey-600)'}}>Net Profit Today</p>
                <p className={`md-h5 ${netProfit >= 0 ? 'md-text-success' : 'md-text-error'}`}>
                  QAR {netProfit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Total Entries Card */}
            <div className="md-card md-elevation-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 md-bg-primary rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="md-chip md-chip-primary">+{entries.length}</span>
              </div>
              <div>
                <p className="md-body2 font-medium mb-1" style={{color: 'var(--md-grey-600)'}}>Total Entries</p>
                <p className="md-h5" style={{color: 'var(--md-grey-900)'}}>{entries.length.toLocaleString()}</p>
              </div>
            </div>

            {/* Stock Movements Card */}
            <div className="md-card md-elevation-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 md-bg-warning rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="md-chip md-chip-warning">+{stockMovements.length}</span>
              </div>
              <div>
                <p className="md-body2 font-medium mb-1" style={{color: 'var(--md-grey-600)'}}>Stock Movements</p>
                <p className="md-h5" style={{color: 'var(--md-grey-900)'}}>{stockMovements.length.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
