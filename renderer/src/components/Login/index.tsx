import { FormEvent, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiLockAlt } from 'react-icons/bi'
import Input from 'renderer/src/components/Inputs/Simple'
import AsyncButton from 'renderer/src/components/Buttons/AsyncButton'
import { useSetRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { useOnClickOutside } from 'usehooks-ts'
import { trpc } from '@/utils/trpc'

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const setMenuState = useSetRecoilState(menusState)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const mutation = trpc.auth.login.useMutation()
  const createUser = trpc.auth.create.useMutation()


  useOnClickOutside(formRef, () =>
    setMenuState((prev) => ({ ...prev, isLoginModalOpen: false }))
  )

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // await createUser.mutateAsync({ username, password })
      const { isAuthed } = await mutation.mutateAsync({ username, password })

      if (isAuthed) {
        router.replace('/dashboard')
        setMenuState((prev) => ({ ...prev, isLoginModalOpen: false }))
      }
    } catch (err) {
      console.error(err)
    }
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
        {mutation.data && mutation.data.isAuthed === false && (
          <p className="text-red-500">*ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</p>
        )}

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
          isDisabled={mutation.isLoading}
          isLoading={mutation.isLoading}
          title="เข้าสู่ระบบ"
        />
      </form>
    </div>
  )
}

export default Login
