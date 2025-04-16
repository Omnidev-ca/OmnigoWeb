import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'g8czucuz',
  dataset: 'production',
  apiVersion: '2025-04-15',
  useCdn: true,
  perspective: "published"
})