import {
    useEffect,
} from 'react'

import {
    BarLoader,
    DotedCircleLoader,
    DotedHorizonLoader,
    DotedLineCircleLoader,
    DotedSquareLoader,
    LineCircleLoader,
    RadarLoader,
} from './loaders'

const loaderTypes = {
    lineCircle: 'line circle',
    dotedCircle: 'doted circle',
    bar: 'bar',
    dotedLineCircle: 'doted line circle',
    radar: 'radar',
    dotedSquare: 'doted square',
    dotedHorizon: 'doted horizon',
}

const loaders = {
    [loaderTypes.lineCircle]: LineCircleLoader,
    [loaderTypes.dotedCircle]: DotedCircleLoader,
    [loaderTypes.bar]: BarLoader,
    [loaderTypes.dotedLineCircle]: DotedLineCircleLoader,
    [loaderTypes.radar]: RadarLoader,
    [loaderTypes.dotedSquare]: DotedSquareLoader,
    [loaderTypes.dotedHorizon]: DotedHorizonLoader,
}

export default function Backdrop({ component, eventHandlers }) {

    const { backdropVisibility, loaderType, display } = component
    const { onClick, onOpen, onClose } = eventHandlers

    useEffect(() => {
        onOpen()
        return onClose
    }, [])

    if (!backdropVisibility && !display) {
        return null
    }

    const Loader = loaders[loaderType]

    return (
        <div
            onClick={ onClick }
            className="bl-customComponent-backdrop"
        >
            <Loader/>
        </div>
    )
}