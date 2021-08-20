import { Profile } from 'state/types'
import { baseApiUrl } from 'utils';

const getProfile = async (address: string): Promise<Profile> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet_address: address })
    };

    const response = await fetch(`${baseApiUrl}/get_or_add_nft_user`, requestOptions)

    if (!response.ok) return null;

    const responseData = await response.json()
    if (responseData.status === "success") {
      const dataUserProfile: Profile = responseData.user_detail
      return dataUserProfile
    }
    
    return null
  } catch (error) {
    return null
  }
}

export default getProfile
