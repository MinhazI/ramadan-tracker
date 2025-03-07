import { Info } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import ShareButton from "./ShareButton";
import { Button } from "./ui/button";

interface iNavigation {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  todaysDate: string;
}

const Navigation = ({ setOpenModal, todaysDate }: iNavigation) => {
  return (
    <div className="flex py-2 mb-10 pr-3 bg-green-100 dark:bg-accent">
      <div className="flex-1/2 pl-2">
        <h1 className="font-bold">Ramadan Tracker</h1>
        <span className="text-xs">{todaysDate}</span>
      </div>
      <div className="flex-1/2 text-right py-2">
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
    </div>
  );
};

export default Navigation;
