import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { UpdateGoogleAuthDto } from './dto/update-google-auth.dto';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}


 @Post()
  async loginWithGoogle(@Body('idToken') idToken: string) {
    const userInfo = await this.googleAuthService.verifyIdToken(idToken);


    return userInfo;
  }
}
