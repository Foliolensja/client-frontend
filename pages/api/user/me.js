import { getSession } from "next-auth/react";

const fetchIndices = async (bearer) => {
  let res = await fetch("https://foliolens-backend.herokuapp.com/users/me", {
    method: "GET",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
      "Accept-Language": "en-US",
    },
  });

  let data = res.json();
  return data;
};

export default async function handler(req, res) {
  const session = await getSession({ req });
  let token = session.user.accessToken;
  let bearer = "Bearer " + token;

  let user = await fetchIndices(bearer);

  res.status(200).json({ user });
}
