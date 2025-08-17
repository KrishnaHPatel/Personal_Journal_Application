"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Container, TextField, Typography, Box, Paper } from '@mui/material';

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          align="center"
          style={{
            marginBottom: '32px',
            color: 'white',
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '2.5rem'
          }}
        >
          Welcome
        </Typography>

        <Paper
          elevation={0}
          style={{
            padding: '40px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            width: '100%'
          }}
        >
          <Box component="form" sx={{ textAlign: 'center' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                bgcolor: 'rgba(255,255,255,0.8)',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  }
                }
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                bgcolor: 'rgba(255,255,255,0.8)',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  }
                }
              }}
            />

            <Button
              onClick={handleSignUp}
              variant="contained"
              disabled={loading}
              style={{
                marginTop: '24px',
                marginRight: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '14px 32px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                textTransform: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <Button
              onClick={handleSignIn}
              variant="contained"
              disabled={loading}
              style={{
                marginTop: '24px',
                marginLeft: '12px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '14px 32px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                transition: 'all 0.3s ease',
                textTransform: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.4)';
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {error && (
              <Typography
                color="error"
                style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#dc2626'
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Container>
  );
}
