async function fetchQuotes(amount, elem) {
    let fetched_data = "";
    const code_output = document.getElementById(elem);
    fetch(`/api/quotes/${amount}`).
    then(res => res.json()).
    then(arr => {
        if(arr.status === 200)
        arr.data.forEach(quote => {
            fetched_data += `&nbsp;&nbsp;&nbsp;&nbsp;\"${quote}\",<br>`;
        });
        code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 200,<br>&nbsp;&nbsp;data: [<br>${fetched_data}&nbsp;&nbsp;]<br>}`;
    });
}

async function badFetch(param, elem) {
    const code_output = document.getElementById(elem);
    fetch(`/api/quotes/${param}`).
    then(res => res.json()).
    then(err_res => {
        code_output.innerHTML = `{<br>&nbsp;&nbsp;status: 400,<br>&nbsp;&nbsp;error: "${err_res.error}"<br>}`;
    });
}

fetchQuotes(1, "single-fetch-output");
fetchQuotes(3, "multiple-fetch-output");
badFetch(15, "bad-fetch-output-limit");
badFetch("invalidparam", "bad-fetch-output-param");