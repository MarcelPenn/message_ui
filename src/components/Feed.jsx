import Post from "./Post";
import {
  Box,
  TextField,
  Button,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
  Backdrop,
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
// import StartIcon from '@material-ui/icons/StartIcon';
import { DataContext } from "../Utils"
import Picker from 'emoji-picker-react';


const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});



const Feed = ({ mode, setMode }) => {

  const { currentThread, lastUpdate, setState } = React.useContext(DataContext);

  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const [threadList, setThreadList] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openEmoji, setOpenEmoji] = React.useState(false);
  const [refreshInterval, setRefreshInterval] = React.useState(1000);
  const [runUpdate, setRunUpdate] = React.useState(false);


  const [chatInput, setChatInput] = React.useState('');


  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji)
    sendEmoji(currentThread, emojiObject.emoji, 'cl1m8wqyr4917bqskm0z1mcxb')
    setChosenEmoji(emojiObject);
    setOpenEmoji(false)
  };


  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );

  // gets entire message thread from server
  async function getData() {
    let dataObj = await axios.post('https://estuary.altinc.ca/messageThread', {
      userId: 'cl1m8wqyr4917bqskm0z1mcxb',
      partyId: currentThread,
      last_id: lastUpdate,
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
  async function checkUpdate() {
    let threadData = await getData()
    let lastItem = threadData.unread_smss[Object.keys(threadData.unread_smss)[Object.keys(threadData.unread_smss).length - 1]]
    if (lastItem !== undefined && lastItem.sms_id !== lastUpdate) {
      setState({ lastUpdate: lastItem.sms_id })
      setThreadList(threadData)
      setRunUpdate(prevCheck => !prevCheck)
    }
  }


  //
  function GoodInput() {
    // actionRequest: ActionRequest;

    const setResponse = React.useCallback(() => {
      const res = { type: 'custom', value: 'Good!' };
      chatCtl.setActionResponse(ActionRequest, res);
    }, [ActionRequest, chatCtl]);

    return (
      <div>
        <TextField id="outlined-basic" variant="outlined" onChange={e => handleInputChange(e)}/>
        <Button
          type="button"
          onClick={e => sendMessage(currentThread, chatInput, 'cl1m8wqyr4917bqskm0z1mcxb')}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </div>
    );
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
        setState({ lastUpdate: response.data.id })
        return response.data
      }, (error) => {
        return error;
      });

    return dataObj

  }

  async function sendEmoji(to, body, userId) {
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


    chatCtl.addMessage({
      type: 'text',
      content: body,
      self: true,
      avatar: '-',
    });

    return dataObj

  }

  React.useEffect(() => {
    chatCtl.clearMessages()
    checkUpdate()
    chatCtl.setActionRequest(
      // { type: 'text', always: true },
      {
        type: 'custom',
        Component: GoodInput,
      },
      (response) => {
        // console.log(response.value);
        sendMessage(currentThread, response.value, 'cl1m8wqyr4917bqskm0z1mcxb')
      }
    );
  }, [currentThread]);


  React.useEffect(() => {
    checkUpdate()
    console.log(chatInput)
  }, [runUpdate]);


  React.useEffect(() => {
    for (let item in threadList.unread_smss) {
      try {
        var smsObj = JSON.parse(threadList.unread_smss[item].sms_text);
        var imgUrl = smsObj.attachments[0]["content-url"]
        var encKey = smsObj.attachments[0]["encryption-key"]
        var iid = imgUrl.split("/")[3]
        var imgEUrl = "https://estuary.altinc.ca:8443/twillio/" + iid + "/" + encKey
        console.log("https://estuary.altinc.ca:8443/twillio/" + iid + "/" + encKey + "")
        chatCtl.addMessage({
          type: 'jsx',
          // content: "",
          content: <img src={imgEUrl} width={200} onClick={(e) => handleImageClick(e.target.src)} />,
          self: threadList.unread_smss[item].self,
          avatar: '-',
        });

      } catch {
        console.log()
        chatCtl.addMessage({
          type: 'text',
          content: threadList.unread_smss[item].sms_text,
          self: threadList.unread_smss[item].self,
          avatar: '-',
        });
      }
    }

  }, [threadList]);


  function triggerUpdate() {
    setRunUpdate(prevCheck => !prevCheck)
    // window.scrollTo(0, document.body.scrollHeight);

  }
  //refresh timer 

  React.useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(triggerUpdate, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);





  // event handlers 

  function handleImageClick(url) {
    setCurrentImage(url)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleEmojiClose() {
    setOpenEmoji(false)
  }

  function handleInputChange(e) {
    // setOpenEmoji(false)
    console.log(e.target.value)
    setChatInput(e.target.value)
  }
  return (
    // <Box //flex={2}
    //   sx={{ justifyContent: { md: "flex-start" } }}
    // >
    //   <MuiChat chatController={chatCtl} />
    //   {/* <Button onClick={setOpenEmoji(true)}>Emoji</Button> */}

    // </Box>
    <Box sx={{ height: '100%', backgroundColor: 'gray' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight - 130,
          maxWidth: '640px',
          marginLeft: 'auto',
          marginRight: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {/* <Typography sx={{ p: 1 }}>
        Welcome to{' '}
        <Link href="https://github.com/twihike/chat-ui-react">
          chat-ui-react
        </Link>{' '}
        demo site.
      </Typography> */}
        <Divider />
        <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
          <MuiChat chatController={chatCtl} />
          <Button variant="contained" onClick={() => { setOpenEmoji(true); }} >Emoji</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: 2 }}
            open={openEmoji}
            onClick={handleEmojiClose}
          >
            <Picker open={false} onEmojiClick={onEmojiClick} />
          </Backdrop>
          <Backdrop
            sx={{ color: '#fff', zIndex: 2 }}
            open={open}
            onClick={handleClose}
          >
            <img src={currentImage} height="83%" />
          </Backdrop>
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
