const params = new URLSearchParams(window.location.search);
const spotId = params.get('id');

console.log(spotId);

// アイコンをタイプごとに用意
const iconMap = {
  drama: L.icon({ iconUrl: 'img/drama_icon.png', iconSize: [30, 40], iconAnchor: [15, 40] }),
  eat:  L.icon({ iconUrl: 'img/eat_icon.png',  iconSize: [30, 40], iconAnchor: [15, 40] }),
  vlog: L.icon({ iconUrl: 'img/vlog_icon.png', iconSize: [30, 40], iconAnchor: [15, 40] })
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

// spots.csv 読み込み
  Papa.parse('csv/places.csv', {
    download: true,
    header: true,
    complete: function(results) {
      const spots = results.data;
      const spot = spots.find(s => s.id === spotId);
      const routelink = document.getElementById('routo');
      if (spot) {
        if(spot.long_name != ''){
            console.log('正式名所：' + spot.long_name)
            document.getElementById('place-name').textContent = spot.long_name;
            routelink.href = `https://www.google.com/maps/dir/?api=1&destination=${spot.long_name}`
        }else{
            document.getElementById('place-name').textContent = spot.name;
            routelink.href = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
        }
        

      } else {
        document.getElementById('place-name').textContent = '場所が見つかりませんでした';
      }
    }
  });

  // videos.csv 読み込みして表示
  Papa.parse('csv/video.csv', {
    download: true,
    header: true,
    
    complete: function(results) {
       
      const videos = results.data;
       
      const filtered = videos.filter(v => v.place_id === spotId);
      const list = document.getElementById('youtube-list');
      list.innerHTML = "";

      filtered.forEach(video => {
        console.log(video.title);
        const videoId = extractYouTubeId(video.url);
        if (!videoId) return;

        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${video.url}" target="_blank">
            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="動画のサムネイル">
          </a>
          <p>${video.title}</p>
        `;
        list.appendChild(li);
      });
    }
  });

  // YouTube URLから動画IDを取り出す関数
  function extractYouTubeId(url) {
    const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  }