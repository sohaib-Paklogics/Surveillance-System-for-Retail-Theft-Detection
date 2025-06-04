"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"

const stores = [
  {
    id: 1,
    name: "Downtown Electronics",
    location: "123 Main St, New York, NY",
    contact: "john@downtown.com",
    phone: "+1 (555) 123-4567",
    type: "Electronics",
    status: "Active",
    cameras: 8,
    subscription: "Premium",
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Mall Security Center",
    location: "456 Mall Ave, Los Angeles, CA",
    contact: "security@mall.com",
    phone: "+1 (555) 987-6543",
    type: "Shopping Mall",
    status: "Active",
    cameras: 12,
    subscription: "Enterprise",
    lastActivity: "30 minutes ago",
  },
  {
    id: 3,
    name: "Retail Chain Store #5",
    location: "789 Commerce Blvd, Chicago, IL",
    contact: "manager@retail.com",
    phone: "+1 (555) 456-7890",
    type: "Retail",
    status: "Inactive",
    cameras: 6,
    subscription: "Basic",
    lastActivity: "2 days ago",
  },
  {
    id: 4,
    name: "Jewelry Store Premium",
    location: "321 Luxury Lane, Miami, FL",
    contact: "owner@jewelry.com",
    phone: "+1 (555) 234-5678",
    type: "Jewelry",
    status: "Active",
    cameras: 4,
    subscription: "Premium",
    lastActivity: "1 hour ago",
  },
]

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [storeToDelete, setStoreToDelete] = useState<number | null>(null)

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteStore = (storeId: number) => {
    setStoreToDelete(storeId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting store:", storeToDelete)
    setDeleteDialogOpen(false)
    setStoreToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
          <p className="text-muted-foreground">Manage all stores and their security systems</p>
        </div>
        <Link href="/dashboard/stores/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Store
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Stores</CardTitle>
          <CardDescription>A list of all stores in your theft detection system</CardDescription>
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
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cameras</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.location}</TableCell>
                  <TableCell>{store.type}</TableCell>
                  <TableCell>
                    <Badge variant={store.status === "Active" ? "default" : "secondary"}>{store.status}</Badge>
                  </TableCell>
                  <TableCell>{store.cameras}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{store.subscription}</Badge>
                  </TableCell>
                  <TableCell>{store.lastActivity}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/stores/${store.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/stores/${store.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Store
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteStore(store.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Store
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the store and remove all associated data from
              our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
