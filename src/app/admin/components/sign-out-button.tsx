import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { logout } from "@/app/actions/auth";
import { SignOutSubmit } from "./sign-out-submit";

export function SignOutButton() {
  return (
    <form action={logout}>
      <SignOutSubmit />
    </form>
  );
}
