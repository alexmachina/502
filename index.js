const http = require("http");
const notifier = require("node-notifier");

const jiraUrl = "";

http
  .get(jiraUrl, (res) => {
    let data = [];

    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      console.log("Status Code:", res.statusCode);
      if (res.statusCode > 400) {
        notifier.notify({
          title: "Jira is Down",
          message: "Erro " + res.statusCode,
        });
      }
    });
  })
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
