import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

const Counter = () => {
  const [tharaweehCount, setTharaweehCount] = useState(0);
  const [saving, setSaving] = useState(false);
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

    setTharaweehCount(prayerData[currentIslamicDate]?.tharaweehCount || 0);
  }, [currentIslamicDate]);

  const reducePrayerCount = () => {
    if (tharaweehCount > 0) {
      setTharaweehCount(tharaweehCount - 1);
      savePrayer(tharaweehCount - 1);
    }
  };

  const addPrayerCount = () => {
    if (tharaweehCount < 10) {
      setTharaweehCount(tharaweehCount + 1);
      savePrayer(tharaweehCount + 1);
    }
  };

  const savePrayer = (count: number) => {
    setSaving(true);

    try {
      // Retrieve existing tracker data or initialize an empty object
      const prayerData = JSON.parse(
        localStorage.getItem("ramadanTracker") || "{}"
      );

      // Update the prayer count for the current Islamic date
      prayerData[currentIslamicDate] = {
        tharaweehCount: count,
        lastUpdated: DateTime.now().toFormat("h:mm a - dd LLL yyyy"),
      };

      // Save updated data back to localStorage
      localStorage.setItem("ramadanTracker", JSON.stringify(prayerData));

      // Show confirmation toast
      toast("Saved Tharaweeh Count", {
        description: `Your tharaweeh count of ${count} for ${currentIslamicDate} has been saved at ${DateTime.now().toFormat(
          "h:mm a"
        )}`,
      });
    } catch (error) {
      console.error("Error saving prayer count:", error);
      toast("Error", {
        description: "Failed to save Tharaweeh count. Please try again.",
      });
    } finally {
      setSaving(false); // Ensure this always runs
    }
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Tharaweeh Counter</CardTitle>
        <CardDescription>
          Set your tharaweeh count for{" "}
          <span className="font-bold">{currentIslamicDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => reducePrayerCount()}
            disabled={saving}
            className="rounded-4xl"
          >
            {saving ? <Loader2 /> : <Minus size={30} />}
          </Button>
          <h2 className="text-5xl font-bold">{tharaweehCount}</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => addPrayerCount()}
            disabled={saving}
            className="rounded-4xl"
          >
            {saving ? <Loader2 /> : <Plus size={30} aria-label="Add +1" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Counter;
