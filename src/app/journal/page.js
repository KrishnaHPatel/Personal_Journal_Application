"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../../hooks/useAuth';
import { firestore, auth } from '../../../lib/firebase';
import { TextareaAutosize, Button, Container, Typography, Paper, TextField, Box, IconButton } from '@mui/material';
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '32px 20px',
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

      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          align="center"
          style={{
            margin: '32px 0',
            color: 'white',
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '2.5rem'
          }}
        >
          Personal Journal
        </Typography>

        {user ? (
          <>
            <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Button
                onClick={handleSignOut}
                variant="contained"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign Out
              </Button>
            </Box>

            <Paper
              elevation={0}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                marginBottom: '32px'
              }}
            >
              <Typography variant="h5" style={{ marginBottom: '24px', color: '#1e293b', fontWeight: 600 }}>
                New Entry
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
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
                <TextareaAutosize
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="Write your thoughts, feelings, or experiences..."
                  minRows={6}
                  style={{
                    width: '100%',
                    padding: '16px',
                    marginTop: '16px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s ease',
                    background: 'rgba(255,255,255,0.8)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginTop: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '14px 32px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease'
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
                  Add Entry
                </Button>
              </Box>
            </Paper>

            <div style={{ marginTop: '32px' }}>
              <Typography
                variant="h5"
                style={{
                  marginBottom: '24px',
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Your Entries
              </Typography>

              {entries.length === 0 ? (
                <Paper
                  elevation={0}
                  style={{
                    padding: '48px 24px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <Typography style={{ color: '#64748b', fontSize: '18px', marginBottom: '16px' }}>
                    No entries yet
                  </Typography>
                  <Typography style={{ color: '#94a3b8', fontSize: '16px' }}>
                    Start your journaling journey by writing your first entry above!
                  </Typography>
                </Paper>
              ) : (
                entries.map((entry) => (
                  <Paper
                    key={entry.id}
                    elevation={0}
                    style={{
                      padding: '24px',
                      marginTop: '20px',
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: '12px',
                        color: '#1e293b',
                        fontWeight: 600,
                        fontSize: '20px'
                      }}
                    >
                      {entry.title || 'Untitled Entry'}
                    </Typography>

                    <Button
                      onClick={() => handleExpand(entry.id)}
                      variant="outlined"
                      style={{
                        marginBottom: '16px',
                        borderColor: '#667eea',
                        color: '#667eea',
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 500
                      }}
                    >
                      {expandedEntryId === entry.id ? 'Read Less' : 'Read More'}
                    </Button>

                    {expandedEntryId === entry.id && (
                      <Box style={{ marginTop: '16px' }}>
                        <Typography
                          style={{
                            marginBottom: '16px',
                            color: '#475569',
                            lineHeight: '1.7',
                            fontSize: '16px'
                          }}
                        >
                          {entry.text}
                        </Typography>

                        <Button
                          onClick={() => handleDelete(entry.id)}
                          variant="contained"
                          style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 500,
                            padding: '8px 20px'
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    )}

                    <Typography
                      color="textSecondary"
                      style={{
                        marginTop: '16px',
                        color: '#94a3b8',
                        fontSize: '14px',
                        fontStyle: 'italic'
                      }}
                    >
                      {new Date(entry.date.seconds * 1000).toLocaleString()}
                    </Typography>
                  </Paper>
                ))
              )}
            </div>
          </>
        ) : (
          <Typography style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>
            Please sign in to write journal entries.
          </Typography>
        )}
      </Container>
    </Container>
  );
};

export default JournalPage;

