import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/topNavigation.module.css";
import { COLOR_VARIABLES } from "../../utils/defaults";

const TopNavigation = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: COLOR_VARIABLES.BLACK,
      }}
    >
      <Toolbar className={styles.topNavigation}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Time Tracker
        </Typography>
        <div className={styles.userSection}>
          {parsedUser ? (
            <>
              <Avatar
                className={styles.avatar}
                src={parsedUser.profilePicture}
                alt={parsedUser.firstName}
              />
              <Button className={styles.button} onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              className={styles.button}
              href="/login" /* Add a login route */
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;
