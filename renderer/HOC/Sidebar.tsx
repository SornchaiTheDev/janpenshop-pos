import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { BiHome } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { RiSettings4Line } from 'react-icons/ri'
import { TbDoorExit } from 'react-icons/tb'
import clsx from 'clsx'
import Head from 'next/head'

interface Props {
  children: ReactNode
  title: string
}

const navigation = [
  {
    name: 'หน้าหลัก',
    icon: <BiHome size="1.25rem" />,
    path: '/dashboard',
  },
  {
    name: 'จัดการสินค้า',
    icon: <BsHandbag size="1.25rem" />,
    path: '/stock',
  },
  {
    name: 'ตั้งค่า',
    icon: <RiSettings4Line size="1.25rem" />,
    path: '/settings',
  },
]

function Sidebar({ children, title }: Props) {
  const router = useRouter()
  const currentPath = router.pathname
  return (
    <>
      <Head>
        <title>จันทร์เพ็ญบิวตี้ช้อป - {title}</title>
      </Head>
      <div className="grid w-full h-screen min-h-screen grid-cols-12 bg-sky-50">
        <div className="w-full h-full col-span-2 p-4 pt-10 bg-sky-700">
          {navigation.map(({ name, path, icon }) => (
            <button
              onClick={() => router.replace(path)}
              className={clsx(
                'flex items-center w-full gap-4 px-4 py-2 mb-4 font-light rounded-md hover:bg-sky-900',
                currentPath === path ? 'text-sky-500' : 'text-sky-50'
              )}
            >
              {icon}
              <h4 className="text-xl font-bold">{name}</h4>
            </button>
          ))}
        </div>
        <div className="flex flex-col col-span-10 gap-4 pt-10 m-4 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-neutral-700">{title}</h2>
            <button
              onClick={() => router.replace('/login')}
              className="flex items-center gap-2 text-red-500 hover:text-red-700"
            >
              ออกจากระบบ
              <TbDoorExit size="1.75rem" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Sidebar
