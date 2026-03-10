'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Megaphone,
  Users,
  HandHeart,
  Home,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MoreVertical,
  MapPin,
  DollarSign,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrgDashboardData {
  profile: {
    organizationName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    logo?: string;
    organizationType: string;
    createdAt: string;
  };
  stats: {
    totalDonations: number;
    donationCount: number;
    campaignCount: number;
    volunteerCount: number;
  };
  recentDonations: Array<{
    id: string;
    amount: number;
    createdAt: string;
    user: { name: string };
  }>;
  campaigns: Array<{
    id: string;
    title: string;
    description: string;
    targetAmount: number;
    collectedAmount: number;
    createdAt: string;
  }>;
  volunteerRequests: Array<{
    id: string;
    status: string;
    appliedDate: string;
    user: { name: string; email: string; phone?: string };
  }>;
}

export default function OrganizationDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<OrgDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/organization');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Failed to fetch organization dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading organization dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Donations',
      value: `₹${dashboardData.stats.totalDonations.toLocaleString()}`,
      icon: HandHeart,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      name: 'Active Campaigns',
      value: dashboardData.stats.campaignCount.toString(),
      icon: Megaphone,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      name: 'Volunteers',
      value: dashboardData.stats.volunteerCount.toString(),
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      name: 'Donation Count',
      value: dashboardData.stats.donationCount.toString(),
      icon: TrendingUp,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{dashboardData.profile.organizationName}</h1>
          <p className="text-slate-500">
            Organization Dashboard • {dashboardData.profile.city || 'Location not set'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <HandHeart className="mr-2" size={20} />
            View Donations
          </Button>
          <Button variant="default">
            <Plus className="mr-2" size={20} />
            Create Campaign
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.recentDonations.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">{donation.user.name}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-bold text-green-600">₹{donation.amount}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">No donations yet</p>
            )}
          </CardContent>
        </Card>

        {/* Volunteer Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Volunteer Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.volunteerRequests.length > 0 ? (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {dashboardData.volunteerRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{request.user.name}</p>
                      <p className="text-sm text-slate-500">{request.user.email}</p>
                      <p className="text-xs text-slate-400">
                        Applied: {new Date(request.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      )}>
                        {request.status}
                      </span>
                      {request.status === 'PENDING' && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 px-2">
                            <UserCheck className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 px-2">
                            <UserX className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">No volunteer requests</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Your Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData.campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{campaign.description}</p>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">
                      Created: {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      ₹{campaign.collectedAmount.toLocaleString()} / ₹{campaign.targetAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">
                      {((campaign.collectedAmount / campaign.targetAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min((campaign.collectedAmount / campaign.targetAmount) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Megaphone className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No campaigns created yet</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Campaign
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
