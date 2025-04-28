const path = require('path');

module.exports = function override(config, env) {
  // Ajout des alias
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    assets: path.resolve(__dirname, 'src/assets/'),
    component: path.resolve(__dirname, 'src/component/'),
    icons: path.resolve(__dirname, 'src/component/icons/'),
    style: path.resolve(__dirname, 'src/component/style/'),
    constant: path.resolve(__dirname, 'src/constant/'),
    service: path.resolve(__dirname, 'src/service/'),
    screen: path.resolve(__dirname, 'src/screen/'),
    util: path.resolve(__dirname, 'src/util/'),
  };
  return config;
};