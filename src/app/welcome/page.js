"use client";

import CardComponent from "@/components/Card";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useGetProductQuery } from "@/store/features/product/productApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Welcome() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  const {
    data: products,
    isSuccess: LoadingProductSuccess,
    isLoading: isLoad,
  } = useGetProductQuery();

  let content = null;

  if (isLoading && LoadingProductSuccess) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-4 gap-4">
          {products?.data?.map((item, index) => (
            <CardComponent
              key={index}
              description={item.description}
              price={item.price}
              title={item.title}
            />
          ))}
        </div>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {error?.message || "This page required authentication"}
      </div>
    );
  }

  return content;
}
