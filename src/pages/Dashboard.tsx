
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Clock, Plus, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate('/client/new-application');
  };

  const handleViewApplications = () => {
    navigate('/client/applications');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-regulatory-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-regulatory-600" />
              <div>
                <h1 className="text-xl font-bold text-regulatory-900">TelecomGateway</h1>
                <p className="text-sm text-regulatory-600">Client Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-regulatory-600">
                Welcome, {profile?.company_name}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-regulatory-900 mb-2">Dashboard</h2>
          <p className="text-regulatory-600">Manage your telecommunications permit applications</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Plus className="h-6 w-6 mr-3 text-regulatory-600" />
                New Application
              </CardTitle>
              <CardDescription>
                Start a new telecommunications permit application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleNewApplication} className="w-full">
                Create New Application
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Eye className="h-6 w-6 mr-3 text-regulatory-600" />
                View Applications
              </CardTitle>
              <CardDescription>
                Track the status of your submitted applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleViewApplications} variant="outline" className="w-full">
                View All Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-regulatory-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-regulatory-600">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-regulatory-900">0</div>
              <p className="text-xs text-regulatory-500 mt-1">All time submissions</p>
            </CardContent>
          </Card>

          <Card className="border-regulatory-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-regulatory-600">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <p className="text-xs text-regulatory-500 mt-1">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card className="border-regulatory-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-regulatory-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-xs text-regulatory-500 mt-1">Successfully processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Services */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-regulatory-900 mb-6">Available Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
              <CardHeader>
                <CardTitle className="flex items-center text-regulatory-900">
                  <Shield className="h-6 w-6 mr-3 text-regulatory-600" />
                  Spectrum License
                </CardTitle>
                <CardDescription>
                  Apply for radio frequency spectrum allocation permits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-regulatory-600 mb-4">
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span className="font-semibold">$5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-semibold">45 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
              <CardHeader>
                <CardTitle className="flex items-center text-regulatory-900">
                  <FileText className="h-6 w-6 mr-3 text-regulatory-600" />
                  Infrastructure Permit
                </CardTitle>
                <CardDescription>
                  Get permits for telecommunications infrastructure deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-regulatory-600 mb-4">
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span className="font-semibold">$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
              <CardHeader>
                <CardTitle className="flex items-center text-regulatory-900">
                  <Clock className="h-6 w-6 mr-3 text-regulatory-600" />
                  Service Authorization
                </CardTitle>
                <CardDescription>
                  Authorize new telecommunications service launches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-regulatory-600 mb-4">
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span className="font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-semibold">15 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
