const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'stock-inventory',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

