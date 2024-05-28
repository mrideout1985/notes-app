import * as React from 'react';
const SvgChevronDown = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 16} height={props.size ?? 16} fill={props.color || 'none'} stroke={props.stroke || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="chevron-down_svg__feather chevron-down_svg__feather-chevron-down">
		<path d="m6 9 6 6 6-6"/>
	</svg>);
export default SvgChevronDown;
