import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-custom-yellow">
          <Card className="w-[350px] bg-custom-orange rounded-3xl">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-white text-4xl font-light italic">AIMAX</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input id="username" placeholder="Username" className="bg-gray-200" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input id="password" placeholder="Password" className="bg-gray-200" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button className="bg-custom-blue text-white w-28 mt-4 rounded-3xl">Log in</Button>
              <div className="text-white mt-2">
                Don’t have an account? <span className="underline">Create one</span>
              </div>
              <Button className="bg-custom-blue text-white w-28 mt-4 rounded-3xl">Sign Up</Button>
              <div className="flex justify-center gap-4 mt-4">
                <img src="/github-icon.png" alt="Google" className="w-12 h-12 rounded-full"/>
              </div>
            </CardFooter>
          </Card>
        </div>
      );
}

export default LoginPage;