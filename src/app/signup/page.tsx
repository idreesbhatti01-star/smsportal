"use client";
import React, { useState } from 'react';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check karein ke password aur confirm password match hotay hain ya nahi
    if (password !== confirmPassword) {
      setErrorMsg("Passwords match nahi ho rahe!");
      return;
    }

    // 2. Demo message hatane ke liye yahan asli database ya API check aayega
    setErrorMsg('');
    alert("Signup successfully ho gaya!");
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <form onSubmit={handleSignup}>
        {/* Username Box */}
        <div style={{ marginBottom: '15px' }}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Email Box */}
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Password Box */}
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <label>Password:</label>
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
          {/* Eye Button (Show/Hide Password) */}
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            style={{ position: 'absolute', right: '10px', top: '32px', cursor: 'pointer' }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password Box */}
        <div style={{ marginBottom: '15px' }}>
          <label>Confirm Password:</label>
          <input 
            type={showPassword ? "text" : "password"} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}