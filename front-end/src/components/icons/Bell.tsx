import { SvgProps } from "./interfaces";

const SvgBell = ({
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
    <path
      transform="translate(5, 5)"
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
    />
  </svg>
);
export default SvgBell;
