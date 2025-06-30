import { db, collection, addDoc } from './firebase.js';

document.getElementById('suggestionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const suggestion = {
    songTitle: document.getElementById('songTitle').value,
    artist: document.getElementById('artist').value,
    spotifyLink: document.getElementById('spotifyLink').value,
    timestamp: new Date()
  };

  try {
    await addDoc(collection(db, 'suggestions'), suggestion);
    document.getElementById('message').textContent = 'Thanks for your suggestion!';
    document.getElementById('suggestionForm').reset();
  } catch (error) {
    console.error('Error adding document: ', error);
    document.getElementById('message').textContent = 'Error submitting suggestion. Please try again.';
  }
});
