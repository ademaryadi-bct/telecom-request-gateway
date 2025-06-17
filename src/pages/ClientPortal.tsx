
import { Shield, FileText, Clock, User, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ClientPortal = () => {
  const navigate = useNavigate();

  const recentSubmissions = [
    {
      id: "SP-2024-001",
      type: "Spectrum License",
      status: "Under Review",
      submitted: "2024-01-15",
      stage: "Technical Review"
    },
    {
      id: "IP-2024-002", 
      type: "Infrastructure Permit",
      status: "Approved",
      submitted: "2024-01-10",
      stage: "Completed"
    },
    {
      id: "SA-2024-003",
      type: "Service Authorization", 
      status: "Pending Documentation",
      submitted: "2024-01-12",
      stage: "Compliance Check"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-regulatory-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-regulatory-600" />
              <div>
                <h1 className="text-xl font-bold text-regulatory-900">Client Portal</h1>
                <p className="text-sm text-regulatory-600">Telecom Permit Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-regulatory-300 text-regulatory-700 hover:bg-regulatory-50"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-regulatory-900 mb-2">Welcome Back</h2>
          <p className="text-regulatory-600">Manage your telecom permit applications and track their progress</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <FileText className="h-5 w-5 mr-2" />
                New Submission
              </CardTitle>
              <CardDescription>Submit a new permit application</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-regulatory-600 hover:bg-regulatory-700">
                Start Application
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Clock className="h-5 w-5 mr-2" />
                Track Progress
              </CardTitle>
              <CardDescription>Monitor your application status</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-regulatory-300 text-regulatory-700 hover:bg-regulatory-50">
                View Status
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Shield className="h-5 w-5 mr-2" />
                Document Vault
              </CardTitle>
              <CardDescription>Access secure documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-regulatory-300 text-regulatory-700 hover:bg-regulatory-50">
                Open Vault
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card className="border-regulatory-200">
          <CardHeader>
            <CardTitle className="text-regulatory-900">Recent Submissions</CardTitle>
            <CardDescription>Your latest permit applications and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 bg-regulatory-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-regulatory-600 text-white rounded-lg flex items-center justify-center font-bold">
                      {submission.id.split('-')[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-regulatory-900">{submission.type}</h3>
                      <p className="text-sm text-regulatory-600">ID: {submission.id}</p>
                      <p className="text-sm text-regulatory-600">Submitted: {submission.submitted}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        submission.status === 'Approved' ? 'default' :
                        submission.status === 'Under Review' ? 'secondary' : 
                        'destructive'
                      }
                      className="mb-2"
                    >
                      {submission.status}
                    </Badge>
                    <p className="text-sm text-regulatory-600">Stage: {submission.stage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientPortal;
