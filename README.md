# hackiethon-wombaroos
Hackathon project of The Wombaroos participating in Hackiethon by HackMelbourne.

Currently hosted at <https://dqna64.github.io/hackiethon-wombaroos/>

Remember to `git pull origin main` before working on your local clone of this repo!

Sleep Space provides a reward based system to incentivise a consistent sleep schedule for people working from home. The lack of structure while working from home has led to an increasing number of people, especially young people disregarding their sleep schedule leading to sleep deprivation. Good sleep improves learning, an important factor for people in school that can boost
productivity, good sleep is also associated with decreased chances of obesity, a better wellbeing and is an important aspect for healthy growth and development. 

Every day you sleep on time, your rocket goes closer to the next planet, by consistently sleeping on time, the user reaches the next planet. This is used as a reward for their consistency. Once the user reaches the planet, a new planet appears and they travel to that one. If the user decides to sleep after their allocated time, depending on how late they are, fuel and their streak will be lost. A streak and a planet counter both are used to show the user that they are maintaining their good habit.

# Testing

The project is set up in a way that the user cannot checkout multiple times a day, so in order to test it you will need to change items in the local storage in the "days" array. You need to change the last entry in the "days" array to any date before the current date in order to be able to checkout. To get to the local storage press f12 -> open the "Application" tab -> click "Local Storage".