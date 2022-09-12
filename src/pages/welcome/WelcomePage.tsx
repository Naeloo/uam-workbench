import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddBoxIcon from '@mui/icons-material/AddBox'
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function WelcomePage() {
  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Workbench!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '30px' }}>
        <Button variant="contained" endIcon={<AddBoxIcon />}>
          New Project
        </Button>
        <Button variant="contained" endIcon={<AddBoxIcon />}>
          Load Project
        </Button>
      </div>
      <Paper style={{ padding: '20px' }}>
        <h3 style={{ margin: 0 }}>Recent Projects</h3>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </Paper>
    </div>
  )
}

export default WelcomePage;
