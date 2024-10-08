"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ArrowRight, Copy } from "lucide-react";

function StrengthIndicator({ strength }: { strength: string }) {
  const getColors = () => {
    switch (strength) {
      case "Strong":
        return ["bg-secondary", "bg-secondary", "bg-secondary", "bg-secondary"];
      case "Medium":
        return [
          "bg-customYellow",
          "bg-customYellow",
          "bg-customYellow",
          "border-customLightGray",
        ];
      case "Weak":
        return [
          "bg-customOrange",
          "bg-customOrange",
          "border-customGray",
          "border-customLightGray",
        ];
      case "Too Weak!":
        return [
          "bg-customRed",
          "border-customLightGray",
          "border-customLightGray",
          "border-customLightGray",
        ];
      default:
        return [
          "border-customLightGray",
          "border-customLightGray",
          "border-customLightGray",
          "border-customLightGray",
        ];
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="mr-2">{strength}</span>
      {getColors().map((color, index) => (
        <div
          key={index}
          className={`w-2 h-6 ${color} ${
            color.startsWith("border") ? "border" : ""
          }`}
        ></div>
      ))}
    </div>
  );
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      });
  }

  function calculatePasswordStrength() {
    const checkedBoxes = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    ].filter(Boolean).length;

    if (length >= 12 && checkedBoxes === 4) {
      return "Strong";
    } else if (length >= 8 && length < 12 && checkedBoxes === 4) {
      return "Medium";
    } else if (length >= 6 && length <= 12 && checkedBoxes >= 2) {
      return "Weak";
    } else {
      return "Too Weak!";
    }
  }

  const passwordStrength = calculatePasswordStrength();

  return (
    <div className="w-[300px] md:w-[400px] mx-auto">
      <div className="space-y-4 flex flex-col gap-4">
        <div className="h-[50px] bg-card p-2">
          <div className="flex items-center space-x-2">
            <div className="flex-grow border-none p-2 h-10 overflow-x-auto whitespace-nowrap">
              {generatedPassword || "Password will appear here"}
            </div>
            <div className="flex items-center">
              {copied && <span className="text-secondary mr-2">COPIED</span>}
              <Button
                className="bg-card text-secondary hover:bg-card hover:text-white"
                onClick={copyToClipboard}
                size="icon"
                disabled={!generatedPassword}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy password</span>
              </Button>
            </div>
          </div>
          {errorMessage && (
            <div className="text-customRed text-sm pt-2">{errorMessage}</div>
          )}
        </div>

        <div className="bg-card mt-4 flex flex-col gap-6 p-6">
          <div className="mt-4 flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="">Character Length</p>
              <Label htmlFor="length" className="text-secondary text-lg">
                {" "}
                {length}
              </Label>
            </div>

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
                "bg-black",
                "cursor-pointer"
              )}
            >
              <div
                className="absolute h-4 w-4 rounded-full bg-black -translate-x-1/2 -translate-y-1/2 "
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
                className="border border-customLightGray rounded-none"
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
                className="border border-customLightGray rounded-none"
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
                className="border border-customLightGray rounded-none"
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) =>
                  setIncludeNumbers(checked === true)
                }
              />
              <Label htmlFor="numbers">Include numbers</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                className="border border-customLightGray rounded-none"
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) =>
                  setIncludeSymbols(checked === true)
                }
              />
              <Label htmlFor="symbols">Include symbols</Label>
            </div>
          </div>

          <div className="mt-4 flex flex-row justify-between uppercase text-[14px] p-4 bg-customDarkGray">
            <p className="text-customGray">Strength</p>
            <StrengthIndicator strength={passwordStrength} />
          </div>

          <Button
            onClick={generatePassword}
            className="w-full flex flex-row gap-4 py-6 border hover:bg-card bg-secondary text-black border-secondary hover:text-secondary font-semibold rounded-none group"
          >
            GENERATE
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
