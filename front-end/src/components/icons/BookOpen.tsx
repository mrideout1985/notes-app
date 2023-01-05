import { SvgProps } from "./interfaces";

const SvgBookOpen = ({
  fill,
  height,
  width,
  stroke,
  strokeWidth,
  viewBox,
  className,
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
    className={className || ""}
  >
    <path
      transform="translate(5, 7)"
      d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
    />
  </svg>
);
export default SvgBookOpen;
