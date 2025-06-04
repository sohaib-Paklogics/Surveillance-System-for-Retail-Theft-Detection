import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, CreditCard, MessageSquare, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Stores",
      value: "24",
      description: "+2 from last month",
      icon: Store,
      trend: "up",
    },
    {
      title: "Active Subscriptions",
      value: "18",
      description: "75% of total stores",
      icon: CreditCard,
      trend: "up",
    },
    {
      title: "Pending Feedback",
      value: "7",
      description: "3 urgent issues",
      icon: MessageSquare,
      trend: "down",
    },
    {
      title: "System Alerts",
      value: "3",
      description: "2 critical alerts",
      icon: AlertTriangle,
      trend: "up",
    },
  ]

  const recentStores = [
    { name: "Downtown Electronics", location: "New York, NY", status: "Active", cameras: 8 },
    { name: "Mall Security Center", location: "Los Angeles, CA", status: "Active", cameras: 12 },
    { name: "Retail Chain Store #5", location: "Chicago, IL", status: "Pending", cameras: 6 },
    { name: "Jewelry Store Premium", location: "Miami, FL", status: "Active", cameras: 4 },
  ]

  const recentAlerts = [
    { store: "Downtown Electronics", type: "Motion Detected", time: "2 minutes ago", severity: "High" },
    { store: "Mall Security Center", type: "Unauthorized Access", time: "15 minutes ago", severity: "Critical" },
    { store: "Retail Chain Store #5", type: "Camera Offline", time: "1 hour ago", severity: "Medium" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your theft detection admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Stores */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Stores</CardTitle>
            <CardDescription>Latest stores added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStores.map((store, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{store.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {store.location} • {store.cameras} cameras
                    </p>
                  </div>
                  <Badge variant={store.status === "Active" ? "default" : "secondary"}>{store.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest security alerts from your stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.store} • {alert.time}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "Critical"
                        ? "destructive"
                        : alert.severity === "High"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
