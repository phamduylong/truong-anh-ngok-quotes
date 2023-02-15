async function fetchQuotes(amount, elem) {
  let fetched_data = "";
  const code_output = document.getElementById(elem);
  fetch(`/api/quotes/${amount}`)
    .then((res) => res.json())
    .then((arr) => {
      if (arr.status === 200) {
        if (elem === "all-fetch-output") {
          code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>&nbsp;&nbsp;&nbsp;&nbsp;"${arr.data[0]}"<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;//all the other quotes<br>&nbsp;&nbsp;&nbsp;&nbsp;"${arr.data[1]}"<br>&nbsp;&nbsp;]<br>}`;
        } else {
          arr.data.forEach((quote) => {
            fetched_data += `&nbsp;&nbsp;&nbsp;&nbsp;\"${quote}\",<br>`;
          });
          code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>${fetched_data}&nbsp;&nbsp;]<br>}`;
        }
      }
    });
}

async function badFetch(param, elem) {
  const code_output = document.getElementById(elem);
  fetch(`/api/quotes/${param}`)
    .then((res) => res.json())
    .then((err_res) => {
      code_output.innerHTML = `{<br>&nbsp;&nbsp;status: ${err_res.status},<br>&nbsp;&nbsp;error: "${err_res.error}"<br>}`;
    });
}

async function fetchWithQuery(query, elem) {
  let fetched_data = "";
  const code_output = document.getElementById(elem);
  fetch(`/api/quotes/search/${query}`)
  .then((res) => res.json())
  .then((arr) => {
    if (arr.status === 200) {
      arr.data.forEach((quote) => {
        fetched_data += `&nbsp;&nbsp;&nbsp;&nbsp;\"${quote.replace(new RegExp(query, "ig"), `<mark>$&</mark>`)}\",<br>`;
      });
      code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>${fetched_data}&nbsp;&nbsp;]<br>}`;
    }
  });
}

async function badFetchWithoutQuery(param, elem) {
  const code_output = document.getElementById(elem);
  fetch(`/api/quotes/search/${param}`)
    .then((res) => res.json())
    .then((err_res) => {
      code_output.innerHTML = `{<br>&nbsp;&nbsp;status: ${err_res.status},<br>&nbsp;&nbsp;error: "${err_res.error}"<br>}`;
    });
}

window.addEventListener('load', () => {
  fetchQuotes(2, "all-fetch-output");
  fetchQuotes(3, "multiple-fetch-output");
  fetchWithQuery("em", "search-output");
  badFetchWithoutQuery("", "bad-search-output");
  badFetch(15, "bad-fetch-output-limit");
  badFetch("invalidparam", "bad-fetch-output-param");
});



