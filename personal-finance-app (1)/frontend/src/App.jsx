import { useEffect, useState } from "react";

export default function App() {
  const [finance, setFinance] = useState([]);
  const [form, setForm] = useState({ type: "Income", category: "", amount: "", note: "" });
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchData = async () => {
    const res = await fetch(`${API}/finance`);
    setFinance(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/finance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ type: "Income", category: "", amount: "", note: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/finance/${id}`, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Personal Finance Tracker</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <select className="border p-2" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>Income</option>
          <option>Expense</option>
          <option>Loan</option>
          <option>Investment</option>
        </select>
        <input className="border p-2 flex-1" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input className="border p-2 w-32" type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
        <input className="border p-2 flex-1" placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 rounded">Add</button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <ul>
          {finance.map(item => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.type} | {item.category} | 💰 {item.amount} | 📝 {item.note}</span>
              <button onClick={() => handleDelete(item.id)} className="text-red-500">❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
