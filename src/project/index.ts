export interface AirwayProject {
    name: string,
    path: string,
    measuring: {
        setups: AirwayMeasurementSetup[]
    }
}

export interface AirwayMeasurementSetup {
    name: string,
    description: string
}

export const DefaultAirwayProject = {
    measuring: {
        setups: []
    }
}