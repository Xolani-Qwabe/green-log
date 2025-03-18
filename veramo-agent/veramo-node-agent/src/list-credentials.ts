import { agent } from './veramo/setup.js'

async function main() {
  const credentials = await agent.dataStoreORMGetVerifiableCredentials();
  console.log(`
There are ${credentials.length} credentials stored  `);
  if (credentials.length > 0) {
    credentials.map((credential) => {
      console.log   (JSON.stringify(credential, null, 2));
      console.log('..................');    });
  }}

main().catch(console.log);