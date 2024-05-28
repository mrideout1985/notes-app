import * as React from 'react';
const SvgChevronUp = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 16} height={props.size ?? 16} fill={props.color || 'none'} stroke={props.stroke || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="chevron-up_svg__feather chevron-up_svg__feather-chevron-up">
		<path d="m18 15-6-6-6 6"/>
	</svg>);
export default SvgChevronUp;
