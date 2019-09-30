$( document ).ready(function() {
  const checkDict = {};
  $('LI#amen INPUT:checkbox').change(function () {
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

  const checkState = {};
  $('LI#st INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      let k = $(this).attr('data-id');
      let v = $(this).attr('data-name');
      checkState[k] = v;
    }
    if (!$(this).is(':checked')) {
      delete checkState[$(this).attr('data-id')]
    }
    let s1 = "";
    const entries = Object.entries(checkState);
    entries.forEach(entry => {
      entry[1] += ', ';
      s1 += entry[1];
    });
    $('DIV.locations h4').html(s1.length > 0 ? '<i>'+ s1.substring(0, 30) + '</i>' : '&nbsp;');
  });

  const checkCity = {};
  $('LI#ct INPUT:checkbox').change(function () {
    if ($(this).is(':checked')) {
      let k = $(this).attr('data-id');
      let v = $(this).attr('data-name');
      checkCity[k] = v;
    }
    if (!$(this).is(':checked')) {
      delete checkCity[$(this).attr('data-id')]
    }
    let s2 = "";
    const entries = Object.entries(checkCity);
    entries.forEach(entry => {
      entry[1] += ', ';
      s2 += entry[1];
    });
    $('DIV.locations h4').html(s2.length > 0 ? '<i>'+ s2.substring(0, 30) + '</i>' : '&nbsp;');
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

  $('button').click(() => {
    let obj = {
      'amenities': [],
      'states': [],
      'cities': [],
    };
    const entries = Object.entries(checkDict);
    entries.forEach( entry => {
      obj.amenities.push(entry[0]);
    });
    const entries1 = Object.entries(checkState);
    entries1.forEach( entry1 => {
      obj.states.push(entry1[0]);
    });
    const entries2 = Object.entries(checkCity);
    entries2.forEach( entry2 => {
      obj.cities.push(entry2[0]);
    });
    $('article').remove();

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: function(data) {
	populateArticle(data);
      }
    });
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
