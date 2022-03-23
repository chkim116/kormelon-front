import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import queryString from 'query-string';
import Link from 'next/link';

interface PostListPaginateProps {
	total: number;
	per: number;
}

const PostListPaginate = ({ total, per }: PostListPaginateProps) => {
	const { query, pathname } = useRouter();

	const [selectedPage, setSelectedPage] = useState(Number(query?.page) || 1);

	const getQuery = useCallback(
		(page: number) => {
			return queryString.stringify({ q: query.q, page });
		},
		[query.q]
	);

	const pages = useMemo(() => {
		const length = Math.ceil(total / per);
		const start = per * (Math.ceil(selectedPage / per) - 1);
		const end = per * Math.ceil(selectedPage / per);

		return Array.from({ length })
			.map((_, i) => i + 1)
			.slice(start, end);
	}, [total, per, selectedPage]);

	const onClickPagination = useCallback((e) => {
		const { page } = e.currentTarget.dataset;

		setSelectedPage(Number(page));
	}, []);

	const onClickNext = useCallback(() => {
		setSelectedPage((prev) => (prev + 1 > pages.length ? prev : prev + 1));
	}, [pages.length]);

	const onClickPrev = useCallback(() => {
		setSelectedPage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
	}, []);

	return (
		<PostListPaginateStyle>
			<PaginateBtn
				onClick={onClickPrev}
				disabled={(query.page ? +query.page : 1) === 1}
			>
				<Link
					href={`/?page=${
						selectedPage - 1 > 0 ? selectedPage - 1 : selectedPage
					}`}
				>
					{'<'}
				</Link>
			</PaginateBtn>
			{pages.map((page) => (
				<PaginateBtn
					onClick={onClickPagination}
					selected={selectedPage === page}
					data-page={page}
					key={page}
				>
					<Link href={`${pathname}?${getQuery(page)}`} passHref>
						<a>{page}</a>
					</Link>
				</PaginateBtn>
			))}
			<PaginateBtn
				onClick={onClickNext}
				disabled={(query.page ? +query.page : 1) === pages.length}
			>
				<Link
					href={`/?page=${
						selectedPage + 1 > pages.length ? pages.length : selectedPage + 1
					}`}
				>
					{'>'}
				</Link>
			</PaginateBtn>
		</PostListPaginateStyle>
	);
};

export default PostListPaginate;

const PostListPaginateStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: right;
	gap: 6px;

	li {
		list-style: none;
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.onPrimary};
		border: 1px solid ${({ theme }) => theme.colors.border};
		font-size: ${({ theme }) => theme.fontSizes.sm};
		text-align: center;
		cursor: pointer;
		width: 30px;
		height: 30px;
		a {
			display: block;
			width: 30px;
			height: 30px;
		}
	}
`;

const PaginateBtn = styled.li<{ selected?: boolean; disabled?: boolean }>`
	${({ disabled }) => {
		if (disabled) {
			return css`
				pointer-events: none;
				opacity: 0.5;
			`;
		}
	}}

	${({ selected, theme }) => {
		if (selected) {
			return css`
				font-weight: bold;
				background-color: ${theme.colors.onSecondary} !important;
				pointer-events: none;
				opacity: 0.8;

				a {
					color: ${theme.colors.secondary} !important;
				}
			`;
		}
	}};
`;
