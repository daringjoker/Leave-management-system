import { Circle } from './circleGraph';
export interface CircleCardProps {
  title: string;
  value: number;
  outOf: number;
  unit?: string;
  counting?: string;
}
export function CircleCard(props: CircleCardProps) {
  const { title, value, outOf, unit: unit, counting } = props;
  const countingValue = counting ?? 'Remaining';
  const unitValue = unit ?? 'days';
  return (
    <div className="flex flex-col items-center justify-center w-fit h-fit px-10 py-4 bg-white rounded-xl shadow-md border border-gray-200">
      <p className="text-lg font-inter-400 text-gray-600 pb-4">{title}</p>
      <div className="flex flex-row items-center justify-between w-full h-fit">
        <Circle value={value} total={outOf} />
        <div className="flex flex-col justify-center w-fit h-fit text-sm text-gray-500 pl-4">
          <table>
            <tbody>
              <tr>
                <td className="text-right">{countingValue}:</td>
                <td className='text-right pl-2'> {value} {unitValue}</td>
              </tr>
              <tr>
                <td className="text-right">Total:</td>
                <td className='text-right pl-2'>{outOf} {unitValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div >
    </div >
  );
}
