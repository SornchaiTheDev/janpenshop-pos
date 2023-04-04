import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BiLockAlt } from "react-icons/bi";
import Input from "renderer/src/components/Inputs/Simple";
import AsyncButton from "renderer/src/components/Buttons/AsyncButton";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        setIsSubmit(false);
        resolve("success");
      }, 1000)
    );
    router.replace("/dashboard");
    console.log(username, password);
  };
  return (
    <>
      <Head>
        <title>จันทร์เพ็ญบิวตี้ช้อป - เข้าสู่ระบบ</title>
      </Head>

      <div className="flex items-center justify-center w-full h-screen bg-neutral-800">
        <form
          onSubmit={handleLogin}
          className="relative flex flex-col w-1/3 gap-4 p-10 bg-white border rounded-md shadow-md"
        >
          <div className="absolute -translate-x-1/2 border-4 border-white rounded-full -top-10 left-1/2">
            <div className="p-4 rounded-full text-lime-500 bg-lime-200 w-fit">
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
    </>
  );
}

export default Login;
