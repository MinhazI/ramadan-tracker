import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrayerHistory } from "@/interfaces/iPrayer";

const TharaweehHistory = ({ prayerData }: PrayerHistory) => {
  return (
    <>
      <h2 className="text-bold mt-15 mb-2 text-center">
        A list of your tharaweeh prayers
      </h2>
      <div className="border-2 border-slate-900 rounded-2xl p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Count</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
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
                  <TableCell className="font-medium">{date}</TableCell>
                  <TableCell>{entry.tharaweehCount}</TableCell>
                  <TableCell className="text-right">
                    {entry.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TharaweehHistory;
