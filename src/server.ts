import express from 'express';
import rotas from './routes/routes'
const app = express();
app.use(express.json());

app.use(rotas);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});