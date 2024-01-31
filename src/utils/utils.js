export function isTrue(value) {
    return !!value;
}

export function isNull(value) {
    return value === null;
}

export function isUndefined(value) {
    return value === undefined;
}

export function isFunction(value) {
    return typeof value === "function";
}

export function isString(value) {
    return typeof value === "string";
}

export function isNumber(value) {
    return typeof value === "number";
}

export function isObject(value) {
    return value !== null && typeof value === "object";
}

export function isPromise(value) {
    return isObject(value) && isFunction(value.then) && isFunction(value.catch);
}

export function isEmail(value) {
    return isString(value) && value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export const truncateDescription = (text, maxWords) => {
    if (text !== null) {
        const words = text.split(" ");

        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + "...";
        }

        return text;
    }

    return text;
};

export function formatDate(inputDate) {
    const formattedDate = new Date(inputDate).toISOString().split("T")[0];
    return formattedDate;
}
