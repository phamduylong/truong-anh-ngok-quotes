# BLV Anh Ngok's Quotes

## About

An API to generate quotes from Truong Anh Ngoc (Vietnamese Representative at France Football to participate in voting for the famous Ballon d'Or annually).

[Frontpage](https://blv-anh-ngok-said.onrender.com/)

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

```bash
[
    "Mọi chuyện không như em nghĩ đâu"
]
```

#### `GET /api/quotes/{amount}`

Get a number of random quotes (max. 10):
> [https://blv-anh-ngok-said.onrender.com/api/quotes/5](https://blv-anh-ngok-said.onrender.com/api/quotes/5)

```bash
[
    "Trình thấp nó thế em ạ",
    "Chuẩn, hoàn toàn chuẩn! Nhưng mình .. nhưng bạn đã bị block vì bạn không tôn trọng mình!",
    "Anh biết, nhưng như thế là quá ít",
    "Điều đó quan trọng với em lắm sao?",
    "Ồ, sao em lại nói thế?"
]
```

## Contributing

All contributions are welcomed. Add missing quotes by putting them into [quotes.js](https://github.com/phamduylong/truong-anh-ngok-quotes/blob/main/public/assets/quotes.js) and create a PR, I'll review and merge it if everything is in order.
