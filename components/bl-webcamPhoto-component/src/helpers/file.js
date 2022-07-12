export async function dataURLToBlob(dataURL) {
  const response = await fetch(dataURL);
  return response.blob();
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
