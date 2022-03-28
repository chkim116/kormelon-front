import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const { cookies, nextUrl } = req;

	const user = await fetch('http://localhost:4000/user/auth', {
		headers: {
			Cookie: `auth=${cookies['auth']}`,
		},
		credentials: 'include',
	}).then((res) => res.json());

	if (!user?.isAdmin) {
		const url = nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}

	const url = nextUrl.clone();
	return NextResponse.rewrite(url);
}
