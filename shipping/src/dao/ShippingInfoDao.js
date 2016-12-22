import ShippingInfoModel from '../models/ShippingInfoModel';
import ShippingInfoCollection from '../models/ShippingInfoCollection';

export default class ShippingInfoDao {

  constructor(client) {
    this.client = client;
  }

  findById(id) {
    return this.client.query({
      sql: 'select s.* from shippingInfo s where s.id = ?;',
      values: [id]
    }).then(response => {
      if (!response) {
        return;
      }
      return new ShippingInfoModel(response[0]);
    });
  }

  findAllByUserId(userId) {
    return this.client.query({
      sql: 'select s.* from shippingInfo s where s.userId = ?;',
      values: [userId]
    }).then(response => {
      if (!response) {
        return;
      }
      return new ShippingInfoCollection(response);
    });
  }

  createShippingInfo(shippingInfo) {
    return this.client.query({
      sql: `insert into shippingInfo (firstName, lastName, phone, addressLine1,
                                      addressLine2, city, state, zip, userId)
                                      values (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      values: [shippingInfo.getFirstName(),
               shippingInfo.getLastName(),
               shippingInfo.getPhone(),
               shippingInfo.getAddressLine1(),
               shippingInfo.getAddressLine2(),
               shippingInfo.getCity(),
               shippingInfo.getState(),
               shippingInfo.getZip(),
               shippingInfo.getUserId()]
    }).then(response => {
      return this.findById(response.insertId);
    });
  }

  updateShippingInfo(shippingInfo) {
    return this.client.query({
      sql: `update shippingInfo set firstName = ?, lastName = ?, phone = ?, addressLine1 = ?,
                                      addressLine2 = ?, city = ?, state = ?, zip = ?, userId = ?
                                      where id = ?;`,
      values: [shippingInfo.getFirstName(),
               shippingInfo.getLastName(),
               shippingInfo.getPhone(),
               shippingInfo.getAddressLine1(),
               shippingInfo.getAddressLine2(),
               shippingInfo.getCity(),
               shippingInfo.getState(),
               shippingInfo.getZip(),
               shippingInfo.getUserId(),
               shippingInfo.getId()]
    }).then(response => {
      return this.findById(shippingInfo.getId());
    });
  }
}
