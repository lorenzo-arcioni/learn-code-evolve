import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/api";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LogOut, User, Upload, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminStatistics from "@/components/admin/AdminStatistics";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminFeedback from "@/components/admin/AdminFeedback";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminExercises from "@/components/admin/AdminExercises";
import AdminConsultations from "@/components/admin/AdminConsultations";
import { Separator } from "@/components/ui/separator";

type User = {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  points: number;
  solved_exercises: string[];
  role?: string;
};

type ProgressData = {
  total_exercises: number;
  solved_exercises: number;
  progress_percentage: number;
  points: number;
  difficulty_stats: {
    Easy: number;
    Medium: number;
    Hard: number;
    Expert: number;
  };
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get the active tab from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') === 'settings' ? 'settings' : 'stats';

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
  });

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
      console.log("User role:", user.role);
    }
  }, [user]);

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ["userProgress"],
    queryFn: authApi.getUserProgress,
  });

  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating profile",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
      console.error("Update profile error:", error);
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: authApi.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Avatar updated",
        description: "Your avatar has been updated successfully.",
      });
      setAvatarFile(null);
      setAvatarPreview(null);
    },
    onError: (error) => {
      toast({
        title: "Error uploading avatar",
        description: "An error occurred while uploading your avatar.",
        variant: "destructive",
      });
      console.error("Upload avatar error:", error);
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("ml_academy_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    authApi.logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (avatarFile) {
      uploadAvatarMutation.mutate(avatarFile);
      setDialogOpen(false);
    }
  };

  const handleCancelAvatarChange = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setDialogOpen(false);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    // Update URL when tab changes without full page reload
    const newSearchParams = new URLSearchParams(location.search);
    if (value === 'settings') {
      newSearchParams.set('tab', 'settings');
    } else {
      newSearchParams.delete('tab');
    }
    
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  };

  if (!user && !userLoading) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {userError ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p>Error loading profile. Please try again later.</p>
              </div>
            </CardContent>
          </Card>
        ) : userLoading ? (
          <div className="flex justify-center py-10">
            <p>Loading profile...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                  <CardDescription>Your account information</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-primary/20">
                      <AvatarImage src={user.avatar_url ? `http://localhost:8000${user.avatar_url}` : undefined} />
                      <AvatarFallback className="text-3xl">
                        {user.username ? user.username.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Profile Picture</DialogTitle>
                          <DialogDescription>
                            Upload a new profile picture to personalize your account.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex flex-col items-center space-y-4 py-4">
                          <Avatar className="h-32 w-32 border-4 border-primary/20">
                            <AvatarImage 
                              src={avatarPreview || (user.avatar_url ? `http://localhost:8000${user.avatar_url}` : undefined)} 
                            />
                            <AvatarFallback className="text-3xl">
                              {user.username ? user.username.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                            </AvatarFallback>
                          </Avatar>
                          
                          <Input 
                            id="avatar" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleAvatarChange} 
                            className="max-w-xs"
                          />
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={handleCancelAvatarChange}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleAvatarUpload} 
                            disabled={!avatarFile || uploadAvatarMutation.isPending}
                          >
                            {uploadAvatarMutation.isPending ? "Uploading..." : "Save"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{user.full_name || user.username}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    {user.role && (
                      <span className="inline-block px-2 py-1 mt-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {user.role === "admin" ? "Administrator" : "User"}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid w-full grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center border rounded-lg p-3">
                      <span className="text-2xl font-bold text-primary">{progress?.points || 0}</span>
                      <span className="text-sm text-muted-foreground">Points</span>
                    </div>
                    <div className="flex flex-col items-center border rounded-lg p-3">
                      <span className="text-2xl font-bold text-primary">{progress?.solved_exercises || 0}</span>
                      <span className="text-sm text-muted-foreground">Solved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stats">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                        <CardDescription>Track your learning journey</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {progressLoading ? (
                          <p>Loading statistics...</p>
                        ) : (
                          <>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm">Progress</span>
                                <span className="text-sm font-medium">{Math.round(progress?.progress_percentage || 0)}%</span>
                              </div>
                              <Progress value={progress?.progress_percentage || 0} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                {progress?.solved_exercises || 0} of {progress?.total_exercises || 0} exercises completed
                              </p>
                            </div>
                            
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium">Exercises by Difficulty</h4>
                              {progress?.difficulty_stats && (
                                <div className="grid grid-cols-2 gap-4">
                                  <Card className="bg-green-50 dark:bg-green-950/30">
                                    <CardContent className="p-4">
                                      <div className="text-xl font-bold text-green-600 dark:text-green-400">{progress.difficulty_stats.Easy}</div>
                                      <div className="text-sm text-muted-foreground">Easy</div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-amber-50 dark:bg-amber-950/30">
                                    <CardContent className="p-4">
                                      <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{progress.difficulty_stats.Medium}</div>
                                      <div className="text-sm text-muted-foreground">Medium</div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-red-50 dark:bg-red-950/30">
                                    <CardContent className="p-4">
                                      <div className="text-xl font-bold text-red-600 dark:text-red-400">{progress.difficulty_stats.Hard}</div>
                                      <div className="text-sm text-muted-foreground">Hard</div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-purple-50 dark:bg-purple-950/30">
                                    <CardContent className="p-4">
                                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{progress.difficulty_stats.Expert}</div>
                                      <div className="text-sm text-muted-foreground">Expert</div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={user.username} disabled />
                            <p className="text-sm text-muted-foreground">Username cannot be changed</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input 
                              id="full_name" 
                              value={formData.full_name} 
                              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                              placeholder="Enter your full name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="Enter your email"
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          
            {user && user.role === "admin" && ( 
              <div className="mt-10">
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                    <CardDescription>Overview of key metrics and platform performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminStatistics />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and their roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminUsers />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Courses</CardTitle>
                      <CardDescription>Add and manage courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AdminCourses />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Products</CardTitle>
                      <CardDescription>Add and manage shop products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AdminProducts />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Exercises</CardTitle>
                    <CardDescription>Add and manage practice exercises</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminExercises />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Requests</CardTitle>
                    <CardDescription>View and manage user consultation requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminConsultations />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Feedback</CardTitle>
                    <CardDescription>View and manage user feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminFeedback />
                  </CardContent>
                </Card>
              </div>
            </div>
            )}            
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
