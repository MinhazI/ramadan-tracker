import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { DateTime } from "luxon";
import TharaweehHistory from "./components/TharaweehHistory";
import iPrayer from "./interfaces/iPrayer";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [prayerData, setPrayerData] = useState({} as iPrayer);

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
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <WelcomeModal />
        <div className="flex flex-col max-w-[500px] items-center">
          <Counter
            tharaweehCount={tharaweehCount}
            setTharaweehCount={setTharaweehCount}
            currentIslamicDate={currentIslamicDate}
          />
          <TharaweehHistory prayerData={prayerData} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
