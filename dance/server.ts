import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));

  // Locale-aware path: ng build --localize produces server/hu/ and server/en/
  // Non-localized: dist/dance/server/ → dist/dance/browser/
  // Localized:     dist/dance/server/hu/ → dist/dance/browser/hu/
  const isLocalizedBuild = basename(dirname(serverDistFolder)) === 'server';
  const browserDistFolder = isLocalizedBuild
    ? resolve(dirname(dirname(serverDistFolder)), 'browser', basename(serverDistFolder))
    : resolve(serverDistFolder, '../browser');

  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, headers } = req;

    // Derive locale baseHref from URL prefix (/hu/, /en/, etc.)
    const localeMatch = originalUrl.match(/^\/([a-z]{2})\//);
    const localeBaseHref = localeMatch ? `/${localeMatch[1]}/` : '/';

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: localeBaseHref }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
