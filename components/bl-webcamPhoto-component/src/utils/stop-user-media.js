export const stopUserMedia = ref => {
    if (ref.current.srcObject.stop) {
        ref.current.srcObject.stop()
    } else {
        ref.current.srcObject.getTracks().forEach(track => track.stop())
    }
}