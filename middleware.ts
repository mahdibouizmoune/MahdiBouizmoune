import {NextResponse,type NextRequest} from 'next/server';
export function middleware(request:NextRequest){
 const headers=new Headers(request.headers);
 const segment=request.nextUrl.pathname.split('/')[1];
 headers.set('x-portfolio-locale',segment==='fr'||segment==='ar'?segment:'en');
 return NextResponse.next({request:{headers}});
}
export const config={matcher:['/((?!api|_next|assets|favicon|icon|apple-touch|site.webmanifest|robots.txt|sitemap.xml).*)']};
