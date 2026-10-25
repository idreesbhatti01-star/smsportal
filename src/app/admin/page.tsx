'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'deposits' | 'pricing' | 'users'>('deposits');

  // Simulated Pending Deposit Requests from Users
  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'DEP-9021', user: 'Anees (Customer)', amount: 500, method: 'JazzCash', trxId: 'TRX88392019', screenshot: 'screenshot1.png', time: '10 mins ago', status: 'Pending' },
    { id: 'DEP-9022', user: 'Ali Raza', amount: 1200, method: 'EasyPaisa', trxId: 'EP9920112', screenshot: 'screenshot2.png', time: '25 mins ago', status: 'Pending' },
    { id: 'DEP-9023', user: 'Hamza Khan', amount: 300, method: 'NayaPay', trxId: 'NP5541209', screenshot: 'screenshot3.png', time: '1 hour ago', status: 'Approved' },
  ]);

  // Global Dynamic Service Prices
  const [services, setServices] = useState([
    { id: 'wa', name: 'WhatsApp', creationPrice: 150, verificationPrice: 170, icon: '💬' },
    { id: 'tg', name: 'Telegram', creationPrice: 120, verificationPrice: 140, icon: '✈️' },
    { id: 'fb', name: 'Facebook', creationPrice: 90, verificationPrice: 110, icon: '👥' },
    { id: 'gm', name: 'Gmail / Google', creationPrice: 100, verificationPrice: 125, icon: '🌐' },
  ]);

  // Login Handler for Admin
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'anees123') {
      setAdminLoggedIn(true);
    } else {
      alert('Ghalt Admin Key! Baraye karam sahi key darj karein.');
    }
  };

  // Approve Deposit Request
  const handleApproveDeposit = (id: string, amount: number, user: string) => {
    setPendingDeposits(pendingDeposits.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    alert(`Deposit ID ${id} Approved! PKR ${amount} credited to ${user}.`);
  };

  // Reject Deposit Request
  const handleRejectDeposit = (id: string) => {
    setPendingDeposits(pendingDeposits.map(d => d.id === id ? { ...d, status: 'Rejected' } : d));
    alert(`Deposit ID ${id} has been Rejected.`);
  };

  // Price Update Handlers
  const updateCreationPrice = (id: string, price: number) => {
    setServices(services.map(s => s.id === id ? { ...s, creationPrice: price } : s));
  };

  const updateVerificationPrice = (id: string, price: number) => {
    setServices(services.map(s => s.id === id ? { ...s, verificationPrice: price } : s));
  };

  // 1. Admin Passcode Screen (Security Layer)
  if (!adminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-3xl">🛡️</span>
            <h1 className="text-2xl font-bold text-white">SmsPortal Secure Admin</h1>
            <p className="text-xs text-slate-400">Enter secure admin key to access control panel.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Admin Security Key</label>
              <input
                type="password"
                placeholder="Enter key (e.g. anees123)"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition text-sm"
            >
              Unlock Admin Panel
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/dashboard" className="text-xs text-slate-500 hover:text-slate-300">
              ← Return to Customer Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Admin Control Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      
      {/* Top Admin Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            Admin Control Center
          </h1>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            System Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg">
            Customer View
          </Link>
          <button 
            onClick={() => setAdminLoggedIn(false)} 
            className="text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
          >
            Lock Panel
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto flex gap-3 mb-6 flex-wrap">
        <button 
          onClick={() => setActiveTab('deposits')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'deposits' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          💰 Pending Deposits ({pendingDeposits.filter(d => d.status === 'Pending').length})
        </button>
        <button 
          onClick={() => setActiveTab('pricing')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'pricing' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          ⚙️ Global Service Prices
        </button>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Tab 1: Deposits Approval Panel */}
        {activeTab === 'deposits' && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Customer Deposit Verification</h2>
                <p className="text-xs text-slate-400">Review submitted Trx IDs and screenshots to approve wallet balance.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                    <th className="pb-3">Request ID</th>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3">Transaction ID (TrxID)</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {pendingDeposits.map(d => (
                    <tr key={d.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 text-slate-400 font-mono text-xs">{d.id}</td>
                      <td className="py-3 font-medium text-white">{d.user}</td>
                      <td className="py-3 text-emerald-400 font-bold">PKR {d.amount}</td>
                      <td className="py-3 text-slate-300">{d.method}</td>
                      <td className="py-3 font-mono text-blue-400 bg-slate-950/50 px-2 rounded w-fit">{d.trxId}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          d.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          d.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {d.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleApproveDeposit(d.id, d.amount, d.user)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectDeposit(d.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 font-mono">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Global Pricing Control */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 max-w-2xl mx-auto shadow-xl">
            <div>
              <h2 className="text-lg font-semibold text-white">Global Price Configuration</h2>
              <p className="text-xs text-slate-400 mt-1">Updates made here immediately reflect on all customer dashboards.</p>
            </div>

            <div className="space-y-4">
              {services.map(s => (
                <div key={s.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-white font-bold">{s.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">ID Creation Price (PKR)</label>
                      <input 
                        type="number" 
                        value={s.creationPrice} 
                        onChange={(e) => updateCreationPrice(s.id, Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-emerald-400 font-bold focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">ID Verification Price (PKR)</label>
                      <input 
                        type="number" 
                        value={s.verificationPrice} 
                        onChange={(e) => updateVerificationPrice(s.id, Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-emerald-400 font-bold focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}