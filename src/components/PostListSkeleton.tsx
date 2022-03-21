import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostListSkeleton = ({ length = 3 }: { length?: number }) => {
	const theme = useTheme();

	return (
		<PostListSkeletonStyle>
			<SkeletonTheme
				baseColor={theme.colors.secondary}
				highlightColor={theme.colors.primary}
			>
				{Array.from({ length }).map((_, i) => (
					<div className='wrapper' key={i}>
						{/* 카테고리 */}
						<div className='category'>
							<Skeleton />
							<Skeleton />
						</div>
						{/* 제목 */}
						<h2 className='title'>
							<Skeleton />
						</h2>
						{/* 태그 */}
						<div className='tags'>
							{Array.from({ length: 3 }).map((_, i) => (
								<Skeleton key={i} />
							))}
						</div>
						{/* 날짜 */}
						<small className='date'>
							<Skeleton />
						</small>
					</div>
				))}
			</SkeletonTheme>
		</PostListSkeletonStyle>
	);
};

export default PostListSkeleton;

const PostListSkeletonStyle = styled.div`
	display: flex;
	flex-direction: column;

	.wrapper {
		margin-bottom: 30px;

		.category {
			display: flex;
			gap: 6px;

			span {
				width: 55px;
			}
		}

		.title {
			width: 280px;
			margin: 12px 0;
		}

		.tags {
			display: flex;
			gap: 8px;

			span {
				width: 35px;
			}
		}

		.date {
			span {
				margin-top: 20px;
				width: 75px;
			}
		}
	}
`;
