// src/pages/Transactionspage.jsx
import React, { useState } from 'react';
import DataGrid from '../components/Datagrid';
import api from '../services/http';
import { parseISO, formatISO } from 'date-fns';

function fetchTransactions({ search = '', page = 1, pageSize = 10, sort, from, to }) {
  const params = { search, page, pageSize };
  if (sort?.field) params.sort = `${sort.field}:${sort.dir}`;
  if (from) params.from = from;
  if (to) params.to = to;
  return api.get('/transactions', { params }).then(r => r.data);
}

export default function TransactionsPage() {
  const [range, setRange] = useState({ from: '', to: '' });

  const columns = [
    { key: 'createdAt', title: 'Date', render: r => (new Date(r.createdAt)).toLocaleString() },
    { key: 'type', title: 'Type' },
    { key: 'amount', title: 'Amount', render: r => parseFloat(r.amount).toFixed(2) },
    { key: 'description', title: 'Description' },
    { key: 'accountId', title: 'Account' }
  ];

  // wrapper for DataGrid so it passes filter args
  const fetcher = ({ search, page, pageSize, sort }) => {
    const payload = { search, page, pageSize, sort };
    if (range.from) payload.from = range.from;
    if (range.to) payload.to = range.to;
    return fetchTransactions(payload);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      <div className="mb-4 flex gap-2 items-center">
        <label className="text-sm">From</label>
        <input type="date" value={range.from} onChange={e => setRange(r => ({ ...r, from: e.target.value }))} className="border p-2 rounded" />
        <label className="text-sm">To</label>
        <input type="date" value={range.to} onChange={e => setRange(r => ({ ...r, to: e.target.value }))} className="border p-2 rounded" />
        <button onClick={() => { /* DataGrid will auto-fetch on search/page changes only, we trigger refresh by reloading page for simplicity */ window.location.reload() }} className="px-3 py-1 bg-blue-600 text-white rounded">Apply</button>
      </div>

      <DataGrid fetchData={fetcher} columns={columns} />
    </div>
  );
}
