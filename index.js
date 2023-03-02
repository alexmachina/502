import notifier from "node-notifier";
import fetch from "node-fetch";

const jiraUrl = "http://localhost:3000/api/jira";
const intervalInMinutes = 5;

checkJira();
setInterval(checkJira, toMs(intervalInMinutes));

async function checkJira() {
  const response = await fetch(jiraUrl);
  const status = response.status;
  console.log(status);
  if (status > 400) {
    notifier.notify({
      title: "Jira is down",
      message: "Status Code " + status,
    });
  }
}

function toMs(minutes) {
  return minutes * 60 * 1000;
}
