import { className } from '../utils/className';

export interface ModalProps {
  className?: string;
  onOutsideClick?: () => void
  title: string;
  children: React.ReactNode
}
export function Modal(props: ModalProps) {
  const { onOutsideClick, title, className: classNameList } = props;
  function outsideClicked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onOutsideClick?.();
    }
  }
  return <div className='modal bg-red-200'>
    <div className={className("rounded-xl border border-gray-200 bg-white shadow-md p-3 pt-0 flex flex-col", classNameList)}>
      {title?.length &&
        <div className="flex flex-row items-center justify-between w-full h-fit py-2">
          <p className="text-xl font-roboto-semibold text-gray-500">{title}</p>
          <button onClick={(e) => onOutsideClick?.()} className="text-gray-500 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>}
      <div className="w-full flex-1">
        {props.children}
      </div>
    </div>

  </div >
}
