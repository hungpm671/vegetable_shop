import React from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { FaSpinner } from "react-icons/fa6";

export default function WaitingLoading() {
  return (
    <EmptyState
      icon={<FaSpinner className="animate-spin text-blue-500 text-4xl" />}
      title="Đang tìm kiếm kết quả..."
      description="Chúng tôi đang xử lý thông tin và sẽ mang đến câu trả lời cho bạn ngay khi có thể. Vui lòng đợi trong giây lát!"
    />
  );
}
