export default async function handler(req, res) {
  let user = JSON.parse(req.body);
  try {
    const test = await fetch(
      "https://foliolens-backend.herokuapp.com/portfolios/generate-portfolio",
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

    if (data.statusCode === 403) {
      res.status(403).json({ status: data.message });
    }

    res.status(200).json({ status: "Started to generate the portfolio" });
  } catch (error) {
    res.status(403).json({ status: error });
  }
}
