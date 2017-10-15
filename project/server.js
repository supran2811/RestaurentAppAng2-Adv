'use strict'

require('zone.js/dist/zone-node');
require('reflect-metadata');
const {readFileSync} = require('fs');
const express = require('express');
const PORT = 4000;
const DIST_FOLDER = process.cwd()+ '/dist';
const template = readFileSync(DIST_FOLDER+'/index.html').toString();
const ngUniversal = require('@nguniversal/express-engine');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const {AppServerModuleNgFactory , LAZY_MODULE_MAP} = require('./dist/server/main.bundle');
const {renderModuleFactory}  =  require('@angular/platform-server');
function angularRouter(req,res){
    res.render('index',{req,res});
}

const app = express();

app.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
      // Our index.html
      document: template,
      url: options.req.url,
      // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    }).then(html => {
      callback(null, html);
    });
  });
  
  app.set('view engine', 'html');
  app.set('views', DIST_FOLDER);
  
  // Server static files from /browser
  app.get('*.*', express.static(DIST_FOLDER));
  
  // All regular routes use the Universal engine
  app.get('*', (req, res) => {
    res.render(DIST_FOLDER, { req , res});
  });
  
  // Start up the Node server
  app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
  });