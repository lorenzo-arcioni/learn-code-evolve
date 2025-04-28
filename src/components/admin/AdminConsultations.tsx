import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "@/services/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

type ConsultationRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  consultationType: string;
  description: string;
  status: "pending" | "approved" | "rejected" | "completed";
};

const AdminConsultations = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ConsultationRequest["status"]>("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: consultations, isLoading } = useQuery<ConsultationRequest[]>({
    queryKey: ["consultationRequests"],
    queryFn: adminApi.getConsultationRequests,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      adminApi.updateConsultationStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationRequests"] });
      setIsDialogOpen(false);
      toast({
        title: "Request updated",
        description: "Consultation request status updated successfully.",
      });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "Failed to update the request.",
        variant: "destructive",
      }),
  });

  const openDialog = (req: ConsultationRequest) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedRequest) {
      updateStatusMutation.mutate({
        id: selectedRequest.id,
        status: newStatus,
      });
    }
  };

  const filtered = consultations?.filter((req) => {
    const name = `${req.firstName} ${req.lastName}`.toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.consultationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  const renderBadge = (s: ConsultationRequest["status"]) => {
    const map = {
      pending: { color: "yellow", label: "Pending" },
      approved: { color: "blue", label: "Approved" },
      rejected: { color: "red", label: "Rejected" },
      completed: { color: "green", label: "Completed" },
    } as const;
    const { color, label } = map[s] || { color: "gray", label: s };
    return (
      <Badge
        variant="outline"
        className={`bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`}
      >
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name, email, type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-xs mb-4"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
          <p>No consultation requests found.</p>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.firstName} {req.lastName}</TableCell>
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.consultationType}</TableCell>
                  <TableCell className="max-w-xs truncate">{req.description}</TableCell>
                  <TableCell>{renderBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => openDialog(req)}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Consultation</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div>
                <Label>Name</Label>
                <p>{selectedRequest.firstName} {selectedRequest.lastName}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{selectedRequest.email}</p>
              </div>
              <div>
                <Label>Type</Label>
                <p>{selectedRequest.consultationType}</p>
              </div>
              <div>
                <Label>Description</Label>
                <div className="max-h-32 overflow-y-auto border rounded p-2 mt-1">
                  <p>{selectedRequest.description}</p>
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateStatusMutation.isPending}>
              {updateStatusMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConsultations;

