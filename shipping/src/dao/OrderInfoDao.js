
export default class OrderInfoDao {

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
}
