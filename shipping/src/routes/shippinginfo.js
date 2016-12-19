import express from 'express';
import ShippingInfoDao from '../dao/ShippingInfoDao';
import mysqlClient from '../mysqlClient';
import Promise from 'bluebird';
import ShippingInfoModel from '../models/ShippingInfoModel';
import log from '../log';

const router = express.Router({ mergeParams: true });
const dao = new ShippingInfoDao(mysqlClient);

router.post('/', (request, response) => {
  return Promise.resolve()
    .then(() => {
      let body = request.body;
      body.userId = request.params.userId;
      const shippingInfo = new ShippingInfoModel(body);
      return dao.createShippingInfo(shippingInfo);
    })
    .then((shippingInfo) => {
      response.json(shippingInfo.toJS());
    })
    .catch((error) => {
      log.trace(error);
      log.error('Failed to create shipping info.');
      response.sendStatus(500);
    });
});

export default router;
