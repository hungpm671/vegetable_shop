"use client";

import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/_action/userAction";
import GuestForm from "@/components/user/guest/GuestForm";
import UserCart from "@/components/user/user_cart/UserCart";
import { useUsersStore } from "@/lib/stores/users";

export default function FreshProductCart() {
  const { setCartUser } = useUsersStore((state) => state);
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["userId", userId],
    queryFn: async () => await getUserInfo(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCartUser(data[0]?.carts);
    }
  }, [isSuccess, data, setCartUser]);

  if (isLoading) return <div>Loading...</div>;

  if (data && userId) {
    return <UserCart data={data} userId={userId} />;
  }

  return <GuestForm />;
}
