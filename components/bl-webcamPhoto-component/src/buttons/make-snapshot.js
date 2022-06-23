export function MakeSnapshotButton({onClick, text}) {
    return (
        <button
            className="snapshot-button"
            onClick={onClick}>
            {text}
        </button>
    )
}