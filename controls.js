
// getTimeDifference will return the difference in time between 2 times
function getTimeDifference(user, current_time) {
    let days = getItem("days", []);

    // compare the hours and minutes of the preferred time and the checkout time
    let checkout_hours = current_time.getHours();
    let checkout_minutes = current_time.getMinutes();

    let preferred_hours = user["preferred-sleep-hour"];
    let preferred_minutes = user["preferred-sleep-minute"];

    let preferred_total_minutes = preferred_hours * 60 + preferred_minutes;
    let checkout_total_minutes;

    if (days.length != 0) {
        let last_checkout_day = new Date(days[days.length - 1].time_of_sign_out);

        let diffTime = Math.abs(last_checkout_day - current_time);
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // check if person checked out on the next day or skipped a day
        if (diffDays == 1) {
            checkout_total_minutes = checkout_hours * 60 + checkout_minutes;
        } else if (diffDays > 1) {
            checkout_total_minutes = (diffDays - 1) * 24 * 60 + checkout_hours * 60 + checkout_minutes;
        } else {
            if (days.length - 2 < 0) {
                if (current_time.getHours() - last_checkout_day.getHours() >= 12) {
                    checkout_total_minutes = checkout_hours * 60 + checkout_minutes;
                }
                else {
                    // user attemped 2 checkouts in less than 12 hours
                    $(".alert").css("display", "block")
                    $(".alert").text("Sorry you can't checkout 2 times in less than 12 hours")
                    window.setTimeout(function () {
                        $(".alert").css("display", "none")
                    }, 2000)
                    if (user["position"] > 0) {
                        user["position"] = user["position"] - 1;
                    }
                }
            }
            else {
                let second_last_checkout_day = new Date(days[days.length - 2].time_of_sign_out);
                if (second_last_checkout_day.getDate() != current_time.getDate()) {
                    if (current_time.getHours() - last_checkout_day.getHours() >= 12) {
                        checkout_total_minutes = checkout_hours * 60 + checkout_minutes;
                    }
                    else {
                        // user attemped 2 checkouts in less than 12 hours
                        $(".alert").css("display", "block")
                        $(".alert").text("Sorry you can't checkout 2 times in less than 12 hours")
                        window.setTimeout(function () {
                            $(".alert").css("display", "none")
                        }, 2000)
                        if (user["position"] > 0) {
                            user["position"] = user["position"] - 1;
                        }
                    }
                } else {
                    // user attemped 3 checkouts in a day
                    $(".alert").css("display", "block")
                    $(".alert").text("Sorry you can't checkout 3 times in a day")
                    window.setTimeout(function () {
                        $(".alert").css("display", "none")
                    }, 2000)
                    if (user["position"] > 0) {
                        user["position"] = user["position"] - 1;
                    }
                }
            }
        }
    }
    else {
        checkout_total_minutes = checkout_hours * 60 + checkout_minutes;
    }

    // return the difference
    // if the value is positive the person went to sleep before the goal
    // if negative they went to sleep after

    return (checkout_total_minutes - preferred_total_minutes);
}

function updateFuel(user_preferences, time_dif) {
    // check if the fuel key exists
    if (!("fuel" in user_preferences)) {
        user_preferences["fuel"] = 100
    } else if (user_preferences["fuel"] > 0 && time_dif > 0) {
        // fuel is defined and non empty so just reduce fuel by time_dif 
        user_preferences["fuel"] = user_preferences["fuel"] - time_dif
    }
}

function updatePosition(user_preferences, late, time_dif) {
    if (user_preferences["fuel"] <= 0) {
        user_preferences["position"] = 0;
        user_preferences["fuel"] = 100;
    } else if (!late) {
        user_preferences["position"] = user_preferences["position"] + 1;
        if (user_preferences["position"] >= 7) {
            user_preferences["planetCount"] += 1
            user_preferences["position"] = 0;
        }
    }
}

function checkOut() {
    // create js object which we will use like json
    let current_time = new Date();
    let late = false;
    let day;

    // get the user preferences
    let user_preferences = getItem("user", {})

    let time_difference = getTimeDifference(user_preferences, current_time);

    if (time_difference < 0) {
        // signifies they went to bed before the set time
        // just add 1 light year
        //user_preferences["total_points"] = user_preferences["total_points"] + 1
        day = {
            "time_of_sign_out": current_time,
        }

        // add 1 to the streak
        user_preferences["streak"] = user_preferences["streak"] + 1
    } else if (isNaN(time_difference)) {
        // this indicates the checkout wasn't done and an alert happened
        // so just do nothing lmao
    } else {
        // this means the user is late so decrement fuel
        late = true;

        day = {
            "time_of_sign_out": current_time,
        }

        // reset the streak
        user_preferences["streak"] = 0

        updateFuel(user_preferences, time_difference);
    }

    // TODO: change later
    updatePosition(user_preferences, late, time_difference);

    // update html to show the new streak
    $(".currentStreak").text(user_preferences["streak"])
    $(".currentFuel").text("Current Fuel: " + user_preferences["fuel"])
    $(".currentPosition").text("Current Position: " + user_preferences["position"])

    // updateCanvas
    updateCanvas(user_preferences)

    // upload preferences to local storage
    setItem("user", user_preferences)

    // then get the days json object from local storage
    let days = getItem("days", [])
    // append a new day to the array
    if (day != null) {
        days.push(day)
    }

    // send the days object to local storage
    setItem("days", days);
}



function submitPreferredSleepTime() {
    // get the raw text of the input given
    let user_preferences = getItem("user", {})
    // add the preferred time property
    let input = document.getElementById("submitPreferredSleepTimeInput").value
    let hours = parseInt(input.split(":")[0])
    let minutes = parseInt(input.split(":")[1])
    // set preferred hours and preferred minutes
    if (!isNaN(hours) && !isNaN(minutes)) {
        user_preferences["preferred-sleep-hour"] = hours
        user_preferences["preferred-sleep-minute"] = minutes;
        setItem("user", user_preferences);
    }
    user_preferences["preferred-sleep-hour"] = hours
    user_preferences["preferred-sleep-minute"] = minutes;
    setItem("user", user_preferences);
    let user = getItem("user", {})
    let preferredHour = user["preferred-sleep-hour"]
    let preferredMin = user["preferred-sleep-minute"]
    if (preferredHour >= 0 && preferredHour <= 2) {
        preferredHour += 24
    }
    let date = new Date
    let hourGap = preferredHour - date.getHours()
    minGap = preferredMin - date.getMinutes()

    let totalGap = hourGap * 60 + minGap
    if (totalGap > 0) {
        $(".timeUntil").text(totalGap + " minutes until checkout")
    } else if (totalGap < 0) {
        $(".timeUntil").text(-totalGap + " minutes have past, you've already lost " + -totalGap + " bars of fuel so go to sleep soon if you can!")
    }
    $(".alert").css("display", "flex")
    $(".alert").text("Your preferred time has been set!")
    window.setTimeout(function () {
        $(".alert").css("display", "none")
    }, 2000)
}

function updateClock() {
    let date = new Date
    let dateString = String(date.getHours()) + ":"
    // add the minutes now
    if (date.getMinutes() < 10) {
        dateString += "0"
    }
    dateString += String(date.getMinutes())
    $(".dateTime").text(dateString)

    let user = getItem("user", {})
    let preferredHour = user["preferred-sleep-hour"]
    let preferredMin = user["preferred-sleep-minute"]
    if (preferredHour >= 0 && preferredHour <= 2) {
        preferredHour += 24
    }

    let hourGap = preferredHour - date.getHours()
    minGap = preferredMin - date.getMinutes()

    let totalGap = hourGap * 60 + minGap
    if (totalGap > 0) {
        $(".timeUntil").text(totalGap + " minutes until checkout")
    } else if (totalGap < 0) {
        $(".timeUntil").text(-totalGap + " minutes have past, you've already lost " + -totalGap + " bars of fuel so go to sleep soon if you can!")
    }
    return date
}

document.addEventListener("DOMContentLoaded", function () {
    $("#checkoutButton").click(function () {
        checkOut()
    })
    $("#submitPreferredSleepTimeButton").click(function () {
        submitPreferredSleepTime()
    })
    // TODO: put in separate function for update time
    let date = updateClock()
    let seconds_until_next_minute = 60 - date.getSeconds()
    // set a timeout until the next minute and then start the interval
    setTimeout(function () {
        // update time
        updateClock()
        setInterval(function () {
            updateClock()
        }, 60 * 1000)
    }, seconds_until_next_minute * 1000)


    restoreData()
})

window.addEventListener('resize', resizeCanvas, false);

// Resizing the canvas element will also
// automatically clear the canvas contents so everything must be redrawn.
// Also, Canvas CSS properties do not resize canvas, they rescale it.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let user_preferences = getItem("user", {})
    console.log(user_preferences)
    updateCanvas(user_preferences)
}

function restoreData() {
    let user = getItem("user", {})
    let hours = user["preferred-sleep-hour"]
    let mins = user["preferred-sleep-minute"]
    if (isNaN(hours) && isNaN(mins)) {
        user["preferred-sleep-hour"] = 22
        user["preferred-sleep-minute"] = 0
    }
    if (!("streak" in user)) {
        // set streak to 0
        user["streak"] = 0
    }
    if (!("position" in user)) {
        user["position"] = 0;
    }
    if (!("fuel" in user)) {
        user["fuel"] = 100
    }
    if (!("currentPlanetA" in user)) {
        // Get a random integer in range 0 - 7 inclusive,
        // because if you look in canvas.js, there are 8
        // availble planets to choose from.
        user["currentPlanetA"] = Math.floor(Math.random() * 8)
        // user["currentPlanetA"] = 4
    }
    if (!("currentPlanetB" in user)) {
        // Get a random integer in range 0 - 7 inclusive,
        // because if you look in canvas.js, there are 8
        // availble planets to choose from.
        user["currentPlanetB"] = Math.floor(Math.random() * 8)
        // user["currentPlanetB"] = 6
    }
    if (!("planetCount" in user)){
        user["planetCount"] = 0
    }
    setItem("user", user)
    let inputString = ""
    if (user["preferred-sleep-hour"] < 10) {
        inputString += "0"
    }
    inputString += String(user["preferred-sleep-hour"]) + ":"
    if (user["preferred-sleep-minute"] < 10) {
        inputString += "0"
    }
    inputString += String(user["preferred-sleep-minute"])
    $("#submitPreferredSleepTimeInput").val(inputString)

    // display the streak
    $(".currentStreak").text(user["streak"])

    // display fuel and position and current planets A and B
    $(".currentFuel").text("Current Fuel: " + user["fuel"])
    $(".currentPosition").text("Current Position: " + user["position"])
    $(".currentPlanetA").text("Current Planet A: " + user["currentPlanetA"])
    $(".currentPlanetB").text("Current Plant B: " + user["currentPlanetB"])
    console.log(user)
    updateCanvas(user)
}