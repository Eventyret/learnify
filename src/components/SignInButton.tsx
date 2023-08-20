"use client"

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

interface SignInButtonProps { }
export const SignInButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => signIn("google")}>
      Sign In
    </Button>
  );
}