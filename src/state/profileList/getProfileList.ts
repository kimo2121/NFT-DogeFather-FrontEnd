import { Profile } from 'state/types'
import { baseApiUrl } from 'utils';

const getProfileList = async (): Promise<Profile[]> => {
  try {
    const response = await fetch(`${baseApiUrl}/users`)

    if (!response.ok) return null;

    const responseData = await response.json()
    if (responseData.status === "success") {
      const profileList: Profile[] = responseData.users;
      return profileList
    }

    return null
  } catch (error) {
    return null
  }
}

export default getProfileList
