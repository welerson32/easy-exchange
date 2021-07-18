import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT;
const app = express();

app.use(cors({origin:'*'}));
app.use(require ('./controllers'));

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );