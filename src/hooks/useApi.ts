import { useEffect, useState } from 'react';
import { baseApiUrl } from 'utils';

/* eslint-disable camelcase */

export interface NFTList {
  nfts: NFTObjectData[],
  total_count: number
}
export interface NFTObjectData {
  baseID?: string;

  name: string;
  description: string;
  price: string;
  image: string;

  mintTransactionHash?: string;
  updatedAt?: number;
  createdAt?: number;
  initialCreatorAddress?: string;
  ownerAddress?: string;
  tokenID?: number;

  voteCount?: number;
  listed?: boolean;
  attributes?: [];
  category?: [];

  approved?: boolean;
  verified?: boolean;
}

export interface NFTUser {
  userBio: string;
  username: string;
  banned: boolean;
  verified: boolean;
  walletAddress: string;
  accountCreatedAt: Date;
  socialUrl: string;
  updatedAt: Date;
  userAvatarUrl: string;
  userBackgroupUrl: string;
}

export interface NFTEvent {
  doneOn: number;
  eventType: number;
  nftIDSold: number;
  transactionHash: string;

  minter: string;

  seller: string;
  buyer: string;
  nftSoldAtPrice: number;

  priceUpdater: string;
  newNftPrice: number;
  oldNftPrice: number;
}

export interface NFTDetail {
  nft: NFTObjectData;
  creator: NFTUser;
  owner: NFTUser;
  historyEvents: NFTEvent[];
  relatedNFTs: NFTObjectData[];
}

export interface NFTUserFullDetail {
  user_profile: NFTUser;
  userNfts: {
    createdNfts: NFTObjectData[];
    currentNfts: NFTObjectData[];
    boughtNfts: NFTObjectData[];
    soldNfts: NFTObjectData[];
  };
}

export interface NFTTopArtist {
  user: NFTUser;
  soldAmount: number;
  createdNFTs: NFTObjectData[];
}

export const useGetNFTList = ({ start, count, category = '', sort_field = '', sort_order = '', search_key = '' }) => {
  const [data, setData] = useState<NFTList>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/nfts?start=${start}&count=${count}&category=${category}&sort_field=${sort_field}&sort_order=${sort_order}&search_key=${search_key}`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const nftObjectList: NFTList = responseData;
          setData(nftObjectList);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData, start, count, category, sort_field, sort_order, search_key]);

  return data;
};

export const useGetNFTDetail = baseID => {
  const [data, setData] = useState<NFTDetail>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/nfts/${baseID}`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const nftDetail: NFTDetail = responseData.nftDetail;
          setData(nftDetail);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData, baseID]);

  return data;
};

export const useGetUserList = () => {
  const [data, setData] = useState<NFTUser[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/users`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const userList: NFTUser[] = responseData.users;
          setData(userList);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData]);

  return data;
};

export const useGetNFTTopArtists = () => {
  const [data, setData] = useState<NFTTopArtist[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/top_users`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const nftTopArtists: NFTTopArtist[] = responseData.data;
          setData(nftTopArtists);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData]);

  return data;
};

export const useGetNFTUserFullDetail = walletAddress => {
  const [data, setData] = useState<NFTUserFullDetail>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/user_nfts/${walletAddress}`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const nftUserFullDetail: NFTUserFullDetail = responseData.data;
          setData(nftUserFullDetail);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData, walletAddress]);

  return data;
};

export const useGetNFTUserProfile = walletAddress => {
  const [data, setData] = useState<NFTUser>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const strUrl = `${baseApiUrl}/users/${walletAddress}`;
        const response = await fetch(strUrl);
        const responseData = await response.json();
        if (responseData.status === 'success') {
          const nftUser: NFTUser = responseData.user_profile;
          setData(nftUser);
        }
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData, walletAddress]);

  return data;
};
