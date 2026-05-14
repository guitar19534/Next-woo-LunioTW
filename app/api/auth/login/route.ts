import { NextRequest, NextResponse } from "next/server";

function extractCookies(res: Response): string[] {
  try {
    return res.headers.getSetCookie?.() ?? [];
  } catch {
    const raw = res.headers.get("set-cookie");
    return raw ? [raw] : [];
  }
}

function rewriteCookie(c: string) {
  return c
    .replace(/;\s*domain=[^;,]+/gi, "")
    .replace(/;\s*samesite=none/gi, "");
}

export async function POST(req: NextRequest) {
  const { username, password, rememberme } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "請填寫帳號與密碼" }, { status: 400 });
  }

  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Step 1: GET wp-login.php to obtain the real testcookie value
  let initialCookieHeader = "";
  try {
    const getRes = await fetch(`${wpUrl}/wp-login.php`, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const cookies = extractCookies(getRes);
    // Grab wordpress_test_cookie and any session cookies set on GET
    const relevant = cookies.filter((c) =>
      c.toLowerCase().startsWith("wordpress_test_cookie") ||
      c.toLowerCase().startsWith("wordpress_sec_")
    );
    initialCookieHeader = relevant
      .map((c) => c.split(";")[0])
      .join("; ");
  } catch {
    // Fall back to static value if GET fails
    initialCookieHeader = "wordpress_test_cookie=WP+Cookie+check";
  }

  // Always include the static fallback cookie so WordPress accepts the request
  if (!initialCookieHeader.includes("wordpress_test_cookie")) {
    initialCookieHeader = [initialCookieHeader, "wordpress_test_cookie=WP+Cookie+check"]
      .filter(Boolean).join("; ");
  }

  // Step 2: POST credentials
  const form = new URLSearchParams({
    log: username,
    pwd: password,
    "wp-submit": "Log In",
    redirect_to: `${wpUrl}/wp-admin/`,
    testcookie: "1",
    ...(rememberme ? { rememberme: "forever" } : {}),
  });

  const wpRes = await fetch(`${wpUrl}/wp-login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0",
      Cookie: initialCookieHeader,
    },
    body: form.toString(),
    redirect: "manual",
  });

  const rawCookies = extractCookies(wpRes);

  // WordPress redirects to /wp-admin/ on success and sets wordpress_logged_in_*
  const isLoggedIn = rawCookies.some((c) =>
    c.toLowerCase().includes("wordpress_logged_in")
  );

  // Also consider a redirect to wp-admin as success (some setups redirect without cookie in response)
  const location = wpRes.headers.get("location") ?? "";
  const redirectedToAdmin =
    location.includes("wp-admin") || location.includes("wp-dashboard");

  if (!isLoggedIn && !redirectedToAdmin) {
    // Try to parse WordPress error message from redirect URL
    const errorMatch = location.match(/[?&]error=([^&]+)/);
    if (errorMatch) {
      const wpError = decodeURIComponent(errorMatch[1]);
      if (wpError.includes("incorrect_password") || wpError.includes("invalid_username")) {
        return NextResponse.json({ error: "帳號或密碼錯誤，請再試一次" }, { status: 401 });
      }
    }
    return NextResponse.json({ error: "帳號或密碼錯誤，請再試一次" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  rawCookies.forEach((c) => {
    res.headers.append("set-cookie", rewriteCookie(c));
  });
  return res;
}
