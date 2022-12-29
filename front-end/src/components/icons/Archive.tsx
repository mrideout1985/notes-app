const SvgArchive = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? 16}
    height={props.size ?? 16}
    fill={props.color}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="archive_svg__feather archive_svg__feather-archive"
  >
    <path transform="translate(5, 5)" d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
  </svg>
);
export default SvgArchive;
