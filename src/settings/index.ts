export interface WorkbenchSettings {
    appPaths: {
        slicer: string,
        blender: string,
        scad: string
    },
    mqtt: {
        useInternal: boolean,
        url: string
    }
}

export const DefaultWorkbenchSettings: WorkbenchSettings = {
    appPaths: {
        slicer: '',
        blender: '',
        scad: ''
    },
    mqtt: {
        useInternal: true,
        url: 'mqtt://localhost:1833'
    }

}