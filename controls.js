function checkOut() {
	// create js object which we will use like json
    let current_time = new Date();
    let day = {
        "time_of_sign_out": current_time,
    }

    // then get the days json object from local storage
    let days = getItem("days", [])
    // append a new day to the array
    days.push(day)

    // send the days object to local storage
    setItem("days", days);
}
