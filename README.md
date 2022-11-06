# Pomodoro Timer

A simple pomodoro timer. No pauses included - only decreases timer from 25:00.

You can access an online version here: https://pomodoro.thomasheinlein.com

## Run in docker

Install dependencies: `yarn install`

Start: `yarn start`

Run tests: `yarn test`

## Development notes

The code was created with TDD without using any mocks (since the overuse of mocks is considered evil). The result is a
considerably slow test suite due to the waiting time between interactions - however it is robust and covers all necessary
use cases.


