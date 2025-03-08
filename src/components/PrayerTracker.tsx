import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PrayerTracker = () => {
  const prayers = ["Subah", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <Card className="min-w-fit">
      <CardHeader className="">
        <CardTitle>Today's Prayers Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        {prayers.map((prayer, key) => (
          <div
            className="bg-muted dark:bg-primary p-5 rounded-xs min-w-40 max-w-full"
            key={key}
          >
            {prayer}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <h5 className="text-sm">Last Updated 2hrs ago</h5>
      </CardFooter>
    </Card>
  );
};

export default PrayerTracker;
