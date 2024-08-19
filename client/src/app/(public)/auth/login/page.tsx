import { DarkModeButton } from "@/components/ui/dark-mode-button";
import LoginContainer from "./LoginContainer";
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginContainer />
      <DarkModeButton />
    </div>
  );
}
