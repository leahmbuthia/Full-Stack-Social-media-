import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from './src/routes/usersRoutes.js';
import friendshipRouter from './src/routes/friendshipRoutes.js';
import groupRouter from './src/routes/groupRoutes.js';
import postRouter from './src/routes/postRoutes.js';
import commentRouter from './src/routes/commentRouter.js';
import photoRouter from './src/routes/photosRoutes.js';
import eventRouter from './src/routes/eventRoutes.js';
import eventAttendeesRouter from './src/routes/EventAttendRouter.js';
// import eventRouter from './src/routes/eventRoutes.js';


const app = express();
dotenv.config();

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 7000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1',userRouter)
app.use('/api/v1',  postRouter)
app.use('/api/v1', commentRouter)
app.use('/api/v1', friendshipRouter)
app.use('/api/v1', groupRouter)
app.use('/api/v1', photoRouter)
app.use('/api/v1',eventRouter)
app.use('/api/v1',eventAttendeesRouter)






app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



