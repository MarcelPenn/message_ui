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
import React, { Component } from "react";
import axios from "axios";


export function Threads() {
  const [threadList, setThreadList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);


  async function getData() {
    let dataObj = await axios.post('https://estuary.altinc.ca/threads', {
      userId: 'cl4e8hknd12699bqsknbibi8hm',
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      }, (error) => {
        return error;
      });

    return dataObj

  }

  async function processData() {
    let threadData = await getData()
    let tempArray = []
    for (let item in threadData) {
      tempArray[item] = threadData[item].party
    }
    setThreadList(tempArray)
  }

  React.useEffect(() => {
    processData()
  }, [update]);

  return (
    <List>
      {threadList.map(listitem => (
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <PhoneAndroidOutlined />
            </ListItemIcon>
            <ListItemText primary={listitem} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
};


export default Threads;
