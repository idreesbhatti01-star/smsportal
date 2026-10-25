'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [balance, setBalance] = useState(1250);
  const [activeTab, setActiveTab] = useState('creation');
  const [selectedService, setSelectedService] = useState('WhatsApp');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('JazzCash');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);

  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'DEP-9021', amount: 500, method: 'JazzCash', trxId: 'TRX88392019', status: 'Pending' }
  ]);

  // Yeh prices ab admin panel se control hongi (Customer sirf dekh sakta hai)
  const [services, setServices] = useState([
    { id: 'wa', name: 'WhatsApp', creationPrice: 150, verificationPrice: 170, icon: '💬' },
    { id: 'tg', name: 'Telegram', creationPrice: 120, verificationPrice: 140, icon: '✈️' },
    { id: 'fb', name: 'Facebook', creationPrice: 90, verificationPrice: 110, icon: '👥' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-101', service: 'WhatsApp', category: 'ID Creation', number: '+92 300 1234567', code: 'Waiting...', status: 'Active' }
  ]);

  const buyNumber = (category: string, price: number) => {
    if (balance < price) {
      alert("Balance kam hai! Pehle wallet top-up karein.");
      return;
    }
    setBalance(balance - price);
    setOrders([
      {
        id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
        service: selectedService,
        category: category,
        number: `+92 3${Math.floor(10 + Math.random() * 90)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
        code: 'Waiting for SMS...',
        status: 'Active'
      },
      ...orders
    ]);
    alert("Number successfully purchased!");
  };

  const handleDepositSubmit = () => {
    const amount = Number(customAmount);
    if (!amount || amount < 250) {
      alert("Minimum deposit amount PKR 250 honi chahiye!");
      return;
    }
    if (!trxId.trim()) {
      alert("Baraye karam Transaction ID (Trx ID) lazmi darj karein!");
      return;
    }

    const newDeposit = {
      id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: amount,
      method: selectedMethod,
      trxId: trxId,
      status: 'Pending'
    };

    setPendingDeposits([newDeposit, ...pendingDeposits]);
    setCustomAmount('');
    setTrxId('');
    alert("Deposit request successfully submit ho gayi hai! Admin approval ke baad balance aapke account mein show ho ga.");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">SmsPortal Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-2">
            <span className="text-xs text-slate-400">Balance:</span>
            <span className="text-sm font-bold text-emerald-400">PKR {balance.toLocaleString()}</span>
          </div>
          <Link href="/admin" className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
            Admin View
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition">Logout</Link>
        </div>
      </div>

      {/* Customer Navigation Tabs (Manage Prices hta diya gaya hai) */}
      <div className="max-w-6xl mx-auto flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setActiveTab('creation')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'creation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}>📁 ID Creation</button>
        <button onClick={() => setActiveTab('verification')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'verification' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}>📂 ID Verification</button>
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}>📦 My Orders</button>
        <button onClick={() => setActiveTab('wallet')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'wallet' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}>💳 Wallet Top-up</button>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeTab === 'creation' && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Select Service for ID Creation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.id} onClick={() => setSelectedService(s.name)} className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition ${selectedService === s.name ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}>
                  <div>
                    <span className="text-xl">{s.icon}</span>
                    <p className="font-medium text-white mt-1">{s.name}</p>
                  </div>
                  <span className="text-emerald-400 font-bold">PKR {s.creationPrice}</span>
                </div>
              ))}
            </div>
            <button onClick={() => buyNumber('ID Creation', services.find(s => s.name === selectedService)?.creationPrice || 150)} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition">
              Buy ID Creation Number
            </button>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Select Service for ID Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.id} onClick={() => setSelectedService(s.name)} className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition ${selectedService === s.name ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}>
                  <div>
                    <span className="text-xl">{s.icon}</span>
                    <p className="font-medium text-white mt-1">{s.name}</p>
                  </div>
                  <span className="text-emerald-400 font-bold">PKR {s.verificationPrice}</span>
                </div>
              ))}
            </div>
            <button onClick={() => buyNumber('ID Verification', services.find(s => s.name === selectedService)?.verificationPrice || 170)} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/30 transition">
              Buy ID Verification Number
            </button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4">Active Orders & SMS Codes</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Number</th>
                  <th className="pb-3">Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="py-3 text-slate-400 font-mono">{o.id}</td>
                    <td className="py-3 text-white">{o.service}</td>
                    <td className="py-3 text-blue-400">{o.category}</td>
                    <td className="py-3 text-emerald-400 font-mono">{o.number}</td>
                    <td className="py-3 text-amber-400 font-mono bg-slate-950 px-2 rounded">{o.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">💳</span>
                <h2 className="text-xl font-bold text-white">Top-Up Wallet</h2>
              </div>
              <p className="text-xs text-slate-400">Add balance to your wallet using your preferred manual payment method.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Manual Payment</span>
              <p className="text-xs text-slate-300">Pay via JazzCash, EasyPaisa, NayaPay, or Binance.</p>
              
              <div className="grid grid-cols-4 gap-3 pt-2">
                {[
                  { name: 'JazzCash', icon: '🟠' },
                  { name: 'EasyPaisa', icon: '🟢' },
                  { name: 'NayaPay', icon: '🟣' },
                  { name: 'Binance', icon: '🟡' }
                ].map(m => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMethod(m.name)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${selectedMethod === m.name ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-md' : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'}`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-[10px] font-semibold">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Pay to this account ({selectedMethod})</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Account Name</p>
                  <p className="text-sm font-bold text-white">Anees Amjad</p>
                </div>
                <button onClick={() => copyToClipboard("Anees Amjad")} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded transition">Copy</button>
              </div>
              <div className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Payment Number / ID</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono">+923001234567</p>
                </div>
                <button onClick={() => copyToClipboard("+923001234567")} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded transition">{copied ? 'Copied!' : 'Copy'}</button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Top-Up Amount (PKR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm text-slate-400 font-medium">Rs.</span>
                  <input
                    type="number"
                    placeholder="Enter amount (e.g. 500)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <p className="text-[11px] text-amber-400 font-medium">⚠️ Minimum PKR 250 required</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Transaction ID / Trx ID</label>
                <input
                  type="text"
                  placeholder="Enter Transaction ID (e.g. 8392019482)"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
                />
              </div>
            </div>

            <button onClick={handleDepositSubmit} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition text-sm">
              Submit Deposit Request
            </button>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Recent Deposit Status</h3>
              <div className="space-y-2">
                {pendingDeposits.map(d => (
                  <div key={d.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="text-white font-bold">PKR {d.amount} <span className="text-slate-400 font-normal">({d.method})</span></p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">TrxID: {d.trxId}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Pending Approval
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}