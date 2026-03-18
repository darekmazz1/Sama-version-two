import axios from "axios";

// export const ULR_BACKEND = "http://localhost:1337/api/";
export const ULR_BACKEND = "https://kind-courtesy-production.up.railway.app/api/";

export const GetInformation = async ({ url }) => {
  if (!url) return;
  try {
    const response = await axios.get(`${ULR_BACKEND}${url}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }Li8s
};

export const RegisterUser = async ({ email, username, password, firstName, lastName }) => {
  try {
    const response = await axios.post(`${ULR_BACKEND}auth/local/register`, {
      email,
      password,
      username,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || { message: "error registering user try again" } };
  }
};

export const LoginUser = async ({ identifier, password }) => {
  try {
    const response = await axios.post(`${ULR_BACKEND}auth/local`, {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || { message: "error login user try again" } };
  }
};

export const SendRecoveryPassword = async ({ email }) => {
  try {
    const response = await axios.post(`${ULR_BACKEND}auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || { message: "error login user try again" } };
  }
};

export const resetPassword = async ({ code, password, passwordConfirmation }) => {
  try {
    const response = await axios.post(`${ULR_BACKEND}auth/reset-password`, {
      code,
      password,
      passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return { error: error.response?.data || { message: "Error restableciendo la contraseña" } };
  }
};

export async function likeUser(id) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!storedUser) {
    throw new Error("No user is logged in");
  }

  const url = `${ULR_BACKEND}users/${storedUser.id}?populate[events][fields][0]=id`;

  try {
    const userData = await getEventsUser();
    const events = userData?.events;

    const currentIds = events ? events?.map((item) => item.id) : [];

    let updateInformation;
    if (currentIds.includes(id)) {
      updateInformation = currentIds.filter((currentId) => currentId !== id);
    } else {
      updateInformation = [...currentIds, id];
    }

    await axios.put(
      url,
      {
        events: updateInformation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return updateInformation;
  } catch (error) {
    console.error("Error in likeUser:", error);
    throw error;
  }
}

export const getEventsUser = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const url = `${ULR_BACKEND}users/${storedUser.id}?populate[events][fields][0]=id`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getEventsUser:", error);
    throw error;
  }
};

export const getAllContentEventsUser = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const url = `${ULR_BACKEND}users/${storedUser.id}?populate[events][populate][image][fields]=url&pagination[pageSize]=9999`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.events;
  } catch (error) {
    console.error("Error in getEventsUser:", error);
    throw error;
  }
};
