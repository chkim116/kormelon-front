import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';

import 'src/lib/highlight';
import PostStyle from './PostStyle';
import PostAnchors from './PostAnchors';
import PostComment from './PostComment';

const Post = () => {
	const post = {
		id: '1',
		title:
			'제목입니다다다다다다다ㅏ따ㅏㄷ?목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ',
		content:
			'<h1 id="1152">1152</h1> <p><br></p><p><strong>- 문제</strong></p><p>영어 대소문자와 띄어쓰기만으로 이루어진 문자열이 주어진다.</p><p>이 문자열에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오.&nbsp;단, 한 단어가 여러 번 등장하면 등장한 횟수만큼 모두 세어야 </p><p>한다.</p><p><br></p><p><strong>- 입력</strong></p><p>첫 줄에 영어 대소문자와 띄어쓰기로 이루어진 문자열이 주어진다. 이 문자열의 길이는 1,000,000을 넘지 않는다.</p><p>단어는&nbsp;띄어쓰기 한 개로 구분되며, 공백이 연속해서 나오는 경우는 없다. 또한 문자열의 앞과 뒤에는 공백이 있을 수도 있다.</p><p><br></p><p><strong>- 출력</strong></p><p>첫째 줄에 단어의 개수를 출력한다.</p><p><br></p><p>--- </p><p><br></p><p>예제 입력 1</p><p>The Curious Case of Benjamin Button =&gt; 6</p><p><br></p><p>예제 입력 2</p><p>Mazatneunde Wae Teullyeoyo =&gt; 3</p><p><br></p><p>예제 입력 3</p><p>Teulinika Teullyeotzi =&gt; 2</p><p><br></p><p><br></p> <h1 id="문제-풀이">문제 풀이</h1> <p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>)<span class="hljs-keyword">const</span> input = fs.readFileSync(<span class="hljs-string">"/dev/stdin"</span>).toString()<span class="hljs-keyword">let</span> wordsArr = input.trim().split(<span class="hljs-string">" "</span>)<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; wordsArr.length; i++) {   <span class="hljs-keyword">if</span> (wordsArr[i] !== <span class="hljs-string">""</span>) {        count++; <span class="hljs-built_in">console</span>.log(count);</pre><p><br></p><p><br></p> <br /><h1 id="asd">asd</h1>',
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
						<Link href='/tag' key={tag}>
							{tag}
						</Link>
					))}
				</div>

				<div
					className='content'
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(post.content),
					}}
				/>

				<div className='comment-container'>
					<div>{post.comments.length}개의 댓글</div>
					<form>
						<textarea placeholder='댓글을 작성하세요.' />
						<button type='submit'>댓글 작성</button>
					</form>

					<div className='comment-list'>
						<PostComment comments={comments} />
					</div>
				</div>
			</div>

			<div className='anchors'>
				<PostAnchors anchors={anchors || []} />
			</div>
		</PostStyle>
	);
};

export default Post;
