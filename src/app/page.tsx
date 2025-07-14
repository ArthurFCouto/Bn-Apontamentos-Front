import AuthGuard from "@/components/app/auth/authGuard";
import RightPainel from "@/components/app/auth/rightPainel";
import MainNav from "@/components/shared/mainNav";

export default function Home() {
  return (
    <>
      <MainNav />
      <AuthGuard />
      <RightPainel />
    </>
  );
}
