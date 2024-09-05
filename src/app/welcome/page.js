"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button } from '@mui/material';

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Personal Journal
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '24px', textAlign: 'center' }}>
        Welcome to your personal journal! Here, you can capture and reflect on your thoughts, ideas, and emotions. Enjoy the freedom to write, organize, and manage your entries as you wish.
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '24px', textAlign: 'center' }}>
        You will be redirected to the sign-in page shortly.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/auth')}>
        Go to Sign-In
      </Button>
    </Container>
  );
}
