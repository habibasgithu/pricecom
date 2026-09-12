const form = document.getElementById('searchForm');
const queryInput = document.getElementById('queryInput');
const photoInput = document.getElementById('photoInput');
const previewWrap = document.getElementById('previewWrap');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

let imageBase64 = null;

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    imageBase64 = reader.result; // data:image/...;base64,....
    previewWrap.innerHTML = `<img src="${imageBase64}" alt="preview" />`;
  };
  reader.readAsDataURL(file);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultsEl.innerHTML = '';
  statusEl.textContent = 'Searching…';

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: queryInput.value,
        imageBase64,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      statusEl.textContent = data.error || 'Something went wrong.';
      return;
    }

    statusEl.textContent = `Results for "${data.query}"`;
    resultsEl.innerHTML = data.results.map(cardHtml).join('');
  } catch (err) {
    statusEl.textContent = 'Network error — is the server running?';
  }
});

function cardHtml(item) {
  return `
    <div class="card">
      <img src="${item.image}" alt="${item.title}" />
      <div class="platform">${item.platform}</div>
      <div class="title">${item.title}</div>
      <div class="price">${item.price}</div>
      <a href="${item.url}" target="_blank" rel="noopener sponsored">View deal →</a>
    </div>
  `;
}
