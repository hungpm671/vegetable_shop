import { Flex } from "@chakra-ui/react";
import EmblaCarousel from "@/components/fresh_basket-home/FreshCarouselBanner/embla_carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export default function FreshCarousel() {
  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
  const SLIDES = [
    {
      thumb:
        "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/background-3.jpg",
      title: "Rau Củ Tươi – Tự Nhiên Từ Vườn Đến Bếp",
      description:
        "Đưa hương vị tươi ngon nhất từ những khu vườn xanh mát đến bàn ăn gia đình bạn. Chúng tôi cam kết cung cấp rau củ sạch, không hóa chất độc hại, được canh tác tự nhiên và thu hoạch trong ngày. Hãy yên tâm lựa chọn để bữa ăn của bạn luôn tươi mới, giàu dinh dưỡng và tốt cho sức khỏe của cả gia đình.",
    },
    {
      thumb:
        "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/background-1.jpg",
      title: "Thực Phẩm Khô – Dinh Dưỡng Dài Lâu",
      description:
        "Mang đến sự tiện lợi và chất lượng với những loại thực phẩm khô được tuyển chọn kỹ lưỡng. Từ các loại hạt dinh dưỡng, ngũ cốc, đến các sản phẩm khô truyền thống, tất cả đều đảm bảo nguồn gốc rõ ràng và quy trình chế biến an toàn. Thực phẩm khô không chỉ dễ bảo quản mà còn giữ trọn giá trị dinh dưỡng, giúp bữa ăn của bạn luôn đa dạng và ngon miệng.",
    },
    {
      thumb:
        "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/background-2.jpg",
      title: "Hoa Quả Tươi – Vị Ngọt Tự Nhiên, Dinh Dưỡng Trọn Vẹn",
      description:
        "Khám phá sự tươi ngon và tinh túy của thiên nhiên qua những loại hoa quả tươi sạch, được tuyển chọn từ các nông trại đạt tiêu chuẩn cao. Mỗi trái cây đều được chăm sóc kỹ lưỡng, đảm bảo giữ nguyên hương vị và chất lượng khi đến tay bạn. Thưởng thức vị ngọt tự nhiên và bổ sung vitamin, khoáng chất cần thiết cho cơ thể mỗi ngày với hoa quả tươi.",
    },
  ];
  return (
    <Flex mt={"64px"}>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </Flex>
  );
}
