import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import adminApi from "@/services/adminApi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const timeRanges = [
  { id: "today", label: "Today" },
  { id: "week", label: "Last 7 Days" },
  { id: "month", label: "Last 30 Days" },
  { id: "6months", label: "Last 6 Months" },
  { id: "year", label: "Last Year" },
  { id: "all", label: "All Activity" },
];

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [userActivityData, setUserActivityData] = useState([]);
  const [contentViewsData, setContentViewsData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getStatistics(timeRange);
        console.log("Raw statistics data:", data);
        
        // Process user activity data with better error handling
        let parsedUserActivityData = [];
        if (data?.user_activity_data && Array.isArray(data.user_activity_data)) {
          parsedUserActivityData = data.user_activity_data.map(item => ({
            name: item.name || "",
            users: Number.isNaN(parseInt(item.users)) ? 0 : parseInt(item.users)
          }));
          console.log("Parsed user activity data:", parsedUserActivityData);
        }
        
        // Process content views data with better error handling
        let parsedContentViewsData = [];
        if (data?.content_views_data && Array.isArray(data.content_views_data)) {
          parsedContentViewsData = data.content_views_data.map(item => ({
            name: item.name || "",
            views: Number.isNaN(parseInt(item.views)) ? 0 : parseInt(item.views)
          }));
          console.log("Parsed content views data:", parsedContentViewsData);
        }
        
        setStats(data);
        setUserActivityData(parsedUserActivityData);
        setContentViewsData(parsedContentViewsData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        toast.error("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [timeRange]);

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  if (loading) {
    return <StatisticsSkeletons />;
  }

  // Modified validation - only check if data exists, not if it contains non-zero values
  const hasUserActivityData = userActivityData && userActivityData.length > 0;
  
  // Modified validation - only check if data exists, not if it contains non-zero values
  const hasContentViewsData = contentViewsData && contentViewsData.length > 0;
  
  // Verifica che i dati dei contenuti più visualizzati siano disponibili
  const hasTopContentData = stats?.content_stats?.top_content && 
    stats.content_stats.top_content.length > 0;

  return (
    <div className="grid gap-6">
      
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Users Statistics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.user_stats?.total_users || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.user_stats?.active_users || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.user_stats?.new_users_weekly || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.user_stats?.admin_count || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {hasUserActivityData ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  allowDecimals={false} 
                  domain={[0, 'auto']} // Always start at 0, auto-scale max
                />
                <Tooltip formatter={(value) => [value, "Users"]} />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
              No user activity data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Statistics */}
      <h2 className="text-2xl font-bold mt-4">Content Statistics</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.content_stats?.total_content || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.interaction_stats?.total_views || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Views Per Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.interaction_stats?.average_views !== undefined
                ? parseFloat(stats.interaction_stats.average_views).toFixed(2) 
                : "0.00"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.feedback_stats?.total_feedback || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unresolved Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.feedback_stats?.unresolved_feedback || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Content Views</CardTitle>
        </CardHeader>
        <CardContent>
          {hasContentViewsData ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={contentViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  allowDecimals={false} 
                  domain={[0, 'auto']} // Always start at 0, auto-scale max
                />
                <Tooltip formatter={(value) => [value, "Views"]} />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
              No content views data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Content by Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hasTopContentData ? (
              stats.content_stats.top_content.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium truncate">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.type}</div>
                  </div>
                  <div className="text-primary font-bold">
                    {item.views} views
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No top content data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Content */}
      {stats?.content_stats?.recent_content && stats.content_stats.recent_content.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Viewed Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.content_stats.recent_content.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium truncate">{item.title || "Untitled Content"}</div>
                    <div className="text-sm text-muted-foreground">{item.type || "Unknown Type"}</div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {item.last_viewed 
                      ? new Date(item.last_viewed).toLocaleDateString() 
                      : "Unknown date"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const StatisticsSkeletons = () => (
  <div className="grid gap-6">
    <div className="flex justify-end">
      <Skeleton className="h-10 w-[180px]" />
    </div>
    
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>

    <Skeleton className="h-8 w-48 mt-4" />
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminStatistics;