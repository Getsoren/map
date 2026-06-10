import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Typography } from "@getsoren/design-system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { PropsGroup, PropsItem, propsData } from "sandbox/features/LandingPage/apiProps";

const fuzzyMatch = (text: string, query: string) => {
  if (!query) {
    return true;
  }
  const q = query.toLowerCase();
  return text.toLowerCase().includes(q);
};

const highlight = (text: string, query: string) => {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} style={{ backgroundColor: "#007AFF66", padding: "0 2px" }}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const ApiReference = () => {
  const [search, setSearch] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return propsData
      .map((group) => {
        if (selectedGroups.length > 0 && !selectedGroups.includes(group.group)) {
          return null;
        }

        const filteredItems = group.items
          .map((item) => {
            const matchesItem = fuzzyMatch(item.prop, search) || fuzzyMatch(item.type, search) || fuzzyMatch(item.description, search);

            // Check children too
            const filteredChildren = item.children?.filter(
              (child) => fuzzyMatch(child.prop, search) || fuzzyMatch(child.type, search) || fuzzyMatch(child.description, search),
            );

            if (!matchesItem && (!filteredChildren || filteredChildren.length === 0)) {
              return null;
            }

            return { ...item, children: filteredChildren?.length ? filteredChildren : item.children };
          })
          .filter(Boolean) as PropsItem[];

        if (filteredItems.length === 0) {
          return null;
        }
        return { ...group, items: filteredItems };
      })
      .filter(Boolean) as PropsGroup[];
  }, [search, selectedGroups]);

  const resetFilters = () => {
    setSearch("");
    setSelectedGroups([]);
  };

  return (
    <Box sx={{ mb: 12 }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        sx={{
          background: "linear-gradient(90deg,#007AFF,#00C6FF)",
          color: "transparent",
          textAlign: "center",
          WebkitBackgroundClip: "text",
        }}
      >
        API Reference
      </Typography>

      {/* Search + Filters */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField variant="outlined" placeholder="Search props…" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Group</InputLabel>
          <Select
            multiple
            value={selectedGroups}
            onChange={(e) => setSelectedGroups(e.target.value as string[])}
            renderValue={(selected) => (
              <Stack direction="row" spacing={1}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            )}
          >
            {propsData.map((g) => (
              <MenuItem key={g.group} value={g.group}>
                {g.group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(search || selectedGroups.length > 0) && (
          <Button onClick={resetFilters} variant="outlined" color="inherit">
            Reset
          </Button>
        )}
      </Stack>

      {/* Container */}
      <Paper
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(20, 20, 25, 0.45)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 4,
          boxShadow: "0 4px 25px rgba(0,0,0,0.25)",
          overflow: "hidden",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {filteredData.map(({ group, items }) => (
          <Box key={group}>
            <Typography variant="h6" fontWeight={700} sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)", opacity: 0.9, px: 3, py: 2 }}>
              {group}
            </Typography>

            {items.map((item) => (
              <Accordion
                key={item.prop}
                disableGutters
                sx={{
                  "&:before": { display: "none" },
                  "&:hover": { background: "rgba(13,17,23,0.85)" },
                  background: "rgba(13,17,23,0.6)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  color: "#e6edf3",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#00C6FF" }} />}>
                  <Typography fontWeight={600} sx={{ fontFamily: "monospace", fontSize: 15 }}>
                    {highlight(item.prop, search)}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    px: 3,
                    py: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "rgba(230,230,230,0.9)", lineHeight: 1.5, mb: 1.5 }}>
                    {highlight(item.description, search)}
                  </Typography>

                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 1.5 }} />

                  <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", fontFamily: "monospace" }}>
                    <b style={{ color: "#00C6FF" }}>Type:</b> {item.type}
                  </Typography>

                  <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", fontFamily: "monospace" }}>
                    <b style={{ color: "#00C6FF" }}>Default:</b> {item.default}
                  </Typography>

                  {/* Children (sub props) */}
                  {item.children && (
                    <Box mt={2}>
                      <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
                        Sub-properties
                      </Typography>

                      {item.children.map((child) => (
                        <Box
                          key={child.prop}
                          sx={{
                            borderLeft: "2px solid rgba(0,198,255,0.4)",
                            mb: 1.5,
                            pl: 2,
                          }}
                        >
                          <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                            {highlight(child.prop, search)}
                          </Typography>

                          <Typography variant="caption" sx={{ color: "rgba(230,230,230,0.8)", display: "block" }}>
                            {highlight(child.description, search)}
                          </Typography>

                          <Typography variant="caption" sx={{ color: "#9ca3af", display: "block" }}>
                            <b style={{ color: "#00C6FF" }}>Type:</b> {child.type}
                          </Typography>

                          <Typography variant="caption" sx={{ color: "#9ca3af", display: "block" }}>
                            <b style={{ color: "#00C6FF" }}>Default:</b> {child.default}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ApiReference;
