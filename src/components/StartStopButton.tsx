import Button from '@mui/material/Button';
import getTimeDifferenceInSeconds from "./TimeDifferenceInSecondsProvider";

interface StartStopButtonProps {
    startDate: Date | null;
    stopDate: Date | null;
    offsetInSeconds: number;
    active: boolean;
    setActive: (oldActive: boolean) => void;
    setStartDate: (startDate: Date | null) => void;
    setStopDate: (startDate: Date | null) => void;
    setOffsetInSeconds: (offset: number) => void;
}

export default function StartStopButton({
                                            startDate,
                                            stopDate,
                                            offsetInSeconds,
                                            active,
                                            setActive,
                                            setStartDate,
                                            setStopDate,
                                            setOffsetInSeconds
                                        }: StartStopButtonProps) {
    const onClick = () => {
        if (active) {
            clickStopButton();
        } else {
            clickStartButton();
        }
    };

    const clickStartButton = () => {
        if (startDate && stopDate && !active) {
            setOffsetInSeconds(offsetInSeconds + getTimeDifferenceInSeconds(startDate, stopDate));
        }
        setStartDate(new Date());
        setStopDate(null);
        setActive(true);
    };

    const clickStopButton = () => {
        if (!stopDate) {
            setStopDate(new Date());
        } else {
            throw new Error(`Stop Date should be null in this state but is ${stopDate}`)
        }
        setActive(false);
    };

    return <Button size="large" onClick={onClick}>
        {active ? 'Stop' : 'Start'}
    </Button>;
}