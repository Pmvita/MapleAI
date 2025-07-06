import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, company, companySize, industry, plan } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !company || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create company
    const newCompany = await prisma.company.create({
      data: {
        name: company,
        industry: industry || null,
        size: companySize || null,
      },
    });

    // Create subscription based on plan
    const planConfig = {
      starter: { amount: 2500, maxUsers: 100 },
      professional: { amount: 7500, maxUsers: 500 },
      enterprise: { amount: 15000, maxUsers: null },
    };

    const selectedPlan = planConfig[plan as keyof typeof planConfig] || planConfig.professional;

    const subscription = await prisma.subscription.create({
      data: {
        plan: plan.toUpperCase() as "STARTER" | "PROFESSIONAL" | "ENTERPRISE",
        amount: selectedPlan.amount,
        maxUsers: selectedPlan.maxUsers,
        companyId: newCompany.id,
      },
    });

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        companyId: newCompany.id,
        subscriptionId: subscription.id,
        role: "ADMIN", // First user is admin
      },
      include: {
        company: true,
        subscription: true,
      },
    });

    // Remove password from response
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      company: user.company,
      subscription: user.subscription,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      { 
        message: "User created successfully",
        user: userResponse 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 