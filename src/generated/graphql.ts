import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: unknown; output: unknown }
}

export type Action = {
  __typename: 'Action'
  status: ActionStatus
}

export enum ActionStatus {
  Failed = 'failed',
  Succeeded = 'succeeded',
}

export type AddAppCollaboratorInput = {
  email: Scalars['String']['input']
}

export type App = {
  __typename: 'App'
  about: Maybe<Scalars['String']['output']>
  authorName: Maybe<Scalars['String']['output']>
  authorUrl: Maybe<Scalars['String']['output']>
  banner: Maybe<Media>
  bannerId: Maybe<Scalars['ID']['output']>
  clientId: Maybe<Scalars['String']['output']>
  clientSecret: Maybe<Scalars['String']['output']>
  comingSoon: Scalars['Boolean']['output']
  createdAt: Scalars['DateTime']['output']
  createdById: Maybe<Scalars['ID']['output']>
  customCodes: Maybe<AppCustomCodes>
  description: Maybe<Scalars['String']['output']>
  docsUrl: Maybe<Scalars['String']['output']>
  embedIds: Array<Scalars['ID']['output']>
  embeds: Maybe<Array<Embed>>
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  federatedSearchEnabled: Scalars['Boolean']['output']
  federatedSearchUrl: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image: Maybe<Media>
  imageId: Maybe<Scalars['ID']['output']>
  imageIds: Array<Scalars['ID']['output']>
  images: Maybe<Array<Media>>
  installed: Maybe<Scalars['Boolean']['output']>
  interactionUrl: Maybe<Scalars['String']['output']>
  /** Whether the app is a consent management platform */
  isConsentManagementPlatform: Maybe<Scalars['Boolean']['output']>
  locked: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  network: Maybe<Network>
  networkId: Scalars['ID']['output']
  onFreePlan: Scalars['Boolean']['output']
  privacyPolicyUrl: Maybe<Scalars['String']['output']>
  redirectUris: Maybe<Array<Scalars['String']['output']>>
  requiredPermissions: Array<PrimaryScopes>
  /** @deprecated Apps can no longer support required templates */
  requiredTemplates: Maybe<AppRequiredTemplates>
  secretToken: Maybe<Scalars['String']['output']>
  slug: Scalars['String']['output']
  standing: StoreItemStanding
  status: StoreItemStatus
  termsOfServiceUrl: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  updatedById: Maybe<Scalars['ID']['output']>
  webhookSignSecret: Maybe<Scalars['String']['output']>
  webhookSubscriptions: Maybe<Array<Scalars['String']['output']>>
  webhookUrl: Maybe<Scalars['String']['output']>
}

export type AppCollaborator = {
  __typename: 'AppCollaborator'
  addedById: Maybe<Scalars['ID']['output']>
  app: Maybe<App>
  appId: Scalars['ID']['output']
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  type: AppCollaboratorType
}

export enum AppCollaboratorType {
  Collaborator = 'COLLABORATOR',
  Owner = 'OWNER',
}

export type AppCustomCodes = {
  __typename: 'AppCustomCodes'
  body: Maybe<Scalars['String']['output']>
  head: Maybe<Scalars['String']['output']>
}

export type AppEdge = {
  __typename: 'AppEdge'
  cursor: Scalars['String']['output']
  node: App
}

export type AppNotificationInput = {
  networkId: Scalars['String']['input']
  template: Scalars['String']['input']
  templateData: Array<TemplateDataInput>
}

export type AppPublication = {
  __typename: 'AppPublication'
  addedById: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  itemId: Scalars['String']['output']
  networkId: Scalars['String']['output']
}

/** DEPRECATED */
export type AppRequiredTemplates = {
  __typename: 'AppRequiredTemplates'
  /** @deprecated This field is unused and will be removed in future versions. */
  postTypeTemplateIds: Maybe<Array<Scalars['String']['output']>>
  /** @deprecated This field is unused and will be removed in future versions. */
  postTypeTemplates: Maybe<Array<Template>>
}

/** DEPRECATED */
export type AppRequiredTemplatesInput = {
  postTypeTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>
}

export type AppSettings = {
  __typename: 'AppSettings'
  appId: Scalars['String']['output']
  context: PermissionContext
  entityId: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  networkId: Scalars['String']['output']
  settings: Scalars['String']['output']
}

export type AppToken = {
  __typename: 'AppToken'
  accessToken: Scalars['String']['output']
  gatewayUrl: Maybe<Scalars['String']['output']>
}

export type Availability = {
  __typename: 'Availability'
  available: Scalars['Boolean']['output']
}

export type BaseCustomFieldSchema = {
  __typename: 'BaseCustomFieldSchema'
  archived: Maybe<Scalars['Boolean']['output']>
  description: Maybe<Scalars['String']['output']>
  externalKeys: Maybe<Array<Scalars['String']['output']>>
  items: Maybe<BaseCustomFieldSchema>
  key: Scalars['String']['output']
  name: Scalars['String']['output']
  properties: Maybe<Array<BaseCustomFieldSchema>>
  required: Maybe<Scalars['Boolean']['output']>
  type: CustomFieldType
  typeOptions: Maybe<CustomFieldTypeOptions>
  validators: Maybe<Array<CustomFieldValidator>>
}

export type BaseCustomFieldSchemaInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  externalKeys?: InputMaybe<Array<Scalars['String']['input']>>
  items?: InputMaybe<BaseCustomFieldSchemaInput>
  key: Scalars['String']['input']
  name: Scalars['String']['input']
  properties?: InputMaybe<Array<BaseCustomFieldSchemaInput>>
  required?: InputMaybe<Scalars['Boolean']['input']>
  type: CustomFieldType
  typeOptions?: InputMaybe<CustomFieldTypeOptionsInput>
  validators?: InputMaybe<Array<CustomFieldValidatorInput>>
}

export type Block = {
  __typename: 'Block'
  children: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  output: Maybe<Scalars['String']['output']>
  props: Maybe<Scalars['String']['output']>
}

export type BlockInput = {
  children?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  name: Scalars['String']['input']
  output?: InputMaybe<Scalars['String']['input']>
  props?: InputMaybe<Scalars['String']['input']>
}

export type CollaboratorInvitationInput = {
  region: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type CreateAppInput = {
  about?: InputMaybe<Scalars['String']['input']>
  authorName?: InputMaybe<Scalars['String']['input']>
  authorUrl?: InputMaybe<Scalars['String']['input']>
  bannerId?: InputMaybe<Scalars['String']['input']>
  collaborators?: InputMaybe<Array<Scalars['String']['input']>>
  comingSoon?: InputMaybe<Scalars['Boolean']['input']>
  customCodes?: InputMaybe<UpdateAppCustomCodes>
  description?: InputMaybe<Scalars['String']['input']>
  docsUrl?: InputMaybe<Scalars['String']['input']>
  dynamicBlocks?: InputMaybe<Array<CreateDynamicBlockInput>>
  faviconId?: InputMaybe<Scalars['String']['input']>
  federatedSearchEnabled?: InputMaybe<Scalars['Boolean']['input']>
  federatedSearchUrl?: InputMaybe<Scalars['String']['input']>
  imageId?: InputMaybe<Scalars['String']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  isConsentManagementPlatform?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  networkId: Scalars['String']['input']
  onFreePlan?: InputMaybe<Scalars['Boolean']['input']>
  privacyPolicyUrl?: InputMaybe<Scalars['String']['input']>
  redirectUris?: InputMaybe<Array<Scalars['String']['input']>>
  requiredPermissions?: InputMaybe<Array<PrimaryScopes>>
  requiredTemplates?: InputMaybe<AppRequiredTemplatesInput>
  shortcuts?: InputMaybe<Array<CreateShortcutInput>>
  slug?: InputMaybe<Scalars['String']['input']>
  standing?: InputMaybe<StoreItemStanding>
  termsOfServiceUrl?: InputMaybe<Scalars['String']['input']>
  webhookSubscriptions?: InputMaybe<Array<Scalars['String']['input']>>
  webhookUrl?: InputMaybe<Scalars['String']['input']>
}

export type CreateDynamicBlockInput = {
  contexts?: InputMaybe<Array<PermissionContext>>
  description?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['String']['input']>
  imageId?: InputMaybe<Scalars['String']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  key: Scalars['String']['input']
  maxSize?: InputMaybe<DynamicBlockSize>
  name?: InputMaybe<Scalars['String']['input']>
  staffOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type CreateEmojiInput = {
  text: Scalars['String']['input']
}

export type CreateImageInput = {
  contentType: Scalars['String']['input']
  cropHeight?: InputMaybe<Scalars['Int']['input']>
  cropWidth?: InputMaybe<Scalars['Int']['input']>
  cropX?: InputMaybe<Scalars['Int']['input']>
  cropY?: InputMaybe<Scalars['Int']['input']>
  cropZoom?: InputMaybe<Scalars['Float']['input']>
  height?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  size: Scalars['Float']['input']
  width?: InputMaybe<Scalars['Int']['input']>
}

export type CreateNetwork = {
  /** Additional templates to be installed alongside the network template. This is primarily used to customize which spaces are part of the network. This should not include any network templates. */
  additionalTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>
  domain?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  templateId: Scalars['String']['input']
  trialPriceId?: InputMaybe<Scalars['String']['input']>
  utm?: InputMaybe<UtmInput>
}

export type CreatePostTypeInput = {
  allowedReactions?: InputMaybe<Array<Scalars['String']['input']>>
  context: PostTypeContext
  customReactions?: InputMaybe<Array<CustomReactionInput>>
  description?: InputMaybe<Scalars['String']['input']>
  excludedNativeShortcuts?: InputMaybe<Array<Scalars['String']['input']>>
  forbiddenReactions?: InputMaybe<Array<Scalars['String']['input']>>
  iconId?: InputMaybe<Scalars['ID']['input']>
  languageTemplate?: InputMaybe<Scalars['String']['input']>
  layout?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  nativeFieldsTemplates?: InputMaybe<NativeFieldsTemplatesInput>
  pluralName: Scalars['String']['input']
  postFields?: InputMaybe<CustomFieldsSchemaInput>
  primaryReactionType: ReactionType
  recommendationsSettings?: InputMaybe<PostTypeRecommendationSettingsInput>
  selfRepliable?: InputMaybe<Scalars['Boolean']['input']>
  shortContentTemplate?: InputMaybe<Scalars['String']['input']>
  singleChoiceReactions?: InputMaybe<Array<Scalars['String']['input']>>
  slate?: InputMaybe<SlateInput>
  titleTemplate?: InputMaybe<Scalars['String']['input']>
  validReplyTypesIds?: InputMaybe<Array<Scalars['String']['input']>>
}

export type CreatePostTypeTemplateInput = {
  about?: InputMaybe<Scalars['String']['input']>
  appIds?: InputMaybe<Array<Scalars['String']['input']>>
  authorName?: InputMaybe<Scalars['String']['input']>
  authorUrl?: InputMaybe<Scalars['String']['input']>
  bannerId?: InputMaybe<Scalars['String']['input']>
  categories?: InputMaybe<Array<Scalars['String']['input']>>
  comingSoon?: InputMaybe<Scalars['Boolean']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  descriptions?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['String']['input']>
  imageId?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  networkId: Scalars['String']['input']
  onFreePlan?: InputMaybe<Scalars['Boolean']['input']>
  postTypeInput: CreatePostTypeInput
  privacyPolicyUrl?: InputMaybe<Scalars['String']['input']>
  slug: Scalars['String']['input']
  termsOfServiceUrl?: InputMaybe<Scalars['String']['input']>
}

export type CreateShortcutInput = {
  context: PermissionContext
  description?: InputMaybe<Scalars['String']['input']>
  entityType?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['ID']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  key: Scalars['String']['input']
  name: Scalars['String']['input']
  states?: InputMaybe<Array<ShortcutStateInput>>
}

export type CustomFieldPrivacy = {
  __typename: 'CustomFieldPrivacy'
  allow: Array<CustomFieldPrivacyOptions>
}

export type CustomFieldPrivacyInput = {
  allow: Array<CustomFieldPrivacyOptions>
}

export enum CustomFieldPrivacyOptions {
  Admin = 'ADMIN',
  Own = 'OWN',
}

export type CustomFieldSchema = {
  __typename: 'CustomFieldSchema'
  archived: Maybe<Scalars['Boolean']['output']>
  default: Maybe<Scalars['String']['output']>
  description: Maybe<Scalars['String']['output']>
  externalKeys: Maybe<Array<Scalars['String']['output']>>
  items: Maybe<BaseCustomFieldSchema>
  key: Scalars['String']['output']
  name: Scalars['String']['output']
  properties: Maybe<Array<BaseCustomFieldSchema>>
  readPrivacy: Maybe<CustomFieldPrivacy>
  required: Maybe<Scalars['Boolean']['output']>
  searchable: Maybe<Scalars['Boolean']['output']>
  settings: Maybe<Array<CustomFieldSettings>>
  type: CustomFieldType
  typeOptions: Maybe<CustomFieldTypeOptions>
  validators: Maybe<Array<CustomFieldValidator>>
  writePrivacy: Maybe<CustomFieldPrivacy>
}

export type CustomFieldSchemaInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>
  default?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  externalKeys?: InputMaybe<Array<Scalars['String']['input']>>
  items?: InputMaybe<BaseCustomFieldSchemaInput>
  key: Scalars['String']['input']
  name: Scalars['String']['input']
  properties?: InputMaybe<Array<BaseCustomFieldSchemaInput>>
  readPrivacy?: InputMaybe<CustomFieldPrivacyInput>
  required?: InputMaybe<Scalars['Boolean']['input']>
  searchable?: InputMaybe<Scalars['Boolean']['input']>
  settings?: InputMaybe<Array<CustomFieldSettingsInput>>
  type: CustomFieldType
  typeOptions?: InputMaybe<CustomFieldTypeOptionsInput>
  validators?: InputMaybe<Array<CustomFieldValidatorInput>>
  writePrivacy?: InputMaybe<CustomFieldPrivacyInput>
}

export type CustomFieldSettings = {
  __typename: 'CustomFieldSettings'
  key: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type CustomFieldSettingsInput = {
  key: Scalars['String']['input']
  value: Scalars['String']['input']
}

export enum CustomFieldType {
  Array = 'array',
  Boolean = 'boolean',
  Date = 'date',
  Number = 'number',
  Object = 'object',
  Relation = 'relation',
  RichText = 'richText',
  Text = 'text',
}

export type CustomFieldTypeOptions = {
  __typename: 'CustomFieldTypeOptions'
  dateType: Maybe<DateTypeOptions>
  numberType: Maybe<NumberTypeOptions>
  relationType: Maybe<RelationTypeOptions>
  richTextType: Maybe<RichTextTypeOptions>
  textType: Maybe<TextTypeOptions>
}

export type CustomFieldTypeOptionsInput = {
  dateType?: InputMaybe<DateTypeOptions>
  numberType?: InputMaybe<NumberTypeOptions>
  relationType?: InputMaybe<RelationTypeOptions>
  richTextType?: InputMaybe<RichTextTypeOptions>
  textType?: InputMaybe<TextTypeOptions>
}

export type CustomFieldValidator = {
  __typename: 'CustomFieldValidator'
  customErrorMessage: Maybe<Scalars['String']['output']>
  validation: CustomFieldValidators
  value: Scalars['String']['output']
}

export type CustomFieldValidatorInput = {
  customErrorMessage?: InputMaybe<Scalars['String']['input']>
  validation: CustomFieldValidators
  value: Scalars['String']['input']
}

export enum CustomFieldValidators {
  AllOf = 'allOf',
  AnyOf = 'anyOf',
  Enum = 'enum',
  ExclusiveMaximum = 'exclusiveMaximum',
  ExclusiveMinimum = 'exclusiveMinimum',
  Format = 'format',
  MaxItems = 'maxItems',
  MaxLength = 'maxLength',
  MaxProperties = 'maxProperties',
  Maximum = 'maximum',
  MinItems = 'minItems',
  MinLength = 'minLength',
  MinProperties = 'minProperties',
  Minimum = 'minimum',
  MultipleOf = 'multipleOf',
  Not = 'not',
  OneOf = 'oneOf',
  Pattern = 'pattern',
  UniqueItems = 'uniqueItems',
}

export type CustomFieldsSchemaInput = {
  fields: Array<CustomFieldSchemaInput>
}

export type CustomReactionInput = {
  activeColor?: InputMaybe<Scalars['String']['input']>
  activeGlyphId?: InputMaybe<Scalars['String']['input']>
  activeName?: InputMaybe<Scalars['String']['input']>
  color?: InputMaybe<Scalars['String']['input']>
  glyphId: Scalars['String']['input']
  key: Scalars['String']['input']
  name: Scalars['String']['input']
}

export enum DateTypeOptions {
  Date = 'date',
  Datetime = 'datetime',
}

export enum DefaultDynamicBlockKeys {
  Settings = 'settings',
}

export type DeleteNetworkInput = {
  networkId: Scalars['String']['input']
}

export type DynamicBlock = {
  __typename: 'DynamicBlock'
  about: Maybe<Scalars['String']['output']>
  app: Maybe<App>
  appId: Scalars['String']['output']
  contexts: Maybe<Array<PermissionContext>>
  createdAt: Scalars['DateTime']['output']
  createdById: Maybe<Scalars['ID']['output']>
  description: Maybe<Scalars['String']['output']>
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  image: Maybe<Media>
  imageId: Maybe<Scalars['ID']['output']>
  interactionUrl: Maybe<Scalars['String']['output']>
  key: Scalars['String']['output']
  maxSize: DynamicBlockSize
  name: Scalars['String']['output']
  staffOnly: Scalars['Boolean']['output']
  updatedAt: Scalars['DateTime']['output']
  updatedById: Maybe<Scalars['ID']['output']>
}

export type DynamicBlockEdge = {
  __typename: 'DynamicBlockEdge'
  cursor: Scalars['String']['output']
  node: DynamicBlock
}

export enum DynamicBlockSize {
  Full = 'full',
  Lg = 'lg',
  Md = 'md',
  Sm = 'sm',
  Xl = 'xl',
}

export type EmailValidationResult = {
  __typename: 'EmailValidationResult'
  suggestion: Maybe<Scalars['String']['output']>
  valid: Scalars['Boolean']['output']
}

export type Embed = {
  __typename: 'Embed'
  author: Maybe<Scalars['String']['output']>
  author_url: Maybe<Scalars['String']['output']>
  description: Maybe<Scalars['String']['output']>
  html: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  options: Maybe<Scalars['String']['output']>
  provider_name: Maybe<Scalars['String']['output']>
  thumbnail_height: Maybe<Scalars['String']['output']>
  thumbnail_url: Maybe<Scalars['String']['output']>
  thumbnail_width: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  type: Maybe<Scalars['String']['output']>
  url: Scalars['String']['output']
}

export type EmbedInput = {
  options?: InputMaybe<Scalars['String']['input']>
  url: Scalars['String']['input']
}

export type Emoji = {
  __typename: 'Emoji'
  id: Scalars['ID']['output']
  text: Scalars['String']['output']
}

export type EnableDefaultDynamicBlockInput = {
  contexts?: InputMaybe<Array<PermissionContext>>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
}

export enum EventNoun {
  App = 'APP',
  AppInstallation = 'APP_INSTALLATION',
  Badge = 'BADGE',
  Collection = 'COLLECTION',
  Custom = 'CUSTOM',
  Embed = 'EMBED',
  Event = 'EVENT',
  EventRegistration = 'EVENT_REGISTRATION',
  ExtraProperty = 'EXTRA_PROPERTY',
  ImportRequest = 'IMPORT_REQUEST',
  Limits = 'LIMITS',
  Media = 'MEDIA',
  Member = 'MEMBER',
  MemberBadge = 'MEMBER_BADGE',
  MemberInvitation = 'MEMBER_INVITATION',
  MemberLastSeen = 'MEMBER_LAST_SEEN',
  MemberSession = 'MEMBER_SESSION',
  MemberStats = 'MEMBER_STATS',
  Moderation = 'MODERATION',
  Network = 'NETWORK',
  NetworkStats = 'NETWORK_STATS',
  Organization = 'ORGANIZATION',
  PageCustomResponse = 'PAGE_CUSTOM_RESPONSE',
  Plan = 'PLAN',
  Post = 'POST',
  PostType = 'POST_TYPE',
  Product = 'PRODUCT',
  ProductPriceSync = 'PRODUCT_PRICE_SYNC',
  Reaction = 'REACTION',
  Role = 'ROLE',
  Shortcut = 'SHORTCUT',
  Space = 'SPACE',
  SpaceJoinRequest = 'SPACE_JOIN_REQUEST',
  SpaceMembership = 'SPACE_MEMBERSHIP',
  SpaceNetworkRole = 'SPACE_NETWORK_ROLE',
  SpacePostType = 'SPACE_POST_TYPE',
  SpaceRole = 'SPACE_ROLE',
  Sso = 'SSO',
  SsoMembership = 'SSO_MEMBERSHIP',
  StaffStats = 'STAFF_STATS',
  Subscription = 'SUBSCRIPTION',
  SyncEvent = 'SYNC_EVENT',
  Tag = 'TAG',
  Tracker = 'TRACKER',
}

export type EventType = {
  __typename: 'EventType'
  description: Scalars['String']['output']
  name: Scalars['String']['output']
  noun: EventNoun
  requiredScope: Scalars['String']['output']
  shortDescription: Scalars['String']['output']
  verb: EventVerb
}

export enum EventVerb {
  Accepted = 'ACCEPTED',
  Added = 'ADDED',
  Banned = 'BANNED',
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Clicked = 'CLICKED',
  Created = 'CREATED',
  Custom = 'CUSTOM',
  Deleted = 'DELETED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Followed = 'FOLLOWED',
  Generated = 'GENERATED',
  Hidden = 'HIDDEN',
  Impression = 'IMPRESSION',
  Installed = 'INSTALLED',
  LoggedIn = 'LOGGED_IN',
  MarkedForPurge = 'MARKED_FOR_PURGE',
  NotAssigned = 'NOT_ASSIGNED',
  Permitted = 'PERMITTED',
  Ping = 'PING',
  Pinged = 'PINGED',
  Pinned = 'PINNED',
  Published = 'PUBLISHED',
  Purged = 'PURGED',
  Received = 'RECEIVED',
  Registered = 'REGISTERED',
  Rejected = 'REJECTED',
  Removed = 'REMOVED',
  Resent = 'RESENT',
  Revoked = 'REVOKED',
  Sent = 'SENT',
  SignedUp = 'SIGNED_UP',
  Succeeded = 'SUCCEEDED',
  Suspended = 'SUSPENDED',
  Unblocked = 'UNBLOCKED',
  Unfollowed = 'UNFOLLOWED',
  Unhidden = 'UNHIDDEN',
  Uninstalled = 'UNINSTALLED',
  Unpinned = 'UNPINNED',
  Unpublished = 'UNPUBLISHED',
  Unsuspended = 'UNSUSPENDED',
  Unused = 'UNUSED',
  Unverified = 'UNVERIFIED',
  Updated = 'UPDATED',
  Used = 'USED',
  Verified = 'VERIFIED',
  Viewed = 'VIEWED',
}

export type File = {
  __typename: 'File'
  downloadUrl: Scalars['String']['output']
  extension: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  url: Scalars['String']['output']
}

export type GlobalMember = {
  __typename: 'GlobalMember'
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  joinedReferralProgram: Scalars['Boolean']['output']
  locale: Scalars['String']['output']
  name: Maybe<Scalars['String']['output']>
  profilePicture: Maybe<Media>
  profilePictureId: Maybe<Scalars['ID']['output']>
  referrerCode: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
}

export type GlobalToken = {
  __typename: 'GlobalToken'
  accessToken: Scalars['String']['output']
  email: Scalars['String']['output']
}

export type GlobalTokenInput = {
  email: Scalars['String']['input']
  referrerCode?: InputMaybe<Scalars['String']['input']>
  verificationCode: Scalars['String']['input']
}

export type Glyph = {
  __typename: 'Glyph'
  id: Scalars['ID']['output']
  text: Scalars['String']['output']
  variant: GlyphMediaVariant
}

export enum GlyphMediaVariant {
  Emoji = 'emoji',
  Icon = 'icon',
}

export type HubContent = {
  __typename: 'HubContent'
  attachmentIds: Array<Scalars['ID']['output']>
  attachments: Maybe<Array<File>>
  createdAt: Scalars['DateTime']['output']
  description: Maybe<Scalars['String']['output']>
  embedIds: Array<Scalars['ID']['output']>
  embeds: Maybe<Array<Embed>>
  fields: Maybe<Array<HubContentCustomField>>
  id: Scalars['ID']['output']
  imageIds: Array<Scalars['ID']['output']>
  images: Maybe<Array<Media>>
  language: Maybe<Scalars['String']['output']>
  /** Whether the post is locked */
  locked: Scalars['Boolean']['output']
  postTypeId: Scalars['ID']['output']
  publishedAt: Maybe<Scalars['DateTime']['output']>
  slug: Maybe<Scalars['String']['output']>
  tagIds: Maybe<Array<Scalars['String']['output']>>
  thumbnail: Maybe<Media>
  thumbnailId: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
}

export type HubContentCustomField = {
  __typename: 'HubContentCustomField'
  key: Scalars['String']['output']
  relationEntities: Maybe<HubContentCustomFieldRelation>
  value: Maybe<Scalars['String']['output']>
}

export type HubContentCustomFieldRelation = {
  __typename: 'HubContentCustomFieldRelation'
  medias: Array<Media>
}

export type Image = {
  __typename: 'Image'
  cropHeight: Maybe<Scalars['Int']['output']>
  cropWidth: Maybe<Scalars['Int']['output']>
  cropX: Scalars['Int']['output']
  cropY: Scalars['Int']['output']
  cropZoom: Scalars['Float']['output']
  dominantColorHex: Maybe<Scalars['String']['output']>
  downloadUrl: Scalars['String']['output']
  dpi: Maybe<Scalars['Float']['output']>
  height: Maybe<Scalars['Float']['output']>
  id: Scalars['ID']['output']
  name: Maybe<Scalars['String']['output']>
  url: Scalars['String']['output']
  urls: Maybe<MediaUrls>
  width: Maybe<Scalars['Float']['output']>
}

export type InvitationAcceptResult = {
  __typename: 'InvitationAcceptResult'
  /** Access token won’t be provided if there’s an error with the invitation */
  accessToken: Maybe<Scalars['String']['output']>
  email: Maybe<Scalars['String']['output']>
  /** In case of an error with invitation, message will contain the error description. */
  errorMessage: Maybe<Scalars['String']['output']>
  networkId: Maybe<Scalars['String']['output']>
  networkPath: Maybe<Scalars['String']['output']>
  status: ActionStatus
}

export type LoginNetwork = {
  networkId: Scalars['String']['input']
}

export type LoginWithSsoCodeInput = {
  code?: InputMaybe<Scalars['String']['input']>
  hd?: InputMaybe<Scalars['String']['input']>
  oauth_token?: InputMaybe<Scalars['String']['input']>
  oauth_verifier?: InputMaybe<Scalars['String']['input']>
  prompt?: InputMaybe<Scalars['String']['input']>
  referrer_code?: InputMaybe<Scalars['String']['input']>
  scope?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
}

export type Media = Emoji | File | Glyph | Image

export type MediaUrls = {
  __typename: 'MediaUrls'
  full: Scalars['String']['output']
  large: Scalars['String']['output']
  medium: Scalars['String']['output']
  small: Scalars['String']['output']
  thumb: Scalars['String']['output']
}

export type Mutation = {
  __typename: 'Mutation'
  acceptCollaboratorInvitation: InvitationAcceptResult
  addAppCollaborator: AppCollaborator
  createApp: App
  createDynamicBlock: DynamicBlock
  /** @deprecated Use Glyphs instead, just update the media id with `emoji/...` */
  createEmojis: Array<Emoji>
  createImages: Array<SignedUrl>
  createNetwork: NetworkOtp
  createPostTypeTemplate: Template
  createShortcut: Shortcut
  deleteApp: Action
  deleteAppSetting: AppSettings
  deleteDynamicBlock: Action
  deleteNetwork: Action
  deleteShortcut: Action
  disableDefaultDynamicBlock: Action
  enableDefaultDynamicBlock: DynamicBlock
  joinReferralProgram: GlobalMember
  publishApp: Action
  publishAppPrivately: AppPublication
  regenerateClientSecret: App
  removeAppCollaborator: Action
  requestGlobalTokenCode: Action
  resendGlobalTokenCode: Action
  sendNotifications: SendNotifications
  testAppWebhook: Action
  unPublishAppPrivately: Action
  unpublishApp: Action
  updateApp: App
  updateAppSetting: AppSettings
  updateAuthMember: GlobalMember
  updateDynamicBlock: DynamicBlock
  updateShortcut: Shortcut
  validateEmail: EmailValidationResult
}

export type MutationAcceptCollaboratorInvitationArgs = {
  input: CollaboratorInvitationInput
}

export type MutationAddAppCollaboratorArgs = {
  appId: Scalars['String']['input']
  input: AddAppCollaboratorInput
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationCreateDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  input: CreateDynamicBlockInput
}

export type MutationCreateEmojisArgs = {
  input: Array<CreateEmojiInput>
}

export type MutationCreateImagesArgs = {
  input: Array<CreateImageInput>
}

export type MutationCreateNetworkArgs = {
  input: CreateNetwork
}

export type MutationCreatePostTypeTemplateArgs = {
  input: CreatePostTypeTemplateInput
}

export type MutationCreateShortcutArgs = {
  appId: Scalars['String']['input']
  input: CreateShortcutInput
}

export type MutationDeleteAppArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteAppSettingArgs = {
  context: PermissionContext
  entityId?: InputMaybe<Scalars['ID']['input']>
  networkId: Scalars['ID']['input']
}

export type MutationDeleteDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  blockId: Scalars['ID']['input']
}

export type MutationDeleteNetworkArgs = {
  input: DeleteNetworkInput
}

export type MutationDeleteShortcutArgs = {
  appId: Scalars['String']['input']
  id: Scalars['ID']['input']
}

export type MutationDisableDefaultDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  key: DefaultDynamicBlockKeys
}

export type MutationEnableDefaultDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  input: EnableDefaultDynamicBlockInput
  key: DefaultDynamicBlockKeys
}

export type MutationPublishAppArgs = {
  id: Scalars['ID']['input']
}

export type MutationPublishAppPrivatelyArgs = {
  appId: Scalars['ID']['input']
  networkId: Scalars['ID']['input']
}

export type MutationRegenerateClientSecretArgs = {
  appId: Scalars['ID']['input']
}

export type MutationRemoveAppCollaboratorArgs = {
  appId: Scalars['String']['input']
  collaboratorId: Scalars['String']['input']
}

export type MutationRequestGlobalTokenCodeArgs = {
  input: RequestGlobalTokenInput
}

export type MutationResendGlobalTokenCodeArgs = {
  input: RequestGlobalTokenInput
}

export type MutationSendNotificationsArgs = {
  input: AppNotificationInput
}

export type MutationTestAppWebhookArgs = {
  appId: Scalars['ID']['input']
  input: TestAppWebhookInput
}

export type MutationUnPublishAppPrivatelyArgs = {
  appId: Scalars['ID']['input']
  networkId: Scalars['ID']['input']
}

export type MutationUnpublishAppArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateAppArgs = {
  id: Scalars['ID']['input']
  input: UpdateAppInput
}

export type MutationUpdateAppSettingArgs = {
  context: PermissionContext
  entityId?: InputMaybe<Scalars['ID']['input']>
  networkId: Scalars['ID']['input']
  settings: Scalars['String']['input']
}

export type MutationUpdateAuthMemberArgs = {
  input: UpdateGlobalMemberInput
}

export type MutationUpdateDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  blockId: Scalars['ID']['input']
  input: UpdateDynamicBlockInput
}

export type MutationUpdateShortcutArgs = {
  appId: Scalars['String']['input']
  id: Scalars['ID']['input']
  input: UpdateShortcutInput
}

export type MutationValidateEmailArgs = {
  input: RequestGlobalTokenInput
}

export type NativeFieldsTemplatesInput = {
  description?: InputMaybe<Scalars['String']['input']>
  thumbnailId?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type Network = {
  __typename: 'Network'
  activeTheme: Maybe<Theme>
  aliases: Array<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  description: Maybe<Scalars['String']['output']>
  domain: Scalars['String']['output']
  domainSubfolder: Maybe<Scalars['String']['output']>
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  gatewayUrl: Scalars['String']['output']
  id: Scalars['ID']['output']
  images: Maybe<NetworkImages>
  isOwner: Scalars['Boolean']['output']
  logo: Maybe<Media>
  logoId: Maybe<Scalars['ID']['output']>
  membership: NetworkMembership
  name: Scalars['String']['output']
  overUsedAt: Maybe<Scalars['DateTime']['output']>
  planName: Scalars['String']['output']
  status: NetworkStatus
  visibility: NetworkVisibility
  willUnpublishAt: Maybe<Scalars['DateTime']['output']>
}

export type NetworkEdge = {
  __typename: 'NetworkEdge'
  cursor: Scalars['String']['output']
  node: Network
}

export type NetworkImages = {
  __typename: 'NetworkImages'
  darkFavicon: Maybe<Media>
  darkLogo: Maybe<Media>
  darkMobileLogo: Maybe<Media>
  lightFavicon: Maybe<Media>
  lightLogo: Maybe<Media>
  lightMobileLogo: Maybe<Media>
}

export enum NetworkMembership {
  InviteOnly = 'inviteOnly',
  Open = 'open',
}

export type NetworkOtp = {
  __typename: 'NetworkOtp'
  domain: Scalars['String']['output']
  /** The path to the network. This property takes subfolder settings into account. */
  networkPath: Scalars['String']['output']
  otp: Scalars['String']['output']
}

export enum NetworkStatus {
  Archived = 'archived',
  Published = 'published',
  Unpublished = 'unpublished',
}

export enum NetworkVisibility {
  Private = 'private',
  Public = 'public',
}

export enum NumberTypeOptions {
  Integer = 'integer',
  Number = 'number',
}

export type PageInfo = {
  __typename: 'PageInfo'
  endCursor: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
}

export type PaginatedApp = {
  __typename: 'PaginatedApp'
  edges: Maybe<Array<AppEdge>>
  nodes: Maybe<Array<App>>
  pageInfo: PageInfo
  totalCount: Maybe<Scalars['Int']['output']>
}

export type PaginatedDynamicBlock = {
  __typename: 'PaginatedDynamicBlock'
  edges: Maybe<Array<DynamicBlockEdge>>
  nodes: Maybe<Array<DynamicBlock>>
  pageInfo: PageInfo
  totalCount: Maybe<Scalars['Int']['output']>
}

export type PaginatedShortcut = {
  __typename: 'PaginatedShortcut'
  edges: Maybe<Array<ShortcutEdge>>
  nodes: Maybe<Array<Shortcut>>
  pageInfo: PageInfo
  totalCount: Maybe<Scalars['Int']['output']>
}

export type PaginatedTemplate = {
  __typename: 'PaginatedTemplate'
  edges: Maybe<Array<TemplateEdge>>
  nodes: Maybe<Array<Template>>
  pageInfo: PageInfo
  totalCount: Maybe<Scalars['Int']['output']>
}

export enum PermissionContext {
  Event = 'EVENT',
  Member = 'MEMBER',
  Network = 'NETWORK',
  Post = 'POST',
  Space = 'SPACE',
}

export enum PostTypeContext {
  Post = 'post',
  Reply = 'reply',
}

export type PostTypeRecommendationSettingsInput = {
  fields: Array<Scalars['String']['input']>
  sourceSelf?: InputMaybe<Scalars['Boolean']['input']>
  sourceSpaces?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum PrimaryScopes {
  CreateContent = 'CreateContent',
  DeleteAuthMember = 'DeleteAuthMember',
  DeleteContent = 'DeleteContent',
  DeleteMember = 'DeleteMember',
  DeleteNetwork = 'DeleteNetwork',
  FindAuthMember = 'FindAuthMember',
  FindContent = 'FindContent',
  FindNetwork = 'FindNetwork',
  FullAccess = 'FullAccess',
  InviteMember = 'InviteMember',
  JoinNetwork = 'JoinNetwork',
  UpdateAuthMember = 'UpdateAuthMember',
  UpdateBilling = 'UpdateBilling',
  UpdateContent = 'UpdateContent',
  UpdateMember = 'UpdateMember',
  UpdateModeration = 'UpdateModeration',
  UpdateNetwork = 'UpdateNetwork',
  UpdateNetworkTemplate = 'UpdateNetworkTemplate',
  UpdateReport = 'UpdateReport',
  ViewAuthMember = 'ViewAuthMember',
  ViewContent = 'ViewContent',
  ViewMember = 'ViewMember',
  ViewNetwork = 'ViewNetwork',
  ViewReport = 'ViewReport',
}

export type Query = {
  __typename: 'Query'
  app: App
  appCollaborators: Array<AppCollaborator>
  appPublications: Array<AppPublication>
  appSettings: AppSettings
  apps: PaginatedApp
  authMember: GlobalMember
  checkAppSlugAvailability: Availability
  dynamicBlock: DynamicBlock
  dynamicBlocks: PaginatedDynamicBlock
  embed: Embed
  eventTypes: Array<EventType>
  globalToken: GlobalToken
  limitedToken: AppToken
  loginWithSsoCode: GlobalToken
  media: Media
  networkOtp: NetworkOtp
  networks: Array<Network>
  shortcut: Shortcut
  shortcuts: PaginatedShortcut
  ssoUrl: SsoUrl
  templates: PaginatedTemplate
}

export type QueryAppArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type QueryAppCollaboratorsArgs = {
  appId: Scalars['String']['input']
}

export type QueryAppPublicationsArgs = {
  appId: Scalars['ID']['input']
}

export type QueryAppSettingsArgs = {
  context: PermissionContext
  entityId?: InputMaybe<Scalars['ID']['input']>
  networkId: Scalars['ID']['input']
}

export type QueryAppsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  limit: Scalars['Int']['input']
  offset?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  standing?: InputMaybe<StoreItemStanding>
  status?: InputMaybe<StoreItemStatus>
}

export type QueryCheckAppSlugAvailabilityArgs = {
  slug: Scalars['String']['input']
}

export type QueryDynamicBlockArgs = {
  appId: Scalars['ID']['input']
  blockId: Scalars['ID']['input']
}

export type QueryDynamicBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  appId: Scalars['ID']['input']
  before?: InputMaybe<Scalars['String']['input']>
  limit: Scalars['Int']['input']
  offset?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryEmbedArgs = {
  input: EmbedInput
}

export type QueryGlobalTokenArgs = {
  input: GlobalTokenInput
}

export type QueryLimitedTokenArgs = {
  context?: InputMaybe<PermissionContext>
  entityId?: InputMaybe<Scalars['String']['input']>
  impersonateMemberId?: InputMaybe<Scalars['String']['input']>
  networkId: Scalars['String']['input']
}

export type QueryLoginWithSsoCodeArgs = {
  input: LoginWithSsoCodeInput
}

export type QueryMediaArgs = {
  id: Scalars['ID']['input']
}

export type QueryNetworkOtpArgs = {
  input: LoginNetwork
}

export type QueryShortcutArgs = {
  appId: Scalars['String']['input']
  id: Scalars['String']['input']
}

export type QueryShortcutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  appId: Scalars['String']['input']
  before?: InputMaybe<Scalars['String']['input']>
  limit: Scalars['Int']['input']
  offset?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

export type QuerySsoUrlArgs = {
  input: SsoUrlInput
}

export type QueryTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  entityTypes?: InputMaybe<Array<TemplateEntityType>>
  limit: Scalars['Int']['input']
  offset?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  status?: InputMaybe<StoreItemStatus>
}

export enum ReactionType {
  EmojiBase = 'EMOJI_BASE',
  LikeBase = 'LIKE_BASE',
  VoteBase = 'VOTE_BASE',
}

export enum RelationTypeOptions {
  Media = 'Media',
  Member = 'Member',
  Post = 'Post',
  Space = 'Space',
  Tag = 'Tag',
}

export type RequestGlobalTokenInput = {
  captchaToken?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
}

export enum RichTextTypeOptions {
  Html = 'html',
  Markup = 'markup',
}

export type SendNotifications = {
  __typename: 'SendNotifications'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  networkId: Scalars['String']['output']
  template: Scalars['String']['output']
  templateData: Array<TemplateData>
  updatedAt: Scalars['DateTime']['output']
}

export type Shortcut = {
  __typename: 'Shortcut'
  appId: Scalars['ID']['output']
  context: PermissionContext
  createdAt: Scalars['DateTime']['output']
  createdById: Maybe<Scalars['ID']['output']>
  description: Maybe<Scalars['String']['output']>
  entityType: Maybe<Scalars['String']['output']>
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  interactionUrl: Maybe<Scalars['String']['output']>
  key: Scalars['String']['output']
  name: Scalars['String']['output']
  states: Maybe<Array<ShortcutState>>
  updatedAt: Scalars['DateTime']['output']
  updatedById: Maybe<Scalars['ID']['output']>
}

export type ShortcutEdge = {
  __typename: 'ShortcutEdge'
  cursor: Scalars['String']['output']
  node: Shortcut
}

export type ShortcutState = {
  __typename: 'ShortcutState'
  description: Maybe<Scalars['String']['output']>
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  name: Maybe<Scalars['String']['output']>
  state: Scalars['String']['output']
}

export type ShortcutStateInput = {
  description?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  state: Scalars['String']['input']
}

export type SignedUrl = {
  __typename: 'SignedUrl'
  fields: Scalars['String']['output']
  mediaDownloadUrl: Scalars['String']['output']
  mediaId: Scalars['ID']['output']
  mediaUrl: Scalars['String']['output']
  signedUrl: Scalars['String']['output']
  urls: Maybe<MediaUrls>
}

export type Slate = {
  __typename: 'Slate'
  blocks: Array<Block>
  id: Maybe<Scalars['String']['output']>
  restrictions: Maybe<SlateRestrictions>
  rootBlock: Scalars['String']['output']
}

export type SlateInput = {
  blocks: Array<BlockInput>
  rootBlock: Scalars['String']['input']
}

export type SlateRestrictions = {
  __typename: 'SlateRestrictions'
  lockedChildrenBlocks: Maybe<Array<Scalars['String']['output']>>
  nonEditableBlocks: Maybe<Array<Scalars['String']['output']>>
  nonRemovableBlocks: Maybe<Array<Scalars['String']['output']>>
}

export type SsoUrl = {
  __typename: 'SsoUrl'
  url: Scalars['String']['output']
}

export type SsoUrlInput = {
  callbackUrl: Scalars['String']['input']
}

export enum StoreItemStanding {
  Official = 'OFFICIAL',
  Regular = 'REGULAR',
  Verified = 'VERIFIED',
}

export enum StoreItemStatus {
  Deleted = 'DELETED',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Template = {
  __typename: 'Template'
  about: Maybe<Scalars['String']['output']>
  appIds: Array<Scalars['String']['output']>
  apps: Maybe<Array<App>>
  authorName: Maybe<Scalars['String']['output']>
  authorUrl: Maybe<Scalars['String']['output']>
  banner: Maybe<Media>
  bannerId: Maybe<Scalars['ID']['output']>
  categories: Array<Scalars['String']['output']>
  comingSoon: Scalars['Boolean']['output']
  createdAt: Scalars['DateTime']['output']
  createdById: Maybe<Scalars['ID']['output']>
  description: Maybe<Scalars['String']['output']>
  embedIds: Array<Scalars['ID']['output']>
  embeds: Maybe<Array<Embed>>
  entityProperties: Scalars['String']['output']
  entityType: TemplateEntityType
  favicon: Maybe<Media>
  faviconId: Maybe<Scalars['ID']['output']>
  hubContent: Maybe<HubContent>
  hubContentId: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image: Maybe<Media>
  imageId: Maybe<Scalars['ID']['output']>
  imageIds: Array<Scalars['ID']['output']>
  images: Maybe<Array<Media>>
  installed: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  network: Maybe<Network>
  networkId: Scalars['ID']['output']
  onFreePlan: Scalars['Boolean']['output']
  privacyPolicyUrl: Maybe<Scalars['String']['output']>
  requiredTemplateIds: Array<Scalars['String']['output']>
  requiredTemplates: Maybe<Array<Template>>
  slate: Maybe<Slate>
  slug: Scalars['String']['output']
  standing: StoreItemStanding
  status: StoreItemStatus
  termsOfServiceUrl: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  updatedById: Maybe<Scalars['ID']['output']>
}

export type TemplateData = {
  __typename: 'TemplateData'
  data: Scalars['String']['output']
  memberId: Scalars['String']['output']
  preHeaderText: Scalars['String']['output']
  subject: Scalars['String']['output']
}

export type TemplateDataInput = {
  data: Scalars['String']['input']
  memberId: Scalars['String']['input']
  preHeaderText: Scalars['String']['input']
  subject: Scalars['String']['input']
}

export type TemplateEdge = {
  __typename: 'TemplateEdge'
  cursor: Scalars['String']['output']
  node: Template
}

export enum TemplateEntityType {
  Collection = 'Collection',
  Network = 'Network',
  Post = 'Post',
  PostType = 'PostType',
  Space = 'Space',
  SpaceContentModule = 'SpaceContentModule',
  SpacePostType = 'SpacePostType',
  Tag = 'Tag',
}

export type TestAppWebhookInput = {
  webhookUrl: Scalars['String']['input']
}

export enum TextTypeOptions {
  FullText = 'fullText',
  ShortText = 'shortText',
}

export type Theme = {
  __typename: 'Theme'
  colorTokens: Maybe<ThemeColorTokens>
  colors: Maybe<ThemeColors>
  id: Scalars['String']['output']
  name: Maybe<Scalars['String']['output']>
  typography: Maybe<Array<ThemeToken>>
}

export type ThemeColor = {
  __typename: 'ThemeColor'
  key: Scalars['String']['output']
  weights: Array<ThemeToken>
}

export type ThemeColorToken = {
  __typename: 'ThemeColorToken'
  key: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type ThemeColorTokens = {
  __typename: 'ThemeColorTokens'
  dark: Maybe<Array<ThemeColorToken>>
  light: Maybe<Array<ThemeColorToken>>
}

export type ThemeColors = {
  __typename: 'ThemeColors'
  dark: Maybe<Array<ThemeColor>>
  light: Maybe<Array<ThemeColor>>
}

export type ThemeToken = {
  __typename: 'ThemeToken'
  key: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type UpdateAppCustomCodes = {
  body?: InputMaybe<Scalars['String']['input']>
  head?: InputMaybe<Scalars['String']['input']>
}

export type UpdateAppInput = {
  about?: InputMaybe<Scalars['String']['input']>
  authorName?: InputMaybe<Scalars['String']['input']>
  authorUrl?: InputMaybe<Scalars['String']['input']>
  bannerId?: InputMaybe<Scalars['String']['input']>
  collaborators?: InputMaybe<Array<Scalars['String']['input']>>
  comingSoon?: InputMaybe<Scalars['Boolean']['input']>
  customCodes?: InputMaybe<UpdateAppCustomCodes>
  description?: InputMaybe<Scalars['String']['input']>
  docsUrl?: InputMaybe<Scalars['String']['input']>
  dynamicBlocks?: InputMaybe<Array<CreateDynamicBlockInput>>
  faviconId?: InputMaybe<Scalars['String']['input']>
  federatedSearchEnabled?: InputMaybe<Scalars['Boolean']['input']>
  federatedSearchUrl?: InputMaybe<Scalars['String']['input']>
  imageId?: InputMaybe<Scalars['String']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  isConsentManagementPlatform?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  onFreePlan?: InputMaybe<Scalars['Boolean']['input']>
  privacyPolicyUrl?: InputMaybe<Scalars['String']['input']>
  redirectUris?: InputMaybe<Array<Scalars['String']['input']>>
  requiredPermissions?: InputMaybe<Array<PrimaryScopes>>
  requiredTemplates?: InputMaybe<AppRequiredTemplatesInput>
  shortcuts?: InputMaybe<Array<CreateShortcutInput>>
  slug?: InputMaybe<Scalars['String']['input']>
  standing?: InputMaybe<StoreItemStanding>
  termsOfServiceUrl?: InputMaybe<Scalars['String']['input']>
  webhookSubscriptions?: InputMaybe<Array<Scalars['String']['input']>>
  webhookUrl?: InputMaybe<Scalars['String']['input']>
}

export type UpdateDynamicBlockInput = {
  contexts?: InputMaybe<Array<PermissionContext>>
  description?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['String']['input']>
  imageId?: InputMaybe<Scalars['String']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  key?: InputMaybe<Scalars['String']['input']>
  maxSize?: InputMaybe<DynamicBlockSize>
  name?: InputMaybe<Scalars['String']['input']>
  staffOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateGlobalMemberInput = {
  locale?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  profilePictureId?: InputMaybe<Scalars['ID']['input']>
}

export type UpdateShortcutInput = {
  context?: InputMaybe<PermissionContext>
  description?: InputMaybe<Scalars['String']['input']>
  entityType?: InputMaybe<Scalars['String']['input']>
  faviconId?: InputMaybe<Scalars['ID']['input']>
  interactionUrl?: InputMaybe<Scalars['String']['input']>
  key?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  states?: InputMaybe<Array<ShortcutStateInput>>
}

export type UtmInput = {
  gclid?: InputMaybe<Scalars['String']['input']>
  utmCampaign?: InputMaybe<Scalars['String']['input']>
  utmContent?: InputMaybe<Scalars['String']['input']>
  utmMedium?: InputMaybe<Scalars['String']['input']>
  utmSource?: InputMaybe<Scalars['String']['input']>
  utmTerm?: InputMaybe<Scalars['String']['input']>
}

export type AuthFormLoginWithSsoCodeQueryQueryVariables = Exact<{
  input: LoginWithSsoCodeInput
}>

export type AuthFormLoginWithSsoCodeQueryQuery = {
  loginWithSsoCode: {
    __typename: 'GlobalToken'
    accessToken: string
    email: string
  }
}

export type HooksSegmentIdentifyAuthMemberQueryQueryVariables = Exact<{
  [key: string]: never
}>

export type HooksSegmentIdentifyAuthMemberQueryQuery = {
  authMember: {
    __typename: 'GlobalMember'
    id: string
    name: string | null
    email: string
    createdAt: unknown
  }
}

export type AuthFormSsoUrlQueryQueryVariables = Exact<{
  input: SsoUrlInput
}>

export type AuthFormSsoUrlQueryQuery = {
  ssoUrl: { __typename: 'SsoUrl'; url: string }
}

export type AuthFormRequestGlobalTokenCodeMutationMutationVariables = Exact<{
  input: RequestGlobalTokenInput
}>

export type AuthFormRequestGlobalTokenCodeMutationMutation = {
  requestGlobalTokenCode: { __typename: 'Action'; status: ActionStatus }
}

export type VerifyFormResendGlobalTokenCodeMutationMutationVariables = Exact<{
  input: RequestGlobalTokenInput
}>

export type VerifyFormResendGlobalTokenCodeMutationMutation = {
  resendGlobalTokenCode: { __typename: 'Action'; status: ActionStatus }
}

export type AuthFormValidateEmailMutationMutationVariables = Exact<{
  input: RequestGlobalTokenInput
}>

export type AuthFormValidateEmailMutationMutation = {
  validateEmail: {
    __typename: 'EmailValidationResult'
    valid: boolean
    suggestion: string | null
  }
}

export type VerifyFormGlobalTokenQueryQueryVariables = Exact<{
  input: GlobalTokenInput
}>

export type VerifyFormGlobalTokenQueryQuery = {
  globalToken: { __typename: 'GlobalToken'; accessToken: string; email: string }
}

export type ProfileFormAuthMemberQueryQueryVariables = Exact<{
  [key: string]: never
}>

export type ProfileFormAuthMemberQueryQuery = {
  authMember: {
    __typename: 'GlobalMember'
    id: string
    name: string | null
    email: string
    profilePictureId: string | null
  }
}

export type ProfileFormUpdateAuthMemberMutationMutationVariables = Exact<{
  input: UpdateGlobalMemberInput
}>

export type ProfileFormUpdateAuthMemberMutationMutation = {
  updateAuthMember: {
    __typename: 'GlobalMember'
    id: string
    name: string | null
  }
}

export type CreateImagesMutationMutationVariables = Exact<{
  input: Array<CreateImageInput> | CreateImageInput
}>

export type CreateImagesMutationMutation = {
  createImages: Array<{
    __typename: 'SignedUrl'
    fields: string
    mediaId: string
    mediaUrl: string
    mediaDownloadUrl: string
    signedUrl: string
    urls: {
      __typename: 'MediaUrls'
      full: string
      large: string
      medium: string
      small: string
      thumb: string
    } | null
  }>
}

export type ProfileMenuAvatarAuthMemberQueryQueryVariables = Exact<{
  [key: string]: never
}>

export type ProfileMenuAvatarAuthMemberQueryQuery = {
  authMember: {
    __typename: 'GlobalMember'
    id: string
    name: string | null
    email: string
    profilePicture:
      | { __typename: 'Emoji' }
      | { __typename: 'File' }
      | { __typename: 'Glyph' }
      | { __typename: 'Image'; id: string; url: string }
      | null
  }
}

export type OnboardingTriggerNetworkListQueryQueryVariables = Exact<{
  [key: string]: never
}>

export type OnboardingTriggerNetworkListQueryQuery = {
  networks: Array<{ __typename: 'Network'; id: string }>
}

export const AuthFormLoginWithSsoCodeQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuthFormLoginWithSsoCodeQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginWithSsoCodeInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'loginWithSsoCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthFormLoginWithSsoCodeQueryQuery,
  AuthFormLoginWithSsoCodeQueryQueryVariables
>
export const HooksSegmentIdentifyAuthMemberQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'hooksSegmentIdentifyAuthMemberQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authMember' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HooksSegmentIdentifyAuthMemberQueryQuery,
  HooksSegmentIdentifyAuthMemberQueryQueryVariables
>
export const AuthFormSsoUrlQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuthFormSsoUrlQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SsoUrlInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ssoUrl' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthFormSsoUrlQueryQuery,
  AuthFormSsoUrlQueryQueryVariables
>
export const AuthFormRequestGlobalTokenCodeMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthFormRequestGlobalTokenCodeMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RequestGlobalTokenInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestGlobalTokenCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthFormRequestGlobalTokenCodeMutationMutation,
  AuthFormRequestGlobalTokenCodeMutationMutationVariables
>
export const VerifyFormResendGlobalTokenCodeMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'VerifyFormResendGlobalTokenCodeMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RequestGlobalTokenInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resendGlobalTokenCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyFormResendGlobalTokenCodeMutationMutation,
  VerifyFormResendGlobalTokenCodeMutationMutationVariables
>
export const AuthFormValidateEmailMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthFormValidateEmailMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RequestGlobalTokenInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'validateEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'valid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'suggestion' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthFormValidateEmailMutationMutation,
  AuthFormValidateEmailMutationMutationVariables
>
export const VerifyFormGlobalTokenQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VerifyFormGlobalTokenQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GlobalTokenInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'globalToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyFormGlobalTokenQueryQuery,
  VerifyFormGlobalTokenQueryQueryVariables
>
export const ProfileFormAuthMemberQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProfileFormAuthMemberQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authMember' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profilePictureId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProfileFormAuthMemberQueryQuery,
  ProfileFormAuthMemberQueryQueryVariables
>
export const ProfileFormUpdateAuthMemberMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ProfileFormUpdateAuthMemberMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateGlobalMemberInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAuthMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProfileFormUpdateAuthMemberMutationMutation,
  ProfileFormUpdateAuthMemberMutationMutationVariables
>
export const CreateImagesMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateImagesMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'CreateImageInput' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createImages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fields' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mediaId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mediaUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mediaDownloadUrl' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'signedUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'urls' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'full' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'large' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medium' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'thumb' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateImagesMutationMutation,
  CreateImagesMutationMutationVariables
>
export const ProfileMenuAvatarAuthMemberQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProfileMenuAvatarAuthMemberQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authMember' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profilePicture' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'Image' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProfileMenuAvatarAuthMemberQueryQuery,
  ProfileMenuAvatarAuthMemberQueryQueryVariables
>
export const OnboardingTriggerNetworkListQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OnboardingTriggerNetworkListQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'networks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnboardingTriggerNetworkListQueryQuery,
  OnboardingTriggerNetworkListQueryQueryVariables
>
