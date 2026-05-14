import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear all wordpress_* cookies by setting them expired
  const cookieNames = [
    "wordpress_logged_in",
    "wordpress_sec",
    "wordpress_test_cookie",
    "wp-settings",
    "wp-settings-time",
  ];

  cookieNames.forEach((name) => {
    res.cookies.set(name, "", { expires: new Date(0), path: "/" });
  });

  return res;
}
