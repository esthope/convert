const path = require('path');

module.exports = function override(config, env) {
  // Ajout des alias
  config.resolve.alias = {
    ...config.resolve.alias,
    assets: path.resolve(__dirname, 'src/assets/'),
    component: path.resolve(__dirname, 'src/component/'),
    constant: path.resolve(__dirname, 'src/constant/'),
    service: path.resolve(__dirname, 'src/network/service/'),
    screen: path.resolve(__dirname, 'src/screen/'),
    util: path.resolve(__dirname, 'src/util/'),
  };
  return config;
};