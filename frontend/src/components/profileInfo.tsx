import { className } from '../utils/className';

export type URIType = 'email' | 'phone' | 'link';
export interface InfoProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  value: string | React.ReactNode;
  uriType?: URIType;
  className?: string;
};

function resize(size: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-md';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-md';
  }
}

function wrapIfNeeded(value: string, uriType?: URIType) {
  if (!uriType) return <>{value}</>;
  return <a href={convertToURI(value, uriType)}>{value}</a>;
}

function convertToURI(value: string, uriType?: URIType) {
  switch (uriType) {
    case 'email':
      return `mailto:${value}`;
    case 'phone':
      return `tel:${value}`;
    case 'link':
      return value;
    default:
      return value;
  }
}

export function Info(props: InfoProps) {
  const { label, value, uriType, className: classNameList, size } = props;

  return (
    <div className={className("flex flex-row  items-center h-fit", classNameList)}>
      <p className={className("font-inter-600 text-black pr-2 pt-1", resize(size || "lg"))}>{label}:</p>
      {typeof value == "string" ? <span className={className("text-gray-700", resize(size || "lg"))}>{wrapIfNeeded(value, uriType)}</span> : value}
    </div>);
}
