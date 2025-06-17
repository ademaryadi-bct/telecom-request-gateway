
import { Shield, Users, FileText, Clock, CheckCircle, AlertTriangle, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
  const navigate = useNavigate();

  const pendingReviews = [
    {
      id: "SP-2024-004",
      type: "Spectrum License",
      client: "TechCorp Communications",
      stage: "Technical Review",
      priority: "High",
      daysLeft: 12
    },
    {
      id: "IP-2024-005",
      type: "Infrastructure Permit",
      client: "Metro Wireless Ltd",
      stage: "Compliance Check", 
      priority: "Medium",
      daysLeft: 25
    },
    {
      id: "SA-2024-006",
      type: "Service Authorization",
      client: "Digital Connect Inc", 
      stage: "Legal Review",
      priority: "Low",
      daysLeft: 35
    }
  ];

  const stats = [
    { title: "Pending Reviews", value: "24", icon: <Clock className="h-6 w-6" />, color: "text-warning-600" },
    { title: "Approved Today", value: "8", icon: <CheckCircle className="h-6 w-6" />, color: "text-compliance-600" },
    { title: "Requiring Action", value: "3", icon: <AlertTriangle className="h-6 w-6" />, color: "text-red-600" },
    { title: "Active Reviewers", value: "12", icon: <Users className="h-6 w-6" />, color: "text-regulatory-600" }
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
                <h1 className="text-xl font-bold text-regulatory-900">Admin Portal</h1>
                <p className="text-sm text-regulatory-600">4-Layer Validation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="security-badge">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
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
          <h2 className="text-3xl font-bold text-regulatory-900 mb-2">Admin Dashboard</h2>
          <p className="text-regulatory-600">Monitor and manage the 4-layer validation workflow</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-regulatory-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-regulatory-600">
                  {stat.title}
                </CardTitle>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-regulatory-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 4-Layer Workflow Overview */}
        <Card className="mb-8 border-regulatory-200">
          <CardHeader>
            <CardTitle className="text-regulatory-900">4-Layer Validation Workflow</CardTitle>
            <CardDescription>Security validation process overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { layer: 1, title: "Technical Review", count: 8, color: "bg-regulatory-600" },
                { layer: 2, title: "Compliance Check", count: 6, color: "bg-compliance-600" },
                { layer: 3, title: "Legal Review", count: 4, color: "bg-warning-600" },
                { layer: 4, title: "Final Approval", count: 2, color: "bg-regulatory-800" }
              ].map((stage) => (
                <div key={stage.layer} className="text-center p-4 bg-regulatory-50 rounded-lg">
                  <div className={`w-12 h-12 ${stage.color} text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold`}>
                    {stage.layer}
                  </div>
                  <h3 className="font-semibold text-regulatory-900 mb-1">{stage.title}</h3>
                  <p className="text-sm text-regulatory-600">{stage.count} pending</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="border-regulatory-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-regulatory-900">Pending Reviews</CardTitle>
                <CardDescription>Applications requiring immediate attention</CardDescription>
              </div>
              <Button className="bg-regulatory-600 hover:bg-regulatory-700">
                <BarChart className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 bg-regulatory-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-regulatory-600 text-white rounded-lg flex items-center justify-center font-bold">
                      {review.id.split('-')[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-regulatory-900">{review.type}</h3>
                      <p className="text-sm text-regulatory-600">Client: {review.client}</p>
                      <p className="text-sm text-regulatory-600">ID: {review.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant={
                          review.priority === 'High' ? 'destructive' :
                          review.priority === 'Medium' ? 'default' : 
                          'secondary'
                        }
                      >
                        {review.priority}
                      </Badge>
                      <Badge variant="outline">
                        {review.daysLeft} days left
                      </Badge>
                    </div>
                    <p className="text-sm text-regulatory-600">Stage: {review.stage}</p>
                    <Button size="sm" className="mt-2 bg-regulatory-600 hover:bg-regulatory-700">
                      Review
                    </Button>
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

export default AdminPortal;
