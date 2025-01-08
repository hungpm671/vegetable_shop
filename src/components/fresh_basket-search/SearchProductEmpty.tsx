import React from "react";
import { List } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { TbMoodEmptyFilled } from "react-icons/tb";

export default function SearchProductEmpty() {
  return (
    <EmptyState
      icon={<TbMoodEmptyFilled />}
      title="Không tìm thấy kết quả"
      description="Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa bạn đã nhập."
      size={"lg"}
    >
      <List.Root variant="marker" listStyleType={"disc"}>
        <List.Item>
          Kiểm tra lại từ khóa tìm kiếm xem có lỗi chính tả không.
        </List.Item>
        <List.Item>Sử dụng các từ khóa khác hoặc đơn giản hơn.</List.Item>
        <List.Item>Thử tìm kiếm với các cụm từ liên quan.</List.Item>
      </List.Root>
    </EmptyState>
  );
}
