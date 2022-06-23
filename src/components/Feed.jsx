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



const Feed = ({ currentThread, setCurrentThread, mode, setMode }) => {

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
        self: threadData.unread_smss[item].self,
        avatar: '-',
      });
    }
    setThreadList(tempArray)
  }

  React.useEffect(() => {
    chatCtl.clearMessages()
    processData()
    chatCtl.setActionRequest(
      { type: 'text', always: true },
      (response) => {
        console.log(response.value);
      }
    );
  }, [currentThread]);



  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <MuiChat chatController={chatCtl} />
    </Box>
  );
};

export default Feed;
