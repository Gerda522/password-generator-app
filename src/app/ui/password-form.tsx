"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function generatePassword() {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setErrorMessage("Please select at least one character type");
      setGeneratedPassword("");
      return;
    }

    setErrorMessage("");
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPassword(password);
  }

  function copyToClipboard() {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        console.log("Password copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      });
  }

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="h-[50px]">
          <div className="flex items-center space-x-2 ">
            <Input
              type="text"
              value={generatedPassword}
              readOnly
              placeholder="Generated password will appear here"
              className="flex-grow"
            />
            <Button
              onClick={copyToClipboard}
              size="icon"
              disabled={!generatedPassword}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy password</span>
            </Button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm pt-2">{errorMessage}</div>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="length">Password Length: {length}</Label>
          <Slider
            id="length"
            min={1}
            max={12}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            className={cn(
              "w-full",
              "relative",
              "h-1",
              "rounded-full",
              "bg-gray-300"
            )}
          >
            <div
              className="absolute h-4 w-4 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${((length - 1) / 11) * 100}%`,
                top: "50%",
              }}
            />
          </Slider>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) =>
                setIncludeUppercase(checked === true)
              }
            />
            <Label htmlFor="uppercase">Include uppercase letters</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) =>
                setIncludeLowercase(checked === true)
              }
            />
            <Label htmlFor="lowercase">Include lowercase letters</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">Include numbers</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">Include symbols</Label>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          Generate Password
        </Button>
      </div>
    </div>
  );
}
