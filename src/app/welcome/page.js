"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Paper, Box } from '@mui/material';

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
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

      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Paper
          elevation={0}
          style={{
            padding: '48px 32px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            marginBottom: '32px'
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            style={{
              color: '#1e293b',
              fontWeight: 700,
              marginBottom: '24px',
              fontSize: '2.5rem'
            }}
          >
            Welcome to Your Personal Journal
          </Typography>

          <Typography
            variant="body1"
            style={{
              marginBottom: '24px',
              textAlign: 'center',
              color: '#475569',
              fontSize: '18px',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto 24px'
            }}
          >
            Welcome to your personal journal! Here, you can capture and reflect on your thoughts, ideas, and emotions.
            Enjoy the freedom to write, organize, and manage your entries as you wish.
          </Typography>

          <Typography
            variant="body1"
            style={{
              marginBottom: '32px',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '16px',
              fontStyle: 'italic'
            }}
          >
            You will be redirected to the sign-in page shortly.
          </Typography>

          <Button
            variant="contained"
            onClick={() => router.push('/auth')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '16px 40px',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 600,
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
          >
            Go to Sign-In
          </Button>
        </Paper>

        {/* Countdown indicator */}
        <Box style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '16px 24px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <Typography style={{ color: 'white', fontSize: '14px' }}>
            Redirecting in a few seconds...
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
