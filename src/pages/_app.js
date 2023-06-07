import '@/styles/globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Head from 'next/head'


const PlusJakartaSans = Plus_Jakarta_Sans({subsets:["latin"]})

export default function App({ Component, pageProps }) {
  return(
    <main className={PlusJakartaSans.className}>
      <Head>
        <title>GroupVitee</title><link rel='icon' type='image/x-icon' href="/favicon.ico" />
      </Head>
      <Component {...pageProps}/>
    </main>
  )
}
