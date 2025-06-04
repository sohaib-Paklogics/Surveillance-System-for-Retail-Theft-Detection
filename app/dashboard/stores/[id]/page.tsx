"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, ArrowLeft, Camera, MapPin, Phone, Mail, Globe, Shield } from "lucide-react"

// Mock store data
const mockStoreData = {
  id: 1,
  name: "Downtown Electronics",
  location: "123 Main St, New York, NY 10001",
  contactEmail: "john@downtown.com",
  contactPhone: "+1 (555) 123-4567",
  type: "Electronics",
  status: "Active",
  subscription: "Premium",
  lastActivity: "2 hours ago",
  loginEmail: "store@downtown.com",
  rtspUrl: "rtsp://192.168.1.100:554/stream",
  port: "554",
  cameras: [
    { id: "1", name: "Front Entrance", streamType: "RTSP", location: "Main entrance", status: "Online" },
    { id: "2", name: "Cash Register", streamType: "RTSP", location: "Checkout area", status: "Online" },
    { id: "3", name: "Storage Room", streamType: "RTSP", location: "Back storage", status: "Offline" },
  ],
  recentAlerts: [
    { id: 1, type: "Motion Detected", time: "2 hours ago", severity: "Low" },
    { id: 2, type: "Person Detected", time: "4 hours ago", severity: "Medium" },
    { id: 3, type: "Camera Offline", time: "1 day ago", severity: "High" },
  ],
}

export default function StoreDetailsPage() {
  const params = useParams()
  const router = useRouter()

  // In a real app, you would fetch store data based on params.id
  const store = mockStoreData

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "online":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{store.name}</h1>
            <p className="text-muted-foreground">Store details and system configuration</p>
          </div>
        </div>
        <Link href={`/dashboard/stores/${store.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Store
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(store.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type</span>
                <span className="text-sm">{store.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subscription</span>
                <Badge className="bg-[#2563EB] text-white hover:bg-[#2563EB]/90">{store.subscription}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Activity</span>
                <span className="text-sm text-muted-foreground">{store.lastActivity}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{store.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{store.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{store.contactPhone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Login Email</span>
                <span className="text-sm font-mono">{store.loginEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">RTSP URL</span>
                <span className="text-sm font-mono text-muted-foreground">{store.rtspUrl}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Port</span>
                <span className="text-sm font-mono">{store.port}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Cameras</span>
                <span className="text-sm">{store.cameras.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Configuration */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Camera Configuration
          </CardTitle>
          <CardDescription>Individual camera settings and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {store.cameras.map((camera) => (
              <div key={camera.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{camera.name}</h4>
                  {getStatusBadge(camera.status)}
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Type: {camera.streamType}</div>
                  <div>Location: {camera.location}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest security alerts from this store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {store.recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{alert.type}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                {getSeverityBadge(alert.severity)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
