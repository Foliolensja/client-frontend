export default async function handler(req, res) {
  let person = {};
  let user = JSON.parse(req.body);
  console.log(user);
  try {
    const test = await fetch(
      "https://foliolens-backend.herokuapp.com/portfolios/test",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
        },
      }
    );
    let data = await test.json();
    console.log(data);
    if (data.statusCode === 403) {
      res.status(403).json({ status: data.message });
    }

    res.status(200).json({ status: "Started to generate the portfolio" });
  } catch (error) {
    res.status(403).json({ status: "Could not generate" });
  }
}
