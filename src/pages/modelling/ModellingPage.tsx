import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PageProps } from "../common";

interface ModellingPageProps extends PageProps {
  
}

function ModellingPage(props: ModellingPageProps) {
    return (
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: '20px', width: '310px', height: '100px' }}>
        <Typography variant="h6" align="center">Modelling is not yet available</Typography>
        <Typography style={{ marginTop: '10px'}} variant="subtitle1" lineHeight="18px" align="center">Please check back with an updated version of UAM Workbench.</Typography>
      </Paper>
    </div>
    )
  }
  
  export default ModellingPage;
  