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
  const { firstName, lastName, email, phone, password, role, userRole } = req.body;
  
  // Decide the true account role
  // If userRole is provided (e.g., 'associate'), it's a staff account
  // If the dropdown 'role' is provided (e.g., 'hr'), it's a subRole
  const finalRole = userRole || (role === 'admin' || role === 'associate' ? role : 'client');
  const subRole = (role && role !== 'admin' && role !== 'associate') ? role : null;

  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {
        firstName,
        lastName,
        phone,
        password: password || 'password',
        role: finalRole,
        subRole: subRole
      },
      create: {
        firstName,
        lastName,
        email,
        phone,
        password: password || 'password',
        role: finalRole,
        subRole: subRole
      }
    });
    res.json({ status: 'success', data: user });
  } catch (error) {
    console.error('Prisma upsert error:', error);
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

// Update user profile endpoint
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, bio, occupation, address, city, country, subRole, profilePicture } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        phone,
        email,
        bio,
        occupation,
        address,
        city,
        country,
        profilePicture,
        subRole: subRole || undefined,
      }
    });
    res.json({ status: 'success', user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Create new user endpoint (for Admin adding associates/clients)
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, phone, role, password, profilePicture } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        role: role || 'associate',
        password: password || 'defaultpassword123', // Admin sets default or we provide one
        profilePicture
      }
    });
    res.json({ status: 'success', data: newUser });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ status: 'error', message: error.message });
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
