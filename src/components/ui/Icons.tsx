import Svg, { Path, Circle, Line, Polyline, Rect, Polygon } from "react-native-svg";

interface IconProps {
  size?: number;
  active?: boolean;
  color?: string;
}

export const HomeIcon = ({ size = 24, active = false, color = active ? "#6366f1" : "#94a3b8" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <Polyline points="9 22 9 12 15 12 15 22" />
  </Svg>
);

export const TransactionIcon = ({ size = 24, active = false, color = active ? "#6366f1" : "#94a3b8" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="12" y1="1" x2="12" y2="23" />
    <Path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </Svg>
);

export const BudgetIcon = ({ size = 24, active = false, color = active ? "#6366f1" : "#94a3b8" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="3" width="20" height="14" rx="2" />
    <Line x1="8" y1="21" x2="16" y2="21" />
    <Line x1="12" y1="17" x2="12" y2="21" />
    <Line x1="7" y1="8" x2="7" y2="13" />
    <Line x1="12" y1="6" x2="12" y2="13" />
    <Line x1="17" y1="10" x2="17" y2="13" />
  </Svg>
);

export const GoalsIcon = ({ size = 24, active = false, color = active ? "#6366f1" : "#94a3b8" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="12" cy="12" r="6" />
    <Circle cx="12" cy="12" r="2" />
  </Svg>
);

export const AIIcon = ({ size = 24, active = false, color = "#ffffff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 7 7 0 01-7 7v1a2 2 0 01-4 0v-1a7 7 0 01-7-7 7 7 0 017-7V4a2 2 0 012-2z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

export const ArrowUpIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="12" y1="19" x2="12" y2="5" />
    <Polyline points="5 12 12 5 19 12" />
  </Svg>
);

export const ArrowDownIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Polyline points="19 12 12 19 5 12" />
  </Svg>
);

export const ChevronRightIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="9 18 15 12 9 6" />
  </Svg>
);

export const ChevronLeftIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="15 18 9 12 15 6" />
  </Svg>
);

export const PlusIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

export const BellIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.73 21a2 2 0 01-3.46 0" />
  </Svg>
);

export const SearchIcon = ({ size = 18, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

export const FilterIcon = ({ size = 18, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </Svg>
);

export const SparkleIcon = ({ size = 18, color = "#ffffff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </Svg>
);

export const CheckIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const TrendUpIcon = ({ size = 14, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <Polyline points="17 6 23 6 23 12" />
  </Svg>
);

export const SettingsIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </Svg>
);

export const CloseIcon = ({ size = 20, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

export const HealthIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </Svg>
);

export const ReportIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <Polyline points="14 2 14 8 20 8" />
    <Line x1="16" y1="13" x2="8" y2="13" />
    <Line x1="16" y1="17" x2="8" y2="17" />
    <Polyline points="10 9 9 9 8 9" />
  </Svg>
);

export const DebtIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <Line x1="1" y1="10" x2="23" y2="10" />
  </Svg>
);

export const ProfileIcon = ({ size = 22, color = "currentColor" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);
