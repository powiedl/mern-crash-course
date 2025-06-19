import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production environment ...');
  app.use(express.static(path.join(__dirname, '/frontend/dist'))); // "embed" the react frontend application (before this you must run npm run build in the frontend directory)

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
