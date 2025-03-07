import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrayerHistory } from "@/interfaces/iPrayer";
import { Card, CardContent, CardTitle } from "./ui/card";

const TharaweehHistory = ({ prayerData }: PrayerHistory) => {
  return (
    <Card className="max-w-full md:max-w-[500px]">
      <CardTitle className=" text-center capitalize">
        A history of your tharaweeh prayers
      </CardTitle>
      <CardContent>
        <Table className="">
          <TableHeader className="">
            <TableRow className="">
              <TableHead>Date</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(prayerData)
              .sort(
                ([dateA], [dateB]) =>
                  new Date(dateB).getTime() - new Date(dateA).getTime()
              )
              .map(([date, entry]) => (
                <TableRow key={date}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{entry.tharaweehCount}</TableCell>
                  <TableCell>{entry.lastUpdated}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TharaweehHistory;
