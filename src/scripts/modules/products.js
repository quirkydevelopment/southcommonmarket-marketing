$(window).load(function() {

  $('#sortBy').on('change', function() {
    getProducts();
    $('#totalResults').empty();
    $('#productLists').find('li:not(:first-child)').remove();
    $('#productListLoader').removeClass('hidden');
  })

  getCategories();
  getProducts();

  function getCategories() {
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'http://southcommonmarket.herokuapp.com/api/categories';

    var request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      response.forEach(function(category, index) {
        categoryTemplate(category);
        $('#categoryLoader').hide();
      })
    });

    request.fail(function(error) {
      console.log(error);
    });
  }

  function categoryTemplate(category) {
    var tempalte = '<li class="filter-list"><a class="filter-link" href="/products?category='+ category.slug +'">'+ category.name +'</a></li>';
    $(tempalte).appendTo('#categories');
  }
  
  function getProducts() {
    var limit = 15;
    var page = 1;
    var sortName = $('#sortBy').val() || '';
    var sort = -1;
    var category = new URLSearchParams(window.location.search).get('category') || '';

    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'http://southcommonmarket.herokuapp.com/api/products/all?limit=' + limit + '&page=' + page + '&sortName=' + sortName + '&sort=' + sort + '&category=' + category;

    var request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      var total = Math.round(response.total);

      totalResultsTemplate(total);
      paginationTemplate(total / 15);

      response.data.forEach(function(product, index) {
        productTemplate(product);
      })

      $('#productListLoader').addClass('hidden');
    });

    request.fail(function(error) {
      console.log(error);
    });
  }

  function productTemplate(product) {
    var template = '';
    template += '<li class="product-list">';
    template += '<a class="product-link" href="#">';
    template += '<div class="holder-item">';
    template += '<div class="holder-image">';

    if (product.image) {
      template += '<img class="product-image" src="'+ product.image +'" alt="" />';
    } else {
      template += '<img class="product-image" src="./assets/images/best-seller-1.png" alt="" />';
    }

    template += '</div>';
    template += '<div class="holder-info">';
    template += '<h5 class="product-text product-category text-center">'+ product.category[0].name +'</h5>';
    template += '<p class="product-text product-item text-center">'+ product.name +'</p>';
    template += '<p class="product-text product-price text-center">CA$'+ product.price +'</p>';
    template += '</div></div></a></li>';

    $(template).appendTo('#productLists');
  }

  function paginationTemplate(totalPages) {
    if (totalPages > 1) {
      for (var index = 1; index <= totalPages; index++) {
        var template = '<li class="page-list-item"><a class="page-link">'+ index +'</a></li>';
  
        $(template).appendTo('#productsPagination');
      }
    }
  }

  function totalResultsTemplate(total) {
    var template = '<p class="filter-item-number text-right">Showing <span class="filter-showed-number">1-'+total+'</span> of <span class="filter-total-number">'+ total +'</span> results</p>'

    $(template).appendTo('#totalResults');
  }

})