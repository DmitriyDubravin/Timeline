
export function setCookie(token) {
    let expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
}

export function checkCookie(name) {
    return !!document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
}

export function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match[2];
}

export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}