import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PageProps } from "../common";

interface MeasuringPageProps extends PageProps {

}

function MeasuringPage(props: MeasuringPageProps) {
    return (
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper style={{ padding: '20px', width: '310px', height: '100px' }}>
        <Typography variant="h6" align="center">Measuring is not yet available</Typography>
        <Typography style={{ marginTop: '10px'}} variant="subtitle1" lineHeight="18px" align="center">Please check back with an updated version of UAM Workbench.</Typography>
      </Paper>
    </div>
    )
  }
  
  export default MeasuringPage;
  