var main = function(){
    var $window = $(window);
    $('#fullpage').fullpage({
//        anchors:["lang","welcome","projects","contacts"]
        sectionsColor : ['#eee', '#eee','#eee','#eee'],
        animateAnchor:false
        
    });
    
    
    $window.disablescroll({
    handleScrollbar: false
});
    

    $(".langbtn").click(function(){
        var langfile;
        $window.disablescroll('undo');
        $("#hi").typed('reset');
        $("#welcome").typed('reset');
        if($(this).html() =="English"){
            langfile= "lang/en.json"
            console.log(langfile);
        } else if($(this).html() =="عربي"){
            langfile= "lang/ar.json"
            console.log(langfile);
       }
        var $langtoggle = 
    $.getJSON(langfile,function(data){
        sessionStorage.setItem('lang',JSON.stringify(data));
        console.log('data');
        build(data);
    });// end getJSON
        $langtoggle.complete(function(){
            $.fn.fullpage.moveTo('welcome');
            hi();
        });
        
    });// end .langbtn
    
};// end main 

var build = function(data,option="main"){
    var lang = data.lang
    $('html').attr('lang',lang); 
    $('html').attr('dir',data.dir);
    $('#hi').empty();
    $('#typed').empty();
    $('#greeting').empty();
    $.each(data.greeting, function(i,val){
        console.log(val);
        if (i==data.greeting[data.greeting.length-1]){
            val = val+' ^1500';
        }
        $('#greeting').append($('<p>').html(val));

    });// end each
    $('#typed-strings').empty();
    $.each(data.introlist, function(i,val){
        if (i==data.introlist[data.introlist.length-1]){
            val = val+' ^2000';
        }
        console.log(val);
        $('#typed-strings').append($('<p>').html(val));
    });//end each
    if (option=="reload"){
        console.log('hi: '+data.greeting[data.greeting.length-1]);
        console.log('typed: '+data.introlist[data.introlist.length-1]);
        $('#hi').html(data.greeting[data.greeting.length-1]);
        $('#typed').html(data.introlist[data.introlist.length-1]);
    }
    var $project;
    var $title;
    var $description;
    var $links;
    var $link;
    var $status;
    var $version;
    var $img ;
    var leftPos;
    $.each(data.projects, function(i,val){
        $project=$('#'+val.title+'id');
        $sideproject=$('<div>').attr('class','sideproj');
        $project.empty();
        $title = $('<h1>').html(val.title);
        $title = $('<div>').append($title);
        $title.attr('class','title');
        $description = $('<p>');
        $description.html(val.description);
        $description= $('<div>').append($description);
        $description.attr('class','desc');
        $links = $('<div>').attr('id','links');
        $info=$('<ul>').attr('class','info');
        $status=$('<li>').text(val.status[0]+': '+val.status[1]);
        $version=$('<li>').text(val.version[0]+': '+val.version[1]);
        $title.append($info);
        // APPEND
        $project.append($sideproject);
        $sideproject.append($title);
        $title.append($('<hr>'));
        $title.append($info);
        $info.append($status);
        $info.append($version);
        $sideproject.append($description);
        $project.append($links);

        leftPos =100-(100/(i+1));
        $.each(val.links,function(key,value){
            $img = $('<img>');
            $link =$('<a>').attr('href',value);
            console.log(key);
            if (key=='devpost'){
                $img.attr('src',"http://nealrs.github.io/devpost-follow-button/icon/devpost-128.png"); 
                $link.append($img.attr('alt',val.title+' on '+key));
            } else if(key=='github') {

                $img.attr('src','https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67');
                $img.attr('alt',"Fork me on GitHub");
                $img.attr('data-canonical-src','https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png');
                $img.attr('style',"position: absolute; top: 0; left: "+leftPos+"%; border: 0;");
                $link.append($img);
            }else {
                $link.text(key);
            }// end if
            $links.append($link);
        });//end each

    });//end each

}; //end build

var hi= function(){
    $(function() {

    $("#hi").typed({
//        strings: ["Hi", "I am Omar ^1500"],
        stringsElement: $('#greeting'),
        startDelay: 500,
        typeSpeed: 40,
        backDelay: 1000,
        loop: false,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: false,
        callback: function() { $(".typed-cursor").empty();
            welcome(); },
        resetCallback: function() {}
    });

//    $(".langbtn").click(function() {
//        $("#hi").typed('reset');
//    });

});//end function
}

 var welcome =function() {

    $(function() {

        $("#typed").typed({
//             strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
            stringsElement: $('#typed-strings'),
            typeSpeed: 40,
            backDelay: 1000,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function() { 
                    $.fn.fullpage.moveTo('projects');
            }
        });

        $(".langbtn").click(function() {
            $("#typed").typed('reset');
        });

    });
    
}


$(document).ready(function() {
    
    if(window.location.hash){
        if (sessionStorage.lang){
            console.log('reload');
            $langJSON= $.parseJSON(sessionStorage.getItem('lang'));
            build($langJSON,"reload");
        }else{
            document.location.hash='';
        }
    }
    
  main();  
    
});
//$(window).unload(function(){
//  sessionStorage.removeItem('lang');
//});
