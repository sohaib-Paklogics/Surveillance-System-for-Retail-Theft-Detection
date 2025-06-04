"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileText, Download, CalendarIcon, TrendingUp, DollarSign, CreditCard, Building } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for reports
const monthlyReports = [
  {
    month: "January 2024",
    totalRevenue: "$2,449.96",
    totalStores: 24,
    paidPayments: 18,
    pendingPayments: 4,
    overduePayments: 2,
    averagePayment: "$102.08",
  },
  {
    month: "December 2023",
    totalRevenue: "$2,299.94",
    totalStores: 23,
    paidPayments: 20,
    pendingPayments: 2,
    overduePayments: 1,
    averagePayment: "$99.99",
  },
  {
    month: "November 2023",
    totalRevenue: "$2,199.92",
    totalStores: 22,
    paidPayments: 19,
    pendingPayments: 2,
    overduePayments: 1,
    averagePayment: "$99.99",
  },
]

const storePaymentHistory = [
  {
    id: 1,
    storeName: "Downtown Electronics",
    date: "2024-01-15",
    amount: "$99.99",
    plan: "Premium",
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-001234",
  },
  {
    id: 2,
    storeName: "Downtown Electronics",
    date: "2023-12-15",
    amount: "$99.99",
    plan: "Premium",
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-001123",
  },
  {
    id: 3,
    storeName: "Downtown Electronics",
    date: "2023-11-15",
    amount: "$99.99",
    plan: "Premium",
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-001012",
  },
  {
    id: 4,
    storeName: "Downtown Electronics",
    date: "2023-10-15",
    amount: "$99.99",
    plan: "Premium",
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-000901",
  },
]

const stores = [
  { id: 1, name: "Downtown Electronics" },
  { id: 2, name: "Mall Security Center" },
  { id: 3, name: "Retail Chain Store #5" },
  { id: 4, name: "Jewelry Store Premium" },
]

export default function ReportsPage() {
  const [selectedStore, setSelectedStore] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would trigger a download
      console.log("Report generated for:", { selectedStore, dateFrom, dateTo })
    }, 2000)
  }

  const handleDownloadMonthlyReport = (month: string) => {
    console.log("Downloading monthly report for:", month)
    // In a real app, this would trigger a download
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
        <h1 className="text-3xl font-bold tracking-tight">Payment Reports</h1>
        <p className="text-muted-foreground">Generate and view payment reports for stores and monthly summaries</p>
      </div>

      <Tabs defaultValue="monthly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Monthly Reports
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Store Payment History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-6">
          {/* Monthly Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,449.96</div>
                <p className="text-xs text-muted-foreground">+6.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+1 new store this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91.7%</div>
                <p className="text-xs text-muted-foreground">22 of 24 payments collected</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$102.08</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment Reports</CardTitle>
              <CardDescription>Historical monthly payment summaries and downloadable reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Total Stores</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead>Avg Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.month}</TableCell>
                      <TableCell className="font-semibold text-green-600">{report.totalRevenue}</TableCell>
                      <TableCell>{report.totalStores}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{report.paidPayments}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          {report.pendingPayments}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">{report.overduePayments}</Badge>
                      </TableCell>
                      <TableCell>{report.averagePayment}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadMonthlyReport(report.month)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="space-y-6">
          {/* Store Report Generator */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Store Payment Report</CardTitle>
              <CardDescription>Create custom payment reports for individual stores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store">Select Store</Label>
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a store" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map((store) => (
                        <SelectItem key={store.id} value={store.id.toString()}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleGenerateReport} disabled={!selectedStore || isGenerating}>
                  <FileText className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Store Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Payment History - Downtown Electronics</CardTitle>
              <CardDescription>Recent payment transactions for the selected store</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storePaymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-semibold">{payment.amount}</TableCell>
                      <TableCell>{getPlanBadge(payment.plan)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
