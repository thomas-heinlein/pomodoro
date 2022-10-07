interface StartStopButtonProps {
    toggleActive: (oldActive: boolean) => void;
    active: boolean;
}

export default function StartStopButton({toggleActive, active}: StartStopButtonProps) {
    return <button onClick={() => toggleActive(!active)}>
        {active ? 'Stop' : 'Start'}
    </button>;
}