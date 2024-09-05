"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user);
      alert('Sign up successful!');
      setEmail('');
      setPassword('');
      router.push('/journal');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Try logging in or use a different email.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      alert('Sign in successful!');
      setEmail('');
      setPassword('');
      router.push('../journal');
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/wrong-password') {
        setError('Wrong password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" align="center" style={{ marginBottom: '20px', color: '#1976d2' }}>
        Sign In / Sign Up
      </Typography>
      <Box component="form" sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ bgcolor: '#ffffff' }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ bgcolor: '#ffffff' }}
        />
        <Button
          onClick={handleSignUp}
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '16px', backgroundColor: '#1976d2' }}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <Button
          onClick={handleSignIn}
          variant="contained"
          color="secondary"
          disabled={loading}
          style={{ marginTop: '16px', backgroundColor: '#dc004e' }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
      </Box>
    </Container>
  );
}
