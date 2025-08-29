import { GeolocationCEP } from '@/domain/carrier/application/cep/geolocation-cep'
import { faker } from '@faker-js/faker'

export class FakeGeolocation implements GeolocationCEP {
  async getCoordinates(cep: string) {
    if (cep === '00000-000') return null

    const geolocation = {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    }

    return geolocation
  }
}
