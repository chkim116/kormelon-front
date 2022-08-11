export interface PostCategoryEntity {
	/**
	 * 카테고리 식별자
	 */
	id: string;
	/**
	 * 카테고리 이름
	 * 현재 글에 지정된 하위 카테고리의 이름이다.
	 */
	value: string;
	/**
	 * 상위 카테고리의 식별자
	 */
	parentId: string;
	/**
	 * 상위 카테고리 이름
	 */
	parentValue: string;
}

export type PostTagEntity = {
	/**
	 * 태그 식별자
	 */
	id: string;
	/**
	 * 태그 이름
	 */
	value: string;
	/**
	 * 태그가 언급된 개수
	 */
	count: number;
};

export interface PostListEntity {
	/**
	 * 식별자
	 */
	id: string;
	/**
	 * 제목
	 */
	title: string;
	/**
	 * 글의 상위, 하위 카테고리
	 */
	category: PostCategoryEntity;
	/**
	 * 조회수
	 */
	view: number;
	/**
	 * 댓글 개수
	 */
	commentLength: number;
	/**
	 * 연결된 태그
	 */
	tags: PostTagEntity[];
	/**
	 * 리딩 타임
	 */
	readTime: number;
	/**
	 * 공개/비공개 여부
	 * - 현재 구현된 사항은 아님.
	 */
	isPrivate: boolean;
	/**
	 * 생성 날짜
	 */
	createdAt: string;
}

export interface PostCommentReplyEntity {
	/**
	 * 대댓글 식별자
	 */
	id: string;
	/**
	 * 대댓글 내용
	 */
	text: string;
	/**
	 * 대댓글 작성자의 식별자
	 */
	userId: string | null;
	/**
	 * 대댓글 작성자의 이름
	 */
	username: string;
	/**
	 * 대댓글 작성자의 프로필 이미지
	 * 익명일시 gravatar가 대체
	 */
	userImage: string;
	/**
	 * 익명성 여부
	 */
	isAnonymous: boolean;
	/**
	 * 생성 날짜
	 */
	createdAt: string;
}

export interface PostCommentEntity extends PostCommentReplyEntity {
	/**
	 * 삭제 날짜
	 */
	deletedAt: string | null;
	/**
	 * 대댓글 리스트
	 */
	commentReplies: PostCommentReplyEntity[];
}

export interface PostDetailEntity
	extends Omit<PostListEntity, 'commentLength'> {
	/**
	 * 작성한 유저의 id
	 * 구현상, 항상 '나'임.
	 */
	userId: string;
	/**
	 * 글의 내용
	 */
	content: string;
	/**
	 * 댓글
	 */
	comments: PostCommentEntity[];
}

export interface PostListSearchParams {
	/**
	 * 페이지
	 */
	page: number;
	/**
	 * 가져올 게시글 수
	 */
	per: number;
	/**
	 * 검색 키워드
	 */
	q?: string;
}

export interface PostCreateParams {
	/**
	 * 제목
	 */
	title: string;
	/**
	 * 본문
	 */
	content: string;
	/**
	 * 공개 여부
	 */
	isPrivate: boolean;
	/**
	 * 상위 카테고리의 값
	 */
	parentCategory: string;
	/**
	 * 하위 카테고리의 값
	 */
	category: string;
	/**
	 * 태그 배열
	 * ex) ['A', 'B', 'C']
	 */
	tags: string[];
}

export interface PostUpdateParams extends PostCreateParams {
	/**
	 * 업데이트를 위한 식별자
	 */
	id: string;
}

/**
 * redux effect
 */
export interface PostListResultPayload {
	total: number;
	results: PostListEntity[];
}
