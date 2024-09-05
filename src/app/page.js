"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/welcome');
  }, [router]);

  return null;
}


