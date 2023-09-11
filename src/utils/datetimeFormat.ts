import moment from "moment";

export function datetimeFormat(date: Date, format: string) {
    return moment(date).format(format)
}