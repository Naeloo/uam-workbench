import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AirwayProject, DefaultAirwayProject } from "../../project";
import { open } from '@tauri-apps/api/dialog';
import Grid from "@mui/material/Grid";

function ProjectCreateDialog(props: { open: boolean; onClose: () => void, onProject: (prj: AirwayProject) => void; }) {
    const [project, setProject] = React.useState<AirwayProject>(DefaultAirwayProject);

    React.useEffect(() => { }, [project]);

    const selectProjectFolder =  async () => {
        const folder = await open({
            directory: true
        });
        if(typeof(folder) === "string") setProject({...project, path: folder});
    }

    return (
        <div>
            <Dialog open={props.open} onClose={() => props.onClose()}>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new project. A new folder will be created in the selected
                        folder, based on the project name.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" onClick={() => selectProjectFolder()}>Select folder</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="path"
                            label="Folder"
                            type="text"
                            disabled
                            fullWidth
                            variant="standard"
                            value={project.path}
                        />
                        </Grid>
                    </Grid>
                    

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose()}>Cancel</Button>
                    <Button onClick={() => props.onProject(project)}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProjectCreateDialog;
