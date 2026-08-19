import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookiesToSet = Parameters<SetAllCookies>[0];
type ResponseHeaders = Parameters<SetAllCookies>[1];

export function createSupabaseResponse(
  request: NextRequest,
  cookiesToSet: CookiesToSet,
  headers: ResponseHeaders
) {
  cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

  const response = NextResponse.next({ request });

  cookiesToSet.forEach(({ name, value, options }) =>
    response.cookies.set(name, value, options)
  );
  Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));

  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          supabaseResponse = createSupabaseResponse(request, cookiesToSet, headers);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    request.nextUrl.pathname === "/admin/login"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
