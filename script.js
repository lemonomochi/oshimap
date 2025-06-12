// あなたのAPIキーをここに
const apiKey = "PvcwWuS1TaFzjhRQ5Qg2";

// 地図を初期化（中心：東京駅、ズーム：13）
const map = L.map('map').setView([34.66169, 135.48192], 13);

// 可愛いパステルスタイル（MapTiler）
L.tileLayer(`https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=${apiKey}`, {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>',
}).addTo(map);


// // CSVファイルを取得
// let csv = new XMLHttpRequest();
 
// // CSVファイルへのパス
// csv.open("GET", "csv/places.csv", false);
 
// // csvファイル読み込み失敗時のエラー対応
// try {
//   csv.send(null);
// } catch (err) {
//   console.log(err);
// }
 
// // 配列を定義
// let csvArray = [];
 
// // 改行ごとに配列化
// let lines = csv.responseText.split(/\r\n|\n/);
 
// // 1行ごとに処理
// for (let i = 0; i < lines.length; ++i) {
//   let cells = lines[i].split(",");
//   if (cells.length != 1) {
//     csvArray.push(cells);
//   }
// }

// //マップ上にピンを表示
// let num = 1;
// while(num < lines.length){
//   const lat = csvArray[num][2];
//   const lng = csvArray[num][3];
//   L.marker([lat, lng])
//   .addTo(map)
//   .bindPopup('<div><strong>'+ csvArray[num][1]+'</strong></div><div><a href="https://www.google.com/maps/dir/?api=1&destination='+ lat +','+ lng +'" target="_blank">Go!</a></div>');
//   num++;
// };


Papa.parse("csv/places.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(place => {
      if (place.lat && place.lng) {
        const marker = L.marker([parseFloat(place.lat), parseFloat(place.lng)]).addTo(map);

        marker.on('click', function () {
          const infoBox = document.getElementById("info-box");
          const infoContent = document.getElementById("info-content");

          // 詳細内容を埋め込む
          infoContent.innerHTML = `
            <strong>${place.name}</strong><br>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank">
              📍 GO!
            </a><br>
            <a href="detail.html?id=${place.id}">
              ▶️ 詳細ページへ
            </a>
          `;

          // 表示
          infoBox.style.display = "block";
        });
      }
    });
  }
});