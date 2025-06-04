"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Plus, CheckCircle } from "lucide-react"

interface Camera {
  id: string
  name: string
  streamType: string
  location: string
}

// Mock data for the store being edited
const mockStoreData = {
  id: 1,
  storeName: "Downtown Electronics",
  location: "123 Main St, New York, NY 10001",
  contactEmail: "john@downtown.com",
  contactPhone: "+1 (555) 123-4567",
  storeType: "electronics",
  loginEmail: "store@downtown.com",
  rtspUrl: "rtsp://192.168.1.100:554/stream",
  port: "554",
  numberOfCameras: "3",
  cameras: [
    { id: "1", name: "Front Entrance", streamType: "rtsp", location: "Main entrance" },
    { id: "2", name: "Cash Register", streamType: "rtsp", location: "Checkout area" },
    { id: "3", name: "Storage Room", streamType: "rtsp", location: "Back storage" },
  ],
}

export default function EditStorePage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [cameras, setCameras] = useState<Camera[]>([])

  const [formData, setFormData] = useState({
    storeName: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    storeType: "",
    loginEmail: "",
    rtspUrl: "",
    port: "",
    numberOfCameras: "",
  })

  // Load store data on component mount
  useEffect(() => {
    // In a real app, you would fetch data based on params.id
    const storeData = mockStoreData
    setFormData({
      storeName: storeData.storeName,
      location: storeData.location,
      contactEmail: storeData.contactEmail,
      contactPhone: storeData.contactPhone,
      storeType: storeData.storeType,
      loginEmail: storeData.loginEmail,
      rtspUrl: storeData.rtspUrl,
      port: storeData.port,
      numberOfCameras: storeData.numberOfCameras,
    })
    setCameras(storeData.cameras)
  }, [params.id])

  const addCamera = () => {
    const newCamera: Camera = {
      id: Date.now().toString(),
      name: "",
      streamType: "",
      location: "",
    }
    setCameras([...cameras, newCamera])
  }

  const removeCamera = (id: string) => {
    setCameras(cameras.filter((camera) => camera.id !== id))
  }

  const updateCamera = (id: string, field: keyof Camera, value: string) => {
    setCameras(cameras.map((camera) => (camera.id === id ? { ...camera, [field]: value } : camera)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Updated store data:", { ...formData, cameras })
      setSuccessMessage("Store updated successfully!")
      setIsLoading(false)
      setTimeout(() => {
        setSuccessMessage("")
        router.push("/dashboard/stores")
      }, 2000)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Store</h1>
        <p className="text-muted-foreground">Update store information and security system configuration</p>
      </div>

      {successMessage && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Basic information about the store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name *</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  placeholder="Enter store name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeType">Store Type *</Label>
                <Select value={formData.storeType} onValueChange={(value) => handleInputChange("storeType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="mall">Shopping Mall</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Textarea
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter complete address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="contact@store.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Login Credentials</CardTitle>
            <CardDescription>Update login credentials for the store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Login Email *</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={formData.loginEmail}
                  onChange={(e) => handleInputChange("loginEmail", e.target.value)}
                  placeholder="store@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginPassword">New Password (Optional)</Label>
                <Input id="loginPassword" type="password" placeholder="Leave blank to keep current password" />
                <p className="text-xs text-muted-foreground">Only enter a new password if you want to change it</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NVR System Information */}
        <Card>
          <CardHeader>
            <CardTitle>NVR System Configuration</CardTitle>
            <CardDescription>Configure the Real-time Video Recognition system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rtspUrl">RTSP/URL *</Label>
                <Input
                  id="rtspUrl"
                  value={formData.rtspUrl}
                  onChange={(e) => handleInputChange("rtspUrl", e.target.value)}
                  placeholder="rtsp://192.168.1.100:554/stream"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port Number *</Label>
                <Input
                  id="port"
                  type="number"
                  value={formData.port}
                  onChange={(e) => handleInputChange("port", e.target.value)}
                  placeholder="554"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfCameras">Number of Cameras *</Label>
              <Input
                id="numberOfCameras"
                type="number"
                value={formData.numberOfCameras}
                onChange={(e) => handleInputChange("numberOfCameras", e.target.value)}
                placeholder="4"
                min="1"
                required
              />
            </div>
          </CardContent>
        </Card>


        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating Store..." : "Update Store"}
          </Button>
        </div>
      </form>
    </div>
  )
}
