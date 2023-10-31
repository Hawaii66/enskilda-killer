import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/statistik",
    "/regler",
    "/begrepp",
    "/enskildakaren",
    "/profil",
    "/admin",
    "/api/backup",
    "/api/temp",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
