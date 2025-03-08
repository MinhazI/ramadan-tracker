import { Info } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import ShareButton from "./ShareButton";
import { Button } from "./ui/button";
import { Link } from "react-router";
import ROUTES from "@/constants/routes";
import iNavigation from "@/interfaces/iNavigation";

const Navigation = ({ setOpenModal, todaysDate }: iNavigation) => {
  return (
    <div className="flex py-2 mb-10 pr-3 bg-secondary">
      <div className="flex-1/2 pl-2">
        <h1 className="font-bold">Ramadan Tracker</h1>
        <span className="text-xs">{todaysDate}</span>
      </div>
      {/* <div className="hidden md:flex items-center space-x-9">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.THARAWEEH}>Tharaweeh</Link>
        <Link to={ROUTES.QUIZ}>Quiz</Link>
        <Link to={ROUTES.DUAS}>Duas</Link>
      </div> */}
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
