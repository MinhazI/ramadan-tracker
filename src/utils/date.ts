import { DateTime } from "luxon";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getIslamicDateMonth = () => {
    if (userTimeZone === "Asia/Colombo") {
        return DateTime.now()
            .setZone(userTimeZone)
            .minus({ day: 1 })
            .reconfigure({ outputCalendar: "islamic" })
            .toFormat("LLLL dd");
    } else {
        return DateTime.now()
            .setZone(userTimeZone)
            .minus({ day: 1 })
            .reconfigure({ outputCalendar: "islamic" })
            .toFormat("LLLL dd");
    }
}

export const getIslamicDateMonthYear = () => {
    if (userTimeZone === "Asia/Colombo") {
        return DateTime.now()
            .setZone(userTimeZone)
            .minus({ day: 1 })
            .reconfigure({ outputCalendar: "islamic" })
            .toFormat("LLLL dd yyyy");
    } else {
        return DateTime.now()
            .setZone(userTimeZone)
            .minus({ day: 1 })
            .reconfigure({ outputCalendar: "islamic" })
            .toFormat("LLLL dd yyyy");
    }
}

export const getDateMonth = () => {
    return DateTime.now().setZone(userTimeZone).toFormat("LLL dd")
}

export const getDate = () => {
    return DateTime.now().setZone(userTimeZone).toFormat("dd");
}

export const getMonth = () => {
    return DateTime.now().setZone(userTimeZone).toFormat("LLLL")
}

export const getAMPMTime = (time: string) => {
    const dateTime = DateTime.fromFormat(time, "HH:mm");
    return dateTime.toFormat('hh:mm a')
}

export const getFullDate = (date: string) => {
    const newDate = DateTime.fromFormat(date, "LLLL d");
    return newDate.toFormat("LLLL dd yyyy")
}