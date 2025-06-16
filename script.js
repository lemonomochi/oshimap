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

// アイコンをタイプごとに用意
const iconMap = {
  drama: L.icon({ iconUrl: './img/drama_icon.png', iconSize: [30, 43], iconAnchor: [15, 40] }),
  eat:  L.icon({ iconUrl: './img/eat_icon.png',  iconSize: [30, 43], iconAnchor: [15, 45] }),
  vlog: L.icon({ iconUrl: './img/vlog_icon.png', iconSize: [30, 43], iconAnchor: [15, 40] })
//   default: L.icon({ iconUrl: 'icons/default.png', iconSize: [30, 40], iconAnchor: [15, 40] })
};


// CSVを読み込んでマーカーを追加
// Papa.parse('places.csv', {
//   download: true,
//   header: true,
//   complete: function(results) {
//     results.data.forEach(place => {
//       const lat = parseFloat(place.lat);
//       const lng = parseFloat(place.lng);
//       const type = place.movieType;

//       const icon = iconMap[type] || iconMap.default;

//       L.marker([lat, lng], { icon: icon }).addTo(map)
//         .on('click', function() {
//           showPlaceDetails(place); // ここはピン押したときの処理
//         });
//     });
//   }
// });

Papa.parse("csv/places.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(place => {
      const type = place.move_type;
      const icon = iconMap[type];

      if (place.lat && place.lng) {
        const marker = L.marker([parseFloat(place.lat), parseFloat(place.lng)], { icon: icon }).addTo(map);

        marker.on('click', function () {
          const infoBox = document.getElementById("info-box");
          const infoContent = document.getElementById("info-content");

          // 詳細内容を埋め込む
          if(place.long_name != ''){
            infoContent.innerHTML = `
              <strong>${place.name}</strong><br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${place.long_name}" target="_blank">
                📍 GO!
              </a><br>
              <a href="detail.html?id=${place.id}">
                ▶️ 詳細ページへ
              </a>
            `;
          }else{
              infoContent.innerHTML = `
              <strong>${place.name}</strong><br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank">
                📍 GO!
              </a><br>
              <a href="detail.html?id=${place.id}">
                ▶️ 詳細ページへ
              </a>
            `;
          }


          // 表示
          infoBox.style.display = "block";
        });
      }
    });
  }
});