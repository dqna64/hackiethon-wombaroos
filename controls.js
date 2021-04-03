// getTimeDifference will return the difference in time between 2 times
function getTimeDifference(user, current_time) {
    let days = getItem("days", []);
    let last_checkout_day = days[days.length - 1].time_of_sign_out;

    let diffTime = Math.abs(last_checkout_day.getDate() - current_time.getDate());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // compare the hours and minutes of the preferred time and the checkout time
    let checkout_hour = current_time.getHours()
    let checkout_minute = current_time.getMinutes()

    let preferred_hour = user["preferred-sleep-hour"]
    let preferred_minute = user["preferred-sleep-minute"]

  
    let preferred_total_minutes = preferred_hour * 60 + preferred_minute
    let checkout_total_minutes = checkout_hour * 60 + checkout_minute
    // return the difference
    // if the value is positive the person went to sleep before the goal
    // if negative they went to sleep after
    return (checkout_total_minutes - preferred_total_minutes)
}

function checkOut() {
    // create js object which we will use like json
    let current_time = new Date();
    let day = {
        "time_of_sign_out": current_time,
    }

    // get the user preferences
    let user_preferences = getItem("user", {})
    
    let time_difference = getTimeDifference(user_preferences, current_time);

    if (time_difference < 0) {
        // signifies they went to bed before the set time
        // just add 1 light year
        user_preferences["total_points"] = user_preferences["total_points"] + 1
    } else {
        // check how many increments of 10 minutes after they have gone past
        let light_years_decrement = Math.floor(time_difference % 10)
        console.log(light_years_decrement)
        console.log(time_difference)
    }

    // then get the days json object from local storage
    let days = getItem("days", [])
    // append a new day to the array
    days.push(day)

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
    console.log(user_preferences)
    setItem("user", user_preferences);
}

document.addEventListener("DOMContentLoaded", function () {
    $("#checkoutButton").click(function(){
        checkOut()
    })
    $("#submitPreferredSleepTimeButton").click(function(){
        submitPreferredSleepTime()
    })
    let date = new Date
    let dateString = String(date.getHours()) + ": " + String(date.getMinutes())
    $(".dateTime").text(dateString)
})
