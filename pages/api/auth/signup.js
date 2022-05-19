export default async function handler(req, res) {
  let person = {};
  person = JSON.parse(req.body);
  try {
    const test = await fetch(
      "https://foliolens-backend.herokuapp.com/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
        },
      }
    );
    let data = await test.json();
    if (data.statusCode === 403) {
      res.status(403).json({ status: data.message });
    }
    if (data?.access_token) {
      res.status(200).json({ status: "User successfully created" });
    }
  } catch (error) {
    res.status(403).json({ status: "User could not be created" });
  }
}
