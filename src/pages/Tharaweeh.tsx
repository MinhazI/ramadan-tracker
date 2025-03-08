import Counter from "@/components/Counter";
import TharaweehHistory from "@/components/TharaweehHistory";
import iPrayer from "@/interfaces/iPrayer";
import { getIslamicDateMonth } from "@/utils/Date";
import { useEffect, useState } from "react";

const Tharaweeh = () => {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [prayerData, setPrayerData] = useState({} as iPrayer);

  const currentIslamicDate = getIslamicDateMonth();

  useEffect(() => {
    const prayerData = JSON.parse(
      localStorage.getItem("ramadanTracker") || "{}"
    );

    setPrayerData(prayerData || {});

    setTharaweehCount(prayerData[currentIslamicDate]?.tharaweehCount || 0);
  }, [currentIslamicDate]);
  return (
    <>
      <Counter
        tharaweehCount={tharaweehCount}
        setTharaweehCount={setTharaweehCount}
        currentIslamicDate={currentIslamicDate}
      />
      <div className="items-center">
        <TharaweehHistory prayerData={prayerData} />
      </div>
    </>
  );
};

export default Tharaweeh;
