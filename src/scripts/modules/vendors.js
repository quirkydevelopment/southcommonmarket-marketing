$(window).load(function() {

  getVendors();

  $('#vendorSearch').on('submit', function(event) {
    event.preventDefault();
    getVendors();
    $('#vendorLists').find('li:not(:first-child)').remove();
    $('#vendorListLoader').removeClass('hidden');
  })
  
  function getVendors() {
    const limit = 15;
    const page = 1;
    const sortName = '';
    const sort = -1;
    const query = $('#vendorQuery').val();

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://southcommonmarket.herokuapp.com/api/vendors/all?limit=${limit}&page=${page}&query=${query}&sortName=${sortName}&sort=${sort}`;

    const request = $.ajax({
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
    const template = `<li class="list">
                        <a href="#">
                          <img class="product-image" src="${(vendor.profile.length !== 0 && vendor.profile[0].image) ? vendor.profile[0].image : './assets/images/sunflowers-min.jpg'}" alt="">
                          <p class="vendor-name">${vendor.company}</p>
                        </a>
                      </li>`;

    $(template).appendTo('#vendorLists');
  }

  function paginationTemplate(totalPages) {
    if (totalPages > 1) {
      for (let index = 1; index <= totalPages; index++) {
        const template = `<li class="page-list-item"><a class="page-link">${index}</a></li>`;
  
        $(template).appendTo('#vendorsPagination');
      }
    }
  }

})