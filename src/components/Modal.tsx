import styled from '@emotion/styled';

import Button, { ButtonColor } from './Button';

export interface ModalProps {
	isOpen: boolean;
	children?: React.ReactChild;
	onClickOk?: React.MouseEventHandler<HTMLButtonElement>;
	onClickCancel?: React.MouseEventHandler<HTMLButtonElement>;
	isAlert?: boolean;
	isFooter?: boolean;
	okText?: string;
	okColor?: ButtonColor;
	cancelText?: string;
	cancelColor?: ButtonColor;
}

const Modal = ({
	isOpen,
	children,
	onClickOk,
	onClickCancel,
	isFooter,
	isAlert,
	okText = '확인',
	okColor = 'primary',
	cancelText = '취소',
	cancelColor = 'default',
}: ModalProps) => {
	if (!isOpen) return null;
	const isFooterRendering = isAlert || isFooter;

	return (
		<ModalStyle>
			<div className='modal-body'>
				{children}

				{isFooterRendering && (
					<div className='modal-footer'>
						<Button color={okColor} onClick={onClickOk}>
							{okText}
						</Button>
						{!isAlert && (
							<Button color={cancelColor} onClick={onClickCancel}>
								{cancelText}
							</Button>
						)}
					</div>
				)}
			</div>
		</ModalStyle>
	);
};

export default Modal;

const ModalStyle = styled.div`
	position: fixed;
	z-index: 9999;

	.modal-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		text-align: center;
		min-width: 250px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 34px 28px;
		border-radius: 10px;
		color: ${({ theme }) => theme.colors.onPrimary};
		border: 1px solid ${({ theme }) => theme.colors.border};
		background-color: ${({ theme }) => theme.colors.primary};
		font-size: ${({ theme }) => theme.fontSizes.md};

		.modal-footer {
			display: flex;
			gap: 10px;
			padding-top: 45px;

			button {
				min-width: 80px;
			}
		}
	}
`;
