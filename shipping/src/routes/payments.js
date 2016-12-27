import express from 'express';
import Promise from 'bluebird';
import log from '../log';
import braintree from 'braintree';

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});

const sale = Promise.promisify(gateway.transaction.sale, { context: gateway.transaction });
const generate = Promise.promisify(gateway.clientToken.generate, { context: gateway.clientToken });
const router = express.Router({ mergeParams: true });

router.post('/tokens', (request, response) => {
  return Promise.resolve()
    .then(() => generate({}))
    .then(gatewayResponse => {
      response.json({ token: gatewayResponse.clientToken });
    })
    .catch(error => {
      log.trace(error);
      log.error('Failed to create token.');
      response.sendStatus(500);
    });
});

router.post('/orders', (request, response) => {
  return Promise.resolve()
    .then(() => sale({
      amount: request.body.amount,
      paymentMethodNonce: request.body.paymentNonce,
      options: {
        submitForSettlement: true
      }
    })
    .then((result) => {
      if (!result.success) {
        throw new Error();
      }
      log.info(result);
      log.info('Created transaction.');
      response.json(result);
    }))
    .catch(error => {
      log.trace(error);
      log.error('Failed to create transaction.');
      response.sendStatus(500);
    });
});

export default router;
