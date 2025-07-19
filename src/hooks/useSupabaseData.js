import { useState, useEffect } from 'react';
import { 
  customerService, 
  salesService, 
  expenseService, 
  stockService, 
  productService 
} from '../lib/supabase';

export function useSupabaseData() {
  const [data, setData] = useState({
    customers: [],
    sales: [],
    expenses: [],
    stockMovements: [],
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [customers, sales, expenses, stockMovements, products] = await Promise.all([
        customerService.getAll(),
        salesService.getAll(),
        expenseService.getAll(),
        stockService.getAll(),
        productService.getAll()
      ]);

      setData({
        customers,
        sales,
        expenses,
        stockMovements,
        products
      });
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Customer operations
  const addCustomer = async (customerData) => {
    try {
      const newCustomer = await customerService.create(customerData);
      setData(prev => ({
        ...prev,
        customers: [newCustomer, ...prev.customers]
      }));
      return newCustomer;
    } catch (err) {
      console.error('Error adding customer:', err);
      throw err;
    }
  };

  const updateCustomer = async (id, updates) => {
    try {
      const updatedCustomer = await customerService.update(id, updates);
      setData(prev => ({
        ...prev,
        customers: prev.customers.map(c => c.id === id ? updatedCustomer : c)
      }));
      return updatedCustomer;
    } catch (err) {
      console.error('Error updating customer:', err);
      throw err;
    }
  };

  // Sales operations
  const addSalesEntry = async (entryData) => {
    try {
      const newEntry = await salesService.create(entryData);
      setData(prev => ({
        ...prev,
        sales: [newEntry, ...prev.sales]
      }));

      // Update customer total purchases if customer exists
      if (entryData.customer_id) {
        const customer = data.customers.find(c => c.id === entryData.customer_id);
        if (customer) {
          await updateCustomer(entryData.customer_id, {
            total_purchases: (customer.total_purchases || 0) + parseFloat(entryData.total),
            last_purchase: entryData.date
          });
        }
      }

      return newEntry;
    } catch (err) {
      console.error('Error adding sales entry:', err);
      throw err;
    }
  };

  // Expense operations
  const addExpense = async (expenseData) => {
    try {
      const newExpense = await expenseService.create(expenseData);
      setData(prev => ({
        ...prev,
        expenses: [newExpense, ...prev.expenses]
      }));
      return newExpense;
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  };

  // Stock operations
  const addStockMovement = async (movementData) => {
    try {
      const newMovement = await stockService.create(movementData);
      setData(prev => ({
        ...prev,
        stockMovements: [newMovement, ...prev.stockMovements]
      }));
      return newMovement;
    } catch (err) {
      console.error('Error adding stock movement:', err);
      throw err;
    }
  };

  // Product operations
  const addProduct = async (productData) => {
    try {
      const newProduct = await productService.create(productData);
      setData(prev => ({
        ...prev,
        products: [newProduct, ...prev.products]
      }));
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    loadData,
    addCustomer,
    updateCustomer,
    addSalesEntry,
    addExpense,
    addStockMovement,
    addProduct
  };
}