// src/pages/Accountspage.jsx
import React, { useState } from 'react';
import DataGrid from '../components/Datagrid';
import api from '../services/http';

function fetchAccounts({ search = '', page = 1, pageSize = 10, sort }) {
  const params = { search, page, pageSize };
  if (sort?.field) params.sort = `${sort.field}:${sort.dir}`;
  return api.get('/accounts', { params }).then(r => r.data);
}

function AmountModal({ title, onSubmit, onClose, loading }) {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow z-50 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="mb-2">
          <label className="block text-sm">Amount</label>
          <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Description</label>
          <input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={() => onSubmit({ amount: parseFloat(amount), description: desc })} disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">
            {loading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TransferModal({ accounts, onSubmit, onClose, loading }) {
  const [toId, setToId] = useState(accounts?.[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow z-50 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Transfer</h3>
        <div className="mb-2">
          <label className="block text-sm">To Account</label>
          <select className="w-full border p-2 rounded" value={toId} onChange={e=>setToId(e.target.value)}>
            {accounts.map(a => <option key={a.id} value={a.id}>{a.accountNumber} — {a.bankName || a.bank || 'Bank'}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm">Amount</label>
          <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Description</label>
          <input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={() => onSubmit({ toAccountId: toId, amount: parseFloat(amount), description: desc })} disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">
            {loading ? 'Transferring...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountsPage() {
  const [action, setAction] = useState(null); // {type, account}
  const [loading, setLoading] = useState(false);
  const [accountsList, setAccountsList] = useState([]); // used to provide transfer destination options

  const columns = [
    { key: 'accountNumber', title: 'Account #' },
    { key: 'bankName', title: 'Bank' },
    { key: 'branchName', title: 'Branch' },
    { key: 'balance', title: 'Balance', render: r => parseFloat(r.balance).toFixed(2) },
    { key: 'actions', title: 'Actions', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => setAction({ type: 'deposit', account: r })} className="text-sm px-2 py-1 bg-green-600 text-white rounded">Deposit</button>
        <button onClick={() => setAction({ type: 'withdraw', account: r })} className="text-sm px-2 py-1 bg-yellow-500 text-white rounded">Withdraw</button>
        <button onClick={() => { setAccountsList([]); setAction({ type: 'transfer', account: r })}} className="text-sm px-2 py-1 bg-blue-600 text-white rounded">Transfer</button>
        <button onClick={() => handleClose(r)} className="text-sm px-2 py-1 bg-red-600 text-white rounded">Close</button>
      </div>
    ) }
  ];

  async function handleClose(account) {
    if (!confirm('Close this account?')) return;
    try {
      var id = account?.id;
      await api.post(`/Accounts/${id}/close`);
      alert('Account closed');
      // refresh grid by triggering a dummy state change — DataGrid will call fetch again via props (it calls fetch when search/page changes),
      // to keep it simple just reload the page:
      window.location.reload();
    } catch (e) {
      alert('Close failed');
    }
  }

  async function handleAmountSubmit({ amount, description }) {
    if (!action) return;
    setLoading(true);
    try {
      if (action.type === 'deposit') {
        await api.post(`/accounts/${action.account.id}/deposit`, { amount, description });
      } else if (action.type === 'withdraw') {
        await api.post(`/accounts/${action.account.id}/withdraw`, { amount, description });
      }
      setAction(null);
      window.location.reload();
    } catch (e) {
      alert(e.response?.data?.message || 'Operation failed');
    } finally { setLoading(false); }
  }

  async function handleTransferSubmit({ toAccountId, amount, description }) {
    if (!action) return;
    setLoading(true);
    try {
      await api.post(`/accounts/${action.account.id}/transfer`, { toAccountId, amount, description });
      setAction(null);
      window.location.reload();
    } catch (e) {
      alert(e.response?.data?.message || 'Transfer failed');
    } finally { setLoading(false); }
  }

  // fetch accounts for transfer dropdown when opening transfer modal
  async function fetchAllAccountsForTransfer() {
    try {
      const r = await api.get('/accounts', { params: { page: 1, pageSize: 1000 } });
      setAccountsList(r.data.items || r.data.items || []);
    } catch (e) {
      setAccountsList([]);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Accounts</h2>

      <DataGrid fetchData={fetchAccounts} columns={columns} />

      {action && (action.type === 'deposit' || action.type === 'withdraw') && (
        <AmountModal
          title={`${action.type === 'deposit' ? 'Deposit' : 'Withdraw'} - ${action.account.accountNumber}`}
          onSubmit={handleAmountSubmit}
          onClose={()=>setAction(null)}
          loading={loading}
        />
      )}

      {action && action.type === 'transfer' && (
        <TransferModal
          accounts={accountsList.length ? accountsList : []}
          onSubmit={handleTransferSubmit}
          onClose={()=>setAction(null)}
          loading={loading}
        />
      )}

      {/* When user opens transfer modal, prefetch options */}
      {action && action.type === 'transfer' && accountsList.length === 0 && fetchAllAccountsForTransfer()}
    </div>
  );
}
