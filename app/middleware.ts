import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.rewrite(url)
}