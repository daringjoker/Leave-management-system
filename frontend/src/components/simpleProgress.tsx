export interface SimpleProgressProps {
  total: number;
  remaining: number;
  unit?: string;
}
export function SimpleProgress(props: SimpleProgressProps) {
  const { total, unit, remaining } = props;
  return (<div className="w-full flex flex-row min-hpx-20 max-hpx-50 hpx-25 bg-gray-200 rounded-2xl">
    {!!((total == 0) || (total - remaining)) && <div className="h-full flex flex-row flex-1 text-xs text-gray-500 justify-center items-center">{total - remaining}{unit ? " " + unit : ""}</div>}
    {(!!remaining) && < div className="h-full bg-black rounded-2xl text-xs text-gray-100 flex justify-center items-center" style={{ width: `${remaining / total * 100}%` }}>{remaining}{unit ? " " + unit : ""}</div>}
  </div >);
}
