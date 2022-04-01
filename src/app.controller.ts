import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const { App } = require('@slack/bolt');

@Controller()
export class AppController {

  app;

  constructor(private readonly appService: AppService) {
    this.app = new App({
      token: "xoxb-2329760138-3286805444182-Lb4LEzzRF5Zq8rIULrW89Eaz",
      signingSecret: "17a8ccc4df079de7e83985738e940b82",
      socketMode: true,
      appToken: "xapp-1-A038MDCD80J-3293496385587-d0bc6157fe7924890eae6535ff42146dfe1fe1ff70117df2d67f69d47a9185ab",
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
