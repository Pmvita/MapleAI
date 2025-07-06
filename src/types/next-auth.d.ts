import { DefaultSession } from "next-auth";
import { Company, Subscription } from "../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      companyId: string | null;
      company: Company | null;
      subscription: Subscription | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string | null;
    company: Company | null;
    subscription: Subscription | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string | null;
    company: Company | null;
    subscription: Subscription | null;
  }
} 