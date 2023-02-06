const quotes = [
  "Chuẩn, hoàn toàn chuẩn! Nhưng mình .. nhưng bạn đã bị block vì bạn không tôn trọng mình!",
  "Điều đó quan trọng với em lắm sao?",
  "Anh sống như thế đấy em",
  "Ồ, bạn ấy siêu quá!",
  "Tiền ít thì mình mua cái ít tiền, đâu nhất thiết phải như anh...",
  "May quá, con anh không biết cậu Sơn Tùng kia là ai",
  "Càng đi nhiều, người ta càng không so sánh em ạ, vì không nơi nào giống nơi nào. Đây là điều anh đã học được sau các chuyến đi.",
  "Anh biết, nhưng như thế là quá ít",
  "Mọi việc không như em nghĩ đâu",
  `Bạn Chỉnh ơi, Chỉnh đang comment một câu anh không thích một chút nào nhé. Rất nhiều bạn cứ nhai đi nhai lại cái câu là tin chuẩn chưa anh. Muốn biết tin chuẩn chưa anh thì hãy so sánh hãy xem xét các nguồn tin khác, hãy đọc báo. Nếu đọc được một tin mà cảm thấy à mình vẫn còn chưa tin nổi`,
  "Quá hài hước em ạ",
  "Ồ, sao em lại nói thế?",
  "Trình thấp nó thế em ạ",
  
];

function fetchQuotes(amount) {
  const shuffled = quotes.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, amount);
  return selected;
}

module.exports = {quotes, fetchQuotes};
