import { DefaultSession } from "next-auth";
import { Company, Subscription } from "../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      companyId: string;
      company: Company;
      subscription: Subscription;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string;
    company: Company;
    subscription: Subscription;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string;
    company: Company;
    subscription: Subscription;
  }
} 