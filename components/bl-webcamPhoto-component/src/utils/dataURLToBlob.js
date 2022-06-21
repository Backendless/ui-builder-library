export async function dataURLToBlob(dataURL) {
  const response = await fetch(dataURL)
  
  return response.blob()
}