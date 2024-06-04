
export interface EmptinessProps {
  data: any;
  message: string;
  subMessage: string;
  children?: React.ReactNode;
}
export function Emptiness(props: EmptinessProps) {
  const { data, message, subMessage, children } = props;
  if (!data || data.length === 0) {
    return (<div className="flex-col text-gray-500 text-sm flex items-center justify-center h-full">
      <p className="text-lg">
        {message}
      </p>
      <p className='text-sm'>
        {subMessage}
      </p>
    </div>
    );
  }
  return (<>{children}</>);
}
