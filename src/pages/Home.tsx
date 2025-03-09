import Tharaweeh from "./Tharaweeh";
import Quiz from "./Quiz";
import PrayerTimes from "./PrayerTimes";

const Home = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full px-4">
          <Quiz />
          <Tharaweeh />
          <PrayerTimes />
        </div>
      </div>
    </div>
  );
};

export default Home;
