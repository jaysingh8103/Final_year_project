import axios from 'axios';

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getUserFromGoogleOAuthAPI = async (
  accessToken: string
): Promise<GoogleUser | null> => {
  try {
    // API call to fetch user information
    const response = await axios.get<GoogleUser>('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    // Return the user data if successful
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      console.error('Google OAuth API Axios Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }

    return null; // Return null in case of an error
  }
};
