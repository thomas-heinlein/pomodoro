# Pomodoro Timer

A simple pomodoro timer. No pauses included - only decreases timer from 25:00.

## Run in docker

```
docker build . -t pomodoro
docker run --name=pomodoro -d -p 80:80 pomodoro
```

Access via http://localhost.

## Development notes

The code was created with TDD without using any mocks (since the overuse of mocks is considered evil). The result is a
considerably slow test suite due to the waiting time between interactions however it is robust and covers all necessary
use cases.




