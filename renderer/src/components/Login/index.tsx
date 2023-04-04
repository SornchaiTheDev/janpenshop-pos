import { FormEvent, useState, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BiLockAlt } from 'react-icons/bi'
import Input from 'renderer/src/components/Inputs/Simple'
import AsyncButton from 'renderer/src/components/Buttons/AsyncButton'
import { useSetRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { useOnClickOutside } from 'usehooks-ts'

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const setMenuState = useSetRecoilState(menusState)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useOnClickOutside(formRef, () =>
    setMenuState((prev) => ({ ...prev, isLoginModalOpen: false }))
  )

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmit(true)
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        setIsSubmit(false)
        resolve('success')
      }, 1000)
    )
    router.replace('/dashboard')
    console.log(username, password)
  }
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-full h-screen backdrop-blur-sm bg-black/20">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="relative flex flex-col w-1/3 gap-4 p-10 bg-white border rounded-md shadow-md"
      >
        <div className="absolute -translate-x-1/2 border-4 border-white rounded-full -top-10 left-1/2">
          <div className="p-4 rounded-full text-sky-500 bg-sky-200 w-fit">
            <BiLockAlt size="2rem" />
          </div>
        </div>

        <Input
          value={username}
          placeholder="ชื่อผู้ใช้"
          onChange={(value: string) => setUsername(value)}
        />

        <Input
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(value: string) => setPassword(value)}
        />

        <AsyncButton
          isDisabled={false}
          isLoading={isSubmit}
          title="เข้าสู่ระบบ"
        />
      </form>
    </div>
  )
}

export default Login
