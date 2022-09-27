import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AirwayProject, DefaultAirwayProject } from "../../project";
import * as dialog from '@tauri-apps/api/dialog';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { path } from "@tauri-apps/api";
import { createProject } from "../../project/commands";

function ProjectCreateDialog(props: { open: boolean; onClose: () => void, onProject: (prj: AirwayProject) => void; }) {
    const [projectPaths, setProjectPaths] = React.useState<{ basePath: string, projectPath: string }>({ basePath: '', projectPath: ''});
    const [project, setProject] = React.useState<Partial<AirwayProject>>(DefaultAirwayProject);

    // ===== PROJECT PATH STUFF =====
    const folderize = (str: string) => str.toLowerCase().replace(/ /g, '-');
    React.useEffect(() => {
        path.join(projectPaths.basePath, project.name ? folderize(project.name) : '').then(newPath => {
            setProjectPaths({
                ...projectPaths,
                projectPath: newPath
            })
        })
    }, [project.name, projectPaths.basePath]);
    const selectBasePath =  async () => {
        const folder = await dialog.open({
            directory: true
        });
        if(typeof(folder) === "string") setProjectPaths({ ...projectPaths, basePath: folder });
    }

    // ==== CALLBACKS ===
    const onProjectCreate = async () => {
        const createdProject = await createProject(project as AirwayProject, projectPaths.projectPath);
        props.onProject(createdProject);
    }

    // ==== OTHER FORM STUFF =======
    const isCreateable = () => projectPaths.basePath && project.name;

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
                            value={project.name}
                            onChange={e => setProject({ ...project, name: (e.target as HTMLInputElement).value })}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="path"
                            label="Path"
                            type="text"
                            value={ projectPaths.basePath === '' ? "<Click to select path>" : projectPaths.projectPath }
                            fullWidth
                            variant="standard"
                            disabled
                            onClick={() => selectBasePath()}
                            inputProps={{ style: { cursor: 'pointer' }}}
                        />
                        </Grid>
                    </Grid>
                    

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose()}>Cancel</Button>
                    <Button onClick={() => onProjectCreate()} disabled={!isCreateable()}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProjectCreateDialog;
