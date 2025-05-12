import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'API funcionando y conectada a MySQL' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
