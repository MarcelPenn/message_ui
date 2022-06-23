import Post from "./Post";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import {
  ActionRequest,
  AudioActionResponse,
  ChatController,
  FileActionResponse,
  MuiChat,
} from 'chat-ui-react';
import React from 'react';
import axios from 'axios';

import { DataContext } from "../Utils"


const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});



const Feed = ({ mode, setMode }) => {

  const { currentThread, setState } = React.useContext(DataContext);


  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );

  // React.useMemo(() => {

  //   //  chatCtl.addMessage({
  //   //   type: 'text',
  //   //   content: `You have selected struggle.`,
  //   //   self: false,
  //   //   avatar: '-',
  //   // });

  //   const text = chatCtl.setActionRequest({
  //     type: 'text',
  //     placeholder: 'Please enter something',
  //   });


  //   // echo(chatCtl);
  // }, [chatCtl]);



  const [threadList, setThreadList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const [lastPickup, setLastPickup] = React.useState("");

  const [refreshInterval, setRefreshInterval] = React.useState(1000);


  // gets entire message thread from server
  async function getData() {
    let dataObj = await axios.post('https://estuary.altinc.ca/messageThread', {
      userId: 'cl1m8wqyr4917bqskm0z1mcxb',
      partyId: currentThread,
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      }, (error) => {
        return error;
      });

    return dataObj

  }

  // gets latest message in thread from server
  async function getLatestData() {
    console.log(lastPickup)
    let dataObj = await axios.post('https://estuary.altinc.ca/messageThread', {
      userId: 'cl1m8wqyr4917bqskm0z1mcxb',
      partyId: currentThread,
      dateTime: lastPickup,
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      }, (error) => {
        return error;
      });

    return dataObj

  }


  // preps data for display
  async function processData() {
    let threadData = await getData()
    setLastPickup(threadData.date)
    let tempArray = []
    for (let item in threadData.unread_smss) {
      console.log()
      // tempArray[item] = threadData.unread_smss[item].sms_text
      chatCtl.addMessage({
        type: 'text',
        content: threadData.unread_smss[item].sms_text,
        self: threadData.unread_smss[item].self,
        avatar: '-',
      });
    }
    setThreadList(tempArray)
  }


    // preps data for display
    async function processLatestData() {
      let threadData = await getLatestData()
        console.log(threadData.date)
        setLastPickup(threadData.date)

      let tempArray = []
      for (let item in threadData.unread_smss) {
        console.log()
        // tempArray[item] = threadData.unread_smss[item].sms_text
        chatCtl.addMessage({
          type: 'text',
          content: threadData.unread_smss[item].sms_text,
          self: threadData.unread_smss[item].self,
          avatar: '-',
        });
        // setLastPickup()
      }
      setThreadList(tempArray)
    }

  // sends new message to server
  async function sendMessage(to, body, userId) {
    let dataObj = await axios.post('https://estuary.altinc.ca/sendMessage', {
      userId: userId,
      to: to,
      contentType: "text/plain",
      body: body
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      }, (error) => {
        return error;
      });

    return dataObj

  }

  React.useEffect(() => {
    chatCtl.clearMessages()
    processData()
    chatCtl.setActionRequest(
      { type: 'text', always: true },
      (response) => {
        console.log(response.value);
        sendMessage(currentThread, response.value, 'cl1m8wqyr4917bqskm0z1mcxb')
      }
    );
  }, [currentThread]);

  // const fetchMetrics = () => {
  //   // processLatestData()
  // }

  // React.useEffect(() => {
  //   if (refreshInterval && refreshInterval > 0) {
  //     const interval = setInterval(fetchMetrics, refreshInterval);
  //     return () => clearInterval(interval);
  //   }
  // }, [refreshInterval]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <MuiChat chatController={chatCtl} />
    </Box>
  );
};

export default Feed;
