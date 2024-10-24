import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
dotenv.config();


const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = getFirestore(); // Initialize Firestore


// Example endpoint for GitHub API request
app.get('/api/github/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });

    const events = response.data;
    const totalCommits = events.reduce((acc, event) => {
      if (event.type === 'PushEvent') {
        return acc + event.payload.commits.length;
      }
      return acc;
    }, 0);

    // Save or update user data in Firestore
    const userDoc = db.collection('users').doc(username);
    await userDoc.set({
      githubUsername: username,
      totalCommits,
      lastUpdated: new Date().toISOString(),
    }, { merge: true }); // Merge data to avoid overwriting existing fields

    res.json({ message: 'GitHub data saved successfully', totalCommits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching GitHub data' });
  }
});

// Fetch leaderboard data from Firestore
app.get('/api/leaderboard', async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.orderBy('totalCommits', 'desc').limit(10).get();

    const leaderboard = [];
    snapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard data' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
