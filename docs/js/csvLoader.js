const CSV_VERSION = '20250620'; // ここだけ毎回更新！

export async function loadCSV(path) {
  const res = await fetch(`${path}?v=${CSV_VERSION}`);
  const text = await res.text();
  const rows = text.trim().split('\n');
  const headers = rows[0].split(',');

  return rows.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i].trim();
    });
    return obj;
  });
}