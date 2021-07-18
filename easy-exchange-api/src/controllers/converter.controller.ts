import express from 'express';
import { OpenExchangeService } from '../services/open-exchange.service';

const router: express.Router = express.Router();

router.get('/:amount/:from/:to', async (req: express.Request, res: express.Response) => {
  try {
    const service = new OpenExchangeService();
    const result: number = await service.getConversion(req.params.from, req.params.to, req.params.amount);
    res.send(result.toFixed(2));
  } catch (error) {
    console.log(error);
    res.send('An error has ocurred!');
  }
});

module.exports = router;