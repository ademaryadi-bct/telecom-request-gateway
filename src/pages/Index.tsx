
import { Shield, FileText, Clock, CheckCircle, ArrowRight, Lock, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const permitTypes = [
    {
      title: "Spectrum License",
      description: "Radio frequency spectrum allocation permits",
      icon: <Globe className="h-6 w-6" />,
      urgency: "Standard",
      timeline: "45-60 days"
    },
    {
      title: "Infrastructure Permit", 
      description: "Cell tower and infrastructure deployment permits",
      icon: <Shield className="h-6 w-6" />,
      urgency: "Priority",
      timeline: "30-45 days"
    },
    {
      title: "Service Authorization",
      description: "New telecom service launch authorizations", 
      icon: <FileText className="h-6 w-6" />,
      urgency: "Expedited",
      timeline: "15-30 days"
    }
  ];

  const workflowSteps = [
    { step: 1, title: "Technical Review", description: "Engineering and technical compliance validation" },
    { step: 2, title: "Compliance Check", description: "Regulatory requirements and standards verification" },
    { step: 3, title: "Legal Review", description: "Legal compliance and documentation review" },
    { step: 4, title: "Final Approval", description: "Executive approval and permit issuance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-regulatory-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-regulatory-600" />
              <div>
                <h1 className="text-xl font-bold text-regulatory-900">TelecomReg</h1>
                <p className="text-sm text-regulatory-600">Regulatory Compliance Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="security-badge">
                <Lock className="h-3 w-3 mr-1" />
                Secure Portal
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => navigate('/client')}
                className="border-regulatory-300 text-regulatory-700 hover:bg-regulatory-50"
              >
                Client Login
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                className="bg-regulatory-600 hover:bg-regulatory-700"
              >
                Admin Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-regulatory-900 mb-6">
            Secure Telecom Permit
            <span className="gradient-bg bg-clip-text text-transparent block">
              Submission Portal
            </span>
          </h1>
          <p className="text-lg text-regulatory-700 max-w-3xl mx-auto mb-8">
            Streamlined regulatory compliance system with enterprise-grade security, 
            multi-tier validation workflow, and comprehensive audit trails for telecom operators.
          </p>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center text-compliance-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center text-compliance-600">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">End-to-End Encryption</span>
            </div>
            <div className="flex items-center text-compliance-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Multi-Factor Authentication</span>
            </div>
          </div>
          <Button 
            size="lg" 
            onClick={() => navigate('/client')}
            className="bg-regulatory-600 hover:bg-regulatory-700 text-lg px-8 py-3"
          >
            Access Client Portal
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Permit Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-regulatory-900 mb-8">
            Supported Permit Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {permitTypes.map((permit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-slide-in-right border-regulatory-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-regulatory-100 rounded-lg">
                      {permit.icon}
                    </div>
                    <Badge 
                      variant={permit.urgency === 'Expedited' ? 'destructive' : 
                              permit.urgency === 'Priority' ? 'default' : 'secondary'}
                    >
                      {permit.urgency}
                    </Badge>
                  </div>
                  <CardTitle className="text-regulatory-900">{permit.title}</CardTitle>
                  <CardDescription>{permit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-regulatory-600">Processing Time:</span>
                    <span className="font-medium text-regulatory-800">{permit.timeline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4-Layer Validation Workflow */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-regulatory-900 mb-8">
            4-Layer Security Validation Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, index) => (
                <Card key={index} className="text-center relative overflow-hidden border-regulatory-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-regulatory-400 to-regulatory-600"></div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-regulatory-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg text-regulatory-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-regulatory-600">{step.description}</p>
                  </CardContent>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-regulatory-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-regulatory-200">
          <h2 className="text-3xl font-bold text-center text-regulatory-900 mb-8">
            Enterprise Security Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "Zero-Trust Architecture", desc: "Every request verified and encrypted" },
              { icon: <Lock className="h-6 w-6" />, title: "Document Integrity", desc: "Cryptographic verification of all submissions" },
              { icon: <Users className="h-6 w-6" />, title: "Role-Based Access", desc: "Granular permissions and audit trails" },
              { icon: <Clock className="h-6 w-6" />, title: "Real-time Monitoring", desc: "24/7 security monitoring and alerts" },
              { icon: <FileText className="h-6 w-6" />, title: "Compliance Tracking", desc: "Automated regulatory compliance reporting" },
              { icon: <CheckCircle className="h-6 w-6" />, title: "Digital Signatures", desc: "PKI-based document authentication" }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-3 bg-regulatory-100 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-regulatory-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-regulatory-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-regulatory-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 mr-2" />
            <span className="font-bold">TelecomReg Portal</span>
          </div>
          <p className="text-regulatory-300 mb-4">
            Secure, compliant, and efficient telecom regulatory management
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-regulatory-400">
            <span>© 2024 TelecomReg Portal</span>
            <span>•</span>
            <span>SOC 2 Type II Certified</span>
            <span>•</span>
            <span>ISO 27001 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
