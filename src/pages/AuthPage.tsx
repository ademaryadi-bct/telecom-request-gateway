
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Building, User, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_website: '',
    pic_name: '',
    pic_position: '',
    pic_phone: '',
    pic_email: '',
    pic_id_number: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const validatePassword = (password: string) => {
    const validation = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!validatePassword(registerData.password)) {
      alert('Password does not meet requirements');
      setLoading(false);
      return;
    }

    const userData = {
      company_name: registerData.company_name,
      company_address: registerData.company_address,
      company_phone: registerData.company_phone,
      company_email: registerData.company_email,
      company_website: registerData.company_website,
      pic_name: registerData.pic_name,
      pic_position: registerData.pic_position,
      pic_phone: registerData.pic_phone,
      pic_email: registerData.pic_email,
      pic_id_number: registerData.pic_id_number
    };

    await signUp(registerData.email, registerData.password, userData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-regulatory-50 via-white to-regulatory-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-regulatory-600" />
          </div>
          <h1 className="text-3xl font-bold text-regulatory-900">Telecom Permit System</h1>
          <p className="text-regulatory-600">Secure registration and permit management</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
                <CardDescription>Enter your credentials to access the system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-regulatory-600 hover:bg-regulatory-700">
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Client Registration</CardTitle>
                <CardDescription>Register your company for telecom permit services</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-6">
                  {/* Account Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-regulatory-600" />
                      <h3 className="text-lg font-semibold">Account Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => {
                            setRegisterData({ ...registerData, password: e.target.value });
                            validatePassword(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-2">Password Requirements:</p>
                      <div className="space-y-1 text-sm">
                        <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-2">{passwordValidation.minLength ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-2">{passwordValidation.hasUppercase ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-2">{passwordValidation.hasLowercase ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '○'}</span>
                          One number
                        </div>
                        <div className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-2">{passwordValidation.hasSpecialChar ? '✓' : '○'}</span>
                          One special character
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-regulatory-600" />
                      <h3 className="text-lg font-semibold">Company Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input
                          id="company_name"
                          value={registerData.company_name}
                          onChange={(e) => setRegisterData({ ...registerData, company_name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company_phone">Company Phone</Label>
                        <Input
                          id="company_phone"
                          value={registerData.company_phone}
                          onChange={(e) => setRegisterData({ ...registerData, company_phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company_address">Company Address</Label>
                      <Textarea
                        id="company_address"
                        value={registerData.company_address}
                        onChange={(e) => setRegisterData({ ...registerData, company_address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_email">Company Email</Label>
                        <Input
                          id="company_email"
                          type="email"
                          value={registerData.company_email}
                          onChange={(e) => setRegisterData({ ...registerData, company_email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company_website">Company Website (Optional)</Label>
                        <Input
                          id="company_website"
                          value={registerData.company_website}
                          onChange={(e) => setRegisterData({ ...registerData, company_website: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* PIC Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-regulatory-600" />
                      <h3 className="text-lg font-semibold">Person in Charge (PIC) Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pic_name">PIC Full Name</Label>
                        <Input
                          id="pic_name"
                          value={registerData.pic_name}
                          onChange={(e) => setRegisterData({ ...registerData, pic_name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pic_position">PIC Position</Label>
                        <Input
                          id="pic_position"
                          value={registerData.pic_position}
                          onChange={(e) => setRegisterData({ ...registerData, pic_position: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pic_phone">PIC Phone</Label>
                        <Input
                          id="pic_phone"
                          value={registerData.pic_phone}
                          onChange={(e) => setRegisterData({ ...registerData, pic_phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pic_email">PIC Email</Label>
                        <Input
                          id="pic_email"
                          type="email"
                          value={registerData.pic_email}
                          onChange={(e) => setRegisterData({ ...registerData, pic_email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pic_id_number">PIC ID Number</Label>
                      <Input
                        id="pic_id_number"
                        value={registerData.pic_id_number}
                        onChange={(e) => setRegisterData({ ...registerData, pic_id_number: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-regulatory-600 hover:bg-regulatory-700">
                    {loading ? 'Registering...' : 'Submit Registration'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
