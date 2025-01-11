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
import { RiLogoutBoxRFill } from "react-icons/ri";

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
          <RiLogoutBoxRFill /> Đăng xuất
        </Button>
      </DialogTrigger>
      <DialogContent color={"white"}>
        <DialogHeader>
          <DialogTitle fontSize={20}>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our systems.
          </p>
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
