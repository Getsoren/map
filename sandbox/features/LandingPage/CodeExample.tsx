import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Paper, Stack, Tooltip, Typography } from "@getsoren/design-system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PrismTheme } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import { useState } from "react";
import { MapView } from "@/main";

const dracula: PrismTheme = {
  plain: { backgroundColor: "transparent", color: "#e6edf3" },
  styles: [],
};

const code = `import { MapView } from "@getsoren/map";

<MapView
  center={[2.3522, 48.8566]}
  zoom={10}
  markers={[
    { id: "paris", lat: 48.8566, lng: 2.3522, Tooltip: <div>Hello Paris!</div> },
  ]}
  fitBounds
/>`;

const CodeExample = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ mb: 12 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={5}
        sx={{
          background: "linear-gradient(90deg,#007AFF,#00C6FF)",
          color: "transparent",
          textAlign: "center",
          WebkitBackgroundClip: "text",
        }}
      >
        Code Example
      </Typography>

      <Paper
        sx={{
          "&:hover": {
            borderColor: "rgba(0,198,255,0.25)",
            boxShadow: "0 6px 25px rgba(0,198,255,0.15)",
          },
          backdropFilter: "blur(10px)",
          background: "rgba(20, 20, 25, 0.45)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 4,
          boxShadow: "0 4px 25px rgba(0,0,0,0.25)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* === Demo === */}
        <Box sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <MapView
            center={[2.3522, 48.8566]}
            zoom={10}
            markers={[
              {
                id: "paris",
                lat: 48.8566,
                lng: 2.3522,
                Tooltip: <Paper sx={{ p: 1 }}>Hello Paris 👋</Paper>,
              },
            ]}
            fitBounds
          />
        </Box>

        {/* === Collapsible code block === */}
        <Accordion
          disableGutters
          sx={{
            "&:before": { display: "none" },
            background: "rgba(13,17,23,0.8)",
            color: "#e6edf3",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#00C6FF" }} />}
            sx={{
              "& .MuiAccordionSummary-content": { margin: 0 },
              "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
              backgroundColor: "rgba(22,27,34,0.9)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              px: 2,
              py: 1,
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="caption" sx={{ color: "#8b949e", fontFamily: "monospace" }}>
                Show code
              </Typography>

              <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                <IconButton
                  component="div"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleCopy();
                  }}
                  size="small"
                  sx={{
                    "&:hover": { color: "#00C6FF" },
                    color: copied ? "#00C6FF" : "#8b949e",
                    transition: "color 0.2s ease",
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <Box sx={{ fontFamily: "monospace", p: 3 }}>
              <Highlight code={code} language="tsx" theme={dracula}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={className}
                    style={{
                      ...style,
                      background: "transparent",
                      fontSize: 14,
                      lineHeight: 1.6,
                      margin: 0,
                      overflowX: "auto",
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
};

export default CodeExample;
