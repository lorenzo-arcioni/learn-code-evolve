
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import adminApi from "@/services/adminApi";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterResolved, setFilterResolved] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      
      if (filterResolved !== "") filters.resolved = filterResolved === "true";
      
      const data = await adminApi.getFeedback(filters);
      
      // Sort by date
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
      
      setFeedback(sortedData);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [sortDirection]);

  const handleFilterChange = () => {
    fetchFeedback();
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleResolve = async (id: string) => {
    try {
      await adminApi.markFeedbackAsResolved(id);
      setFeedback(feedback.map(item => {
        if (item._id === id) {
          return { ...item, resolved: true };
        }
        return item;
      }));
      toast.success("Feedback marked as resolved");
    } catch (error) {
      console.error("Error resolving feedback:", error);
      toast.error("Failed to resolve feedback");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPp");
    } catch (e) {
      return "Invalid date";
    }
  };

  const viewFeedbackDetails = (item: any) => {
    setSelectedFeedback(item);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="flex-1 min-w-[200px]">
              <Select value={filterResolved} onValueChange={(value) => {
                setFilterResolved(value);
                setTimeout(handleFilterChange, 0);
              }}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Feedback</SelectItem>
                  <SelectItem value="true">Resolved</SelectItem>
                  <SelectItem value="false">Unresolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={toggleSortDirection}>
              Sort by Date: {sortDirection === "asc" ? "Oldest First" : "Newest First"}
            </Button>
          </div>

          {/* Feedback Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <TableCell key={j}>
                              <Skeleton className="h-6 w-full" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                ) : feedback.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      No feedback found
                    </TableCell>
                  </TableRow>
                ) : (
                  feedback.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.resolved ? "outline" : "default"}
                        >
                          {item.resolved ? "Resolved" : "Unresolved"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(item.created_at)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewFeedbackDetails(item)}
                        >
                          View
                        </Button>
                        {!item.resolved && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleResolve(item._id)}
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Details Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && setSelectedFeedback(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback && formatDate(selectedFeedback.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Name</h3>
                  <p className="text-sm">{selectedFeedback.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm">{selectedFeedback.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Message</h3>
                <p className="text-sm p-4 bg-muted rounded-md mt-1">{selectedFeedback.message}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                {!selectedFeedback.resolved && (
                  <Button
                    onClick={() => {
                      handleResolve(selectedFeedback._id);
                      setSelectedFeedback(null);
                    }}
                  >
                    Mark as Resolved
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFeedback;
