import { SvgProps } from "./interfaces";

const SvgAlertCircle = ({
  fill,
  height,
  width,
  stroke,
  strokeWidth,
  viewBox,
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    fill={fill || "currentColor"}
    stroke={stroke || "currentColor"}
    strokeWidth={strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox={viewBox || "0 0 35 35"}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
export default SvgAlertCircle;
