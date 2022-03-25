import * as React from "react"

const SvgXCircle = (props: any) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={25} height={25} {...props}>
		<path d='M9.036 7.976a.75.75 0 0 0-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 1 0 1.06 1.06L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.75.75 0 1 0-1.06-1.06L12 10.939 9.036 7.976z' />
		<path
			fillRule='evenodd'
			d='M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z'
		/>
	</svg>
)

export default SvgXCircle
