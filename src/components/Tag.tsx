import styled from '@emotion/styled';
import Link from 'next/link';

interface TagProps
	extends React.HTMLAttributes<HTMLLinkElement | HTMLSpanElement> {
	children: React.ReactChild;
	href?: string;
}

const Tag = ({ children, href, ...rest }: TagProps) => {
	return (
		<TagStyle>
			{href ? (
				<Link href={href} {...rest}>
					{children}
				</Link>
			) : (
				<span {...rest}>{children}</span>
			)}
		</TagStyle>
	);
};

export default Tag;

const TagStyle = styled.span`
	a,
	span {
		font-size: ${({ theme }) => theme.fontSizes.sm};
		color: ${({ theme }) => theme.colors.onSecondary};
		background-color: ${({ theme }) => theme.colors.secondary};
		padding: 6px 12px;
	}
`;
