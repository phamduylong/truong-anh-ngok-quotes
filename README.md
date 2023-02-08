# BLV Anh Ngok's Quotes

## About

An API to generate quotes from Truong Anh Ngoc (Vietnamese Representative at France Football to participate in voting for the famous Ballon d'Or annually).

[Project Frontpage](https://blv-anh-ngok-said.onrender.com/)

## Setup

### Cloning
```bash
git clone https://github.com/phamduylong/truong-anh-ngok-quotes.git
```

### Install packages
```bash
npm install
```

### Rollup
```bash
npm run dev
```

## API Endpoints

#### `GET /api/quotes`

Get a random quote as below:
> [https://blv-anh-ngok-said.onrender.com/api/quotes](https://blv-anh-ngok-said.onrender.com/api/quotes)

```json
{
    status: 200,
    data: [
        "Mọi chuyện không như em nghĩ đâu"
    ]
}
```

#### `GET /api/quotes/{amount}`

Generate a number of random quotes (max. 10):
> [https://blv-anh-ngok-said.onrender.com/api/quotes/5](https://blv-anh-ngok-said.onrender.com/api/quotes/5)

```json
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

```json
{
    status: 400,
    error: "Fetch amount has to be larger than 0 and less than or equal to 10!"
}
```

> [https://blv-anh-ngok-said.onrender.com/api/quotes/sometext](https://blv-anh-ngok-said.onrender.com/api/quotes/somtext)

```json
{
    status: 400,
    error: "Fetch limit has to a number!"
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
)

func main() {

	url := "https://blv-anh-ngok-said.onrender.com/api/quotes/3"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

### Bash

```bash
curl --request GET \
        --url 'https://blv-anh-ngok-said.onrender.com/api/quotes/3'
```


## Contributing

All contributions are welcomed. Add missing quotes by putting them into [quotes.js](https://github.com/phamduylong/truong-anh-ngok-quotes/blob/main/public/assets/quotes.js) and create a PR, I'll review and merge it if everything is in order.
