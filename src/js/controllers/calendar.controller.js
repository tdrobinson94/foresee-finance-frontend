import $ from 'jquery';
import { MONTHS } from '../utilities/months.constant';
import angular from 'angular';
import _ from 'lodash';

function CalendarController($scope){

//======== Establish scope for linking functions to html ======//
  let vm = this;
  vm.next = next;
  vm.prev = prev;
  vm.current = current;
  vm.submitIncome = submitIncome;
  vm.submitExpense = submitExpense;
  vm.scrollWeekOne = scrollWeekOne;
  vm.scrollWeekTwo = scrollWeekTwo;
  vm.scrollWeekThree = scrollWeekThree;
  vm.scrollWeekFour = scrollWeekFour;
  vm.scrollWeekFive = scrollWeekFive;
  vm.scrollWeekSix = scrollWeekSix;
  // vm.goToTop = goToTop;

  let clock = new Date();
  let month = clock.getMonth();
  let year = clock.getFullYear();
  //var hammertime = new Hammer(myElement, myOptions);


  $(window).bind('mousewheel DOMMouseScroll touchmove', function() {
    $("html, body").stop(true, false);
   });

//================ Adding month name to top of calendar dynamically ===============//
  $(document).find('#month').html(`
    <option value="${month}" selected>${MONTHS[month].name}</option>
    <option value="0">${MONTHS[0].name}</option>
    <option value="1">${MONTHS[1].name}</option>
    <option value="2">${MONTHS[2].name}</option>
    <option value="3">${MONTHS[3].name}</option>
    <option value="4">${MONTHS[4].name}</option>
    <option value="5">${MONTHS[5].name}</option>
    <option value="6">${MONTHS[6].name}</option>
    <option value="7">${MONTHS[7].name}</option>
    <option value="8">${MONTHS[8].name}</option>
    <option value="9">${MONTHS[9].name}</option>
    <option value="10">${MONTHS[10].name}</option>
    <option value="11">${MONTHS[11].name}</option>
    `)

//================ Adding year to top of calendar dynamically ===============//
  $(document).find('#year').html(`
    <option value="${year - 5}">${year - 5}</option>
    <option value="${year - 4}">${year - 4}</option>
    <option value="${year - 3}">${year - 3}</option>
    <option value="${year - 2}">${year - 2}</option>
    <option value="${year - 1}">${year - 1}</option>
    <option value="${year}" selected>${year}</option>
    <option value="${year + 1}">${year + 1}</option>
    <option value="${year + 2}">${year + 2}</option>
    <option value="${year + 3}">${year + 3}</option>
    <option value="${year + 4}">${year + 4}</option>
    <option value="${year + 5}">${year + 5}</option>
    `)

//========================================== Calendar Basics ===========================================//
$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();
  $('.num-date').removeClass('first-day');
  $('.num-box').removeClass('selected-day');

  //=================== Render Current month days as well as next month days ==================//
  let renderMonth = function () {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let days = $(document).find('.days').children();
    $(document).find('.num').empty();
    _.range(1, 43).forEach(function(dayIndex, i) {
      let day = $(days[startOfMonth + dayIndex - 1]);
      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
       day.find('.num-container').parent().addClass("day_background_color");
       day.find('.weekday').children().addClass('current-day');
       day.find('.num-container').parent().addClass("selected-day");
       day.find('.transaction-button').addClass('show');
       day.find('.num-date').parent().parent().removeClass("dead_month_color");
     } else {
       day.find('.num-container').parent().removeClass("day_background_color");
       day.find('.weekday').children().removeClass('current-day');
       day.find('.num-date').parent().parent().removeClass("dead_month_color");
     }
     if(dayIndex > monthDays){
       day.find('.num').html(dayIndex - monthDays).parent().parent().addClass("dead_month_color");
       if(nextMonth == 13){
         nextMonth = 1;
         currentYear = Number(currentYear) + 1;
       }
       if(nextMonth < 10){
         let newMonth = nextMonth;
         let standardMonth = '0' + nextMonth;
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = (dayIndex - monthDays);
           let standardDayIndex = '0' + (dayIndex - monthDays);
           day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + newDayIndex).parent().parent().addClass("dead_month_color");
         } else {
           day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
         }
       } else {
           let standardMonth = '0' + nextMonth;
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = (dayIndex - monthDays);
           let standardDayIndex = '0' + (dayIndex - monthDays);
           day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);;
           day.find('.num-date').html(MONTHS[nextMonth - 1].name + ' ' + newDayIndex).parent().parent().addClass("dead_month_color");
         } else {
           day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
           day.find('.num-date').html(MONTHS[nextMonth - 1].name + ' ' + (dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
         }
       }
     } else {
       day.find('.num').html(dayIndex);
       let thisMonth = (Number(currentMonth) + 1);
       if(thisMonth < 10){
         let newMonth = thisMonth
         let standardNewMonth = '0' + thisMonth;
         if(dayIndex < 10){
           let newDays = dayIndex;
           let standardNewDays = '0' + dayIndex;
           day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + newDays);
         } else{
           day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (dayIndex));
         }
       } else {
         if(dayIndex < 10){
           let newDays = dayIndex;
           let standardNewDays = '0' + dayIndex;
           day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
           day.find('.num-date').html(MONTHS[thisMonth - 1].name + ' ' + newDays);
         } else{
           day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
           day.find('.num-date').html(MONTHS[thisMonth - 1].name + ' ' + (dayIndex));
         }
       }
     }
     if (day.find('.num-date').html() === MONTHS[$('#month').val()].name + ' 1'){
         day.find('.num-date').addClass('first-day');
     } else {
         day.find('.num-date').removeClass('first-day');
     }
    //  $('.goTo').on('change', function(event){
    //      event.preventDefault();
    //      day.find('.num').parent().parent().removeClass('goToDay');
    //      if ($('.goTo').val() === day.find('.num').html()) {
    //          day.find('.num').parent().parent().addClass('goToDay');
    //      }
    //  })

    })
  };

  //=================== Render Previous month days ==================//
  function renderPrevMonthDays(){
    MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28
    let currentYear = $(document).find('#year').val();
    let prevMonth = Number($(document).find('#month').val());
    let startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
    let days = $(document).find('.days').children();
    let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach(function(dayIndex){
      let day = $(days[dayIndex]);
      if (startOfMonth > dayIndex){
        day.find('.num').html(prevDays[dayIndex]);
        if(prevMonth == 0){
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }
        if(prevMonth < 10){
          let newMonth = prevMonth;
          let standardNewMonth = '0' + prevMonth;
          day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (prevDays[dayIndex]));
        } else {
          day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
          day.find('.num-date').html(MONTHS[prevMonth - 1].name + ' ' + (prevDays[dayIndex]));
        }

        day.find('.num-date').parent().parent().addClass("dead_month_color");
        day.find('.num-container').parent().removeClass("day_background_color");
      }
    })
  }
  function scrollDay(){
    if($('.num-box').hasClass('day_background_color') === true){
      $('body, html').animate({scrollTop: $('.day_background_color').offset().top - 150}, 500);
    } else if ($('.num-date').hasClass('first-day') === true){
        $('.first-day').parent().parent().addClass('selected-day');
        $('body, html').animate({scrollTop: $('.first-day').offset().top - 150}, 500);
    }
  }
  window.setTimeout(scrollDay, .5);

  renderMonth();
  renderPrevMonthDays();

})
$('.month-selector').change();

$(window).resize(function(){
    if ($(window).width() <= 780){
        $('.calendar-container').removeClass('change-view');
    } else if ($(window).width() > 780 && $('.calendar-container').hasClass('active-view')){
        $('.calendar-container').addClass('change-view');
    } else {
        $('.calendar-container').removeClass('change-view');
        $('.calendar-container').removeClass('active-view');
    }

    function scrollDay(){
        if ($('.num-box').hasClass('selected-day')){
            console.log('change');
            $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
        }
    }
    // window.setTimeout(scrollDay, .5);
})




//============= Scroll Months functionality ==================//

//===== Go to previous month =======//
function prev(){
  $('.num-box').removeClass('selected-day');
  $('.num-date').removeClass('first-day');
  $('.transaction-button').removeClass('show');
  if($(document).find('#year').val() <= (year - 5)){
    $(document).find('#year').val(year - 5).change()
    $(document).find('#month').val(0).change()
  } else {
    if($('#month').val() == null || $('#month').val() == 0){
      $(document).find('#month').val(11).change()
      $(document).find('#year').val(Number($(document).find('#year').val()) - 1).change()
    } else {
      $(document).find('#month').val(Number($(document).find('#month').val()) - 1).change();
    }
  }

  function scrollDay(){
      if ($('.num-box').hasClass('selected-day')){
          console.log('change');
          $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
      }
  }
  window.setTimeout(scrollDay, 500);
}

//===== Go to today's date =======//
function current(){
  $('.num-box').removeClass('selected-day');
  $('.num-date').removeClass('first-day');
  $('.transaction-button').removeClass('show');
  $(document).find('#month').val(month).change()
  $(document).find('#year').val(year).change()
  $('body, html').animate({scrollTop: $('.day_background_color').offset().top - 150}, 500);
}

//===== Go to next month =======//
function next(){
  $('.num-box').removeClass('selected-day');
  $('.num-date').removeClass('first-day');
  $('.transaction-button').removeClass('show');
  if($(document).find('#year').val() >= (year + 5) && $(document).find('#month').val() == 11){
    $(document).find('#year').val(year + 5).change()
    $(document).find('#month').val(11).change()
  } else {
    if($(document).find('#month').val() == null || $(document).find('#month').val() == 11){
      $(document).find('#month').val(0).change()
      $(document).find('#year').val(Number($(document).find('#year').val()) + 1).change()
    } else {
      $(document).find('#month').val(Number($(document).find('#month').val()) + 1).change();
    }
  }

  function scrollDay(){
      if ($('.num-box').hasClass('selected-day')){
          console.log('change');
          $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
      }
  }
  window.setTimeout(scrollDay, 500);
}


$('.calendar-view').on('click', function(){
    if ($(window).width() >= 780){
        $('.calendar-container').toggleClass('change-view');
        $('.calendar-container').toggleClass('active-view');
        $('.scroll-dots').toggleClass('hide-dots');
    }
    function scrollDay(){
        if ($('.num-box').hasClass('selected-day')){
            console.log('change');
            $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
        }
    }
    window.setTimeout(scrollDay, 500);
})




// ================ Swipe events ================ //
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            next();
        } else {
            /* right swipe */
            prev();

        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

//========= Arrow key navigation for calendar ===========//
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    var y = $(window).scrollTop();

    if (e.keyCode == '37') {
        //===== Go to previous month =======//
       prev();
    } else if (e.keyCode == '39') {
        //===== Go to next month =======//
       next();
   }
}

//=============================== Select a calendar day =================================//
$('.days').click(function( event ) {
  var target = $( event.target );
  //===== If statements for which element is selected within the day =======//
  if (target.is(".num-box")) {
    //   $('.calendar-container').removeClass('change-view')
    $('.transaction-button').removeClass('show');
    $('.num-box').removeClass('selected-day');
    target.addClass('selected-day');
    target.find('.transaction-button').addClass('show');
    $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
  } else if (target.is(".weekday")){
    //   $('.calendar-container').removeClass('change-view')
    $('.transaction-button').removeClass('show');
    $('.num-box').removeClass('selected-day');
    target.parent().addClass('selected-day');
    target.parent().find('.transaction-button').addClass('show');
    $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
} else if (target.is(".num-date, .balance, .transaction-activity")){
    // $('.calendar-container').removeClass('change-view')
      $('.transaction-button').removeClass('show');
      $('.num-box').removeClass('selected-day');
      target.parent().parent().addClass('selected-day');
      target.parent().parent().find('.transaction-button').addClass('show');
      $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
  } else if (target.is(".activity-content, .income, .expense")){
    //   $('.calendar-container').removeClass('change-view')
      $('.transaction-button').removeClass('show');
      $('.num-box').removeClass('selected-day');
      target.parent().parent().parent().addClass('selected-day');
      target.parent().parent().parent().find('.transaction-button').addClass('show');
      $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
  } else if (target.is(".transaction-income, .transaction-expense")){
    //   $('.calendar-container').removeClass('change-view')
      $('.transaction-button').removeClass('show');
      $('.num-box').removeClass('selected-day');
      target.parent().parent().parent().parent().addClass('selected-day');
      target.parent().parent().parent().parent().find('.transaction-button').addClass('show');
      $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
  };
});

//======================== Transaction form popup windows ==========================//

//=============== transaction button functionality =========================//
$('.fab-button').click(function(){
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
})
//=========== income button =============//
$('.income-button').click(function(){
    $('.frequency').prop('checked', false);
    $('.income-category, .expense-category').removeClass('clicked');
    $('.income-form').addClass('show');
    // $('.income-form').addClass('background');
    $('.income-categories').addClass('visible');
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
    $('.income-category').first().addClass('clicked');
    $('.date-input').val($('.selected-day').find('.date-value').html().slice(0,10));
    $('.first-checkbox').prop('checked', true);
})

//=========== expense button =============//
$('.expense-button').click(function(){
    $('.frequency').prop('checked', false);
    $('.income-category, .expense-category').removeClass('clicked');
    $('.expense-form').addClass('show');
    // $('.expense-form').addClass('background');
    $('.expense-categories').addClass('visible');
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
    $('.expense-category').first().addClass('clicked');
    $('.date-input').val($('.selected-day').find('.date-value').html().slice(0,10));
    $('.first-checkbox').prop('checked', true);
})

//============== Close the transaction form popup ================//
$('.income-form, .expense-form').click(function( event ) {
  var target = $( event.target );
  if (target.is(".income-form, .expense-form")) {
      //========= click outside of the card to close popup ========//
      $('.income-form').removeClass('show');
      $('.expense-form').removeClass('show');
    //   $('.income-form').removeClass('background');
    //   $('.expense-form').removeClass('background');
      $('.income-categories').removeClass('visible');
      $('.expense-categories').removeClass('visible');
      function scrollDay(){
          if ($('.num-box').hasClass('selected-day')){
              console.log('change');
              $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
          }
      }
      window.setTimeout(scrollDay, 100);
      //$('body').removeClass('no-scroll');
  } else if (target.is(".card")){
      //========== if click is inside the card nothing will happen ========//
  } else if (target.is(".close")){
      //====== click the X to close popup =======//
      $('.income-form').removeClass('show');
      $('.expense-form').removeClass('show');
    //   $('.income-form').removeClass('background');
    //   $('.expense-form').removeClass('background');
      $('.income-categories').removeClass('visible');
      $('.expense-categories').removeClass('visible');
      function scrollDay(){
          if ($('.num-box').hasClass('selected-day')){
              console.log('change');
              $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
          }
      }
      window.setTimeout(scrollDay, 100);
      //$('body').removeClass('no-scroll');
  } else if(target.is(".submit-transaction")){
      $('.income-form').removeClass('show');
      $('.expense-form').removeClass('show');
    //   $('.income-form').removeClass('background');
    //   $('.expense-form').removeClass('background');
      $('.income-categories').removeClass('visible');
      $('.expense-categories').removeClass('visible');
      function scrollDay(){
          if ($('.num-box').hasClass('selected-day')){
              console.log('change');
              $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
          }
      }
      window.setTimeout(scrollDay, 100);
      //$('body').removeClass('no-scroll');
  }
});

$('.expense-button').click(function(){
    $('.expense-amount').val('');
})
$('.income-button').click(function(){
    $('.income-amount').val('');
})

//========== Only select one transaction category at a time =========//
$('.income-category, .expense-category').click(function(event){
    var target = $(event.target);
    $('.income-category, .expense-category').removeClass('clicked');
    if (target.is(".income-category, .expense-category")){
        target.addClass('clicked');
    } else if (target.is(".income-icon, .expense-icon")){
        target.parent().addClass('clicked')
    }
});

//======== Only select one checkbox at a time ========//
$('.frequency').on('change', function() {
    $('.frequency').not(this).prop('checked', false);
});



function submitIncome (){
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let days = $(document).find('.days').children();
    console.log($('.clicked').val());

        _.range(1, 43).forEach(function(dayIndex){
            $('.date-value').removeClass('input_date');
            let day = $(days[startOfMonth + dayIndex - 1]);
            if (day.find('.date-value').html() === $('.income-date-input').val()){
                day.find('.date-value').parent().addClass('input_date');
                if ($('.clicked').val() === 'Income'){
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/misc-income.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Paycheck') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/paycheck.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Bonus') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/bonus.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Reimbursement') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/reimbursement.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Investment') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/investment.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Gift') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/gifts.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                }
            }
        })

        _.range(0, startOfMonth).forEach(function(dayIndex){
            $('.date-value').removeClass('input_date');
            let day = $(days[dayIndex]);
            if (day.find('.date-value').html() === $('.income-date-input').val()){
                day.find('.date-value').parent().addClass('input_date');
                if ($('.clicked').val() === 'Income'){
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/misc-income.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Paycheck') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/paycheck.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Bonus') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/bonus.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Reimbursement') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/reimbursement.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Investment') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/investment.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Gift') {
                    day.find('.date-value').parent().find('.income-content').append(`<span class="transaction-income"><div class="income-color"><img class="income-icon" src="./images/gifts.png" /></div><span class="entered-income">$${$('.income-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                }
            }
        })

        function scrollDay(){
            if ($('.num-box').hasClass('selected-day')){
                console.log('change');
                $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
            }
        }
        window.setTimeout(scrollDay, 100);
}

function submitExpense (){
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let days = $(document).find('.days').children();
    console.log($('.clicked').val());

        _.range(1, 43).forEach(function(dayIndex){
            $('.date-value').removeClass('input_date');
            let day = $(days[startOfMonth + dayIndex - 1]);
            if (day.find('.date-value').html() === $('.expense-date-input').val()){
                day.find('.date-value').parent().addClass('input_date');
                if ($('.clicked').val() === 'Expense'){
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/misc-income.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Clothing') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/clothing.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Education') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/education.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Entertainment') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/entertainment.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Food') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/food.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Grocery') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/grocery.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Healthcare') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/healthcare.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Household') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/home.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Insurance') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/insurance.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Loan') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/loan.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                }
            }
        })

        _.range(0, startOfMonth).forEach(function(dayIndex){
            $('.date-value').removeClass('input_date');
            let day = $(days[dayIndex]);
            if (day.find('.date-value').html() === $('.expense-date-input').val()){
                day.find('.date-value').parent().addClass('input_date');
                if ($('.clicked').val() === 'Expense'){
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/misc-income.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Clothing') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/clothing.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Education') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/education.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Entertainment') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/entertainment.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Food') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/food.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Grocery') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/grocery.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Healthcare') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/healthcare.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Household') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/home.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Insurance') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/insurance.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                } else if ($('.clicked').val() === 'Loan') {
                    day.find('.date-value').parent().find('.expense-content').append(`<span class="transaction-expense"><div class="expense-color"><img class="expense-icon" src="./images/loan.png" /></div><span class="entered-expense">$${$('.expense-amount').val()}</span><span class="edit-transaction fontawesome-pencil"><span></span>`);
                }
            }
        })
        function scrollDay(){
            if ($('.num-box').hasClass('selected-day')){
                console.log('change');
                $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
            }
        }
        window.setTimeout(scrollDay, 100);
}


function scrollWeekOne(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-one').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(1)').offset().top - 150}, 500);
}

function scrollWeekTwo(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-two').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(2)').offset().top - 150}, 500);
}

function scrollWeekThree(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-three').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(3)').offset().top - 150}, 500);
}

function scrollWeekFour(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-four').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(4)').offset().top - 150}, 500);
}

function scrollWeekFive(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-five').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(5)').offset().top - 150}, 500);
}

function scrollWeekSix(){
    $('.scroll-dots button').removeClass('selected-dot');
    $('.dot-six').addClass('selected-dot');
    $('body, html').animate({scrollTop: $('.days:nth-child(6)').offset().top - 150}, 500);
}

$(window).scroll(function(){
    let scrollTop = $('body').scrollTop();
    if (scrollTop < $('.days:nth-child(2)').position().top - 400){
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-one').addClass('selected-dot');
    } else if (scrollTop < $('.days:nth-child(3)').position().top - 400) {
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-two').addClass('selected-dot');
    } else if (scrollTop < $('.days:nth-child(4)').position().top - 400) {
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-three').addClass('selected-dot');
    } else if (scrollTop < $('.days:nth-child(5)').position().top - 400) {
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-four').addClass('selected-dot');
    } else if (scrollTop < $('.days:nth-child(6)').position().top - 400) {
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-five').addClass('selected-dot');
    } else if (scrollTop >= $('.days:nth-child(6)').position().top - 400) {
        $('.scroll-dots button').removeClass('selected-dot');
        $('.dot-six').addClass('selected-dot');
    }

})

// $(window).scroll(function() {
//     function scrollBottom(){
//         if ($(window).width() < 500 && $(window).scrollTop() + $(window).height() == $(document).height()){
//             $('.fab-box').addClass('hidden');
//         } else{
//             $('.fab-box').removeClass('hidden');
//         };
//     };
//     window.setTimeout(scrollBottom, 500);
// });


}


CalendarController.$inject = ['$scope'];

export {CalendarController};
