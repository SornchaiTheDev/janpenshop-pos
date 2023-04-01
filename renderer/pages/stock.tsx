import React from "react";
import Sidebar from "@/HOC/Sidebar";
import Table from "@/components/Table";
import type { Data } from "@/types/tableData";
import { fakeData } from "@/utils";

interface Props {
  data: Data[];
}

function Stock({ data }: Props) {
  return (
    <>
      <Sidebar title="จัดการสินค้า">
        <Table pageSize={16} data={data} />
      </Sidebar>
    </>
  );
}

export default Stock;

export async function getServerSideProps() {
  const data = fakeData(10000);

  return {
    props: {
      data,
    },
  };
}
