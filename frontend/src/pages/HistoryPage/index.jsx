import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const HistoryPage = () => {
  const userData = useSelector((state) => state.user?.userData);

  return (
    <section className="min-h-[640px] px-10">
      <div className="my-8">
        <h2 className="text-2xl text-center font-bold">주문 목록</h2>
      </div>

      <table className="w-full text-sm text-left">
        <thead>
          <tr className="h-8 border-[1px] bg-gray-300">
            <th className="w-3/5">상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th className="w-1/5">구매 날짜</th>
          </tr>
        </thead>
        <tbody>
          {userData?.history.map((item) => (
            <tr className="border-b h-8" key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} 원</td>
              <td>{item.quantity} 개</td>
              <td>{dayjs(item.purchaseDate).format("YYYY/MM/DD HH:mm")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default HistoryPage;
