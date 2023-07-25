import { IconType } from "react-icons/lib";
type IndicatorPositionTypes =
  | "indicator-top indicator-start"
  | "indicator-top indicator-center"
  | "indicator-top indicator-end"
  | "indicator-middle indicator-star"
  | "indicator-middle indicator-center"
  | "indicator-middle indicator-end"
  | "indicator-bottom indicator-start"
  | "indicator-bottom indicator-center"
  | "indicator-bottom indicator-end";

export default function Badge({
  children,
  label,
  icon,
  iconSize = 18,
  color = "text-white",
  background = "badge-primary",
  position = "indicator-top indicator-end",
  className = "",
}: {
  children: React.ReactNode;
  label?: string;
  icon?: IconType;
  iconSize?: number;
  color?: string;
  background?: string;
  position?: IndicatorPositionTypes;
  className?: string;
}) {
  const BadgeIcon = icon;
  return (
    <div className="indicator">
      <span
        className={`indicator-item ${position} badge ${color} ${background} ${className}`}
      >
        {BadgeIcon ? (
          <BadgeIcon size={iconSize} />
        ) : label ? (
          <>{label}</>
        ) : (
          <></>
        )}
      </span>
      {children}
    </div>
  );
}
