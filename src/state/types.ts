export interface Profile {
  walletAddress: string,
  balance: string,
  fiat_balance: string,
  username: string,
  userBio: string,
  userAvatarUrl: string,
  userBackgroupUrl: string,
  accountCreatedAt: number,
  updatedAt: number,
  banned: boolean,
  verified: boolean,

  socialUrl: string,

  websiteUrl: string,
  twitterUrl: string,
  instagramUrl: string,
  telegramUrl: string,
  discordUrl: string,
  youtubeUrl: string,
  facebookUrl: string,
  tiktokUrl: string,
  dribbleUrl: string,
  behanceUrl: string,

}

//////////////////////////////////// Profile State//////////////////////////////////////
export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  data: Profile
}

//////////////////////////////////// Profile List State//////////////////////////////////////
export interface ProfileListState {
  isInitialized: boolean
  isLoading: boolean
  data: Profile[]
}

//////////////////////////////////// Price State//////////////////////////////////////
export interface PriceApiList {
  /* eslint-disable camelcase */
  [key: string]: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export interface PriceApiListThunk {
  /* eslint-disable camelcase */
  [key: string]: number
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiList
}

export interface PriceApiThunk {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiListThunk
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: string
  data: PriceApiListThunk
}

// Global state

export interface State {
  // achievements: AchievementState
  // block: BlockState
  // farms: FarmsState
  prices: PriceState
  // pools: PoolsState
  // predictions: PredictionsState
  profile: ProfileState
  profileList: ProfileListState
  // teams: TeamsState
  // collectibles: CollectiblesState
}
