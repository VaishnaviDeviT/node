import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import mainRoutes from './main.routes.js';
import userRoutes from './user.routes.js';

const app = express();
const port = 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per window
});

app.use(compression());
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/v1', mainRoutes);
app.use('/v1/user', userRoutes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
