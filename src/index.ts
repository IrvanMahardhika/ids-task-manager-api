import 'module-alias/register';
import App from './app';
import DB from './db';

(async () => {
  const app = new App();
  app.initialize();

  await DB.initialize();
})();
