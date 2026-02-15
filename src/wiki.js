import MWBot from 'mwbot';
import { config, series } from './index.js';

const {
  MW_API,
  MW_USERNAME,
  MW_PASSWORD,
  MW_PAGE_SERIES,
  MW_PAGE_CONFIG,
} = process.env;

if (!MW_API || !MW_USERNAME || !MW_PASSWORD || !MW_PAGE_SERIES || !MW_PAGE_CONFIG) {
  throw new Error('Missing required environment variables.');
}

const bot = new MWBot({
  apiUrl: MW_API,
  requestOptions: {
    headers: {
      'X-CI-Token': process.env.MW_CI_TOKEN,
    },
  },
});

async function main() {

  await bot.loginGetEditToken({
    username: MW_USERNAME,
    password: MW_PASSWORD,
  });

  const res1 = await bot.edit(
    MW_PAGE_SERIES,
    JSON.stringify(series, null, 2),
    'Auto update series.json',
  );
  console.log('SERIES RESULT:', res1?.['edit']?.['result']);

  const res2 = await bot.edit(
    MW_PAGE_CONFIG,
    JSON.stringify(config, null, 2),
    'Auto update config.json',
  );
  console.log('CONFIG RESULT:', res2?.['edit']?.['result']);

  console.log('Update complete');
}

main().catch(console.error);
