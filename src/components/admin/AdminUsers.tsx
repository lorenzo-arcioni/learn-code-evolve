import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Search, ShieldAlert, ShieldCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import adminApi from "@/services/adminApi";
import { format } from "date-fns";

// Typing dei dati utente
type UserType = {
  id: string;          // usa `id` come fornito dall'API
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const filters: Record<string, any> = {};
      if (searchEmail) filters.email = searchEmail;
      if (roleFilter !== 'all') filters.role = roleFilter;
      if (activeFilter !== 'all') filters.is_active = activeFilter === 'active';

      // Chiamata API
      const data = await adminApi.getUsers(filters);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleRoleChange = async (userId: string, promote: boolean) => {
    try {
      setUpdateLoading(userId);
      await adminApi.updateUserRole(userId, promote);
      setUsers(users.map(u => u.id === userId ? { ...u, role: promote ? 'admin' : 'user' } : u));
      toast.success(promote ? "Promoted to admin" : "Demoted to user");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update role");
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleStatusChange = async (userId: string, active: boolean) => {
    try {
      setUpdateLoading(userId);
      await adminApi.updateUserStatus(userId, active);
      setUsers(users.map(u => u.id === userId ? { ...u, is_active: active } : u));
      toast.success(active ? "User activated" : "User deactivated");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    } finally {
      setUpdateLoading(null);
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Never";
    try {
      return format(new Date(date), "MMM d, yyyy HH:mm");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            placeholder="Search by email"
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="role-all" value="all">All roles</SelectItem>
              <SelectItem key="role-admin" value="admin">Admin</SelectItem>
              <SelectItem key="role-user" value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="status-all" value="all">All status</SelectItem>
              <SelectItem key="status-active" value="active">Active</SelectItem>
              <SelectItem key="status-inactive" value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Last login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow key="no-users">
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "admin" ? (
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            <ShieldAlert className="mr-1 h-3 w-3" /> Admin
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <User className="mr-1 h-3 w-3" /> User
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.is_active ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell>{formatDate(user.last_login)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={user.role === "admin" ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleRoleChange(user.id, user.role !== "admin")}
                            disabled={updateLoading === user.id}
                          >
                            {updateLoading === user.id ? (
                              <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : user.role === "admin" ? (
                              <ShieldAlert className="mr-1 h-4 w-4" />
                            ) : (
                              <ShieldCheck className="mr-1 h-4 w-4" />
                            )}
                            {user.role === "admin" ? "Demote" : "Make Admin"}
                          </Button>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={user.is_active}
                              onCheckedChange={checked => handleStatusChange(user.id, checked)}
                              disabled={updateLoading === user.id}
                            />
                            <span className="text-xs">{user.is_active ? "Active" : "Inactive"}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
