export interface GeolocationCEP {
  getCoordinates(cep: string): Promise<{
    latitude: number
    longitude: number
  } | null>
}
