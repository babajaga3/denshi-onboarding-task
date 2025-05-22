import type { Payload } from '@/types'


export async function createCustomer(payload: Payload): Promise<Payload> {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Failed to create customer')
  }

  return response.json()
}