import { Router } from 'express';
import { bookSeat, getSeat, resetSeats } from '../controller/index.js';


const router = Router();

router.get('/seats', getSeat);
router.post('/book', bookSeat);
router.post('/reset', resetSeats);



export default router;
