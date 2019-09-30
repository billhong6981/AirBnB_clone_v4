$( document ).ready(function() {
  const checkDict = {};
  $('LI INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      let k = $(this).attr('data-id');
      let v = $(this).attr('data-name');
      checkDict[k] = v;
    }
    if (!$(this).is(':checked')) {
      delete checkDict[$(this).attr('data-id')]
    }
    let s = "";
    const entries = Object.entries(checkDict);
    entries.forEach(entry => {
      entry[1] += ', ';
      s += entry[1];
    });
    $('DIV.amenities h4').html(s.length > 0 ? '<i>'+ s.substring(0, 30) + '</i>' : '&nbsp;');
  });

  $.get('http://0.0.0.0:5001/api/v1/status', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(data) {
      populateArticle(data);
    }
  });
});

function populateArticle(obj) {
  obj.map(place => {
    $('.places h1').after(`<article>
			  <div class="title">

			  <h2>${place.name}</h2>

			  <div class="price_by_night">

			  $${place.price_by_night}

			  </div>
			  </div>
			  <div class="information">
			  <div class="max_guest">
			  <i class="fa fa-users fa-3x" aria-hidden="true"></i>

			  <br />

			  ${place.max_guest} Guests

			  </div>
			  <div class="number_rooms">
			  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

			  <br />

			  ${place.number_rooms} Bedrooms
			  </div>
			  <div class="number_bathrooms">
			  <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

			  <br />

			  ${place.number_bathrooms} Bathroom

			  </div>
			  </div>

			  <!-- **********************
			  USER
			  **********************  -->

			  <div class="user">

			  <strong>Owner:&nbsp;</strong>

			  </div>
			  <div class="description">

			  ${place.description}

			  </div>

			    </article> <!-- End 1 PLACE Article -->
			  `)
  });
}
