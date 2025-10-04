import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const DeviceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const deviceId = request.headers['x-device-id'];

    if (!deviceId) {
      throw new BadRequestException('X-Device-ID header is missing');
    }
    
    return deviceId;
  },
);