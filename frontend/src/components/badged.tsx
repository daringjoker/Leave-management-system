export interface BadgedProps {
  badgePlacement: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  enableBadge: boolean;
  badge: React.ReactNode;
  children: React.ReactNode;
}
export function Badged(props: BadgedProps) {
  const { badgePlacement, enableBadge, badge, children } = props;
  return (
    <div className="relative">
      {children}
      {enableBadge && (
        <div
          className={`absolute ${badgePlacement === 'top' || badgePlacement === 'top-left' || badgePlacement === 'top-right'
            ? 'top-0'
            : 'bottom-0'
            } ${badgePlacement === 'left' || badgePlacement === 'top-left' || badgePlacement === 'bottom-left'
              ? 'left-0'
              : 'right-0'
            }`}
        >
          {badge}
        </div>
      )}
    </div>
  );

}
