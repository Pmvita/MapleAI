"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { analytics } from "@/lib/analytics";
import { performanceUtils } from "@/lib/performance";
import { 
  Users,
  Workflow,
  BarChart3,
  Bot,
  Shield,
  Brain,
  Globe,
  Briefcase,
  TrendingUp,
  Clock,
  Target,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Track dashboard access and performance
  useEffect(() => {
    if (status === "authenticated") {
      analytics.trackDashboardAccess("main_dashboard");
      analytics.trackPageView("dashboard");
      
      // Track page load performance
      const metrics = performanceUtils.trackPageLoad("dashboard");
      if (metrics && performanceUtils.isSlowLoad(metrics.loadTime)) {
        console.warn("Dashboard is loading slowly:", metrics.loadTime, "ms");
      }
    }
  }, [status]);

  // Redirect if not authenticated
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
      {/* Dashboard Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI-Powered Enterprise Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {session?.user?.firstName || "User"}! Here&apos;s your comprehensive view of MapleAI&apos;s eight core focus areas.
            </p>
          </div>

          {/* Company Info */}
          {session?.user?.company && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Company Name</label>
                  <p className="text-sm text-gray-900">{session.user.company.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-sm text-gray-900">{session.user.company.industry || "Not specified"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Subscription Plan</label>
                  <p className="text-sm text-gray-900">{session.user.subscription?.plan || "Not specified"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">AI Features Active</label>
                  <p className="text-sm text-gray-900">8/8 Core Areas</p>
                </div>
              </div>
            </div>
          )}

          {/* Core Focus Areas Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Focus Areas Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Financial Compliance */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Financial Compliance</dt>
                        <dd className="text-lg font-medium text-gray-900">98.5%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+2.3%</span>
                    <span className="text-gray-500"> compliance score</span>
                  </div>
                </div>
              </div>

              {/* HR Automation */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">HR Automation</dt>
                        <dd className="text-lg font-medium text-gray-900">85%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+15%</span>
                    <span className="text-gray-500"> efficiency gain</span>
                  </div>
                </div>
              </div>

              {/* Workflow Orchestration */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Workflow className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Workflow Automation</dt>
                        <dd className="text-lg font-medium text-gray-900">70%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+25%</span>
                    <span className="text-gray-500"> process speed</span>
                  </div>
                </div>
              </div>

              {/* Predictive Analytics */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-orange-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Predictive Analytics</dt>
                        <dd className="text-lg font-medium text-gray-900">92%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-gray-500"> accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced AI Metrics */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced AI Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Intelligent Agents */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-indigo-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Bot className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">AI Agents Active</dt>
                        <dd className="text-lg font-medium text-gray-900">12</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">80%</span>
                    <span className="text-gray-500"> task automation</span>
                  </div>
                </div>
              </div>

              {/* LLM Infrastructure */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-teal-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Brain className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">LLM Models</dt>
                        <dd className="text-lg font-medium text-gray-900">8</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">99.9%</span>
                    <span className="text-gray-500"> uptime</span>
                  </div>
                </div>
              </div>

              {/* Sovereign AI */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Globe className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Data Sovereignty</dt>
                        <dd className="text-lg font-medium text-gray-900">100%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">✓</span>
                    <span className="text-gray-500"> compliant</span>
                  </div>
                </div>
              </div>

              {/* Professional Services */}
              <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Services ROI</dt>
                        <dd className="text-lg font-medium text-gray-900">340%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+40%</span>
                    <span className="text-gray-500"> efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Impact Metrics */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Impact & ROI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Cost Savings</dt>
                        <dd className="text-lg font-medium text-gray-900">$2.4M</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+60%</span>
                    <span className="text-gray-500"> vs traditional</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Time Saved</dt>
                        <dd className="text-lg font-medium text-gray-900">12,450h</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+70%</span>
                    <span className="text-gray-500"> productivity</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Accuracy</dt>
                        <dd className="text-lg font-medium text-gray-900">94.2%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+15%</span>
                    <span className="text-gray-500"> improvement</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Zap className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Automation Rate</dt>
                        <dd className="text-lg font-medium text-gray-900">87%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">+23%</span>
                    <span className="text-gray-500"> this quarter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent AI Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent AI-Powered Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">AI Agent completed regulatory compliance check</p>
                    <p className="text-xs text-gray-500">2 hours ago • 98.5% accuracy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Predictive analytics identified market opportunity</p>
                    <p className="text-xs text-gray-500">4 hours ago • $45K potential revenue</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Workflow automation processed 1,247 documents</p>
                    <p className="text-xs text-gray-500">6 hours ago • 70% time savings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">HR AI matched 3 candidates to job requirements</p>
                    <p className="text-xs text-gray-500">8 hours ago • 85% match accuracy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">LLM model updated with new training data</p>
                    <p className="text-xs text-gray-500">12 hours ago • 99.9% uptime maintained</p>
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