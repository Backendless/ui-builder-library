export async function dataURLToBlob(dataURL) {
  const response = await fetch(dataURL);

  return response.blob();
}

export async function download(dataURL, filename) {
  const blob = await dataURLToBlob(dataURL);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.style = 'display: none';
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}
