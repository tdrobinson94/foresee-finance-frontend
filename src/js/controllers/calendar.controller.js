import $ from 'jquery';
import { MONTHS } from '../utilities/months.constant';
import angular from 'angular';
import _ from 'lodash';

function CalendarController($scope){

  let vm = this;
  vm.next = next;
  vm.prev = prev;
  vm.current = current;
  vm.goToTop = goToTop;

  let clock = new Date();
  let month = clock.getMonth();
  let year = clock.getFullYear();

  console.log(MONTHS[1].name)

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

//Needs to be refactored
$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();
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
       day.find('.num-container').parent().addClass("selected-day");
       day.find('.transaction-button').addClass('show');
       day.find('.num-date').parent().removeClass("dead_month_color");
     } else {
       day.find('.num-container').parent().removeClass("day_background_color");
       day.find('.num-date').parent().removeClass("dead_month_color");
     }
     if(dayIndex > monthDays){
       day.find('.num').html(dayIndex - monthDays).parent().addClass("dead_month_color");
       if(nextMonth == 13){
         nextMonth = 1;
         currentYear = Number(currentYear) + 1;
       }
       if(nextMonth < 10){
         let newMonth = nextMonth
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = (dayIndex - monthDays)
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + newDayIndex).parent().addClass("dead_month_color");
         } else {
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (dayIndex - monthDays)).parent().addClass("dead_month_color");
         }
       } else {
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = (dayIndex - monthDays)
           day.find('.num-date').html(MONTHS[nextMonth - 1].name + ' ' + newDayIndex).parent().addClass("dead_month_color");
         } else {
           day.find('.num-date').html(MONTHS[nextMonth - 1].name + ' ' + (dayIndex - monthDays)).parent().addClass("dead_month_color");
         }
       }
     } else {
       day.find('.num').html(dayIndex);
       let thisMonth = (Number(currentMonth) + 1);
       if(thisMonth < 10){
         let newMonth = thisMonth
         if(dayIndex < 10){
           let newDays = dayIndex
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + newDays);
         } else{
           day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (dayIndex));
         }
       } else {
         if(dayIndex < 10){
           let newDays = dayIndex
           day.find('.num-date').html(MONTHS[thisMonth - 1].name + ' ' + newDays);
         } else{
           day.find('.num-date').html(MONTHS[thisMonth - 1].name + ' ' + (dayIndex));
         }
       }
     }
    })
    function scrollDay(){
      if($('.num-box').hasClass('day_background_color') === true){
        $('body').animate({scrollTop: $('.day_background_color').offset().top - 170}, 500);
      } else{
        $('body').animate({scrollTop: 0}, 500);
      }
    }
    window.setTimeout(scrollDay, 250);
  };
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
          let newMonth = prevMonth
          day.find('.num-date').html(MONTHS[newMonth - 1].name + ' ' + (prevDays[dayIndex]));
        } else {
          day.find('.num-date').html(MONTHS[prevMonth - 1].name + ' ' + (prevDays[dayIndex]));
        }

        day.find('.num-date').parent().addClass("dead_month_color");
        day.find('.num-container').parent().removeClass("day_background_color");
      }
    })
  }

  renderMonth();
  renderPrevMonthDays();

})
$('.month-selector').change();

function prev(){
  $('.num-box').removeClass('selected-day');
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
    if($('.num-box').hasClass('day_background_color') === true){
      $('body').animate({scrollTop: $('.day_background_color').offset().top - 170}, 500);
    } else{
      $('body').animate({scrollTop: 0}, 500);
    }
  }
  window.setTimeout(scrollDay, 250);
}

function current(){
  $('.num-box').removeClass('selected-day');
  $('.transaction-button').removeClass('show');
  $(document).find('#month').val(month).change()
  $(document).find('#year').val(year).change()
  $('body').animate({scrollTop: $('.day_background_color').offset().top - 170}, 500);
}

function next(){
  $('.num-box').removeClass('selected-day');
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
    if($('.num-box').hasClass('day_background_color') === true){
      $('body').animate({scrollTop: $('.day_background_color').offset().top - 170}, 500);
    } else{
      $('body').animate({scrollTop: 0}, 500);
    }
  }

  window.setTimeout(scrollDay, 250);
}

$('.days').click(function( event ) {
  var target = $( event.target );
  if (target.is(".num-box")) {
    $('.transaction-button').removeClass('show');
    $('.num-box').removeClass('selected-day');
    target.addClass('selected-day');
    target.find('.transaction-button').addClass('show');
    $('body').animate({scrollTop: $('.selected-day').offset().top - 170}, 500);
  }
});

function goToTop(){
    $('body').animate({scrollTop: 0}, 500);
}

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $('.top-box').addClass('showTopButton');
   } else {
       $('.top-box').removeClass('showTopButton');
   }
});

$('.fab-button').click(function(){
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
})

$('.income-button').click(function(){
    $('.income-form').addClass('show');
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
})

$('.expense-button').click(function(){
    $('.expense-form').addClass('show');
    $('.income-button').toggleClass('show-income-button');
    $('.expense-button').toggleClass('show-expense-button');
})

$('.close').click(function(){
    $('.income-form').removeClass('show');
    $('.expense-form').removeClass('show');
})

}


CalendarController.$inject = ['$scope'];

export {CalendarController};
