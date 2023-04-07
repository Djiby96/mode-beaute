/*
    1. Verifier si le cookie existe et retourner sa valeur

    2. Retourner le cookie sous un format JSON

    3. Creer ou modifier un cookie avec un format JSON
*/

class Cookie{
    static getCookie(cookie_name){
        var cookie = null;

        var all_cookies = document.cookie.split(";");
        var cookie_search = all_cookies.find(row => row.includes(cookie_name));
        if(cookie_search){
            cookie = cookie_search.split("=")['1'];
            if(cookie.length < 2){ //Si le cookie a une valeur
                cookie = null;
            }
        }
        
        return cookie;
    }
    static readCookie(cookie_value){
        var cookie = null;
        var cookie_decode = decodeURIComponent(cookie_value).substring(2);

        cookie = JSON.parse(cookie_decode);

        return cookie
    }

    static setCookie(cookie_name, cookie_value){
        // A faire en besoin
    }
}