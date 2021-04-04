# Sleep Space
Sleep Space is the Hackathon project of The Wombaroos participating in Hackiethon by HackMelbourne.

Currently hosted at <https://sleepspace.tk>

Alternative link <https://dqna64.github.io/hackiethon-wombaroos/>

Remember to `git pull origin main` before working on your local clone of this repo!


Every day you sleep on time, your rocket goes closer to the next planet, by consistently sleeping on time, the user reaches the next planet. This is used as a reward for their consistency. Once the user reaches the planet, a new planet appears and they travel to that one. If the user decides to sleep after their allocated time, depending on how late they are, fuel and their streak will be lost. A streak and a planet counter both are used to show the user that they are maintaining their good habit.

## Description
Sleep Space is a web app which encourages healthy sleeping discipline. To increase motivation, the app has a space-themed graphical interface with a rocket travelling between planets and asteroids to visualise the user’s progress towards maintaining their desired sleep schedule.

Our final product is capable of tracking our sleep schedule with fun space-themed visuals, a punishment system in the form of limited fuel, and a reward system in the form of discovering new planets. By going to bed on time consistently, the user will discover new planets while maintaining a streak which will encourage them to keep a consistent sleep schedule.

## Context
The lack of structure in our daily routines while working and studying from home has caused many people, especially adolescents, to neglect their sleep schedule. Countless studies have shown that getting sufficient sleep on a regular basis improves concentration, memory retention and cognitive abilities, which are essential for students and workers. We wanted to develop a web app to help us mark the boundary between our work lives and personal wellbeing routines, specifically our sleep hours, so we decided to create Sleep Space.

## Testing

This web app is set up in a way that the user cannot click 'Sleep Now' multiple times a day, so in order to test it you will need to change items in your browser's local storage in the "days" array.

To get to the local storage in the browser tab, press F12 -> open the "Application" tab -> click "Local Storage" -> click "https://sleepspace.tk".

You need to change the last "time_of_sign_out" in the "days" array to any date before the current date in order to be able to checkout. E.g. Change `{"time_of_sign_out":"2021-04-04T21:05:09.945Z"}` -> `{"time_of_sign_out":"2021-04-03T21:05:09.945Z"}` where the difference is the date `04` -> `03`.

Then reload the page with `Ctrl-R`.