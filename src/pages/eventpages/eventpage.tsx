/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventForm, { EventFormData } from "@/src/components/eventform/eventForm";
import EventCard from "@/src/components/eventform/eventCard";
import { EventData } from "@/src/components/eventform/eventCard";
import { createEvent, deleteEvent, getEvents, updateEvent } from "@/src/services/eventService";
import Sidebar from "@/src/components/sidebar/sidebar";
import { useAuth } from "@/src/context/AuthContext";
import DeleteDialog from "@/src/components/dialogBox/dialogBox";

export default function EventPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventData | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventData | null>(null);
  const { admin } = useAuth();
  const isStudent = admin?.role === "student";

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleAddEvent = (data: EventFormData) => {
    if (editingEvent) {
      const updatedEvent = updateEvent(editingEvent.id, data);
      setEvents((prev) => prev.map((event) => event.id === updatedEvent.id ? updatedEvent : event));
      setEditingEvent(undefined);
      setIsFormOpen(false);
      return;
    }
    const newEvent = createEvent(data);
    setEvents((prev) => [...prev, newEvent]);
    setIsFormOpen(false);
  };

  const handleEdit = (id: EventData["id"]) => {
    setEditingEvent(events.find((event) => event.id === id));
    setIsFormOpen(true);
  };

  const handleDelete = (id: EventData["id"]) => {
    const event = events.find((currentEvent) => currentEvent.id === id);
    if (event) setEventToDelete(event);
  };

  const confirmDelete = () => {
    if (!eventToDelete) return;
    deleteEvent(eventToDelete.id);
    setEvents((prev) => prev.filter((event) => event.id !== eventToDelete.id));
    setEventToDelete(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "calc(100% - 240px)", sm: "calc(100% - 240px)" },
          minWidth: 0,
          boxSizing: "border-box",
          mt: { xs: "56px", sm: "64px" },
          p: 3,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Events
            </Typography>
            {!isStudent && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditingEvent(undefined);
                  setIsFormOpen(true);
                }}
              >
                Add event
              </Button>
            )}
          </Box>

          {!isStudent && (
            <Dialog
              open={isFormOpen}
              onClose={() => {
                setIsFormOpen(false);
                setEditingEvent(undefined);
              }}
              fullWidth
              maxWidth="sm"
            >
              <DialogContent sx={{ pt: 3 }}>
                <EventForm
                  event={editingEvent}
                  onSubmit={handleAddEvent}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingEvent(undefined);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2.5,
              width: "100%",
              minWidth: 0,
            }}
          >
            {events.map((event) => (
              <Box key={event.id} sx={{ minWidth: 0 }}>
                <EventCard
                  event={event}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  readOnly={isStudent}
                />
              </Box>
            ))}
          </Box>

          {eventToDelete && (
            <DeleteDialog
              itemName={eventToDelete.eventName}
              onDelete={confirmDelete}
              onCancel={() => setEventToDelete(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}