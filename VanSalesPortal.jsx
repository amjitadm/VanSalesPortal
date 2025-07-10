import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

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
    <div className="p-6 grid gap-4 font-sans">
      <Card>
        <CardContent className="grid grid-cols-2 gap-4">
          {Object.keys(form).map(key => (
            <Input key={key} placeholder={key} name={key} value={form[key]} onChange={handleChange} />
          ))}
          <Button onClick={addEntry} className="col-span-2">Add Entry</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Sales Summary</h2>
          <table className="w-full text-sm">
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
                    <td key={j} className="border p-1 text-center">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}