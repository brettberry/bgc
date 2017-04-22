
const fs = require('fs');
const clc = require('cli-color');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const yaml = require('js-yaml');
const log4js = require('log4js');

log4js.configure({
    appenders: [{ type: 'console' }],
    replaceConsole: false
});

const logger = log4js.getLogger();
const yamlPath = path.resolve('app.yml');
const yamlConfig = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
const devserver = yamlConfig.devserver;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(devserver.port, (err) => {
  if (err) {
    logger.trace(err);
    return;
  }
  const header = fs.readFileSync('./header.txt');
  const orangify = clc.xterm(208);
  console.log(orangify(header.toString()));
  logger.info(orangify('Listening at http://localhost:' + devserver.port));
});
