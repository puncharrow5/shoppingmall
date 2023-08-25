import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem } from "../../store/thunkFunctions";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);

  const dispatch = useDispatch();

  // 이부분 확실하게 다시 공부하기!
  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    caculatePrice(cartDetail);
  }, [cartDetail]);

  const caculatePrice = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    setTotalPrice(total);
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  return (
    <section className="min-h-[640px] px-10">
      <div className="my-8">
        {cartDetail?.length > 0 ? (
          <div className="flex">
            <CartTable products={cartDetail} onRemoveItem={handleRemoveItem} />

            <div className="w-2/5 m-4">
              <p className="mb-8 text-2xl font-bold">주문 내역</p>
              <p className="flex justify-between mb-2">
                <span>상품금액</span>
                <span>{totalPrice} 원</span>
              </p>
              <p className="flex justify-between mb-5 pb-5 border-b-2 border-slate-100">
                <span>배송비</span>
                <span>0 원</span>
              </p>
              <p className="flex justify-between font-bold pb-5 border-b-2 border-slate-100">
                <span>합계</span>
                <span>{totalPrice} 원</span>
              </p>
              <button className="w-full h-12 mt-8 text-white bg-[#111111] hover:bg-[#41b979] rounded-3xl">
                결제하기
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="m-4 w-3/5 mr-10">
              <h2 className="mb-4 text-2xl font-bold">
                장바구니에 상품이 없습니다.
              </h2>
            </div>

            <div className="w-2/5 m-4">
              <p className="mb-8 text-2xl font-bold">주문 내역</p>
              <p className="flex justify-between mb-2">
                <span>상품금액</span>
                <span>{totalPrice} 원</span>
              </p>
              <p className="flex justify-between mb-5 pb-5 border-b-2 border-slate-100">
                <span>배송비</span>
                <span>0 원</span>
              </p>
              <p className="flex justify-between font-bold pb-5 border-b-2 border-slate-100">
                <span>합계</span>
                <span>{totalPrice} 원</span>
              </p>
              <button className="w-full h-12 mt-8 text-white bg-[#111111] hover:bg-[#41b979] rounded-3xl">
                결제하기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
