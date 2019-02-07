const React = require('react');

const SvgChevron = () => (
	<span className="breadcrumb-icon">
		<svg width="15" height="15" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="ui-icon ui-icon--chevron-right">
			<g fill="#666" fill-rule="evenodd">
				<path d="M6.646 5.354l4 4 .354.353.707-.707-.353-.354-4-4L7 4.293 6.293 5z"></path>
				<path d="M7.354 13.354l4-4L11.707 9 11 8.293l-.354.353-4 4-.353.354.707.707z"></path>
			</g>
		</svg>
	</span>
);
  
module.exports = SvgChevron;