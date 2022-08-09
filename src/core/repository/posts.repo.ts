import { PagingRes } from '@common/entitiy';
import {
	PostCreateParams,
	PostDetailEntity,
	PostListEntity,
	PostListSearchParams,
	PostUpdateParams,
} from '@core/entities/posts.entity';
import { api } from '@core/network';

export const postsRepository = {
	/**
	 * 게시글을 가지고 온다.
	 */
	getPostList(params: PostListSearchParams) {
		return api.get<PagingRes<PostListEntity>>('/post', { params });
	},

	/**
	 * 게시글 생성
	 * @param params
	 * @returns `postId`
	 */
	createPost(params: PostCreateParams) {
		return api.post<string>(`/post`, params);
	},

	/**
	 * 게시글 상세 조회
	 * @param id
	 * @returns
	 */
	getPostDetail(id: string) {
		return api.get<PostDetailEntity>(`/post/${id}`);
	},

	/**
	 * 게시글 수정
	 * @param param0
	 * @returns `postId`
	 */
	updatePost({ id, ...params }: PostUpdateParams) {
		return api.patch<string>(`/post/${id}`, params);
	},

	/**
	 * 게시글을 삭제한다.
	 * @param id
	 * @returns
	 */
	deletePost(id: string) {
		return api.delete<null>(`/post/${id}`);
	},
};
