import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.post("/", async (req, res) => {
  const { messages, apiKey, orgId } = req.body;
  const configuration = new Configuration({
    organization: orgId,
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant to create web application using Javascript, html3, css5 and other web technologies.",
        },
        ...messages,
      ],
      temperature: 0.6,
    });

    res.json({ completion: completion.data.choices[0].message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`app listening at port: ${port}`);
});
