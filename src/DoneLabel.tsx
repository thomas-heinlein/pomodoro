interface DoneLabelProps {
    getCountdownInSeconds: () => number;
}

export default function DoneLabel(props: DoneLabelProps) {
    const isDoneVisible = () => {
        return props.getCountdownInSeconds() === 0;
    }

    return <div>{isDoneVisible() && <p>Done</p>}</div>;
}