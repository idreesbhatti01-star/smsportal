"use client";
import React, { useState } from 'react';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords match nahi ho rahe!");
      return;
    }
    setErrorMsg('');
    alert("Signup successfully ho gaya!");
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '35px',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '420px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333', fontWeight: 'bold' }}>Create Account</h2>
        
        {errorMsg && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup}>
          {/* Username */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>Username</label>
            <input 
              type="text" 
              placeholder="Apna username likhein"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="example@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Password with Eye Button */}
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', paddingRight: '40px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box' }}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={{ position: 'absolute', right: '12px', top: '38px', cursor: 'pointer', fontSize: '18px', userSelect: 'none' }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm Password with Eye Button */}
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>Confirm Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••••"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', paddingRight: '40px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box' }}
            />
            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              style={{ position: 'absolute', right: '12px', top: '38px', cursor: 'pointer', fontSize: '18px', userSelect: 'none' }}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(118, 75, 162,.4)'
          }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}