/*__________________________________________________________________HELPER FUNCTIONS TO RENDER PAGE__________________________________________________________________*/

// Fetch quotes with given amount and output it to given element
async function fetchQuotes(amount, elemID) {
  let quotesCSV = "";
  const code_output = document.getElementById(elemID);
  fetch(`/api/quotes/${amount}`)

    .then((res) => res.json())

    .then((arr) => {
      if (arr.status === 200) {
        switch (elemID) {

          // Sample outputs for fetch all and fetch multiple quotes cases with JSON syntax indentation

          case "all-fetch-output":
            code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>&nbsp;&nbsp;&nbsp;&nbsp;"${arr.data[0]}"<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;//all the other quotes<br>&nbsp;&nbsp;&nbsp;&nbsp;"${arr.data[1]}"<br>&nbsp;&nbsp;]<br>}`;
            break;

          case "multiple-fetch-output":
            arr.data.forEach((quote) => {
              quotesCSV += `&nbsp;&nbsp;&nbsp;&nbsp;\"${quote}\",<br>`;
            });
            code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>${quotesCSV}&nbsp;&nbsp;]<br>}`;
            break;

          default:
            code_output.innerHTML = "";
            break;
        }
      }
    }).catch(err => {
      code_output.innerHTML = `Error ${err} occured while fetching results. Try reloading the page.`;
    });
}

// Fetch with invalid param
async function badFetch(param, elemID) {
  const code_output = document.getElementById(elemID);
  fetch(`/api/quotes/${param}`)

    .then((res) => res.json())

    .then((err_msg) => {
      code_output.innerHTML = `{<br>&nbsp;&nbsp;status: ${err_msg.status},<br>&nbsp;&nbsp;error: "${err_msg.error}"<br>}`;
    })

    .catch(err => {
      code_output.innerHTML = `Error ${err} occured while fetching results. Try reloading the page.`;
    });
}

// Fetch quotes matching query
async function fetchWithQuery(query, elemID) {
  let quotesCSV = "";
  const code_output = document.getElementById(elemID);
  fetch(`/api/quotes/search/${query}`)

    .then((res) => res.json())

    .then((arr) => {
      if (arr.status === 200) {

        // Marking keywords found in the text
        arr.data.forEach((quote) => {
          quotesCSV += `&nbsp;&nbsp;&nbsp;&nbsp;\"${quote.replace(
            new RegExp(query, "ig"),
            `<mark>$&</mark>`
          )}\",<br>`;
        });
        code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>${quotesCSV}&nbsp;&nbsp;]<br>}`;
      }
    })

    .catch(err => {
      code_output.innerHTML = `Error ${err} occured while fetching results. Try reloading the page.`;
    });
}

// Bad fetch with empty query
async function badFetchWithoutQuery(param, elemID) {
  const code_output = document.getElementById(elemID);
  fetch(`/api/quotes/search/${param}`)

    .then((res) => res.json())

    .then((err_msg) => {
      code_output.innerHTML = `{<br>&nbsp;&nbsp;status: ${err_msg.status},<br>&nbsp;&nbsp;error: "${err_msg.error}"<br>}`;
    })
    
    .catch(err => {
      code_output.innerHTML = `Error ${err} occured while fetching results. Try reloading the page.`;
    });
}

fetchQuotes(2, "all-fetch-output");
fetchQuotes(3, "multiple-fetch-output");
fetchWithQuery("em", "search-output");
badFetchWithoutQuery("", "bad-search-output");
badFetch(15, "bad-fetch-output-limit");
badFetch("invalidparam", "bad-fetch-output-param");
