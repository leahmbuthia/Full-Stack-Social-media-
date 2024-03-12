import { Router } from 'express';
import { createPhoto, deletePhoto, getPhotos} from '../controllers/photoController.js';
// import logger from '../utils/Logger.js';

const photoRouter = Router();

// photoRouter.get('/photos/:UserID', getPhotos);
photoRouter.get('/photos', getPhotos);
// photoRouter.get('/photos/:id', getPhotoById);
photoRouter.post('/photos', createPhoto);
photoRouter.delete('/photos/:id', deletePhoto);
// photoRouter.get("/photo/:UserID", getOnePhotoByUID)

export default photoRouter;