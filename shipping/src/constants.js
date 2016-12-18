
/* globals PROJECT_ROOT */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const yamlPath = path.join(PROJECT_ROOT, 'app.yml');

const config = yaml.load(
    fs.readFileSync(yamlPath, 'utf8')
);

export const SESSION_SECRET = config.server.sessionSecret;
export const COOKIE_NAME = config.server.cookieName;
