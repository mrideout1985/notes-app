const SvgArchive = ({
	fill,
	height,
	width,
	stroke,
	strokeWidth,
	viewBox,
	className,
}: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height={height || 24}
		width={width || 24}
		fill={fill || 'none'}
		viewBox={viewBox || '0 0 24 24'}
		strokeWidth={1.5 || strokeWidth}
		stroke={stroke || 'currentColor'}
		className={className || 'w-6 h-6'}
	>
		<path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
	</svg>
)
export default SvgArchive
