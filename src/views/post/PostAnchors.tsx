import { useState, useCallback, useEffect } from 'react';

interface PostAnchorsProps {
	anchors: string[];
}

const PostAnchors = ({ anchors }: PostAnchorsProps) => {
	const [activeAnchor, setActiveAnchor] = useState('');
	// anchor 클릭 시 scroll이 움직여 자동으로 onScroll가 실행된다. 이를 방지.
	const [isMove, setIsMove] = useState(false);

	// anchor(h1)들의 현재 위치를 체크합니다.
	const getAnchorPosition = useCallback(():
		| { [x: string]: number }
		| undefined => {
		if (!anchors?.length || typeof window !== 'object') {
			return;
		}

		const res: { [x: string]: number } = {};

		for (const anchor of anchors) {
			// 2로 나눈 이유는, 시작 지점이 아니라 그 이전에 앵커를 active하기 위함.
			res[anchor] = document.getElementById(anchor)!.offsetTop / 2;
		}

		return res;
	}, [anchors]);

	const onScroll = useCallback(() => {
		const anchor = getAnchorPosition();

		if (!anchor || isMove) {
			return;
		}

		const anchors = Object.entries(anchor);

		const res = anchors
			.filter(([_, value]) => {
				return scrollY >= value;
			})
			.map(([key]) => key);
		setActiveAnchor(res[res.length - 1]);
	}, [getAnchorPosition, isMove]);

	const onClickAnchor = useCallback(
		(e) => {
			// a tag event prevent
			e.preventDefault();

			const anchor = getAnchorPosition();
			const {
				hash,
				dataset: { id },
			} = e.target;

			if (typeof window !== 'object' || !anchor) {
				return;
			}

			scrollTo({
				behavior: 'smooth',
				top: anchor[id],
			});

			history.pushState(null, '', hash);
			setActiveAnchor(id);

			// scrollTo 되면서 자동으로 발생하는 anchor active 방지
			setIsMove(true);

			// 300ms 후, isMove 해제.
			const tick = setTimeout(() => {
				setIsMove(false);
				clearInterval(tick);
			}, 300);
		},
		[getAnchorPosition]
	);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);

	return (
		<>
			{anchors?.map((anchor, index) => (
				<a
					key={anchor}
					onClick={onClickAnchor}
					data-id={anchor}
					data-index={index}
					href={`#${anchor}`}
					className={`anchor ${activeAnchor === anchor ? 'active' : ''}`}
				>
					{anchor.replaceAll('-', ' ')}
				</a>
			))}
		</>
	);
};

export default PostAnchors;
