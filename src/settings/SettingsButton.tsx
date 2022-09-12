import Fab from "@mui/material/Fab";
import SettingsIcon from "@mui/icons-material/Settings"

function SettingsButton(props: { onClick: () => void }) {
    return (
        <Fab color="default" onClick={() => props.onClick()} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <SettingsIcon />
        </Fab>
    )
}

export default SettingsButton;
