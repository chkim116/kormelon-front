import styled from '@emotion/styled';

const AllTagStyle = styled.div`
	padding: 2em;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;

	span {
		cursor: pointer;
		margin: 8px 0;

		&:hover {
			opacity: 0.8;
		}
	}

	@media all and (max-width: 500px) {
		padding: 0.5em;
	}
`;

export default AllTagStyle;
