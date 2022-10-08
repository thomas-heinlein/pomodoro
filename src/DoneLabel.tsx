interface DoneLabelProps {
    countdownInSeconds: number;
}

export default function DoneLabel(props: DoneLabelProps) {
    const isDoneVisible = () => {
        return props.countdownInSeconds === 0;
    }

    return <div>{isDoneVisible() && <p>Done</p>}</div>;
}