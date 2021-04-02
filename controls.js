function signOut() {
	// create js object which we will use like json
    let current_time = new Date();
    let day = {
        "time_of_sign_out": current_time,
    }

    // send the day object to local storage
    // this needs to change so we store the days in an array
    setItem("Day", day);
}
