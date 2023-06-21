export function resizeCanvas(canvas, signaturePad) {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext('2d').scale(ratio, ratio);

  signaturePad.clear();
}
