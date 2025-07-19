/*
  # Van Sales Portal Database Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `phone` (text, required)
      - `email` (text, optional)
      - `address` (text, optional)
      - `city` (text, optional)
      - `credit_limit` (decimal, default 0)
      - `total_purchases` (decimal, default 0)
      - `last_purchase` (date, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `sales_entries`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `product` (text, required)
      - `quantity` (decimal, required)
      - `price` (decimal, required)
      - `total` (decimal, required)
      - `van` (text, optional)
      - `route` (text, optional)
      - `stock_loaded` (integer, optional)
      - `customer_id` (uuid, foreign key)
      - `customer_name` (text, optional)
      - `customer_phone` (text, optional)
      - `customer_address` (text, optional)
      - `payment_method` (text, default 'cash')
      - `remarks` (text, optional)
      - `salesperson` (text, required)
      - `created_at` (timestamp)

    - `expenses`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `category` (text, required)
      - `description` (text, required)
      - `amount` (decimal, required)
      - `van` (text, optional)
      - `receipt` (text, optional)
      - `remarks` (text, optional)
      - `salesperson` (text, required)
      - `created_at` (timestamp)

    - `stock_movements`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `product` (text, required)
      - `type` (text, required) -- load, unload, transfer, return, damage
      - `quantity` (integer, required)
      - `van` (text, optional)
      - `location` (text, optional)
      - `reason` (text, optional)
      - `remarks` (text, optional)
      - `salesperson` (text, required)
      - `created_at` (timestamp)

    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required, unique)
      - `category` (text, optional)
      - `unit_price` (decimal, default 0)
      - `stock_quantity` (integer, default 0)
      - `min_stock_level` (integer, default 0)
      - `description` (text, optional)
      - `active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Add policies for reading data based on user roles

  3. Indexes
    - Add indexes for frequently queried columns
    - Add foreign key constraints
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text,
  city text,
  credit_limit decimal(10,2) DEFAULT 0,
  total_purchases decimal(10,2) DEFAULT 0,
  last_purchase date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text,
  unit_price decimal(10,2) DEFAULT 0,
  stock_quantity integer DEFAULT 0,
  min_stock_level integer DEFAULT 0,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sales_entries table
CREATE TABLE IF NOT EXISTS sales_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  product text NOT NULL,
  quantity decimal(10,2) NOT NULL,
  price decimal(10,2) NOT NULL,
  total decimal(10,2) NOT NULL,
  van text,
  route text,
  stock_loaded integer,
  customer_id uuid REFERENCES customers(id),
  customer_name text,
  customer_phone text,
  customer_address text,
  payment_method text DEFAULT 'cash',
  remarks text,
  salesperson text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  van text,
  receipt text,
  remarks text,
  salesperson text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create stock_movements table
CREATE TABLE IF NOT EXISTS stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  product text NOT NULL,
  type text NOT NULL CHECK (type IN ('load', 'unload', 'transfer', 'return', 'damage')),
  quantity integer NOT NULL,
  van text,
  location text,
  reason text,
  remarks text,
  salesperson text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Create policies for customers
CREATE POLICY "Users can read all customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for products
CREATE POLICY "Users can read all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for sales_entries
CREATE POLICY "Users can read all sales entries"
  ON sales_entries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert sales entries"
  ON sales_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update sales entries"
  ON sales_entries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for expenses
CREATE POLICY "Users can read all expenses"
  ON expenses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert expenses"
  ON expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update expenses"
  ON expenses
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for stock_movements
CREATE POLICY "Users can read all stock movements"
  ON stock_movements
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert stock movements"
  ON stock_movements
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update stock movements"
  ON stock_movements
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_sales_entries_date ON sales_entries(date);
CREATE INDEX IF NOT EXISTS idx_sales_entries_salesperson ON sales_entries(salesperson);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_stock_movements_date ON stock_movements(date);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON stock_movements(product);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();