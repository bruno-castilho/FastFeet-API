import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { HTTPModule } from './http/http.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [EnvModule, EventsModule, HTTPModule],
})
export class AppModule {}
