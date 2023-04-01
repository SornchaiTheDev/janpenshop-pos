import Head from "next/head";
import { useRouter } from "next/router";
import Statistic from "@/components/Statistic";
import Table from "@/components/Table";
import ToggleSwitch from "@/components/ToggleSwitch";
import { BiHome } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { RiSettings4Line } from "react-icons/ri";
import { TbDoorExit } from "react-icons/tb";

function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>จันทร์เพ็ญบิวตี้ช้อป - แดชบอร์ด</title>
      </Head>
      <div className="grid w-full h-screen grid-cols-12">
        <div className="w-full h-full col-span-2 p-4 pt-24 bg-neutral-800">
          <button className="flex items-center w-full gap-4 px-4 py-2 mb-4 font-light text-green-500 rounded-md hover:bg-neutral-700 ">
            <BiHome size="1.25rem" />
            <h4 className="text-xl font-bold">หน้าหลัก</h4>
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-2 mb-4 font-light text-white rounded-md hover:bg-neutral-700 ">
            <BsHandbag size="1.25rem" />
            <h4 className="text-xl">จัดการสต็อก</h4>
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-2 mb-4 font-light text-white rounded-md hover:bg-neutral-700 ">
            <RiSettings4Line size="1.25rem" />
            <h4 className="text-xl">การตั้งค่า</h4>
          </button>
        </div>
        <div className="col-span-10 p-10 m-4 rounded-md ">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold">แดชบอร์ด</h2>
            <button
              onClick={() => router.replace("/login")}
              className="flex items-center gap-2 text-red-500"
            >
              ออกจากระบบ
              <TbDoorExit size="1.75rem" />
            </button>
          </div>
          <div className="flex gap-10 mt-10">
            <Statistic title="ยอดขาย (วันนี้)" unit="baht" value={123456} />
            <Statistic
              title="จำนวนสินค้าที่ขายได้ (วันนี้)"
              unit="piece"
              value={246}
            />
            <Statistic title="กำไร (วันนี้)" unit="baht" value={32125} />
          </div>

          <h4 className="mt-10 mb-5 text-xl">จำนวนสินค้าคงเหลือ</h4>
          <ToggleSwitch />
        </div>
      </div>
    </>
  );
}

export default Home;
