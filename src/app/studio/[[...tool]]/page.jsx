'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { urlFor } from '../../../../sanity/lib/image'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}