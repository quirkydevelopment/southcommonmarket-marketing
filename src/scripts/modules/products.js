$(window).load(function() {

  getCategories();
  getProducts();

  function getCategories() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://southcommonmarket.herokuapp.com/api/categories`;

    const request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      console.log(response)
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
    const tempalte = `<li class="filter-list">
                        <a class="filter-link" href="/products?category=${category.slug}">${category.name}</a>
                      </li>`
    $(tempalte).appendTo('#categories');
  }
  
  function getProducts() {
    const limit = 15;
    const page = 1;
    const sortName = '';
    const sort = -1;
    const category = new URLSearchParams(window.location.search).get('category') || '';

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://southcommonmarket.herokuapp.com/api/products/all?limit=${limit}&page=${page}&sortName=${sortName}&sort=${sort}&category=${category}`;

    const request = $.ajax({
      url: proxyurl + url,
      type: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    request.done(function(response) {
      const total = Math.round(response.total);

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
    const template = `<li class="product-list">
                        <a class="product-link" href="#">
                          <div class="holder-item">
                            <div class="holder-image">
                              <img class="product-image" src="${product.image || './assets/images/best-seller-1.png'}" alt="best seller image">
                            </div>
                            <div class="holder-info">
                              <h5 class="product-text product-category text-center">${product.category[0].name}</h5>
                              <p class="product-text product-item text-center">${product.name}</p>
                              <p class="product-text product-price text-center">CA$${product.price}</p>
                            </div>
                          </div>
                        </a>
                      </li>`;

    $(template).appendTo('#productLists');
  }

  function paginationTemplate(totalPages) {
    if (totalPages > 1) {
      for (let index = 1; index <= totalPages; index++) {
        const template = `<li class="page-list-item"><a class="page-link">${index}</a></li>`;
  
        $(template).appendTo('#productsPagination');
      }
    }
  }

  function totalResultsTemplate(total) {
    const template = `<p class="filter-item-number text-right">
                        Showing 
                        <span class="filter-showed-number">1-${total}</span> 
                        of 
                        <span class="filter-total-number">${total}</span> 
                        results
                      </p>`

    $(template).appendTo('#totalResults');
  }

})