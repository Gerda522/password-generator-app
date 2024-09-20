import Image from "next/image";
import PasswordForm from "./ui/password-form";

export default function Home() {
  return (
    <div className=" py-4 max-w-md mx-auto">
      <h1>Password generator</h1>

      <PasswordForm />
    </div>
  );
}
