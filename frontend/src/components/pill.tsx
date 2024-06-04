export interface PillProps {
  text: string;
  className?: string;
  colorMap?: Record<string, string>;
}

export const Pill = (props: PillProps) => {
  const { text, className } = props;
  const color = props.colorMap ? props.colorMap[text.toLowerCase()] || 'bg-gray-300' : '';
  return (
    <div className={`px-4 py-1 rounded-full font-normal border-gray-200 border w-full text-sm ${color} ${className}`}>
      {text}
    </div>
  );
}
