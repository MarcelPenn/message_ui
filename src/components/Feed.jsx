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

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});



export function Feed() {

  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );

  React.useMemo(() => {

    //  chatCtl.addMessage({
    //   type: 'text',
    //   content: `You have selected struggle.`,
    //   self: false,
    //   avatar: '-',
    // });

    const text = chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });


    // echo(chatCtl);
  }, [chatCtl]);



  const [threadList, setThreadList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);


  async function getData() {
    let dataObj = await axios.post('https://estuary.altinc.ca/messageThread', {
      userId: 'cl4e8hknd12699bqsknbibi8hm',
      partyId: "+17096902975",
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
    console.log()
    for (let item in threadData.unread_smss) {
      console.log()
      // tempArray[item] = threadData.unread_smss[item].sms_text
      chatCtl.addMessage({
        type: 'text',
        content: threadData.unread_smss[item].sms_text,
        self: false,
        avatar: '-',
      });
    }
    setThreadList(tempArray)
  }

  React.useEffect(() => {
    processData()
  }, [update]);



  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <MuiChat chatController={chatCtl} />
      {/* 
        <>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </> */}

    </Box>
  );
};

export default Feed;
