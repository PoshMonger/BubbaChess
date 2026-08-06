import express, {type Express, type Request, type Response} from 'express';
import cors from 'cors';
import { auth, register } from './middleware/auth/auth.js';

const PORT = process.env.PORT || 3000;

const app: Express = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Auth routes
app.use('/auth/login', auth);
app.use('/auth/register', register);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});