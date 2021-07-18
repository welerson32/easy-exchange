import express from 'express';
import { OpenExchangeService } from '../services/open-exchange.service';

const router: express.Router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const service = new OpenExchangeService();
    const result: string[] = await service.getCurrencie();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send('An error has ocurred!');
  }
});

module.exports = router;