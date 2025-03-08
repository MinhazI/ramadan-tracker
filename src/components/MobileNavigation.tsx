import { Link } from "react-router";
import ROUTES from "@/constants/routes";

const MobileNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-2 px-5 flex md:hidden justify-between items-center z-50 bg-secondary">
      <Link to={ROUTES.HOME}>🏠 Home</Link>
      <Link to={ROUTES.THARAWEEH}>🕌 Tharaweeh</Link>
      <Link to={ROUTES.QUIZ}>🧩 Quiz</Link>
      <Link to={ROUTES.DUAS}>📿Duas</Link>
    </div>
  );
};

export default MobileNavigation;
