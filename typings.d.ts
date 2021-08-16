import {
  ApplicationCommandOptionData,
  Client,
  CommandInteraction,
  Interaction,
  Message,
  PermissionString,
  TextChannel,
} from 'discord.js'
import { EventEmitter } from 'events'
import WOKCommands from './src'

export default class WOKCommands extends EventEmitter {
  private _client: Client
  private _defaultPrefix: string
  private _commandsDir: string
  private _featuresDir: string
  private _mongo: string | undefined
  private _mongoConnection: Connection | null
  private _displayName: string
  private _prefixes: { [name: string]: string }
  private _categories: Map<String, String | GuildEmoji>
  private _hiddenCategories: string[]
  private _color: string
  private _commandHandler: CommandHandler
  private _featureHandler: FeatureHandler | null
  private _tagPeople: boolean
  private _showWarns: boolean
  private _delErrMsgCooldown: number
  private _ignoreBots: boolean
  private _botOwner: string[]
  private _testServers: string[]
  private _defaultLanguage: string
  private _messageHandler: MessageHandler
  private _slashCommand: SlashCommands

  constructor(client: Client, options?: Options)

  public get mongoPath(): string
  public setMongoPath(mongoPath: string | undefined): WOKCommands
  public get client(): Client
  public get displayName(): string
  public setDisplayName(displayName: string): WOKCommands
  public get prefixes(): { [name: string]: string }
  public get defaultPrefix(): string
  public setDefaultPrefix(defaultPrefix: string): WOKCommands
  public getPrefix(guild: Guild | null): string
  public setPrefix(guild: Guild | null, prefix: string): WOKCommands
  public get categories(): Map<String, String | GuildEmoji>
  public get hiddenCategories(): string[]
  public get color(): string
  public setColor(color: string): WOKCommands
  public getEmoji(category: string): string
  public getCategory(emoji: string): string
  public setCategorySettings(
    category: string | [{ [key: string]: any }],
    emoji?: string
  ): WOKCommands
  public isEmojiUsed(emoji: string): boolean
  public get commandHandler(): CommandHandler
  public get mongoConnection(): Connection | null
  public isDBConnected(): boolean
  public setTagPeople(tagPeople: boolean): WOKCommands
  public get tagPeople(): boolean
  public get showWarns(): boolean
  public get delErrMsgCooldown(): number
  public get ignoreBots(): boolean
  public get botOwner(): string[]
  public setBotOwner(botOwner: string | string[]): WOKCommands
  public get testServers(): string[]
  public get defaultLanguage(): string
  public setDefaultLanguage(defaultLanguage: string): WOKCommands
  public get messageHandler(): MessageHandler
  public get slashCommands(): SlashCommands
}

interface OptionsWithS {
  commandDir?: never
  featureDir?: never

  commandsDir: string
  featuresDir?: string
  messagesPath?: string
  showWarns?: boolean
  delErrMsgCooldown?: number
  defaultLanguage?: string
  ignoreBots?: boolean
  dbOptions?: {}
  testServers?: string | string[]
  disabledDefaultCommands?: string | string[]
}

interface OptionsWithoutS {
  commandsDir?: never
  featuresDir?: never

  commandDir: string
  featureDir?: string
  messagesPath?: string
  showWarns?: boolean
  delErrMsgCooldown?: number
  defaultLanguage?: string
  ignoreBots?: boolean
  dbOptions?: {}
  testServers?: string | string[]
  disabledDefaultCommands?: string | string[]
}
export type Options = OptionsWithS | OptionsWithoutS

export interface ICallbackObject {
  channel: TextChannel
  message: Message
  args: string[]
  text: string
  client: Client
  prefix: string
  instance: WOKCommands
  interaction: CommandInteraction
  options: ApplicationCommandOptionData[]
  cancelCoolDown(): any
}

export interface IErrorObject {
  error: CommandErrors
  command: string
  message: Message
  info: object
}

export interface ICommand {
  names?: string[] | string
  category: string
  callback?(obj: ICallbackObject): any
  error?(obj: IErrorObject): any
  minArgs?: number
  maxArgs?: number
  syntaxError?: { [key: string]: string }
  expectedArgs?: string
  description?: string
  syntax?: string
  requiredPermissions?: PermissionString[]
  permissions?: PermissionString[]
  cooldown?: string
  globalCooldown?: string
  ownerOnly?: boolean
  hidden?: boolean
  guildOnly?: boolean
  testOnly?: boolean
  slash?: boolean | 'both'
  options?: ApplicationCommandOptionData[]
}

export interface ISlashCommand {
  id: string
  application_id: string
  name: string
  description: string
  version: string
  default_permission: boolean
}

export interface ICategorySetting {
  name: string
  emoji: string
  hidden?: boolean
  customEmoji?: boolean
}
