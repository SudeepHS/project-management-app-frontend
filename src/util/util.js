import { jwtDecode } from "jwt-decode";

export function getUserFromCookie() {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token"))
        ?.split("=")[1];
    if (cookieValue) {
        const { userId, name, email } = jwtDecode(cookieValue);
        return { userId, name, email };
    }
    return {};
}
