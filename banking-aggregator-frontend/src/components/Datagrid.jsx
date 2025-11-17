// src/components/DataGrid.jsx
import React, { useEffect, useState } from 'react';

export default function DataGrid({ fetchData, columns }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState({ field: null, dir: null });
  const [data, setData] = useState({ items: [], total: 0, loading: true });

  useEffect(() => {
    let mounted = true;
    setData(d => ({ ...d, loading: true }));
    fetchData({ search, page, pageSize, sort }).then(res => {
      if (!mounted) return;
      // API returns { items, total } or { items: ..., total: ... }
      const items = res.items ?? res;
      const total = res.total ?? (Array.isArray(res) ? res.length : 0);
      setData({ items, total, loading: false });
    }).catch(()=> setData(d => ({ ...d, loading:false })));
    return () => { mounted = false; };
  }, [search, page, pageSize, sort, fetchData]);

  function onSort(field) {
    setSort(s => {
      if (s.field !== field) return { field, dir: 'asc' };
      if (s.dir === 'asc') return { field, dir: 'desc' };
      return { field: null, dir: null };
    });
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <input value={search} onChange={e=>{ setSearch(e.target.value); setPage(1); }} placeholder="Search..." className="border p-2 rounded w-64" />
        <div>Page {page}</div>
      </div>

      <div className="bg-white border rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="p-2 text-left">
                  <button onClick={() => onSort(col.key)} className="flex items-center gap-2">
                    {col.title}
                    {sort.field === col.key && <span>{sort.dir === 'asc' ? '▲' : '▼'}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.loading ? (
              <tr><td colSpan={columns.length} className="p-4">Loading...</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={columns.length} className="p-4">No records</td></tr>
            ) : data.items.map(row => (
              <tr key={row.id ?? Math.random()} className="border-t">
                {columns.map(col => <td key={col.key} className="p-2">{col.render ? col.render(row) : (row[col.key] ?? '')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
        <button onClick={() => setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
        <div className="ml-auto">Total: {data.total}</div>
      </div>
    </div>
  );
}
