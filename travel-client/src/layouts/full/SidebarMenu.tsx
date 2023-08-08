import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import adminRoutes from "../../shared/routes/adminRoutes";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAuth } from "../../app/slices/authSlice";

const Link = styled(NavLink)({
  textDecoration: "none",
});
interface ISidebarMenuProps {
  open: boolean;
}

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = ({ open }) => {
  const loggedUser = useSelector(selectAuth);

  return (
    <>
      <List>
        {Array.isArray(adminRoutes) &&
          adminRoutes

            .filter(
              ({ showMenu, roles }) =>
                showMenu && roles?.includes(loggedUser?.role as string)
            )
            .map(({ label, path, icon }, index) => (
              <ListItem
                key={label + path}
                disablePadding
                sx={{ display: "block" }}
              >
                <Link
                  to={`/secured/${path}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#999" : "#000",
                  })}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial " : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
      </List>
    </>
  );
};

export default SidebarMenu;
