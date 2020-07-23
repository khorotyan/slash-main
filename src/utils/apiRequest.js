import axios from "axios";

const apiRequest = async ({
  method,
  url,
  headers,
  data,
  params,
  userContext,
  history,
}) => {
  try {
    const result = await axios({ method, url, headers, data, params });

    return result;
  } catch (error) {
    // If db connection issue, show related error
    if (!error.response) {
      error.response = {
        data: { message: "Connection issue, please try again later" },
      };
    }

    // If user token expires, refresh token
    if (error.response.status === 401 && error.response.data.id === 6) {
      try {
        // Retrieve new access token
        const refreshTokenResult = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/users/refresh-token`,
          data: {
            email: userContext.localUser.email,
            refreshToken: userContext.localUser.refreshToken,
          },
        });

        const newAccessToken = refreshTokenResult.data.accessToken;
        userContext.updateLocalUser({
          accessToken: newAccessToken,
        });

        // Make the user request again
        const result = await axios({
          method,
          url,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          data,
          params,
        });

        return result;
      } catch (error) {
        // If the refresh token is invalid, logout the user
        userContext.logoutUser();
        history.push("/login");

        throw error;
      }
    }

    throw error;
  }
};

export default apiRequest;
