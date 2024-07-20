export const BASE_URL = `http://localhost:3000`;

export const headers = {
  "Content-Type": "application/json",
  authorization: `${JSON.parse(localStorage.getItem("jwt"))}`,
};

export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
