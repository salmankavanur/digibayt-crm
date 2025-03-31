"use client"

import { CalendarClock, MessageSquare, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Branch-specific activities data
const activitiesData = {
  all: [
    {
      id: 1,
      title: "Client Meeting: Acme Corp",
      time: "Today, 2:00 PM",
      type: "meeting",
      description: "Quarterly review with the Acme Corp team",
      location: "Conference Room A",
      branch: "USA",
    },
    {
      id: 2,
      title: "Follow-up Call: John Smith",
      time: "Today, 4:30 PM",
      type: "call",
      description: "Discuss proposal details and next steps",
      contact: "John Smith, CEO",
      branch: "USA",
    },
    {
      id: 3,
      title: "Demo: New Product Features",
      time: "Tomorrow, 10:00 AM",
      type: "meeting",
      description: "Showcase the latest product updates to potential clients",
      location: "Virtual Meeting",
      branch: "India",
    },
    {
      id: 4,
      title: "Email: Proposal to XYZ Inc",
      time: "Tomorrow, 12:00 PM",
      type: "message",
      description: "Send the final proposal with pricing details",
      contact: "Sarah Johnson, Procurement",
      branch: "UAE",
    },
  ],
  india: [
    {
      id: 101,
      title: "Demo: New Product Features",
      time: "Tomorrow, 10:00 AM",
      type: "meeting",
      description: "Showcase the latest product updates to potential clients",
      location: "Virtual Meeting",
      branch: "India",
    },
    {
      id: 102,
      title: "Team Meeting: Q2 Planning",
      time: "Today, 3:30 PM",
      type: "meeting",
      description: "Discuss Q2 targets and strategy",
      location: "Mumbai Office",
      branch: "India",
    },
    {
      id: 103,
      title: "Call: TechGiant Support",
      time: "Tomorrow, 2:00 PM",
      type: "call",
      description: "Technical support call for implementation",
      contact: "Raj Patel, Support Manager",
      branch: "India",
    },
  ],
  uae: [
    {
      id: 201,
      title: "Email: Proposal to XYZ Inc",
      time: "Tomorrow, 12:00 PM",
      type: "message",
      description: "Send the final proposal with pricing details",
      contact: "Sarah Johnson, Procurement",
      branch: "UAE",
    },
    {
      id: 202,
      title: "Meeting: Desert Technologies",
      time: "Today, 1:00 PM",
      type: "meeting",
      description: "Initial consultation for new project",
      location: "Dubai Office",
      branch: "UAE",
    },
  ],
  usa: [
    {
      id: 301,
      title: "Client Meeting: Acme Corp",
      time: "Today, 2:00 PM",
      type: "meeting",
      description: "Quarterly review with the Acme Corp team",
      location: "Conference Room A",
      branch: "USA",
    },
    {
      id: 302,
      title: "Follow-up Call: John Smith",
      time: "Today, 4:30 PM",
      type: "call",
      description: "Discuss proposal details and next steps",
      contact: "John Smith, CEO",
      branch: "USA",
    },
    {
      id: 303,
      title: "Sales Presentation: Innovative Solutions",
      time: "Tomorrow, 9:00 AM",
      type: "meeting",
      description: "Present our services to potential client",
      location: "Client Office, New York",
      branch: "USA",
    },
  ],
}

export function UpcomingActivities({ branch = "all" }) {
  const router = useRouter()
  const [activities, setActivities] = useState(activitiesData.all)

  // Update activities when branch changes
  useEffect(() => {
    setActivities(activitiesData[branch] || activitiesData.all)
  }, [branch])

  const handleViewDetails = (id: number) => {
    toast({
      title: "Activity details",
      description: `Viewing details for activity #${id}`,
    })
    // In a real app, you would navigate to the activity details page
    // router.push(`/activities/${id}`);
  }

  return (
    <div className="space-y-6">
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <p>No upcoming activities</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              toast({
                title: "Create activity",
                description: "Navigating to activity creation form",
              })
            }}
          >
            Create Activity
          </Button>
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="group relative rounded-lg border p-4 transition-all hover:bg-muted/50 cursor-pointer"
            onClick={() => {
              toast({
                title: activity.title,
                description: activity.description,
              })
            }}
          >
            <div className="flex gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  activity.type === "meeting" && "bg-purple-100 text-digibayt-500",
                  activity.type === "call" && "bg-green-100 text-green-600",
                  activity.type === "message" && "bg-blue-100 text-blue-600",
                )}
              >
                {activity.type === "meeting" && <CalendarClock className="h-5 w-5" />}
                {activity.type === "call" && <Phone className="h-5 w-5" />}
                {activity.type === "message" && <MessageSquare className="h-5 w-5" />}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-base font-medium">{activity.title}</h4>
                <p className="text-sm font-medium text-muted-foreground">{activity.time}</p>
                <p className="text-sm">{activity.description}</p>
                {activity.location && <p className="text-xs text-muted-foreground">📍 {activity.location}</p>}
                {activity.contact && <p className="text-xs text-muted-foreground">👤 {activity.contact}</p>}
                {branch === "all" && <p className="text-xs font-medium text-digibayt-500">{activity.branch} Branch</p>}
              </div>
            </div>
            <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDetails(activity.id)
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

