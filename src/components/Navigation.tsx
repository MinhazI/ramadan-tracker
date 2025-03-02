import { ModeToggle } from "./mode-toggle";
import ShareButton from "./ShareButton";

const Navigation = () => {
  return (
    <div className="flex justify-end pt-4 pr-3">
      <ShareButton />
      <ModeToggle />
    </div>
  );
};

export default Navigation;
