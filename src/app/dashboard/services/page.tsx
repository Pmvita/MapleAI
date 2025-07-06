"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Target,
  Zap
} from "lucide-react";

export default function ProfessionalServicesPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  return (
    <DashboardLayout>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI-Powered Professional Services</h1>
            <p className="text-gray-600 mt-2">
              Automated consulting, implementation, and value optimization services.
            </p>
          </div>

          {/* Services Performance */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                        <dd className="text-lg font-medium text-gray-900">47</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+12</span>
                    <span className="text-gray-500"> this month</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Revenue Generated</dt>
                        <dd className="text-lg font-medium text-gray-900">$2.8M</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+25%</span>
                    <span className="text-gray-500"> vs last quarter</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg Implementation</dt>
                        <dd className="text-lg font-medium text-gray-900">4.2 weeks</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">-40%</span>
                    <span className="text-gray-500"> time reduction</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-orange-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Client Satisfaction</dt>
                        <dd className="text-lg font-medium text-gray-900">96.8%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+3.2%</span>
                    <span className="text-gray-500"> improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Service Categories</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h4 className="text-sm font-medium text-gray-900">Consulting Automation</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">AI-powered consulting services with automated insights and recommendations.</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Projects</span>
                    <span className="font-medium text-gray-900">18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Success Rate</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="h-5 w-5 text-green-600" />
                    <h4 className="text-sm font-medium text-gray-900">Implementation Services</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Automated system implementation with reduced deployment time.</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Projects</span>
                    <span className="font-medium text-gray-900">15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Avg Time</span>
                    <span className="font-medium text-green-600">3.8 weeks</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <h4 className="text-sm font-medium text-gray-900">Value Optimization</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">AI-driven value realization and optimization services.</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Projects</span>
                    <span className="font-medium text-gray-900">14</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ROI Improvement</span>
                    <span className="font-medium text-green-600">+340%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Financial Services Compliance</h4>
                      <p className="text-xs text-gray-500">AI-powered regulatory compliance implementation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">Completed</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Healthcare HR Automation</h4>
                      <p className="text-xs text-gray-500">Recruitment and performance analytics deployment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-blue-600 font-medium">In Progress</span>
                    <span className="text-gray-500">Week 2 of 4</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Manufacturing Workflow</h4>
                      <p className="text-xs text-gray-500">Process automation and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-blue-600 font-medium">In Progress</span>
                    <span className="text-gray-500">Week 1 of 3</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Retail Analytics Platform</h4>
                      <p className="text-xs text-gray-500">Predictive analytics and BI implementation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-yellow-600 font-medium">Planning</span>
                    <span className="text-gray-500">Starts next week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Client Value Delivered</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cost Savings</span>
                    <span className="text-sm font-medium text-green-600">$4.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Time Saved</span>
                    <span className="text-sm font-medium text-green-600">15,240 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Efficiency Gain</span>
                    <span className="text-sm font-medium text-green-600">+40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ROI Achieved</span>
                    <span className="text-sm font-medium text-green-600">340%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Service Quality Metrics</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">On-Time Delivery</span>
                    <span className="text-sm font-medium text-green-600">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Client Satisfaction</span>
                    <span className="text-sm font-medium text-green-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-medium text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Repeat Clients</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
} 