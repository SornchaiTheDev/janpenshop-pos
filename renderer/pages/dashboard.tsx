import { useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Statistic from "@/components/Statistic";
import { BiHome } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { RiSettings4Line } from "react-icons/ri";
import { TbDoorExit } from "react-icons/tb";
import { fakeData } from "@/utils";
import type { Data } from "@/types/tableData";
import Table from "@/components/Table";
import Sidebar from "@/HOC/Sidebar";

interface Props {
  data: Data[];
}

function Home({ data }: Props) {
  return (
    <Sidebar title="แดชบอร์ด">
      <div className="flex gap-4 mt-10">
        <Statistic title="ยอดขาย (วันนี้)" unit="baht" value={123456} />
        <Statistic
          title="จำนวนสินค้าที่ขายได้ (วันนี้)"
          unit="piece"
          value={246}
        />
        <Statistic title="กำไร (วันนี้)" unit="baht" value={32125} />
      </div>

      <Table pageSize={12} data={data} />
    </Sidebar>
  );
}

export default Home;

export async function getServerSideProps() {
  const data = fakeData(10000);

  return {
    props: {
      data,
    },
  };
}
