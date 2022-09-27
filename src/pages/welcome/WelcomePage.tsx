import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddBoxIcon from '@mui/icons-material/AddBox'
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AirwayProject, DefaultAirwayProject } from "../../project";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";
import * as dialog from '@tauri-apps/api/dialog';
import { loadProject } from "../../project/commands";

interface WelcomePageProps {
  onProject: (project: AirwayProject) => void
}

function WelcomePage(props: WelcomePageProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const onProjectLoad = async () => {
    // Make the user select a folder
    const folder = await dialog.open({
        directory: true
    });
    if(typeof(folder) !== "string") return;
    // Attempt to load the project from it
    try{
      const loadedProject = await loadProject(folder);
      props.onProject(loadedProject);
    }catch(e) {
      dialog.message(e as string, { type: 'error' });
    }
    
  }

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to UAM Workbench!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '30px' }}>
        <Button color="primary" variant="contained" onClick={() => setCreateOpen(true)} endIcon={<AddBoxIcon />}>
          New Project
        </Button>
        <Button color="primary" variant="contained" onClick={() => onProjectLoad()} endIcon={<AddBoxIcon />}>
          Load Project
        </Button>
      </div>
      <Paper style={{ padding: '20px', width: '310px' }}>
        <h3 style={{ margin: 0 }}>Recent Projects</h3>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </Paper>
      <ProjectCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onProject={prj => props.onProject(prj)} />
    </div>
  )
}

export default WelcomePage;
