"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/_action/userAction";
import GuestForm from "@/components/user/guest/GuestForm";
import UserCart from "@/components/user/user_cart/UserCart";

export default function FreshProductCart() {
  const userId = sessionStorage.getItem("userId");

  const { data, isLoading } = useQuery({
    queryKey: ["userId", userId],
    queryFn: async () => await getUserInfo(userId!),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (data && userId) {
    console.log(data);

    return <UserCart data={data} userId={userId} />;
  }

  return <GuestForm />;
}
