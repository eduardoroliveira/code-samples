// from: npm i https @types/node
import { get } from "node:https";

const ENDPOINT = "https://jsonplaceholder.typicode.com/posts" as const;

export const callbackToResponseExample = async () =>
  new Promise((resolve, reject) =>
    get(ENDPOINT, (response) => {
      console.log("statusCode:", response.statusCode);
      console.log("headers:", response.headers);
      let result = "";
      response.on("data", (d) => {
        result += d;
      });
      response.on("close", () => resolve(result));
    }).on("error", (error) => reject(error))
  );

callbackToResponseExample().then((result) =>
  console.log({
    result: typeof result === "string" ? JSON.parse(result) : result,
  })
);
