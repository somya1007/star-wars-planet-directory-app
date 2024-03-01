export interface PlanetApiResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Planet[]
}

export interface Planet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string,
    residentObj: Resident[]
}

export interface Resident {
    name: string,
    height: string,
    mass: string,
    gender: string
}