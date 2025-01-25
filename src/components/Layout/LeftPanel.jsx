import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useLocation } from "react-router-dom";
import { COLOR_VARIABLES } from "../../utils/defaults";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import styles from "../../styles/leftNavigation.module.css";

const NAV_ITEMS = [
  {
    id: 1,
    icon: <SpaceDashboardIcon sx={{ width: 20 }} />,
    text: "Home",
    navigate: "/dashboard",
  },
  {
    id: 2,
    icon: <AvTimerIcon sx={{ width: 20 }} />,
    text: "Tracker",
    navigate: "/tracker",
  },
  {
    id: 3,
    icon: <QueryStatsIcon sx={{ width: 20 }} />,
    text: "Stats",
    navigate: "/stats",
  },
  {
    id: 4,
    icon: <WorkHistoryIcon sx={{ width: 20 }} />,
    text: "History",
    navigate:
      "https://lifesherpa-my.sharepoint.com/:x:/g/personal/amantha_jayathilake_hapstar_app/EYnVPgNSeINEmbBgeCdg0NIB4dJq91kDyPM5hazWqIwNKw?e=an1E7L",
  },
];

const LeftPanel = () => {
  const location = useLocation(); // Get the current path

  const handleNavigation = (item) => {
    if (item.text === "History") {
      // Open in a new tab for "History"
      window.open(item.navigate, "_blank");
    } else {
      // Navigate in the same tab for others
      window.location.href = item.navigate;
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: (theme) => theme.zIndex.appBar - 1,
        "& .MuiDrawer-paper": {
          marginTop: "64px",
        },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100px",
          marginTop: "20px",
        }}
      >
        {NAV_ITEMS.map((it) => (
          <div
            button
            key={it.id}
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor:
                location.pathname === it.navigate
                  ? COLOR_VARIABLES.ZINGY_GREEN
                  : "inherit",
              borderRadius: 10,
              transition: "background-color 0.3s",
              width: "50px",
              height: "50px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleNavigation(it)}
            className={styles.navItem}
          >
            <div style={{ marginTop: "10px" }}>{it.icon}</div>
            <p style={{ marginTop: "-10px" }}>{it.text}</p>
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftPanel;
