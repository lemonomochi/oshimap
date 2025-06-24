const params = new URLSearchParams(window.location.search);
const spotId = params.get('id');

import { loadCSV } from './csvLoader.js';

// spots.csv 読み込み
loadCSV('../csv/places.csv').then(results =>{
      const spot = results.find(s => s.id === spotId);
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
        // document.getElementById('place-name').textContent = '場所が見つかりませんでした';
      }
});

  // videos.csv 読み込みして表示
loadCSV('../csv/video.csv').then(videos =>{
  const filtered = videos.filter(v => v.place_id === spotId);
      const list = document.getElementById('youtube-list');
    //   list.innerHTML = "";

      if(filterd.length == 0){
          const li = document.createElement('li');
          li.textContent = 'この場所に関連する動画はまだ登録されていません。';
          list.appendChild(li);
          return;
      }
      filtered.forEach(video => {
        console.log(video.url);
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
});

  // YouTube URLから動画IDを取り出す関数
  function extractYouTubeId(url) {
    const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  }
