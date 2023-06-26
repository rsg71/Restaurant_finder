interface Props {
    text?: string;
}

export default function GenericError({ text}: Props) {
    return (
        <div>
            {text ? text : 'An error has occurred'}
        </div>
    )
}