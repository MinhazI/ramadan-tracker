import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Loader2, Minus, Plus } from "lucide-react";

const Counter = () => {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const currentIslamicDate = DateTime.now()
    .setZone("Asia/Colombo")
    .minus({ day: 1 })
    .reconfigure({ outputCalendar: "islamic" })
    .toFormat("LLLL dd");

  useEffect(() => {
    const prayerData = JSON.parse(
      localStorage.getItem("ramadanTracker") || "{}"
    );

    setTharaweehCount(prayerData[currentIslamicDate] || 0);
  }, [currentIslamicDate]);

  const reducePrayerCount = () => {
    if (tharaweehCount > 0) setTharaweehCount(tharaweehCount - 1);
  };

  const addPrayerCount = () => {
    if (tharaweehCount < 10) setTharaweehCount(tharaweehCount + 1);
  };

  const savePrayer = () => {
    setSaving(true);
    const prayerData = JSON.parse(
      localStorage.getItem("ramadanTracker") || "{}"
    );

    prayerData[currentIslamicDate] = tharaweehCount;

    localStorage.setItem("ramadanTracker", JSON.stringify(prayerData));
    setSaving(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tharaweeh Counter</CardTitle>
        <CardDescription>
          Set your tharaweeh count for{" "}
          <span className="font-bold">{currentIslamicDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="lg" onClick={() => addPrayerCount()}>
            <Plus size={30} />
          </Button>
          <h2>{tharaweehCount}</h2>
          <Button
            variant="outline"
            size="lg"
            onClick={() => reducePrayerCount()}
          >
            <Minus size={30} />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={"default"}
          onClick={() => savePrayer()}
          disabled={saving || false}
        >
          {saving && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Counter;
