"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"

interface Camera {
  id: string
  name: string
  streamType: string
  location: string
}

export default function NewStorePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [cameras, setCameras] = useState<Camera[]>([])

  const [formData, setFormData] = useState({
    storeName: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    storeType: "",
    loginEmail: "",
    loginPassword: "",
    rtspUrl: "",
    port: "",
    numberOfCameras: "",
  })

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
      console.log("Store data:", { ...formData, cameras })
      setIsLoading(false)
      router.push("/dashboard/stores")
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Store</h1>
        <p className="text-muted-foreground">Create a new store and configure its security system</p>
      </div>

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
            <CardDescription>Create login credentials for the store</CardDescription>
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
                <Label htmlFor="loginPassword">Login Password *</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  value={formData.loginPassword}
                  onChange={(e) => handleInputChange("loginPassword", e.target.value)}
                  placeholder="Enter secure password"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RVR System Information */}
        <Card>
          <CardHeader>
            <CardTitle>RVR System Configuration</CardTitle>
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

        {/* Camera Details */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Camera Details
              <Button type="button" variant="outline" size="sm" onClick={addCamera}>
                <Plus className="mr-2 h-4 w-4" />
                Add Camera
              </Button>
            </CardTitle>
            <CardDescription>Configure individual camera settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cameras.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No cameras added yet. Click "Add Camera" to get started.
              </div>
            ) : (
              cameras.map((camera, index) => (
                <div key={camera.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Camera {index + 1}</Badge>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeCamera(camera.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Camera Name</Label>
                      <Input
                        value={camera.name}
                        onChange={(e) => updateCamera(camera.id, "name", e.target.value)}
                        placeholder="Front Entrance"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stream Type</Label>
                      <Select
                        value={camera.streamType}
                        onValueChange={(value) => updateCamera(camera.id, "streamType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rtsp">RTSP</SelectItem>
                          <SelectItem value="http">HTTP</SelectItem>
                          <SelectItem value="rtmp">RTMP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={camera.location}
                        onChange={(e) => updateCamera(camera.id, "location", e.target.value)}
                        placeholder="Main entrance"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card> */}

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Store..." : "Create Store"}
          </Button>
        </div>
      </form>
    </div>
  )
}
