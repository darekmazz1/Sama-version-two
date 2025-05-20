export const validateEmail = (email) => {
  if (!email) {
    return "Email cannot be empty";
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Invalid email format";
  }

  return null;
};

export const validateName = (name) => {
  if (!name?.trim()) {
    return "Name cannot be empty";
  }
  if (typeof name !== "string") {
    return "Name must be a valid string";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }

  return null;
};

export const validateMessage = (message) => {
  if (!message?.trim()) {
    return "Phone message cannot be empty";
  }

  if (message?.length < 4) {
    return "message must be at least 4 characters long";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password cannot be empty";
  }

  // if (password.length < 8) {
  //   return "Password must be at least 8 characters long";
  // }

  // if (!/[A-Z]/.test(password)) {
  //   return "Password must contain at least one uppercase letter";
  // }

  // if (!/[a-z]/.test(password)) {
  //   return "Password must contain at least one lowercase letter";
  // }

  return null;
};
