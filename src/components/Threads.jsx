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
  Badge,
} from "@mui/material";
import React, { Component } from "react";
// import axios from "axios";
import { DataContext } from "../Utils"


const Threads = ({ }) => {


  // const [, setThreadList] = React.useState([]);

  // const [update, setUpdate] = React.useState(false);
  const { threads, setState } = React.useContext(DataContext);

  // let threadData = DataContext;
  // let threadList = threadData.threadList
  // let currentThread = threadData.currentThread

 
  function changeThread(threaditem) {
    setState({currentThread: threaditem})
  }

  console.log(threads)

  return (
    <List>
      {threads.map(listitem => (
        <ListItem disablePadding >
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Badge badgeContent={listitem.new} color="error">
                <PhoneAndroidOutlined />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={listitem.label} onClick={(e) => changeThread(listitem.label)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
};


export default Threads;
