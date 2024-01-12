$(document).ready(function(){
    var $sectionTop=0;
    var moveTop=0;
    var wheelStop;
    var iconPositionTop;
    var bannerPosition=0;
    var windowHeight;

    // /////////////// 초기값 설정 /////////////////
    function init(){
        windowHeight=$(window).height();
        $("section").css({
            height:windowHeight
        })
        $("section").eq(2).css({
            height:"auto"
        })


        // banner 초기화
        iconPositionTop=$(".section").eq(3).offset().top
        console.log("bannerPosition : "+bannerPosition) 
    }
    init();

    //  재설정
    $(window).resize(function(){
        init();
    })
    // ////////////// 네비 버튼 //////////////////
    var $navBool=true;
    $(".navBt").click(function(){
        if($navBool){
        $(this).addClass("bt-background")
        $(".nav-list").addClass("nav-position")
        $navBool=false;
        }else{
        $(".nav-list").removeClass("nav-position")
        $(this).removeClass("bt-background")
        $navBool=true;
        }
    })

    // ///////////////해시 네비게이션 //////////////
    var $position=0;
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            $hash=$(this.hash).offset().top;
            $("html,body").stop().animate({
                scrollTop:$hash
            },1000)
            $position=index
            $active($position)
            $navBool=true;
        })
    });

    function $active(activePosition){
        $(".nav-list a").removeClass("clickActive")
        $(".nav-list a").eq(activePosition).addClass("clickActive")
        $(".nav-list").removeClass("nav-position")
    }
    
    $(".section").each(function(index){
        // console.log("index : "+index)
        $(window).scroll(function(){
            var $scrollTop=$(this).scrollTop()
            // console.log("스크롤 탑 : "+$scrollTop)
            $sectionTop=$(".section").eq(index).offset().top
            // console.log("섹션 탑 : "+$sectionTop)
            if($scrollTop+500>=$sectionTop){
            //    console.log("큽니다.")
            //    console.log("index : "+index)
               $position=index;
               $aniIndex=index;
            //    console.log("$position : "+$position)
               $active($position);
               $animation($aniIndex)
            }
        })
    })
    // section Wheel
    function sectionWheel(){
        $(".section").each(function(index){
            
            $(this).on("DOMMouseScroll mousewheel", function(e){
                
                    if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ){
                        if($(this).prev() != undefined){
                            // console.log("올리고 있음");
                            moveTop=$(this).prev().offset().top;
                            wheelStop=index-1;
                            console.log("weelStop : "+wheelStop)
                            if(wheelStop==2){
                                console.log("위치에 도달했음")
                                $(".section").off();
                            }
                        }
                    }else{
                        if($(this).next() != undefined){
                            moveTop=$(this).next().offset().top;
                            wheelStop=index+1;
                            console.log("wheelStop : "+wheelStop)
                            console.log("섹션의 위치 : "+moveTop)
                            if(wheelStop==2){
                                console.log("위치에 도달했음")
                                $(".section").off();
                            }
                        }
                    }
                    
                    $("html,body").stop().animate({
                        scrollTop:moveTop
                    },1000);

                    return false
                
            });
        })
    }
    sectionWheel();


    $(window).scroll(function(){
        var $scrollTop=$(this).scrollTop()
        console.log("스크롤탑 : "+$scrollTop);
       
        
        if($scrollTop>=$("section").eq(2).offset().top && $scrollTop+$("section").eq(2).offset().top/2<$("section").eq(3).offset().top){
            console.log("스크롤 탑 : "+$scrollTop)
            $("section").off();
        }else{
            
            sectionWheel();
        }

    })

    // ////////////////////////////////
    var $aniIndex=0;
    function $animation(){
        $(".section").eq($aniIndex-1).find(".about-container").removeClass("aboutActive");
        $(".section").eq($aniIndex).find(".about-container").addClass("aboutActive")

        $(".section").eq($aniIndex-1).find(".web-box").removeClass("webActive");
        $(".section").eq($aniIndex+1).find(".web-box").removeClass("webActive");
        for(i=0; i<$(".section .web-box").length; i++){
            $(".section").eq($aniIndex).find(".web-box").addClass("webActive");
        }
    }
    $animation();
    
})//jqeuery 끝
    
