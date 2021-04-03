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
        checkout_total_minutes =  checkout_hours * 60 + checkout_minutes;
      } else if (diffDays > 1) {
        checkout_total_minutes = (diffDays - 1) * 24 * 60 + checkout_hours * 60 + checkout_minutes;
      } else {
            let second_last_checkout_day = new Date(days[days.length - 2].time_of_sign_out);
            if (second_last_checkout_day.getDate() != current_time.getDate()) {
                checkout_total_minutes = checkout_hours * 60 + checkout_minutes;
            } else {
                alert("STOP CHEATING!!!");
            }
      }
    }
    else {
      checkout_total_minutes =  checkout_hours * 60 + checkout_minutes;
    }
 
    // return the difference
    // if the value is positive the person went to sleep before the goal
    // if negative they went to sleep after

    return (checkout_total_minutes - preferred_total_minutes);
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
        // add 1 to the streak
        user_preferences["streak"] = user_preferences["streak"] + 1
    } else {
        // check how many increments of 10 minutes after they have gone past
        let light_years_decrement = Math.floor(time_difference % 10)
        console.log(light_years_decrement)
        console.log(time_difference)

        // reset the streak
        user_preferences["streak"] = 0
    }

    console.log(user_preferences["streak"])
    // update html to show the new streak
    $(".currentStreak").text(user_preferences["streak"])
    // upload preferences to local storage
    setItem("user", user_preferences)

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
    let seconds_until_next_minute = 60 - date.GetSeconds()
    // set a timeout until the next minute and then start the interval
    setTimeout(function() {
        setInterval(function() {
            let date = new Date
            let dateString = String(date.getHours()) + ": " + String    (date.getMinutes())
            $(".dateTime").text(dateString)
        }, 60 * 1000)
    }, seconds_until_next_minute)
    
    
    $("#submitPreferredSleepTimeButton").popover()
    restoreData()
})

function restoreData(){
    let user = getItem("user", {})
    let hours = user["preferred-sleep-hour"]
    let mins = user["preferred-sleep-minute"]
    if (isNaN(hours) && isNaN(mins)){
        user["preferred-sleep-hour"] = 22
        user["preferred-sleep-minute"] = 0
    }
    setItem("user", user)
    let inputString = String(user["preferred-sleep-hour"]) + ":"
    if (user["preferred-sleep-minute"] < 10){
        inputString += "0"
    }
    inputString += String(user["preferred-sleep-minute"])
    $("#submitPreferredSleepTimeInput").val(inputString)
}