"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../../hooks/useAuth';
import { firestore, auth } from '../../../lib/firebase';
import { TextareaAutosize, Button, Container, Typography, Paper, TextField, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const JournalPage = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [expandedEntryId, setExpandedEntryId] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const entriesCollection = collection(firestore, 'journalEntries');
      const q = query(entriesCollection, where('userId', '==', user.uid), orderBy('date', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEntries(entriesList);
      }, (error) => {
        console.error("Error fetching journal entries:", error);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(firestore, 'journalEntries'), {
          title,
          text: entry,
          userId: user.uid,
          date: new Date(),
        });
        setTitle('');
        setEntry('');
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'journalEntries', id));
      console.log(`Document with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleExpand = (id) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('../auth');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container
      style={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        padding: '20px'
      }}
    >
      <Typography variant="h3" align="center" style={{ margin: '20px 0', color: '#1976d2' }}>
        Personal Journal
      </Typography>
      {user ? (
        <>
          <Button
            onClick={handleSignOut}
            variant="contained"
            color="primary"
            style={{ marginBottom: '16px', backgroundColor: '#1976d2' }}
          >
            Sign Out
          </Button>
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{ bgcolor: '#ffffff' }}
            />
            <TextareaAutosize
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Write your journal entry..."
              minRows={6}
              style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', backgroundColor: '#1976d2' }}>
              Add Entry
            </Button>
          </Box>
          <div style={{ marginTop: '24px' }}>
            <Typography variant="h5">Your Entries:</Typography>
            {entries.length === 0 ? (
              <Typography align="center" style={{ color: '#888', marginTop: '20px' }}>
                No entries found. Start adding some journal entries!
              </Typography>
            ) : (
              entries.map((entry) => (
                <Paper key={entry.id} style={{ padding: '20px', marginTop: '16px', backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
                  <Typography variant="h6" style={{ marginBottom: '8px' }}>{entry.title || 'No Title'}</Typography>
                  <Button
                    onClick={() => handleExpand(entry.id)}
                    variant="outlined"
                    style={{ marginBottom: '8px' }}
                  >
                    {expandedEntryId === entry.id ? 'Read Less' : 'Read More'}
                  </Button>
                  {expandedEntryId === entry.id && (
                    <>
                      <Typography style={{ marginTop: '8px', marginBottom: '8px' }}>{entry.text}</Typography>
                      <Button
                        onClick={() => handleDelete(entry.id)}
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '8px' }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  <Typography color="textSecondary" style={{ marginTop: '8px' }}>
                    {new Date(entry.date.seconds * 1000).toLocaleString()}
                  </Typography>
                </Paper>
              ))
            )}
          </div>
        </>
      ) : (
        <Typography>Please sign in to write journal entries.</Typography>
      )}
    </Container>
  );
};

export default JournalPage;

