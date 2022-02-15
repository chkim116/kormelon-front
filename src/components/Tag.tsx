import styled from '@emotion/styled';
import Link from 'next/link';

interface TagProps {
	children: React.ReactChild;
	href?: string;
}

const Tag = ({ children, href }: TagProps) => {
	return (
		<TagStyle>
			{href ? <Link href={href}>{children}</Link> : <span>{children}</span>}
		</TagStyle>
	);
};

export default Tag;

const TagStyle = styled.span`
	a,
	span {
		font-size: ${({ theme }) => theme.fontSizes.sm};
		color: ${({ theme }) => theme.colors.onSecondary};
		background-color: #d7d7d71a;
		padding: 6px 12px;
	}
`;
