
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    } else if (profile?.registration_status === 'approved') {
      navigate('/dashboard');
    } else {
      navigate('/pending-approval');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-regulatory-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-regulatory-600" />
              <div>
                <h1 className="text-xl font-bold text-regulatory-900">TelecomGateway</h1>
                <p className="text-sm text-regulatory-600">Permit Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-regulatory-600">
                    Welcome, {profile?.company_name || user.email}
                  </span>
                  <Button onClick={handleGetStarted}>
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/auth')}>
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-regulatory-900 mb-6">
            Streamline Your <span className="text-regulatory-600">Telecom Permits</span>
          </h2>
          <p className="text-xl text-regulatory-600 mb-8 max-w-3xl mx-auto">
            Submit, track, and manage your telecommunications license applications with our comprehensive digital platform
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-regulatory-600 hover:bg-regulatory-700 text-white px-8 py-4 text-lg"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <FileText className="h-6 w-6 mr-3 text-regulatory-600" />
                Easy Submissions
              </CardTitle>
              <CardDescription>
                Submit permit applications with guided forms and document upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-regulatory-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Dynamic form validation</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Secure document upload</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Clock className="h-6 w-6 mr-3 text-regulatory-600" />
                Real-time Tracking
              </CardTitle>
              <CardDescription>
                Monitor your application status through every review stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-regulatory-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Multi-stage workflow</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Email notifications</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Revision requests</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-regulatory-200">
            <CardHeader>
              <CardTitle className="flex items-center text-regulatory-900">
                <Users className="h-6 w-6 mr-3 text-regulatory-600" />
                Expert Review
              </CardTitle>
              <CardDescription>
                Professional evaluation by certified telecommunications experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-regulatory-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Technical evaluation</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Compliance checking</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" />Director approval</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Service Types */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-regulatory-200">
          <h3 className="text-2xl font-bold text-regulatory-900 mb-6 text-center">
            Available Permit Types
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-regulatory-50 rounded-lg">
              <Shield className="h-12 w-12 text-regulatory-600 mx-auto mb-4" />
              <h4 className="font-semibold text-regulatory-900 mb-2">Spectrum License</h4>
              <p className="text-sm text-regulatory-600">Radio frequency spectrum allocation permits</p>
            </div>
            <div className="text-center p-6 bg-regulatory-50 rounded-lg">
              <FileText className="h-12 w-12 text-regulatory-600 mx-auto mb-4" />
              <h4 className="font-semibold text-regulatory-900 mb-2">Infrastructure Permit</h4>
              <p className="text-sm text-regulatory-600">Telecommunications infrastructure deployment</p>
            </div>
            <div className="text-center p-6 bg-regulatory-50 rounded-lg">
              <Users className="h-12 w-12 text-regulatory-600 mx-auto mb-4" />
              <h4 className="font-semibold text-regulatory-900 mb-2">Service Authorization</h4>
              <p className="text-sm text-regulatory-600">New telecommunications service launch permits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
