import styled from '@emotion/styled';

/**
 * 홈페이지 헤더
 */
export const Header = () => {
	return (
		<HeaderStyle>
			<div className='header'>
				<p>My Blog Name</p>

				<span>
					<input type='text' placeholder='검색..' />
				</span>
			</div>
		</HeaderStyle>
	);
};

const HeaderStyle = styled.header`
	position: fixed;
	width: 100%;
	height: 50px;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => theme.colors.primary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};

	.header {
		max-width: 700px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;

		p {
			font-size: ${({ theme }) => theme.fontSizes.xl};
			font-weight: 500;
		}
	}
`;
