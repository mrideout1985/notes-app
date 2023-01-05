import { SvgProps } from "./interfaces";

const SvgTrash = ({
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
      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    />
  </svg>
);
export default SvgTrash;
