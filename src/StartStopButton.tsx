import Button from '@mui/material/Button';

interface StartStopButtonProps {
    toggleActive: (oldActive: boolean) => void;
    active: boolean;
}

export default function StartStopButton({toggleActive, active}: StartStopButtonProps) {
    return <Button onClick={() => toggleActive(!active)}>
        {active ? 'Stop' : 'Start'}
    </Button>;
}