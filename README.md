# Pomodoro Timer

A simple pomodoro timer. No pauses included - only decreases timer from 25:00.

## Run in docker
```
docker build . -t pomodoro
docker run --name=pomodoro -d -p 80:80 pomodoro
```

Access via http://localhost.