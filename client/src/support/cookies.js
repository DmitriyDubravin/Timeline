
export function setCookie(token) {
    let expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
}

export function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return {[name]: match[2]};
    return false;
}

export function deleteCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}