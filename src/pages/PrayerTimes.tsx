import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import iPrayerTime from "@/interfaces/iPrayerTime";
import { getDate, getIslamicDateMonthYear, getMonth } from "@/utils/date";
import getPrayerTimes from "@/utils/getPrayerTimes";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaSun, FaMoon, FaCloudSun, FaCoffee } from "react-icons/fa"; // React Icons

const PrayerTimes = () => {
  const currentDate = getDate();
  const currentMonth = getMonth();

  const [prayerTimes, setPrayerTimes] = useState<iPrayerTime | null>(null);

  useEffect(() => {
    retrieivePrayerTimes();
  }, [currentDate, currentMonth]);

  const retrieivePrayerTimes = async () => {
    const prayerTime = await getPrayerTimes(currentMonth, Number(currentDate));
    setPrayerTimes(prayerTime);
  };

  const getPrayerIcon = (name: string) => {
    switch (name) {
      case "Subahu":
        return <FaSun className="text-yellow-500" />;
      case "Zuhr":
        return <FaCloudSun className="text-yellow-400" />;
      case "Asar":
        return <FaCloudSun className="text-orange-200" />;
      case "Maghrib":
        return <FaSun className="text-gray-900" />;
      case "Esha":
        return <FaMoon className="text-black" />;
      default:
        return <FaCoffee className="text-gray-500" />;
    }
  };

  return (
    <Card className="text-center max-w-full md:max-w-[500px]">
      <CardHeader>
        <CardTitle>Prayer Times</CardTitle>
        <CardDescription>
          <h2>
            {prayerTimes?.day}, {prayerTimes?.month}
          </h2>
          <h3>{getIslamicDateMonthYear()}</h3>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full rounded-4xl">
          <TableHeader>
            <TableRow className="w-full bg-slate-500 dark:bg-slate-950">
              <TableHead className="w-1/2 text-dark dark:text-white font-bold">
                Prayer
              </TableHead>
              <TableHead className="w-1/2 text-dark dark:text-white font-bold">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-left">
            {[
              { name: "Subahu", time: prayerTimes?.prayerTimes.Subahu },
              { name: "Zuhr", time: prayerTimes?.prayerTimes.Zuhr },
              { name: "Asar", time: prayerTimes?.prayerTimes.Asar },
              { name: "Maghrib", time: prayerTimes?.prayerTimes.Maghrib },
              { name: "Esha", time: prayerTimes?.prayerTimes.Esha },
            ].map((prayer, index) => (
              <TableRow
                key={index}
                className={`border-t border-primary dark:border-slate-500 ${
                  index % 2 === 0
                    ? "bg-slate-400 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                }`}
              >
                <TableCell className="w-1/2 p-2 flex items-center gap-2">
                  {getPrayerIcon(prayer.name)} {prayer.name}
                </TableCell>
                <TableCell className="w-1/2 p-2">{prayer.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PrayerTimes;
