import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useAppSelector } from 'src/store/config';
import EmptyIcon from 'src/assets/static/empty-folder.svg';

interface EmptyProps {
	title?: string;
}

const Empty = ({ title = '아직 게시된 글이 없네요 :(' }: EmptyProps) => {
	const { themeMode } = useAppSelector((state) => state.themeMode);
	return (
		<EmptyStyle themeMode={themeMode === 'dark'}>
			<Image src={EmptyIcon} alt='empty icon' width={120} height={120} />
			<h4>{title}</h4>
		</EmptyStyle>
	);
};

export default Empty;

const EmptyStyle = styled.div<{ themeMode: boolean }>`
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	h4 {
		margin-top: 2em;
	}

	span {
		${({ themeMode }) => {
			if (themeMode) {
				return css`
					filter: invert(98%) sepia(7%) saturate(107%) hue-rotate(159deg)
						brightness(111%) contrast(100%);
				`;
			}
		}}
	}
`;
