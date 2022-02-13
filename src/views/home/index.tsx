import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

const Home = () => {
	return (
		<div>
			<p>Hello</p>
			<button
				onClick={async () => {
					await axios
						.post('/user/register', {
							email: '123@naver.com',
							password: '123',
						})
						.then((res) => console.log(res))
						.catch((err) => console.error(err.response.data));
				}}
			>
				가입
			</button>
		</div>
	);
};

export default Home;
