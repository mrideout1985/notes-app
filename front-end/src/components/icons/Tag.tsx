import { SvgProps } from "./interfaces";

const SvgTag = ({
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
      d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"
    />
  </svg>
);
export default SvgTag;
