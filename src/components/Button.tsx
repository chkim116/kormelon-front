import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type ButtonColor = 'primary' | 'default';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactChild | React.ReactNode;
	color?: ButtonColor;
}

const Button = ({
	children,
	color = 'default',
	type = 'button',
	...rest
}: ButtonProps) => {
	return (
		<ButtonStyle color={color} type={type} {...rest}>
			{children}
		</ButtonStyle>
	);
};

export default Button;
const ButtonStyle = styled.button<{ color: ButtonColor }>`
	padding: 8px 12px;
	border-radius: 4px;
	font-size: ${({ theme }) => theme.fontSizes.sm};

	${({ color, theme }) => {
		if (color === 'primary') {
			return css`
				background-color: ${theme.colors.blue};
				color: ${theme.colors.primary};
			`;
		}

		if (color === 'default') {
			return css`
				border: 1px solid ${theme.colors.border};
				background-color: ${theme.colors.primary};
				color: ${theme.colors.onPrimary};
			`;
		}
	}}
`;
