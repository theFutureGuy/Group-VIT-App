import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from '@/components/Login'
import useAuthUser from '@/hooks/useAuthUser'
import Sidebar from '@/components/Sidebar'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const user = useAuthUser()
    if (!user){<Login />}
  return (
    <div className='app'>
      <div className='app__body'>
          <Sidebar  user={user}/>
      </div>
    </div>
  )
}
