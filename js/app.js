$(document).foundation();

$( document ).ready(function() {
   var requestUrl = "http://jsonplaceholder.typicode.com/posts"
   // dummy Request to jsonplaceholder
   // Gets 100 Posts to be used for paging
   $.ajax({
    url: requestUrl,
    method: 'GET'
    }).then(function(posts) {
           for (var key in posts) {
                if(posts.hasOwnProperty(key)) {
                        
                        $('main').append('<div class="row blogpost" id="'+key+'"><div class="medium-12 columns"><h2>'+posts[key].title+'</h2><p>'+posts[key].body+'</p></div></div>')
                }

        
            }

            $('.blogpost').each(function(idx,obj){
                var postId = parseInt($(this).attr('id'), 10);
                if (postId > 9) {
                    // Hide all posts with ID > 9 e.g. 10 Posts per page
                    $(this).hide();
                }
            })

        // Hide previous button on first page

           if ($('.blogpost#9').length) {
               $('a.prev').hide();
           }

         
    });

    $('a.next').click(function(e){
        // Find current highest item, then show next ten items
        var cur = 0;
        var next = 0;
        $('.blogpost:visible').each(function(idx, obj){
            
            cur = Math.max(parseInt($(this).attr('id'), 10));
            
            next = cur + 10;
            cur = cur +1;
            $(this).fadeOut();
            

        } )


        for (cur;  cur <= next; cur++) {
               $('.blogpost#'+cur).fadeIn();
        }

       if(!$('a.prev').is(':visible')) {
           $('a.prev').show();
       }
        
    })


    $('a.prev').click(function(e){
        // Find current highest item, then show prev ten items
        var cur = 0;
        var next = 0;
        $('.blogpost:visible').each(function(idx, obj){
            
            cur = Math.min(parseInt($(this).attr('id'), 10));
            
            next = cur - 10;
            cur = cur -1;
            $(this).fadeOut();


        } )


        for (cur;  cur >= next; cur--) {
               $('.blogpost#'+cur).fadeIn();
        }

       
        
    })



    $('.posting-form h2').click(function(e){
        // Show & Hide New blog post form
       $('.new-post').slideToggle();
    });


    $('#inputForm').click(function(e) {
        // Send form contents to Server, trigger validation if invalids
         $.ajax({
            url: requestUrl,
            method: 'POST'
            }).then(function(response) {
                if (response.errors)
                {
                    $('#inputForm').foundation('forminvalid.zf.abide');
                }

            });
    });
});

