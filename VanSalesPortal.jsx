import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import logo from '/logo.png';

const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'fsuser', password: 'fsuser456' }
];

function VanSalesPortal() {
  const [form, setForm] = useState({
    date: '',
    product: '',
    quantity: '',
    price: '',
    salesperson: ''
  });

  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const [summary, setSummary] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseFloat(form.quantity || 0) * parseFloat(form.price || 0);
    const newEntry = { ...form, salesperson: user.username, total };
    const updated = [...entries, newEntry];
    setEntries(updated);
    setForm({ date: '', product: '', quantity: '', price: '', salesperson: '' });
    calculateSummary(updated);
  };

  const calculateSummary = (entryList) => {
    const sums = {};
    for (const e of entryList) {
      const key = `${e.date}-${e.salesperson}`;
      sums[key] = (sums[key] || 0) + (parseFloat(e.total) || 0);
    }
    setSummary(sums);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    XLSX.writeFile(wb, "van_sales.xlsx");
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setEntries(json);
      calculateSummary(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleLogin = () => {
    const username = prompt("Username:");
    const password = prompt("Password:");
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) setUser(found);
    else alert("Invalid credentials");
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true;
    const now = new Date();
    const entryDate = new Date(entry.date);
    if (filter === 'daily') {
      return entryDate.toDateString() === now.toDateString();
    }
    if (filter === 'weekly') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return entryDate >= weekAgo && entryDate <= now;
    }
    return true;
  });

  return (
    <center><div className="p-6 max-w-6xl mx-auto space-y-8 text-sm md:text-base">
      {!user ? (
        <div className="flex flex-col items-center space-y-6 text-center">
          <img src="main/logo.png" alt="Company Logo"/>
          <h1 className="text-3xl font-bold text-gray-900">Van Sales Portal</h1>
          <button onClick={handleLogin} className="bg-gray-700 text-white text-lg px-6 py-2 rounded shadow hover:bg-gray-800">LOGIN</button>
        </div>
      ) : (
        <>
          <img src="logo.png" alt="Company Logo"/>
          <h1 className="text-3xl font-bold text-blue-800 text-center">Van Sales Portal</h1>
          <p className="text-gray-600 text-center">Logged in as <strong>{user.username}</strong></p>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-xl">
            <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" className="p-2 border rounded" />
            <input name="product" value={form.product} onChange={handleChange} placeholder="Product" className="p-2 border rounded" />
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="p-2 border rounded" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Unit Price" type="number" className="p-2 border rounded" />
            <button type="submit" className="col-span-2 md:col-span-1 bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Add Entry</button>
          </form>

          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={exportToExcel} className="bg-green-600 text-white rounded p-2 hover:bg-green-700">Export to Excel</button>
            <label className="bg-yellow-500 text-white rounded p-2 cursor-pointer hover:bg-yellow-600">
              Import from Excel
              <input type="file" accept=".xlsx, .xls" onChange={importFromExcel} className="hidden" />
            </label>
            <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
              <option value="all">All</option>
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
            </select>
          </div>
        </center>
          <div className="bg-white shadow-md rounded-xl p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Sales Summary</h2>
            <table className="min-w-full table-auto border text-sm md:text-base">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Salesperson</th>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Unit Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, idx) => (
                  <tr key={idx} className="text-center hover:bg-gray-100">
                    <td className="p-2 border">{entry.date}</td>
                    <td className="p-2 border">{entry.salesperson || 'N/A'}</td>
                    <td className="p-2 border">{entry.product}</td>
                    <td className="p-2 border">{entry.quantity}</td>
                    <td className="p-2 border">{entry.price}</td>
                    <td className="p-2 border">{parseFloat(entry.total).toFixed(2)}</td>
                  </tr>
                ))}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-400">No sales logged for selected period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Total Sales per Day & Salesperson</h2>
            <table className="min-w-full table-auto border text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Salesperson</th>
                  <th className="p-2 border">Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary).map(([key, value], idx) => {
                  const [date, person] = key.split('-');
                  return (
                    <tr key={idx} className="text-center hover:bg-gray-100">
                      <td className="p-2 border">{date}</td>
                      <td className="p-2 border">{person}</td>
                      <td className="p-2 border">{value.toFixed(2)}</td>
                    </tr>
                  );
                })}
                {Object.keys(summary).length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-400">No summary available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default VanSalesPortal;
