import { useState, useEffect } from 'react'
import Sidebar from '@/Layout/Sidebar'
import Input from '@/components/Inputs/Simple'
import { trpc } from '@/utils/trpc'
import AsyncButton from '@/components/Buttons/AsyncButton'
import { useLocalStorage } from 'usehooks-ts'

function Settings() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const user = trpc.useContext()
  const changeUser = trpc.auth.change.useMutation()
  const [promptPay, setPromptPay] = useLocalStorage<{
    name: string
    phoneNumber: string
  }>('promptPay', { name: '', phoneNumber: '' })

  const fetchUser = async () => {
    const res = await user.auth.getUser.fetch()
    if (res) {
      setUsername(res?.username)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleOnChange = async () => {
    setIsUserLoading(true)
    const res = await changeUser.mutateAsync({
      username,
      password,
    })
    if (res) {
      setIsUserLoading(false)
    }
  }
  return (
    <Sidebar title="การตั้งค่า">
      <div className="flex flex-col gap-4">
        <h4 className="mt-4 text-xl font-bold">ตั้งค่าผู้ใช้</h4>
        <hr />
        <div className="flex flex-col gap-2">
          <h6>ชื่อผู้ใช้</h6>
          <Input value={username} onChange={setUsername} />

          <h6>รหัสผ่านใหม่</h6>
          <Input type="password" value={password} onChange={setPassword} />

          <AsyncButton
            title="ยืนยัน"
            isLoading={isUserLoading}
            onClick={handleOnChange}
          />
        </div>

        <h4 className="mt-4 text-xl font-bold">ตั้งค่าปริ้นท์เตอร์</h4>
        <hr />

        <h4 className="mt-4 text-xl font-bold">ตั้งค่าพร้อมเพย์</h4>
        <hr />
        <h6>เบอร์โทรศัพท์</h6>
        <Input
          value={promptPay.phoneNumber}
          onChange={(value) =>
            setPromptPay((prev) => ({ ...prev, phoneNumber: value }))
          }
        />
        <h6>ชื่อ-นามสกุล</h6>
        <Input
          value={promptPay.name}
          onChange={(value) =>
            setPromptPay((prev) => ({ ...prev, name: value }))
          }
        />
      </div>
    </Sidebar>
  )
}

export default Settings
