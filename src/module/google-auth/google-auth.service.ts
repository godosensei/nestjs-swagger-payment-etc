import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { UpdateGoogleAuthDto } from './dto/update-google-auth.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
 private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyIdToken(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub, // Google user id
    };
  }
}
