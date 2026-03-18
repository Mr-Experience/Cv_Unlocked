import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Root route for server status
app.get('/', (req, res) => {
  res.send('CV Unlocked API is running on port 3001! (The website is on port 5173)');
});

// API route to test connection and insert a user (Prisma version)
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName, 
        lastName,
        email,
        phone,
        password: password || 'password', // default password
        role: 'client'
      },
    });
    res.json({ status: 'success', data: newUser });
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// LOGIN Endpoint for Super Admin
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
        role
      }
    });

    if (user) {
      res.json({ status: 'success', user });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials or incorrect role access.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Route to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
