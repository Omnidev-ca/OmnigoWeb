import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = async () => {
  if ((await draftMode()).isEnabled) {
    return previewClient
  }
  return client
} 