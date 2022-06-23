export function getUserMedia(ref, close) {
    const getStream = stream => {
        ref.current.srcObject = stream
    }
    const noStream = () => {
        alert('For the application to work, you must provide access to the camera')
        close()
    }
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
    if (navigator.getUserMedia) {
        navigator.webkitGetUserMedia(
            {video: true},
            getStream,
            noStream
        )
    }
}