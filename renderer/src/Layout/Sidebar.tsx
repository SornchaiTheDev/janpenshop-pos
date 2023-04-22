import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { BiHome } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { RiSettings4Line } from 'react-icons/ri'
import { TbDoorExit } from 'react-icons/tb'
import clsx from 'clsx'
import Head from 'next/head'
import { AiOutlineHistory } from 'react-icons/ai'

interface Props {
  children: ReactNode
  title: string
}

const navigation = [
  {
    name: 'จัดการสินค้า',
    icon: <BsHandbag size="100%" />,
    path: '/stock',
  },
  {
    name: 'ประวัติการขาย',
    icon: <AiOutlineHistory size="100%" />,
    path: '/history',
  },
  {
    name: 'ตั้งค่า',
    icon: <RiSettings4Line size="100%" />,
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
        <div className="w-full h-full col-span-1 p-2 pt-10 lg:col-span-2 lg:p-4 bg-sky-700">
          {navigation.map(({ name, path, icon }) => (
            <button
              key={name}
              onClick={() => router.replace(path)}
              className={clsx(
                'flex justify-center lg:justify-start items-center w-full gap-4 lg:px-2 lg:py-2 py-4 lg:mb-4 font-light rounded-md hover:bg-sky-900',
                currentPath === path ? 'text-sky-400' : 'text-sky-50'
              )}
            >
              <div className="w-[1.3rem]"> {icon}</div>
              <h4
                className={clsx(
                  'hidden text-lg lg:block',
                  currentPath === path ? 'font-bold' : 'font-normal'
                )}
              >
                {name}
              </h4>
            </button>
          ))}
        </div>
        <div className="flex flex-col col-span-11 gap-4 pt-2 m-4 rounded-md lg:col-span-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-neutral-700">{title}</h2>
            <button
              onClick={() => router.replace('/front')}
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
