import { Card } from '../components/card';
import { Emptiness } from '../components/emptiness';
import { getFormattedDate, getRemainingDuration } from '../utils/dateTime';

export interface HolidaysProps {
  holidays: any[];
  className?: string;
}

export function Holidays(props: HolidaysProps) {
  const { holidays, className } = props;
  if (!holidays || holidays.length == 0) return (
    <Card className={className} title="Holidays">
      <Emptiness data={holidays} message="No holidays available" subMessage="Enjoy your work!" />
    </Card>
  );

  return (
    <Card className={className} title="Holidays">
      <table className="w-full h-fit border-spacing-2 border-separate font-medium">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Holiday</th>
            <th className="text-left">CountDown</th>
          </tr>
        </thead>
        <tbody className='font-roboto-regular text-md'>
          {Object.entries(holidays).map(([key, value]) => (
            <tr key={key}>
              <td className="text-left">{getFormattedDate(value.date, "LLLL do")}</td>
              <td className="text-left">{value.name}</td>
              <td className="text-left">{getRemainingDuration(value.date)} to go</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
