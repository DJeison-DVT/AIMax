import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInButton from "../components/signin-button";

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-yellow">
      <Card className="w-[350px] bg-custom-orange rounded-3xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-white text-4xl font-light italic">
            AIMAX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;


