"use client";

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { EventData } from "./eventCard";

export type EventFormData = Omit<EventData, "id">;

interface EventFormProps {
  event?: EventData;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
}

export default function EventForm({
  event,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: "",
    details: "",
    date: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(
      event
        ? {
            eventName: event.eventName ?? "",
            details: event.details ?? "",
            date: event.date ?? "",
            time: event.time ?? "",
            location: event.location ?? "",
          }
        : { eventName: "", details: "", date: "", time: "", location: "" },
    );
  }, [event]);

  const updateField = (field: keyof EventFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <form
      onSubmit={(submitEvent) => {
        submitEvent.preventDefault();
        onSubmit(formData);
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">
          {event ? "Edit event" : "Add event"}
        </Typography>

        <TextField
          label="Event name"
          value={formData.eventName}
          onChange={(e) => updateField("eventName", e.target.value)}
          required
        />

        <TextField
          label="Details"
          value={formData.details}
          onChange={(e) => updateField("details", e.target.value)}
          multiline
          minRows={2}
          required
        />

        <TextField
          label="Location / address"
          placeholder="Enter event address"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          required
          fullWidth
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => updateField("time", e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
            sx={{ flex: 1 }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button type="submit" variant="contained">
            {event ? "Save" : "Add event"}
          </Button>
          {event && (
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}