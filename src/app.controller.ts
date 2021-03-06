import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const { App } = require('@slack/bolt');

@Controller()
export class AppController {

  app;

  constructor(private readonly appService: AppService) {
    console.log(process.env.SLACK_BOT_TOKEN);
    console.log(process.env.SLACK_SIGNING_SECRET);
    console.log(process.env.B_SLACK_BOLT_TOKEN);
    console.log(process.env.PORT);
    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      socketMode: true,
      appToken: process.env.B_SLACK_BOLT_TOKEN,
    });
  }

  @Get()
  async getHello(): Promise<any> {
    this.app.message(async ({ message, client }) => {
      await client.chat.postMessage({ blocks: this.noSessionFound(message.user).blocks, channel: message.user });
    });
    await this.app.start();
    return this.appService.getHello();
  }

  @Get("bye")
  async getBye(): Promise<any> {
    console.log("Bye endpoint");
    return "Bye bye";
  }

  noSessionFound(usernName) {
    return {
      "blocks":
        [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `No Session found for <@${usernName}>`
            }
          }
        ]
    }
  }
}
