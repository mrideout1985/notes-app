import * as React from "react"

const SvgGridOutline = (props: any) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='grid-outline_svg__ionicon'
		viewBox='0 0 512 512'
		width={props.size ?? 25}
		height={props.size ?? 25}
		{...props}
	>
		<rect
			x={48}
			y={48}
			width={176}
			height={176}
			rx={20}
			ry={20}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={32}
		/>
		<rect
			x={288}
			y={48}
			width={176}
			height={176}
			rx={20}
			ry={20}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={32}
		/>
		<rect
			x={48}
			y={288}
			width={176}
			height={176}
			rx={20}
			ry={20}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={32}
		/>
		<rect
			x={288}
			y={288}
			width={176}
			height={176}
			rx={20}
			ry={20}
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={32}
		/>
	</svg>
)

export default SvgGridOutline
