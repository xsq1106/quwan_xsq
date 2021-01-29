//引入jquery
document.write('<script language=javascript src="jquery.min.js"></script>');

let liList=$(".bannerImg li")
      let bannerImg=$(".bannerImg")
      let dotUl=$(".dotUl")
        for(let i=0;i<liList.length;i++){
            let dot=$("<p></p>")
            dot.appendTo(dotUl)
            if(!i){
                dot.addClass("dotColor")
            }
        }
      let dotList=$(".dotUl p")
        function changeImg(){
              bannerImg.animate({
                marginLeft:-(n*1920),
            })
            dotList.removeClass("dotColor")
            dotList.eq(n).addClass("dotColor")
        }
        dotList.click(function(){
            n=$(this).index()
            changeImg()
        })
        n=0
        $(".prev").click(function(){
            if(n===0){
                n=liList.length-1
            }
            else{
                n--
            }
            changeImg()
        })
        $(".next").click(function(){
            if(n<liList.length-1){
                n++
            }
            else{
                n=0
            }
            changeImg()
        })