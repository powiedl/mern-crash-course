import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

//console.log(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('Server is ready...');
});

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
