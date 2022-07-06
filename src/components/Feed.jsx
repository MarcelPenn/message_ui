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

  const { currentThread, setState } = React.useContext(DataContext);

  const [chosenEmoji, setChosenEmoji] = React.useState(null);

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
  const [currentImage, setCurrentImage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openEmoji, setOpenEmoji] = React.useState(false);

  const [lastPickup, setLastPickup] = React.useState("");



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

  // // gets latest message in thread from server
  // async function getLatestData() {
  //   console.log(lastPickup)
  //   let dataObj = await axios.post('https://estuary.altinc.ca/messageThread', {
  //     userId: 'cl1m8wqyr4917bqskm0z1mcxb',
  //     partyId: currentThread,
  //     dateTime: lastPickup,
  //   })
  //     .then((response) => {
  //       console.log(response.data)
  //       return response.data
  //     }, (error) => {
  //       return error;
  //     });

  //   return dataObj

  // }

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
  // preps data for display
  async function processData() {
    let threadData = await getData()
    setLastPickup(threadData.date)
    // let tempArray = []
    for (let item in threadData.unread_smss) {
      try {
        var smsObj = JSON.parse(threadData.unread_smss[item].sms_text);
        var imgUrl = smsObj.attachments[0]["content-url"]
        var encKey = smsObj.attachments[0]["encryption-key"]
        var iid = imgUrl.split("/")[3]
        var imgEUrl = "https://estuary.altinc.ca:8443/twillio/" + iid + "/" + encKey
        console.log("https://estuary.altinc.ca:8443/twillio/" + iid + "/" + encKey + "")
        chatCtl.addMessage({
          type: 'jsx',
          // content: "",
          content: <img src={imgEUrl} width={200} onClick={(e) => handleImageClick(e.target.src)} />,
          self: threadData.unread_smss[item].self,
          avatar: '-',
        });

      } catch {
        console.log()
        chatCtl.addMessage({
          type: 'text',
          content: threadData.unread_smss[item].sms_text,
          self: threadData.unread_smss[item].self,
          avatar: '-',
        });
      }
      // tempArray[item] = threadData.unread_smss[item].sms_text

    }

    // setThreadList(tempArray)
  }


  // // preps data for display
  // async function processLatestData() {
  //   let threadData = await getLatestData()
  //     console.log(threadData.date)
  //     setLastPickup(threadData.date)

  //   let tempArray = []
  //   for (let item in threadData.unread_smss) {
  //     console.log()
  //     // tempArray[item] = threadData.unread_smss[item].sms_text
  //     chatCtl.addMessage({
  //       type: 'text',
  //       content: threadData.unread_smss[item].sms_text,
  //       self: threadData.unread_smss[item].self,
  //       avatar: '-',
  //     });
  //     // setLastPickup()
  //   }
  //   setThreadList(tempArray)
  // }

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
    processData()
    chatCtl.setActionRequest(
      { type: 'text', always: true },
      (response) => {
        // console.log(response.value);
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
    <Box //flex={2}
    sx={{ justifyContent: { md: "flex-start"} }}
    >
      <MuiChat chatController={chatCtl} />
      {/* <Button onClick={setOpenEmoji(true)}>Emoji</Button> */}
      <Button variant="contained"   onClick={() => { setOpenEmoji(true);}} >Emoji</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: 2}}
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
  );
};

export default Feed;
