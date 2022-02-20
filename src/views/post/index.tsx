import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import Tag from 'src/components/Tag';

import PostAnchors from './PostAnchors';
import PostComment from './PostComment';

import { PostStyle } from './PostStyle';

import { ALLOWED_TAGS, ALLOWED_URI_REGEXP } from 'src/lib/domPurifyConfig';
import 'src/lib/markedConfig';

DOMPurify.setConfig({
	ALLOWED_TAGS,
	ALLOWED_URI_REGEXP,
});

const Post = () => {
	const post = {
		id: '1',
		title:
			'제목입니다다다다다다다ㅏ따ㅏㄷ?목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ',
		content: `<div><pre><code class="hljs language-js"><span class="hljs-comment">/**
 * when marked parse, apply hljs
 */</span>
<span class="hljs-keyword">import</span> { marked } <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;

marked.<span class="hljs-title function_">setOptions</span>({
    <span class="hljs-attr">langPrefix</span>: <span class="hljs-string">'hljs language-'</span>,
    <span class="hljs-attr">highlight</span>: <span class="hljs-function">(<span class="hljs-params">code, lang</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> hljs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'highlight.js/lib/common'</span>);
        <span class="hljs-keyword">const</span> language = hljs.<span class="hljs-title function_">getLanguage</span>(lang) ? lang : <span class="hljs-string">'plaintext'</span>;
        <span class="hljs-keyword">return</span> hljs.<span class="hljs-title function_">highlight</span>(code, { language }).<span class="hljs-property">value</span>;
    },
});
</code></pre>
<p>Ggg</p>
</div>
<div><ul>
<li>123</li>
<li>3</li>
</ul>
<hr>
<p>뭐지</p>
<p>뭐 아무튼.. ㅋ</p>
<pre><code class="hljs language-js"><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>
</code></pre>
<p>뭐지 ㅋㅋㅋ</p>
<ol>
<li>a</li>
<li>b</li>
<li></li>
</ol>
</div>
`,
		category: '공지사항',
		tags: ['태그1', '태그2'],
		createdAt: dayjs().format('YYYY-MM-DD'),
		readTime: '3 min to read',
		comments: [],
	};

	// h1 뽑는 정규
	const anchorRegExp =
		/<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\|\/\~\{\:\\\/\}\>]+<\/\h1>/g;

	// h1 뽑고.. anchor로 보낼 얘들
	const anchors = post.content
		.match(anchorRegExp)
		?.map((anchor) => anchor.replace(/<[^>]*>?/g, '').replace(/ /g, '-'));

	const comments = Array.from({ length: 10 }).map((_, i) => {
		return {
			id: i.toString(),
			text: '댓글인데요' + i,
			createdAt: dayjs().format('YYYY-MM-DD'),
			username: 'ckim',
			password: '123',
			commentReplies: Math.round(Math.random() * 1)
				? [
						{
							id: '2',
							text: '대댓글인데요',
							username: 'userna',
							password: 'pas',
							createdAt: dayjs().format('YYYY-MM-DD'),
						},
				  ]
				: [],
		};
	});

	return (
		<PostStyle>
			<div className='post'>
				<h1 className='title'>{post.title}</h1>
				<div className='category'>{post.category}</div>
				<div className='info'>
					<small>{post.createdAt}</small>
					<span className='separator'>·</span>
					<small>{post.readTime}</small>
				</div>

				<div className='tags'>
					{post.tags.map((tag) => (
						// TODO: tag link..
						<Tag key={tag} href={`/${tag}`}>
							{tag}
						</Tag>
					))}
				</div>

				<div
					className='content'
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(marked.parse(post.content)),
					}}
				/>
				<PostComment comments={comments} />
			</div>

			<div className='anchors'>
				<PostAnchors anchors={anchors || []} />
			</div>
		</PostStyle>
	);
};

export default Post;
