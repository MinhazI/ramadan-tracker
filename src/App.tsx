import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import TharaweehHistory from "./components/TharaweehHistory";
import iPrayer from "./interfaces/iPrayer";
import WelcomeModal from "./components/WelcomeModal";
import { getIslamicDateMonth, getIslamicDateMonthYear } from "./utils/Date";

function App() {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [prayerData, setPrayerData] = useState({} as iPrayer);
  const [openModal, setOpenModal] = useState(false);

  const currentIslamicDate = getIslamicDateMonth();
  const currentIslamicDateYear = getIslamicDateMonthYear();

  useEffect(() => {
    const prayerData = JSON.parse(
      localStorage.getItem("ramadanTracker") || "{}"
    );

    setPrayerData(prayerData || {});

    setTharaweehCount(prayerData[currentIslamicDate]?.tharaweehCount || 0);
  }, [currentIslamicDate]);

  return (
    <>
      <Navigation
        setOpenModal={setOpenModal}
        todaysDate={currentIslamicDateYear}
      />
      <WelcomeModal open={openModal} setOpen={setOpenModal} />
      <div className="min-h-[90vh]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full px-4">
            <div className="flex flex-col gap-7">
              <Counter
                tharaweehCount={tharaweehCount}
                setTharaweehCount={setTharaweehCount}
                currentIslamicDate={currentIslamicDate}
              />
              <div className="items-center">
                <TharaweehHistory prayerData={prayerData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
