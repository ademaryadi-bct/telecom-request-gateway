
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PendingApproval = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-16 w-16 text-regulatory-600" />
              <Clock className="h-8 w-8 text-yellow-500 absolute -bottom-2 -right-2 bg-white rounded-full p-1" />
            </div>
          </div>
          <CardTitle className="text-2xl text-regulatory-900">Registration Under Review</CardTitle>
          <CardDescription className="text-lg">
            Your registration is currently being reviewed by our admin team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                Our admin team will review your company and PIC information
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                We may contact you if additional information is needed
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                You'll receive an email notification once your account is approved
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                After approval, you can log in and start submitting permit applications
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
            <div className="space-y-2 text-blue-700">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>Email: support@telecompermit.gov</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Phone: +1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApproval;
