import { useState, useCallback, useEffect } from 'react';

interface PostAnchorsProps {
	anchors: string[];
}

function toReplace(anchor: string) {
	return anchor
		.replace(/[\!\@\#\$\%\^\&\*\(\)\_\+\?\.\,\_\=\~\`\/\*\-\+]+/g, '')
		.replace(/ /g, '-')
		.toLowerCase();
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
			const reAnchor = toReplace(anchor);
			// -200 한 이유는, 시작 지점이 아니라 그 이전에 앵커를 active하기 위함.
			const aDom = document.getElementById(reAnchor);
			if (aDom) {
				res[reAnchor] = aDom.offsetTop - 200;
			}
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

			history.pushState(null, '', hash);
			setActiveAnchor(id);

			scrollTo({
				behavior: 'smooth',
				top: anchor[id],
			});

			// scrollTo 되면서 자동으로 발생하는 anchor active 방지
			setIsMove(true);

			// isMove 해제.
			const tick = setInterval(() => {
				if (anchor[id] === window.scrollY) {
					setIsMove(false);
					clearInterval(tick);
				}
			}, 25);
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
			{anchors?.map((anchor, index) => {
				const reAnchor = toReplace(anchor);
				return (
					<a
						key={reAnchor}
						onClick={onClickAnchor}
						data-id={reAnchor}
						data-index={index}
						href={`#${reAnchor}`}
						className={`anchor ${activeAnchor === reAnchor ? 'active' : ''}`}
					>
						{anchor}
					</a>
				);
			})}
		</>
	);
};

export default PostAnchors;
