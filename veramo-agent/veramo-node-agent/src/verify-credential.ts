import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
      credentialSubject: {
        you: 'Admin',
        id: 'did:web:rightshare.co.za',
      },
      issuer: {
        id: 'did:ethr:sepolia:0x02f6da8406dbaaabbc0f639c039ba2da13e5d9c50e76d5a04f934c73ca3b9b47c9',
      },
      type: ['VerifiableCredential'],
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      issuanceDate: '2025-03-18T20:37:08.000Z',
      proof: {
        type: 'JwtProof2020',
        jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IkFkbWluIn19LCJzdWIiOiJkaWQ6d2ViOnJpZ2h0c2hhcmUuY28uemEiLCJuYmYiOjE3NDIzMzAyMjgsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmY2ZGE4NDA2ZGJhYWFiYmMwZjYzOWMwMzliYTJkYTEzZTVkOWM1MGU3NmQ1YTA0ZjkzNGM3M2NhM2I5YjQ3YzkifQ.tu3RWHIJk_lJ1VyNRRMkTo6eUAjk9MhPPL_xUbN6HgdJWC9h0yNNpNadxtEpikTt-GVAgHkCnNWt35bIQfJMXA',
      },
    },
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)