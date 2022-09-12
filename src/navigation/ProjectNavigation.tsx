import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LayersIcon from "@mui/icons-material/Layers";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useState } from "react";
import Box from "@mui/material/Box";

export enum NavigationPage {
    Welcome = "welcome",
    Segmentation = "segmentation",
    Modelling = "modelling",
    Measuring = "measuring"
}

interface ProjectNavigationProps {
    onNav: (page: NavigationPage) => void
}

function ProjectNavigation(props: ProjectNavigationProps) {
    const [value, setValue] = useState(NavigationPage.Segmentation);

    return (
        <Box style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    props.onNav(newValue);
                }}
            >
                <BottomNavigationAction label="Segmentation" value={NavigationPage.Segmentation} icon={<LayersIcon />} />
                <BottomNavigationAction label="Modelling" value={NavigationPage.Modelling} icon={<ViewInArIcon />} />
                <BottomNavigationAction label="Measuring" value={NavigationPage.Measuring} icon={<TimelineIcon />} />
            </BottomNavigation>
        </Box>
    );
}

export default ProjectNavigation;
