import { SvgProps } from "./interfaces";

const SvgArchive = ({
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
    className={className || ""}
    viewBox={viewBox || "0 0 35 35"}
  >
    <path transform="translate(5, 7)" d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
  </svg>
);
export default SvgArchive;
