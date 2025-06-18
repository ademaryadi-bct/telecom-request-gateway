
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { useProfiles, useUpdateProfileStatus } from '@/hooks/useProfiles';
import { Loader2 } from 'lucide-react';

const UserManagement = () => {
  const { data: profiles, isLoading } = useProfiles();
  const updateStatusMutation = useUpdateProfileStatus();

  const handleApprove = (userId: string) => {
    updateStatusMutation.mutate({ userId, status: 'approved' });
  };

  const handleReject = (userId: string) => {
    updateStatusMutation.mutate({ userId, status: 'rejected' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const pendingUsers = profiles?.filter(p => p.registration_status === 'pending') || [];
  const approvedUsers = profiles?.filter(p => p.registration_status === 'approved') || [];
  const rejectedUsers = profiles?.filter(p => p.registration_status === 'rejected') || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-warning-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-600">{pendingUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-compliance-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-compliance-600">{approvedUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Users</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Registrations */}
      {pendingUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Pending Registrations
            </CardTitle>
            <CardDescription>
              Review and approve new user registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.company_name}</div>
                        <div className="text-sm text-gray-500">{user.company_address}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.pic_name}</div>
                        <div className="text-sm text-gray-500">{user.pic_position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{user.company_email}</div>
                        <div className="text-sm text-gray-500">{user.pic_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{user.company_phone}</div>
                        <div className="text-sm text-gray-500">{user.pic_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at!).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          disabled={updateStatusMutation.isPending}
                          className="bg-compliance-600 hover:bg-compliance-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(user.id)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* All Users */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete list of registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.company_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.pic_name}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.registration_status === 'approved'
                          ? 'default'
                          : user.registration_status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {user.registration_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at!).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
