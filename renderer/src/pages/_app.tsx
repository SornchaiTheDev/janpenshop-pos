import React from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { trpc } from '@/utils/trpc'

import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default trpc.withTRPC(MyApp)
