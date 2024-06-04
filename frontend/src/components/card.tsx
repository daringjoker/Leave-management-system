import { className } from '../utils/className';

export interface CardProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}
export function Card(props: CardProps) {
  const { title, className: classNameList } = props;
  return (
    <div className={className("rounded-xl border border-gray-200 bg-white shadow-md p-3 pt-0 flex flex-col", classNameList)}>
      {title?.length &&
        <div className="flex flex-row items-center justify-between w-full h-fit py-2">
          <p className="text-xl font-roboto-semibold text-gray-500">{title}</p>
        </div>}
      <div className="w-full flex-1">
        {props.children}
      </div>
    </div>
  );
}
