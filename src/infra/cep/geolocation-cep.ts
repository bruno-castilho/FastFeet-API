import { GeolocationCEP } from '@/domain/carrier/application/cep/geolocation-cep'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GeolocationCep implements GeolocationCEP {
  async getCoordinates(cep: string) {
    if (cep === '00000-000') return null

    const geolocation = {
      latitude: 0,
      longitude: 0,
    }

    return geolocation
  }
}
