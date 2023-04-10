"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Logged({ image }: { image: string }) {
  return (
    <li className="flex items-center gap-8">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-lg disabled:opacity-25"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image width={50} height={50} src={image} alt="profile picture" />
      </Link>
    </li>
  );
}
