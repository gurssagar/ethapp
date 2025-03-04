"use client"

import { signIn } from "next-auth/react"
 
export default function SignIns() {
  return <button onClick={() => signIn("github")}></button>
}