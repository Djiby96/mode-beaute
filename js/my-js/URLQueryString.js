/*
    1. Changer la requete d'URL 
    
    2. Supprimer une chaine de requete dans l'url

    3. Verifier la presence d'une chaine de requetes

    4. Verifier une chaine dans une chaine dans l'url

    5. get pathname
*/

var document_URL = document.documentURI,
    myURL = new URL(document_URL),
    params = new URLSearchParams(myURL.search);

class URLQueryString{
    //1
    static changeURLParameters(parameter, value){
        params.set(parameter, value);
        var queryString = params.toString();

        var URL_REDIRECT = window.location.origin + window.location.pathname;
        if(queryString){
            URL_REDIRECT =  URL_REDIRECT + "?" + queryString;
        }
        return URL_REDIRECT;
    }

    //2
    static deleteParameter(parameter){
        params.delete(parameter)
        var queryString = params.toString();

        var URL_REDIRECT = window.location.origin + window.location.pathname;
        if(queryString){
            URL_REDIRECT = URL_REDIRECT + "?" + queryString;
        }
        return URL_REDIRECT;
    }

    //3
    static checkParameter(parameter){
        var test =  params.get(parameter);
        return test;
    }

    //4
    static checkStringOnUrl(string){
        var test = false;
        test = document_URL.includes(string);

        return test;
    }

    // 5
    static getPathName(){
        var pathname =  myURL.pathname;
        
        return pathname;
    }
}