let configSuffix = process.env.ENV || "";

const defaultConfiguration = require(`./application`);
let configuration = defaultConfiguration;

if (configSuffix) {
    configuration = Object.assign({},defaultConfiguration , require(`./application.${configSuffix}`));
}

module.exports = configuration;