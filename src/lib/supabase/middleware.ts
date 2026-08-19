import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookiesToSet = Parameters<SetAllCookies>[0];
type ResponseHeaders = Parameters<SetAllCookies>[1];

function applySupabaseResponseState(
  response: NextResponse,
  cookiesToSet: CookiesToSet,
  headers: ResponseHeaders
) {
  cookiesToSet.forEach(({ name, value, options }) =>
    response.cookies.set(name, value, options)
  );
  Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));

  return response;
}

export function createSupabaseResponse(
  request: NextRequest,
  cookiesToSet: CookiesToSet,
  headers: ResponseHeaders
) {
  cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

  const response = NextResponse.next({ request });

  return applySupabaseResponseState(response, cookiesToSet, headers);
}

export function createAuthRedirectResponse(
  request: NextRequest,
  isAuthenticated: boolean,
  cookiesToSet: CookiesToSet,
  headers: ResponseHeaders
) {
  const url = request.nextUrl.clone();

  if (
    !isAuthenticated &&
    url.pathname.startsWith("/admin") &&
    !url.pathname.startsWith("/admin/login")
  ) {
    url.pathname = "/admin/login";
  } else if (isAuthenticated && url.pathname === "/admin/login") {
    url.pathname = "/admin";
  } else {
    return null;
  }

  return applySupabaseResponseState(
    NextResponse.redirect(url),
    cookiesToSet,
    headers
  );
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  let latestCookiesToSet: CookiesToSet = [];
  let latestResponseHeaders: ResponseHeaders = {};

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          latestCookiesToSet = cookiesToSet;
          latestResponseHeaders = headers;
          supabaseResponse = createSupabaseResponse(request, cookiesToSet, headers);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authRedirectResponse = createAuthRedirectResponse(
    request,
    Boolean(user),
    latestCookiesToSet,
    latestResponseHeaders
  );
  if (authRedirectResponse) return authRedirectResponse;

  return supabaseResponse;
}
