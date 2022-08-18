window.addEventListener('error', (e) => {
  const div = document.createElement('div');
  div.id = "error-boundary";
  div.style = 'position: fixed; top: 5px; width: 100%;';
  div.innerHTML = `<div class="error">
    <p class="error-message">${ e.message }</p>
    <button id="reload" class="error-button">Reload page</button>
  </div>`;

  document.getElementsByTagName('body')[0].prepend(div);
  document.getElementById('reload').addEventListener('click', () => { document.location.reload() });

  setTimeout(() => { div.style = 'display: none;'}, 5000);
})

export default function ErrorBoundaryComponent() {
  return null;
}
