module.exports = {
	dimensions: false,
	expandProps: false,
	svgProps: {
		width: "{props.size ?? 16}",
		height: "{props.size ?? 16}",
		fill: "{props.color}",
	},
	replaceAttrValues: {
		"#000": "{props.color}",
		"#000000": "{props.color}",
	},
}
