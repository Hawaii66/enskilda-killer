import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/statistik",
    "/regler",
    "/begrepp",
    "/enskildakaren",
    "/profil",
    "/tidigare",
    "/admin",
    "/api/backup",
    "/api/game/circles",
    "/api/backup/get",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
