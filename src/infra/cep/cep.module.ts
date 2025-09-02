import { Module } from '@nestjs/common'
import { GeolocationCep } from './geolocation-cep'

@Module({
  providers: [GeolocationCep],
  exports: [GeolocationCep],
})
export class CepModule {}
