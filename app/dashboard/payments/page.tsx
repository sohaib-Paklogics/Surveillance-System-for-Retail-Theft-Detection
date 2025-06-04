"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, MoreHorizontal, CreditCard, CheckCircle, XCircle } from "lucide-react"

const payments = [
  {
    id: 1,
    storeName: "Downtown Electronics",
    plan: "Premium",
    amount: "$99.99",
    status: "Paid",
    dueDate: "2024-02-15",
    lastPayment: "2024-01-15",
    method: "Credit Card",
  },
  {
    id: 2,
    storeName: "Mall Security Center",
    plan: "Enterprise",
    amount: "$199.99",
    status: "Paid",
    dueDate: "2024-02-20",
    lastPayment: "2024-01-20",
    method: "Bank Transfer",
  },
  {
    id: 3,
    storeName: "Retail Chain Store #5",
    plan: "Basic",
    amount: "$49.99",
    status: "Overdue",
    dueDate: "2024-01-30",
    lastPayment: "2023-12-30",
    method: "Credit Card",
  },
  {
    id: 4,
    storeName: "Jewelry Store Premium",
    plan: "Premium",
    amount: "$99.99",
    status: "Pending",
    dueDate: "2024-02-10",
    lastPayment: "2024-01-10",
    method: "PayPal",
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [newStatus, setNewStatus] = useState("")
  const [newPlan, setNewPlan] = useState("")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUpdatePayment = (payment: any) => {
    setSelectedPayment(payment)
    setNewStatus(payment.status)
    setNewPlan(payment.plan)
    setUpdateDialogOpen(true)
  }

  const handleMarkAsPaid = (paymentId: number) => {
    console.log("Marking payment as paid:", paymentId)
    // Handle mark as paid logic
  }

  const confirmUpdate = () => {
    console.log("Updating payment:", selectedPayment.id, { status: newStatus, plan: newPlan })
    setUpdateDialogOpen(false)
    setSelectedPayment(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "basic":
        return <Badge variant="outline">Basic</Badge>
      case "premium":
        return <Badge className="bg-[#2563EB] text-white hover:bg-[#2563EB]/90">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Enterprise</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground">Manage store subscriptions and payment status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,449.96</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 h-4 w-4 p-0 text-xs">1</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Overview</CardTitle>
          <CardDescription>Monitor subscription plans and payment status for all stores</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Subscription Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.storeName}</TableCell>
                  <TableCell>{getPlanBadge(payment.plan)}</TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>{payment.lastPayment}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdatePayment(payment)}>
                          Update Subscription
                        </DropdownMenuItem>
                        {payment.status !== "Paid" && (
                          <DropdownMenuItem onClick={() => handleMarkAsPaid(payment.id)}>Mark as Paid</DropdownMenuItem>
                        )}
                        <DropdownMenuItem>View Payment History</DropdownMenuItem>
                        <DropdownMenuItem>Send Payment Reminder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Subscription</DialogTitle>
            <DialogDescription>
              Update the subscription plan and payment status for {selectedPayment?.storeName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription Plan</Label>
              <Select value={newPlan} onValueChange={setNewPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic - $49.99/month</SelectItem>
                  <SelectItem value="Premium">Premium - $99.99/month</SelectItem>
                  <SelectItem value="Enterprise">Enterprise - $199.99/month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Payment Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpdate}>Update Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
