import { Client } from "discord.js";

class DiscordInterface {
  private static _instance: DiscordInterface;
  static _client: Client;

  constructor() {}

  public static Instance(client?: Client) {
    if (!DiscordInterface._instance) {
      this._instance = new DiscordInterface();
    }
    if (client as Client) this._client = client;
    return this._instance || (this._instance = new this());
  }
}

export { DiscordInterface };