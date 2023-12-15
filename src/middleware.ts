import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/statistik",
    "/regler",
    "/begrepp",
    "/enskildakaren",
    "/profil",
    "/reveal",
    "/admin",
    "/api/backup",
    "/api/game/circles",
    "/api/game/circle",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
