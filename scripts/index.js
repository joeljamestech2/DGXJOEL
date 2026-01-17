const input = document.getElementById("query");
const results = document.getElementById("results");
const error = document.getElementById("error");

// Auto-search trending musics on page load
window.addEventListener("load", () => {
  input.value = "trending musics";
  searchVideos();
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") searchVideos();
});

async function searchVideos() {
  const query = input.value.trim();
  results.innerHTML = '';
  error.textContent = '';

  if (!query) return;

  const loading = document.createElement("div");
  loading.className = "loading";
  loading.textContent = "Searching trending musics...";
  results.appendChild(loading);

  try {
    const api = `https://corsproxy.io/?${encodeURIComponent(
      `https://my-rest-apis-six.vercel.app/yts?query=${encodeURIComponent(query)}`
    )}`;

    const res = await fetch(api);
    const json = await res.json();
    results.innerHTML = '';

    if (!json.results || json.results.length === 0) {
      error.textContent = "❌ No results found.";
      return;
    }

    json.results.slice(0, 20).forEach(video => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${video.thumbnail}">
        <div class="meta">
          <p><strong>${video.title}</strong></p>
          <p>${video.author}</p>
          <p>${video.duration}</p>
        </div>
        <div class="actions">
          <button onclick="downloadMedia('${video.url}','mp3',this)">download audio</button>
          <button onclick="downloadMedia('${video.url}','mp4',this)">download video</button>
        </div>
      `;

      results.appendChild(card);
    });

  } catch {
    error.textContent = "❌ Failed to fetch videos.";
  }
}

async function downloadMedia(url, format, button) {
  button.disabled = true;

  try {
    const api = `https://corsproxy.io/?${encodeURIComponent(
      `https://iamtkm.vercel.app/downloaders/yt${format}?apikey=tkm&url=${encodeURIComponent(url)}`
    )}`;

    const res = await fetch(api);
    const json = await res.json();

    if (json?.status && json?.data?.url) {
      window.location.href = json.data.url;
    } else {
      alert("❌ Download failed");
    }
  } catch {
    alert("❌ Error downloading");
  } finally {
    button.disabled = false;
  }
}
