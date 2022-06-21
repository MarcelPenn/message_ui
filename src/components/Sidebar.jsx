import {
  ModeNight,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";

const Sidebar = ({mode,setMode}) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={200}>
         <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="7091234567"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="7097654321" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="5141234567" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="5147654321"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="7801234567" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="7807654321" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <PhoneAndroidOutlined />
              </ListItemIcon>
              <ListItemText primary="6021234567" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
              <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
  </List> 
      </Box>
    </Box>
  );
};

export default Sidebar;
