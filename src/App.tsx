import React, { useEffect, useState } from 'react';
import './App.css';
import ProjectNavigation, { NavigationPage } from './navigation/ProjectNavigation'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import WelcomePage from './pages/welcome/WelcomePage';
import SegmentationPage from './pages/segmentation/SegmentationPage';
import { AirwayProject } from './project';
import SettingsDialog from './settings/SettingsDialog';
import SettingsButton from './settings/SettingsButton';
import ModellingPage from './pages/modelling/ModellingPage';
import MeasuringPage from './pages/measuring/MeasuringPage';
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#00649c"
    }
  },
  
});

invoke('get_settings').then((message) => console.log(message))

function App() {
  const [page, setPage] = useState<NavigationPage>(NavigationPage.Welcome);
  const [project, setProject] = useState<AirwayProject | null>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if(!project) appWindow.setTitle("UAM Workbench");
    else appWindow.setTitle(`UAM Workbench - ${project?.name}`);
  }, [project]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box height='100vh' sx={{ bgcolor: 'black', color: 'white' }}>
        {page === NavigationPage.Welcome && <WelcomePage onProject={prj => { setProject(prj); setPage(NavigationPage.Segmentation); }} />}

        {page === NavigationPage.Segmentation && <SegmentationPage project={project as AirwayProject} />}
        {page === NavigationPage.Modelling    && <ModellingPage project={project as AirwayProject} />}
        {page === NavigationPage.Measuring    && <MeasuringPage project={project as AirwayProject} />}

        {page !== NavigationPage.Welcome && <ProjectNavigation onNav={pg => setPage(pg)} />}
      </Box>
      <SettingsButton onClick={() => setSettingsOpen(true)} />
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
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
