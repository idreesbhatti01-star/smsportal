'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Sign in to <span className="text-blue-500">SmsPortal</span>
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
            create a new account for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Demo Login successful!"); }}>
            <div>
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  placeholder="anees@example.com"
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link href="/" className="w-full flex justify-center text-sm text-slate-400 hover:text-slate-200">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}