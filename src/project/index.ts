export interface AirwayProject {
    name: string,
    measuring: {
        setups: AirwayMeasurementSetup[]
    }
}

export interface AirwayMeasurementSetup {
    name: string,
    description: string
}

export const DefaultAirwayProject: Partial<AirwayProject> = {
    name: 'New Project',
    measuring: {
        setups: []
    }
}