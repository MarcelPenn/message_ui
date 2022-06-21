import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");

  const [currentThread, setCurrentThread] = useState("");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar currentThread={currentThread} setCurrentThread={setCurrentThread} setMode={setMode} mode={mode}/>
          <Feed currentThread={currentThread} setCurrentThread={setCurrentThread} />
          <Rightbar currentThread={currentThread} setCurrentThread={setCurrentThread} />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default App;
