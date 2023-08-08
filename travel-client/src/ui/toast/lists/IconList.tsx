import * as React from "react";
import Container from "@mui/material/Container";
import PlaceIcon from "@mui/icons-material/Place";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface Item {
  label: string;
  icon: any;
}

interface IIconListProps {
  items: Item[];
  onChange: Function;
}

const IconList: React.FunctionComponent<IIconListProps> = ({
  items,
  onChange,
}) => {
  return (
    <Container>
      <List>
        <ListItem disablePadding onClick={() => onChange("all")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"All Categories"} />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        {Array.isArray(items) &&
          items.map((item, i) => (
            <ListItem
              disablePadding
              key={i}
              onClick={() => onChange(item.label)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default IconList;
