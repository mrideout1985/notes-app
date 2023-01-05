import { SvgProps } from "./interfaces";

const SvgUser = ({
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
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
    />
    <circle transform="translate(5, 5)" cx={12} cy={7} r={4} />
  </svg>
);
export default SvgUser;
