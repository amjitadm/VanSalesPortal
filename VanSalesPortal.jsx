import React, { useState } from 'react';

export default function VanSalesPortal() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: '',
    salesperson: '',
    vanNumber: '',
    route: '',
    product: '',
    loaded: '',
    returned: '',
    sold: '',
    unitPrice: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    const totalSales = parseFloat(form.sold) * parseFloat(form.unitPrice);
    setEntries([...entries, { ...form, totalSales }]);
    setForm({ date: '', salesperson: '', vanNumber: '', route: '', product: '', loaded: '', returned: '', sold: '', unitPrice: '' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Van Sales Entry</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {Object.keys(form).map(key => (
          <input key={key} placeholder={key} name={key} value={form[key]} onChange={handleChange} />
        ))}
        <button onClick={addEntry} style={{ gridColumn: 'span 2' }}>Add Entry</button>
      </div>

      <h2 style={{ marginTop: '40px' }}>Sales Summary</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Salesperson</th>
            <th>Van</th>
            <th>Route</th>
            <th>Product</th>
            <th>Loaded</th>
            <th>Returned</th>
            <th>Sold</th>
            <th>Unit Price</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              {Object.values(entry).map((val, j) => (
                <td key={j} style={{ textAlign: 'center' }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}