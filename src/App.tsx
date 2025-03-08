import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router"; // Use BrowserRouter
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import WelcomeModal from "./components/WelcomeModal";
import { getIslamicDateMonthYear } from "./utils/Date";
import Duas from "./pages/Duas";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home"; // You need a home page
import Tharaweeh from "./pages/Tharaweeh";
import ROUTES from "./constants/routes";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const currentIslamicDateYear = getIslamicDateMonthYear();

  return (
    <BrowserRouter>
      <Navigation
        setOpenModal={setOpenModal}
        todaysDate={currentIslamicDateYear}
      />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.QUIZ} element={<Quiz />} />
        <Route path={ROUTES.DUAS} element={<Duas />} />
        <Route path={ROUTES.THARAWEEH} element={<Tharaweeh />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>

      <WelcomeModal open={openModal} setOpen={setOpenModal} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
