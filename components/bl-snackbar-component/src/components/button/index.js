export const Action = ({className, onFunction, content}) => {
    return (
        <button
            className={className}
            onClick={onFunction}>
            {content}
        </button>
    )
}