import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LayersIcon from "@mui/icons-material/Layers";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useState } from "react";
import Box from "@mui/material/Box";

function ProjectNavigation() {
    const [value, setValue] = useState(0);

    return (
        <Box style={{ position: 'absolute', bottom: 0, width: '100%'}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Segmentation" icon={<LayersIcon />} />
                <BottomNavigationAction label="Modelling" icon={<ViewInArIcon />} />
                <BottomNavigationAction label="Measuring" icon={<TimelineIcon />} />
            </BottomNavigation>
        </Box>
    );
}

export default ProjectNavigation;
