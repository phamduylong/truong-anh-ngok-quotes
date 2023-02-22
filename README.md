# BLV Anh Ngok's Quotes

## About

An API to generate quotes from Truong Anh Ngoc (Vietnamese Representative at France Football to participate in voting for the famous Ballon d'Or annually).

[API Frontpage (Singapore)](https://blv-anh-ngok-said.onrender.com/) 👈😃👉
[API Frontpage (Frankfurt)](https://anh-ngok-api-eu.onrender.com/)

## Setup

### Cloning
```bash
git clone https://github.com/phamduylong/truong-anh-ngok-quotes.git
```

### Install packages
```bash
npm install
```

### Redirect to Project's directory
```bash
cd truong-anh-ngok-quotes
```

### Rollup
```bash
npm run dev
```

## API Endpoints

#### `GET /api/quotes`

Get a random quote as below:
> [https://blv-anh-ngok-said.onrender.com/api/quotes](https://blv-anh-ngok-said.onrender.com/api/quotes)

```bash
{
    status: 200,
    data: [
        "Mọi chuyện không như em nghĩ đâu",
        ...
        "Chém gió tí cho vui mà em"
    ]
}
```

#### `GET /api/quotes/{amount}`

Generate a number of random quotes (max. 10):
> [https://blv-anh-ngok-said.onrender.com/api/quotes/1](https://blv-anh-ngok-said.onrender.com/api/quotes/1)

```bash
{
    status: 200,
    data: [
        "Anh biết, nhưng như thế là quá ít"
    ]
}
```

> [https://blv-anh-ngok-said.onrender.com/api/quotes/5](https://blv-anh-ngok-said.onrender.com/api/quotes/5)

```bash
{
    status: 200,
    data: [
        "Trình thấp nó thế em ạ",
        "Chuẩn, hoàn toàn chuẩn! Nhưng mình .. nhưng bạn đã bị block vì bạn không tôn trọng mình!",
        "Anh biết, nhưng như thế là quá ít",
        "Điều đó quan trọng với em lắm sao?",
        "Ồ, sao em lại nói thế?"
    ]
}
```

Error response format:
> [https://blv-anh-ngok-said.onrender.com/api/quotes/15](https://blv-anh-ngok-said.onrender.com/api/quotes/15)

```bash
{
    status: 400,
    error: "Fetch amount has to be larger than 0 and less than or equal to 10!"
}
```

#### `GET /api/quotes/search/{query}`

Get all quotes matching a search query:
> [https://blv-anh-ngok-said.onrender.com/api/quotes/search/em](https://blv-anh-ngok-said.onrender.com/api/quotes/search/em)

```bash
{
    status: 200,
    data: [
        "Em mail hoặc gọi hotline UEFA nhé. Họ sẽ giúp em.",
        "Anh không bao giờ nói vậy em nhé","Ồ, sao em lại nói thế?",
        "Mọi việc không như em nghĩ đâu","Điều đó quan trọng với em lắm sao?",
        "Trình thấp nó thế em ạ",
        "Chém gió tí cho vui mà em",
        "Anh sống như thế đấy em",
        "Thời gian sẽ trả lời thôi em",
        "Quá hài hước em ạ",
        "Càng đi nhiều, người ta càng không so sánh em ạ, vì không nơi nào giống nơi nào. 
        Đây là điều anh đã học được sau các chuyến đi."
    ]
}
```

## Examples

### NodeJs

```javascript
// using node fetch api

let amount = 3;
fetch(`https://blv-anh-ngok-said.onrender.com/api/quotes/${amount}`)
.then(res => res.json())
.then(res_obj => {
  if(res_obj.status === 200)
      res_obj.data.forEach(quote => {
        console.log(quote);
    })
})
.catch(err => {
    console.error(err);
});
```

### Python

```python
# using python and requests module

import requests
import json

amount = 3
response = requests.get('https://blv-anh-ngok-said.onrender.com/api/quotes/' + str(amount))
raw_data = response.text
parsed_json = json.loads(raw_data)

if parsed_json['status'] == 200:
  print(parsed_json['data'])
```

### Go

```go
// using go new request

package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
    "encoding/json"
    "strings"
)

func main() {

  type Response struct {
		Status int      `json:"status"`
		Data   []string `json:"data"`
	}

	url := "https://blv-anh-ngok-said.onrender.com/api/quotes/3"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
  
	content := Response{}
	json.Unmarshal([]byte(body), &content)

  if content.Status == 200 {
	 fmt.Printf(strings.Join(content.Data, "\n"))
  }
}
```

### PHP

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://blv-anh-ngok-said.onrender.com/api/quotes/3",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
  $json_data = json_decode($response);
	if ($json_data->{'status'} == 200) {
    foreach($json_data->{'data'} as $quote) {
      echo nl2br ("$quote\n");
    }
  }
}
```

### Bash

```bash
curl --request GET \
        --url 'https://blv-anh-ngok-said.onrender.com/api/quotes/3'
```


## Contributing

All contributions are welcomed. Add missing quotes by putting them into [quotes.js](https://github.com/phamduylong/truong-anh-ngok-quotes/blob/main/public/assets/quotes.js) and create a PR, I'll review and merge it if everything is in order.
