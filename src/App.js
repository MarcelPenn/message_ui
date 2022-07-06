import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useState, useEffect,useContext } from "react";
import { DataProvider, DataContext } from "./Utils"
import { DataManager } from "./Data"

function App() {
//   const context = useContext(DataContext);

//   console.log(context)
//   //  let threadData = DataContext;

//   // console.log(threadData)
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

//   async function getData() {
//     let dataObj = await axios.post('https://estuary.altinc.ca/threads', {
//         userId: 'cl1m8wqyr4917bqskm0z1mcxb',
//     })
//         .then((response) => {
//             console.log(response.data)
//             return response.data
//         }, (error) => {
//             return error;
//         });

//     return dataObj

// }


//   async function processData() {
//     let getThreadData = await getData()
//     console.log(getThreadData)
//     let tempArray = []
//     for (let item in getThreadData) {
//         tempArray[item] = getThreadData[item].party
//     }
//     setThreads(tempArray)
// }


useEffect(() => {
  console.log("test")
  // DataManager()
  // console.log(threads)
}, []);

  //  async function getData() {
  //   let dataObj = await axios.post('https://estuary.altinc.ca/threads', {
  //     userId: 'cl1m8wqyr4917bqskm0z1mcxb',
  //   })
  //     .then((response) => {
  //       console.log(response.data)
  //       return response.data
  //     }, (error) => {
  //       return error;
  //     });

  //   return dataObj

  // }

  // async function processData() {
  //   let threadData = await getData()
  //   console.log(threadData)
  //   let tempArray = []
  //   for (let item in threadData) {
  //     tempArray[item] = threadData[item].party
  //   }
  //   setThreadList(tempArray)
  //   threadData[item].party._count.body
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <DataProvider>
        <DataManager/>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" //</Box>spacing={2} justifyContent="space-between"
          >
            <Sidebar setMode={setMode} mode={mode} />
            <Feed />
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
