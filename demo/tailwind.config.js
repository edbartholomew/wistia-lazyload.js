module.exports = {
	content: ['./demo/src/*.html'],
	theme: {
		fontFamily: {
			display: 'Heebo, sans-serif',
			body: 'Plus Jakarta Sans, sans-serif',
		},
		extend: {
			transitionProperty: {
				buttons: 'color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
			},
		},
	},
};