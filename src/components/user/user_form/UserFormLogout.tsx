import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserFormLogout = () => {
  const handleClick = async () => {
    await sessionStorage.clear();
    window.location.href = `/`;
  };

  return (
    <DialogRoot role="alertdialog">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          justifyContent={"start"}
          paddingInline={2}
          className="hover:bg-gray-200"
        >
          <RiLogoutBoxRLine /> Đăng xuất
        </Button>
      </DialogTrigger>
      <DialogContent color={"white"}>
        <DialogHeader>
          <DialogTitle fontSize={20}>Xác nhận đăng xuất</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              bgColor={"white"}
              color={"black"}
              paddingInline={"15px"}
            >
              No
            </Button>
          </DialogActionTrigger>
          <Button
            colorPalette="red"
            bgColor={"red.600"}
            paddingInline={"15px"}
            onClick={handleClick}
          >
            Yes
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default UserFormLogout;
