import Image from "next/image";
import PasswordForm from "./ui/password-form";

export default function Home() {
  return (
    <div>
      <div className=" py-4 max-w-md mx-auto min-h-svh flex items-center flex-col justify-center gap-4">
        <h1 className="text-customGray">Password generator</h1>
        <PasswordForm />
      </div>
    </div>
  );
}
