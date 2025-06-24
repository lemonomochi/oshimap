


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
  drama: L.icon({ iconUrl: './img/drama_icon.png', iconSize: [50, 66], iconAnchor: [25, 66] }),
  eat:  L.icon({ iconUrl: './img/eat_icon.png',  iconSize: [50, 66], iconAnchor: [25, 66] }),
  vlog: L.icon({ iconUrl: './img/vlog_icon.png', iconSize: [50, 66], iconAnchor: [25, 66] }),
  venue: L.icon({ iconUrl: './img/venue_icon.png', iconSize: [50, 66], iconAnchor: [25, 66] }),
  default: L.icon({ iconUrl: './img/drama_icon.png', iconSize: [50, 66], iconAnchor: [25, 66] })
};

import { loadCSV } from './csvLoader.js';

loadCSV('./csv/places.csv').then(places =>{
  places.forEach(place => {
    console.log(place.move_type);
      const type = place.move_type;
      const icon = iconMap[type] || iconMap.default;

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
              <a href="detail/index.html?id=${place.id}">
                ▶️ 詳細ページへ
              </a>
            `;
          }else{
              infoContent.innerHTML = `
              <strong>${place.name}</strong><br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank">
                📍 GO!
              </a><br>
              <a href="detail/?id=${place.id}">
                ▶️ 詳細ページへ
              </a>
            `;
          }


          // 表示
          infoBox.style.display = "block";
        });
      }
    });
})

