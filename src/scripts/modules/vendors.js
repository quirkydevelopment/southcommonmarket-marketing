$(window).load(function() {

  getVendors();

  $('#vendorSearch').on('submit', function(event) {
    event.preventDefault();
    getVendors();
    $('#vendorLists').find('li:not(:first-child)').remove();
    $('#vendorListLoader').removeClass('hidden');
  })
  
  function getVendors() {
    var limit = 15;
    var page = 1;
    var sortName = '';
    var sort = -1;
    var query = $('#vendorQuery').val();

    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'http://southcommonmarket.herokuapp.com/api/vendors/all?limit=' + limit + '&page=' + page + '&query=' + query + '&sortName=' + sortName + '&sort=' + sort;

    var request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      paginationTemplate(Math.round(response.total));

      response.data.forEach(function(vendor, index) {
        vendorTemplate(vendor);
      })

      $('#vendorListLoader').addClass('hidden');
    });

    request.fail(function(error) {
      console.log(error);
    });
  }

  function vendorTemplate(vendor) {
    var template = ''; 
    template += '<li class="list">';
    template +=   '<a href="#">';

    if (vendor.profile.length !== 0 && vendor.profile[0].image) {
      template += '<img class="product-image" src="'+ vendor.profile[0].image +'" alt="" />';
    } else {
      template += '<img class="product-image" src="./assets/images/sunflowers-min.jpg" alt="" />';
    }

    template += '<p class="vendor-name">'+ vendor.company +'</p>';
    
    template += '</a></li>';

    $(template).appendTo('#vendorLists');
  }

  function paginationTemplate(totalPages) {
    if (totalPages > 1) {
      for (let index = 1; index <= totalPages; index++) {
        var template = '<li class="page-list-item"><a class="page-link">' + index + '</a></li>';
  
        $(template).appendTo('#vendorsPagination');
      }
    }
  }

})