
var PRODUCT_URL  = 'http://beershop.local/products/';
var COMMENTS_URL = 'http://beershop.local/comments/';
var RATING_URL = 'http://beershop.local/rating/';

var accessToken = "";

$.getJSON(PRODUCT_URL, function( data ) {
  $.each(data, function( key, val ) {
    $("#products").append(`
      <div class="card" style="width: 20rem;" data-toggle="modal" data-target="#productModal" data-product="${key}">
      <div class="card-header">${val.name}</div>
        <img class="card-img-bottom" src="${val.image_url}" alt="${val.name}">
      </div>`);
  });
});



var productID = ""

$('#productModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  productID = button.data('product')
  var modal = $(this)

  $.getJSON(PRODUCT_URL + productID, function( data ) {
    modal.find('.modal-title').text(data.name)
    modal.find('.modal-body .product-description').text(data.description)
    modal.find('.modal-body .product-image').html(`
      <img src="${data.image_url}" alt="Card image cap" class="rounded img-fluid">
      `)
  });

  $.ajax({
    url: COMMENTS_URL + productID, 
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      data.forEach(function( entry ) {
        modal.find('.modal-body .product-comments').append(`
        <hr>
        <h4>${entry.user}</h4>
        <p>${entry.comment}</p>
        `)
      });
    },
    beforeSend: function(xhr){
      console.log(accessToken)
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    }
  }) 

  // $.get(RATING_URL + productID, function( data ) {
  //   console.log(data)
  //   modal.find('.modal-body .product-rating').html(data)
  // });
})


$('#productModal').on('hidden.bs.modal', function (event) {
  var modal = $(this)
  modal.find('.modal-title').text('Loading...')
  modal.find('.modal-body .product-description').empty()
  modal.find('.modal-body .product-image').empty()
  modal.removeData('product')
})


$('#tokenModal').on('hidden.bs.modal', function (event) {
  var modal = $(this)
  accessToken = $('textarea#token').val();
})

