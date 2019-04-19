$(window).load(function() {

  getFaqs();

  function getFaqs() {
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'http://southcommonmarket.herokuapp.com/api/faqs';

    var request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      response.forEach(function(faq, index) {
        faqsTemplate(faq, index);
        // $('#categoryLoader').hide();
      })
    });

    request.fail(function(error) {
      console.log(error);
    });
  }

  function faqsTemplate(faq, index) {
    var template = '';

    template += '<li class="faqs-list">';
    template += '<div class="card">';
    template += '<div class="card-header" role="tab" id="headingOne'+ index +'">'
    template += '<a class="accordion-link" data-toggle="collapse" data-parent="#accordionEx" href="#collapse'+ index +'" aria-expanded="true" aria-controls="collapse'+ index +'">';
    template += '<h5 class="text-question">';
    template += '<span class="title-bold">Question: </span>'+ faq.question +' <i class="fas fa-angle-down rotate-icon"></i>'    
    template += '</h5></a></div>';
    template += '<div id="collapse'+ index +'" class="collapse show" role="tabpanel" aria-labelledby="headingOne'+ index +'" data-parent="#accordionEx">'
    template += '<div class="card-body">';
    template += '<span class="title-bold">Answer: </span> '+ faq.answer;
    template += '</div></div></div></li>';    
        
    $(template).appendTo('#faqLists');
  }

})