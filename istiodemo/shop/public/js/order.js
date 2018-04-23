var GET_ORDER_URL  = 'https://beershop.local/order/';
var USER_URL  = 'https://beershop.local/user/';

orderId = window.location.hash.substr(1)
orderUrl = GET_ORDER_URL + orderId

$("#orderId").append(orderId)
$("#order").hide();
function pollOrderData(){
  $.getJSON(orderUrl, function( data ) {
    var userUrl = USER_URL + data.userID
    $.getJSON(userUrl, function( data ) {
      $("#orderAddress").empty()
      $("#orderAddress").append(`
        ${data.name}<br/>${data.email}`);
    });

    $("#orderStatus").empty()
    $("#orderStatus").append("<b>Status: </b>" + data.status);
    $("#items").empty()
    $.each(data.items, function( key, val ) {
      $("#items").append(`
        <tr>
          <th scope="row">${key}</th>
          <td>${val.name}</td>
          <td>1</td>
          <td>${parseFloat(val.price).toFixed(2)} EUR</td>
        </tr>`);
    });
    $("#order").show();
    setTimeout(pollOrderData,5000);
  });
}

pollOrderData();
