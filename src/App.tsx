import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { DateTime } from "luxon";
import TharaweehHistory from "./components/TharaweehHistory";
import iPrayer from "./interfaces/iPrayer";
import WelcomeModal from "./components/WelcomeModal";
import Quiz from "./components/Quiz";

function App() {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [prayerData, setPrayerData] = useState({} as iPrayer);
  const [openModal, setOpenModal] = useState(false);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentIslamicDate = DateTime.now()
    .setZone(userTimeZone)
    .minus({ day: 1 })
    .reconfigure({ outputCalendar: "islamic" })
    .toFormat("LLLL dd");

  useEffect(() => {
    const prayerData = JSON.parse(
      localStorage.getItem("ramadanTracker") || "{}"
    );

    setPrayerData(prayerData || {});

    setTharaweehCount(prayerData[currentIslamicDate]?.tharaweehCount || 0);
  }, [currentIslamicDate]);

  return (
    <>
      <Navigation setOpenModal={setOpenModal} />
      <WelcomeModal open={openModal} setOpen={setOpenModal} />
      <div className="min-h-[90vh]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full px-4">
            <Quiz />

            <div className="flex flex-col gap-7 max-w-full md:max-w-[500px]">
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
