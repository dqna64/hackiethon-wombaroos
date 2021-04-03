// getTimeDifference will return the difference in time between 2 times
function getTimeDifference(checkout_hour, checkout_minute, preferred_hour, preferred_minute) {
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
    // compare the hours and minutes of the preferred time and the checkout time
    let checkout_hour = current_time.getHours()
    let checkout_minute = current_time.getMinutes()

    let preferred_hour = user_preferences["preferred-sleep-hour"]
    let preferred_minute = user_preferences["preferred-sleep-minute"]

    let time_difference = getTimeDifference(checkout_hour, checkout_minute, preferred_hour, preferred_minute)
    

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
    user_preferences["preferred-sleep-hour"] = hours
    user_preferences["preferred-sleep-minute"] = minutes;
    setItem("user", user_preferences);
}

document.addEventListener("DOMContentLoaded", function () {
    $("#checkoutButton").click(function(){
        checkOut()
    })
    $("#submitPreferredSleepTimeButton").click(function(){
        submitPreferredSleepTime()
    })
})
