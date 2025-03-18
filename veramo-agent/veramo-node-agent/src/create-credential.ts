import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: {
        id: 'did:web:rightshare.co.za',
        you: 'Admin',
      },
    },
    proofFormat: 'jwt',
  })
  console.log(`New credential created`)
  console.log(JSON.stringify(verifiableCredential, null, 2))
  const credentialId = await agent.dataStoreSaveVerifiableCredential({verifiableCredential})
console.log(`Credential saved with id: ${credentialId}`)
}

main().catch(console.log)