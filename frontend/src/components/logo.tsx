import { Link } from 'react-router-dom';

export function Logo(props: { className?: string }) {
  const className = props.className || "text-2xl";
  return (
    <Link to="/" className={`${className} font-bold text-center font-jersey`} > DareTrack 365</Link >
  )
}
