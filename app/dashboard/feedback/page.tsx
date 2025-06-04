"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MoreHorizontal, MessageSquare, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const feedbacks = [
  {
    id: 1,
    userName: "John Smith",
    userEmail: "john@downtown.com",
    storeName: "Downtown Electronics",
    subject: "Camera Quality Issue",
    message:
      "The camera feed quality has been poor lately, especially during night hours. We're getting blurry images that make it difficult to identify faces clearly.",
    priority: "High",
    status: "Unresolved",
    date: "2024-01-15",
    category: "Technical",
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userEmail: "security@mall.com",
    storeName: "Mall Security Center",
    subject: "False Alarm Notifications",
    message:
      "We're receiving too many false positive alerts. The system seems to trigger alerts for normal customer movements. Can this sensitivity be adjusted?",
    priority: "Medium",
    status: "In Progress",
    date: "2024-01-14",
    category: "System",
  },
  {
    id: 3,
    userName: "Mike Wilson",
    userEmail: "manager@retail.com",
    storeName: "Retail Chain Store #5",
    subject: "Great Service!",
    message:
      "The theft detection system has been working perfectly. We caught two incidents last week thanks to the real-time alerts. Very satisfied with the service.",
    priority: "Low",
    status: "Resolved",
    date: "2024-01-13",
    category: "Feedback",
  },
  {
    id: 4,
    userName: "Lisa Chen",
    userEmail: "owner@jewelry.com",
    storeName: "Jewelry Store Premium",
    subject: "Mobile App Issues",
    message:
      "The mobile app keeps crashing when I try to view live feeds. This is critical for our business as I need to monitor the store remotely.",
    priority: "Critical",
    status: "Unresolved",
    date: "2024-01-12",
    category: "Technical",
  },
]

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || feedback.status.toLowerCase().replace(" ", "") === statusFilter
    const matchesPriority = priorityFilter === "all" || feedback.priority.toLowerCase() === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewFeedback = (feedback: any) => {
    setSelectedFeedback(feedback)
    setViewDialogOpen(true)
  }

  const handleStatusChange = (feedbackId: number, newStatus: string) => {
    console.log("Updating feedback status:", feedbackId, newStatus)
    // Handle status update logic
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
      case "in progress":
        return <Badge className="bg-[#2563EB] text-white hover:bg-[#2563EB]/90">In Progress</Badge>
      case "unresolved":
        return <Badge variant="destructive">Unresolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return <AlertTriangle className="h-4 w-4" />
      case "system":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback Management</h1>
        <p className="text-muted-foreground">Manage customer feedback and support requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.filter((f) => f.status === "Unresolved").length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.filter((f) => f.status === "In Progress").length}</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.filter((f) => f.status === "Resolved").length}</div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>Customer feedback and support requests from all stores</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{feedback.userName}</div>
                      <div className="text-sm text-muted-foreground">{feedback.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{feedback.storeName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{feedback.subject}</TableCell>
                  <TableCell>{getPriorityBadge(feedback.priority)}</TableCell>
                  <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(feedback.category)}
                      <span className="text-sm">{feedback.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewFeedback(feedback)}>View Details</DropdownMenuItem>
                        {feedback.status !== "Resolved" && (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusChange(feedback.id, "In Progress")}>
                              Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(feedback.id, "Resolved")}>
                              Mark Resolved
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>Reply to User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>Full details of the feedback from {selectedFeedback?.userName}</DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">User</h4>
                  <p className="text-sm">{selectedFeedback.userName}</p>
                  <p className="text-xs text-muted-foreground">{selectedFeedback.userEmail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Store</h4>
                  <p className="text-sm">{selectedFeedback.storeName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                  {getPriorityBadge(selectedFeedback.priority)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  {getStatusBadge(selectedFeedback.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p className="text-sm">{selectedFeedback.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <p className="text-sm">{selectedFeedback.category}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Subject</h4>
                <p className="text-sm font-medium">{selectedFeedback.subject}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm">{selectedFeedback.message}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedFeedback.id, "In Progress")}
                  disabled={selectedFeedback.status === "In Progress"}
                >
                  Mark In Progress
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedFeedback.id, "Resolved")}
                  disabled={selectedFeedback.status === "Resolved"}
                >
                  Mark Resolved
                </Button>
                <Button size="sm" variant="outline">
                  Reply to User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
