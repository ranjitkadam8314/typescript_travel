import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Place";

import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import frontendRoutes from "../../shared/routes/frontendRoutes";

const Link = styled(NavLink)({
  textDecoration: "none",
  marginRight: 8,
  color: "#fff",
});

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Topper Destinations
          </Typography>
          {Array.isArray(frontendRoutes) &&
            frontendRoutes
              ?.filter(({ showInMenu }) => showInMenu)
              .map(({ path, label }, i) => (
                <Link
                  key={path + i}
                  to={path}
                  style={({ isActive }) => ({
                    color: isActive ? "#999" : "#fff",
                  })}
                >
                  {label}
                </Link>
              ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
