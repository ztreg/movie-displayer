"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const RedirectHome = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // If on "/" and no type param, redirect to "/?type=movies"
    if (pathname === "/" &&  !searchParams.get("type")) {
      router.replace("/?type=movies");
    }
  }, [pathname, searchParams, router]);

  return null; // This component doesn't render anything
};

export default RedirectHome;