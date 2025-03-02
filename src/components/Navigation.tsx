import { Info } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import ShareButton from "./ShareButton";
import { Button } from "./ui/button";

interface iNavigation {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation = ({ setOpenModal }: iNavigation) => {
  return (
    <div className="flex justify-end pt-4 pr-3">
      <ShareButton />
      <ModeToggle />
      <Button
        className="ml-2"
        variant="ghost"
        size={"icon"}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Info />
      </Button>
    </div>
  );
};

export default Navigation;
