
/* globals PROJECT_ROOT */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import MySQLConfig from './MySQLConfig';
import ServerConfig from './ServerConfig';

const yamlPath = path.join(PROJECT_ROOT, 'app.yml');

const config = yaml.load(
    fs.readFileSync(yamlPath, 'utf8')
);

export const mysqlConfig = new MySQLConfig(config);
export const serverConfig = new ServerConfig(config);
