import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './navigation/NavBar'
import ProjectNavigation from './navigation/ProjectNavigation'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BottomNavigation, Box, Container, styled } from '@mui/material';
import WelcomePage from './pages/welcome/WelcomePage';
import SegmentationPage from './pages/segmentation/SegmentationPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

enum NavigationPage {
  Welcome = "welcome",
  Segmentation = "segmentation",
  Modelling = "modelling",
  Measuring = "measuring"
}

function CurrentPage(props: { page: NavigationPage }) {
  switch(props.page){
    case NavigationPage.Welcome: return <WelcomePage />;
    case NavigationPage.Segmentation: return <SegmentationPage />;
    default: return <div>Error</div>;
  }
}

function App() {
  const [page, setPage] = useState<NavigationPage>(NavigationPage.Welcome);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box height='100vh' sx={{ bgcolor: 'black', color: 'white' }}>
        <CurrentPage page={page} />
        {page !== NavigationPage.Welcome && <ProjectNavigation />}
      </Box>
    </ThemeProvider>
  )

  /*return (
    <ThemeProvider theme={darkTheme}>
      <LayoutContainer>
      <ProjectNavigation />
      </LayoutContainer>
      
    </ThemeProvider>
      
  );*/
}

export default App;
