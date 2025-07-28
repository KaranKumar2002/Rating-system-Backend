import express from 'express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
const app = express();

app.use(clerkMiddleware());

app.use(express.json());
app.use(cors({
  origin: 'https://rating-system-frontend.vercel.app',
  credentials: true,
}));

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


// app.post('/api/testing', requireAuth(), async (req, res) => {
//   const { userId } = getAuth(req)

//   const user = await clerkClient.users.getUser(userId)

    
//     return res.json({ message: 'Testing endpoint is working!' })
// });

app.get('/', (req, res) => {
  res.send('Welcome to the Rating System API');
});

export default app;