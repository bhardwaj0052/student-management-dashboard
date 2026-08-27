import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export interface EventData {
  id: string | number;
  eventName: string;
  details: string;
  date: string;
  time: string;
  location: string;
}

export interface EventCardProps {
  event: EventData;
  onEdit?: (id: EventData["id"]) => void;
  onDelete?: (id: EventData["id"]) => void;
  readOnly?: boolean;
}

export default function EventCard({ event, onEdit, onDelete, readOnly = false }: EventCardProps) {
  const { id, eventName, details, date, time, location } = event;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid",
        borderColor: "grey.200",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1.5,
          "&:last-child": { pb: 2.5 },
        }}
      >
        {/* Header: name + actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            {eventName}
          </Typography>

          {!readOnly && (
            <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => onEdit?.(id)} sx={{ color: "primary.main", "&:hover": { bgcolor: "primary.light" } }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => onDelete?.(id)} sx={{ color: "error.main", "&:hover": { bgcolor: "error.light" } }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* Details */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {details}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, minWidth: 0 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: "error.main", flexShrink: 0, mt: 0.15 }} />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", overflowWrap: "anywhere" }}
          >
            {location || "Location not added"}
          </Typography>
        </Box>

        {/* Date + Time */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
          <Chip
            icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
            label={date}
            size="small"
            sx={{
              bgcolor: "primary.50",
              color: "primary.dark",
              fontWeight: 500,
              "& .MuiChip-icon": { color: "primary.main" },
            }}
          />
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
            label={time}
            size="small"
            sx={{
              bgcolor: "grey.100",
              color: "text.secondary",
              fontWeight: 500,
              "& .MuiChip-icon": { color: "text.secondary" },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}