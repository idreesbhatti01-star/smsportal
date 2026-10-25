import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              SmsPortal
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition">Services</a>
            <a href="#pricing" className="hover:text-blue-400 transition">Countries</a>
            <a href="#faq" className="hover:text-blue-400 transition">API Docs</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
              Login
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-blue-500/20">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>✨ Instant SMS Verification & Virtual Numbers</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Receive SMS Online with <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Temporary Numbers</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Protect your privacy. Get secure, instant virtual phone numbers for WhatsApp, Telegram, Google, Facebook, and hundreds of online platforms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition shadow-xl shadow-blue-600/30">
              Get Started Free
            </Link>
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-base transition">
              Explore Dashboard
            </Link>
          </div>

          {/* Trust Badges / Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 border-t border-slate-800/80 text-left sm:text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">150+</p>
              <p className="text-xs sm:text-sm text-slate-400">Countries Available</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">99.9%</p>
              <p className="text-xs sm:text-sm text-slate-400">Delivery Success</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
              <p className="text-xs sm:text-sm text-slate-400">Automated System</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/30 py-8 text-center text-xs text-slate-500">
        <p>© 2026 SmsPortal Demo. Built with Next.js & Tailwind CSS. All rights reserved.</p>
      </footer>
    </div>
  );
}