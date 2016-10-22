$(document).ready(function () {

    // modal window

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').focus()
    })

    //menu hover trigger
    
    $('.menu li:last').hover(function() {
        $('.nav-list__item').each(function() {
            if ($(this).hasClass('active')) {
                $(this).addClass('hover');
            };
        });
    });
    $('.navbar__item').hover(function() {
        $(this).addClass('hover');
    },
    function() {
        $(this).removeClass('hover');
    });

    //Tabs
    
  $('.tabs__controls__link').on('click', function(e){
    e.preventDefault();

    var $this = $(this),
        container = $this.closest('.tabs'),
        item = container.find('.tabs__controls__item'),
        closestItem = $this.closest(item),
        contentItem = container.find('.tabs__item'),
        itemPosition = closestItem.data('class');

        contentItem.filter('.tabs__item-' + itemPosition)
            .add(closestItem)
            .addClass('active')
            .siblings()
            .removeClass('active');

  });

  // slider

  // trigger buttons ***************************************** //
// ******************************************************** //

$('.triggers__item').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
            container = $this.closest('.slider'),

            //slides
            list = container.find('.slider__list'),
            items = container.find('.slider__item'),

            //triggers
            triggers = container.find('.triggers__item'),

            sliderOffset = container.offset().left,
            reqPos = 0;

    if ( !$(this).hasClass('active') ) {
        target = $(this).index();
        findReqPos(target);

        function findReqPos (target) {
            reqPos = items.eq(target).offset().left - sliderOffset;
            triggers.removeClass('active').eq(target).addClass('active');
            items.removeClass('active').eq(target).addClass('active');
            list.css('left', '-=' + reqPos + 'px');
        }
    }
});
// *************************************************************** //

// next/prev buttons ********************************************** //
// *************************************************************** //
$('.slider__controls-button').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
            container = $this.closest('.slider'),

            //slides
            list = container.find('.slider__list'),
            items = container.find('.slider__item'),
            activeSlide = items.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = items.first(),
            lastSlide = items.last(),

            //triggers
            triggers = container.find('.triggers__item'),
            activeTrig = triggers.filter('.active'),
            nextTrig = activeTrig.next(),
            prevTrig = activeTrig.prev(),
            firstTrig = triggers.first(),
            lastTrig = triggers.last(),
            lastElem = triggers.length-1,
            target;

            sliderOffset = container.offset().left,
            reqPos = 0;

    if ($(this).hasClass('slider__controls-button_next')) {

        if (nextSlide.length) {
            target = $(activeSlide).index();
            target === lastElem ? target = 0 : target = target+1;
            findReqPos(target);
            removeActiveClass(nextSlide, nextTrig);
        } else {
            renewReqPos(firstSlide);
            removeActiveClass(firstSlide, firstTrig);
     }

    } else {

            if (prevSlide.length) {
            target = $(activeSlide).index();
            lastElem = triggers.length-1;
            target === 0 ? target = lastElem : target = target-1;
            findReqPos(target);
            removeActiveClass(prevSlide, prevTrig);
        } else {

            renewReqPos(lastSlide);
            removeActiveClass(lastSlide, lastTrig);
     }

    }

    list.css('left', '-=' + reqPos + 'px');

    function removeActiveClass (reqSlide, reqTrig) {
        reqSlide.addClass('active').siblings().removeClass('active');
        reqTrig.addClass('active').siblings().removeClass('active');
    }

    function findReqPos (target) {
        reqPos = items.eq(target).offset().left - sliderOffset;
    }

    function renewReqPos (slide) {
        reqPos = slide.offset().left - sliderOffset;
    }
            
});
// ******************************************************************* //
}); //end ready
