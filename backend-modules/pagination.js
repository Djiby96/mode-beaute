/* Describe variable :
    N : Le nombre total de ligne de la requete correspondante
    page : Le numero de la page courante
    URL : LE lien complete de provenance
    R : Le nombre de lignes a affiche par page
    MLK : Le nombre maximum de lien de pagination
*/

const MLK = 8;

var pagination = {
    createPaginationLink: (N, page, URL, R)=>{
        var pagination_link = "";
        
        var max_page = Math.ceil(N/R);
        var maxLeft = page - Math.floor(MLK/2);
        var maxRight = page + Math.floor(MLK/2);

        var pathname = URL.pathname;
        var URLParams = new URLSearchParams(URL.search);

        if(maxLeft < 1){
            maxLeft = 1;
            maxRight = MLK;
        }
        if(maxRight > max_page){
            maxRight = max_page;
            maxLeft = max_page - MLK;
            if(maxLeft < 1){ 
                maxLeft = 1;
            }
        }

        var href = null; 
        for(let i = maxLeft; i <=maxRight; i++){
            var link = null;
            URLParams.set("page", i);

            href = pathname + "?" + URLParams.toString();
            if(i == page){
                link = `<li class='page-item active m-1'><a class='page-link rounded f-w-b bx-s-2' href='${href}'>${i}</a></li>`;
            }else{
                link = `<li class='page-item m-1'><a class='page-link rounded f-w-b bx-s-2' href='${href}'>${i}</a></li>`;
            }
            pagination_link = pagination_link + link;
        }

        var first_link = ``, last_link = ``;
        if(page != 1){
            URLParams.set("page", 1);
            href = pathname + "?" + URLParams.toString();
            first_link = `<li class='page-item m-1'><a class='page-link rounded' href='${href}'><span aria-hidden='true' class='font-weight-bold'>&laquo;</span></a></li>`;
        }
        if(page != max_page){
            URLParams.set("page", max_page);
            href = pathname + "?" + URLParams.toString();
            last_link = `<li class='page-item m-1'><a class='page-link rounded' href='${href}'><span aria-hidden='true' class='font-weight-bold'>&raquo;</span></a></li>`;
        }

        pagination_link = first_link + pagination_link + last_link;

        return pagination_link;
    }
}


module.exports = pagination;