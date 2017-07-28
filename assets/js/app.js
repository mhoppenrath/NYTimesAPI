const APIKEY = '6a0ca89b736d4e2ab8923d5867ee7621';

var searchTerm, records, startYear, endYear;

function initialize() {
  ;;
}

function clear() {
  $('#resultsbox').empty();
}

function handleSearch() {
  clear();
  getInput();
  pullData();
}

function getInput() {
  searchTerm = $('#termsbox input').val();
  records = $('#NumberofRecords input').val() || 1;
  startYear = $('#StartYear input').val();
  endYear = $('#EndYear input').val();
}

function pullData() {
  if (searchTerm) {
    let apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    apiUrl += '?api-key=' + APIKEY + '&';
    apiUrl += 'q=' + searchTerm + '&';
    apiUrl += startYear ? 'begin_date=' + startYear + '0101&' : '';
    apiUrl += endYear ? 'end_date=' + endYear + '0101&' : '';
    console.log('Url: ' + apiUrl);
    $.ajax(apiUrl).done(function(response) {
      handleResponse(response.response);
    });
  } else {
    alert('Missing search term.');
  }
}

function handleResponse(data) {
  records = (records > 10) ? 10 : records;
  var contentDiv = $('#resultsbox');
  for (var i = 0; i < records; i++) {
    var thisDiv = $('<div/>');
    thisDiv.text((i + 1) + ': ');
    thisDiv.append('<a href="' + data.docs[i].web_url + '">' + data.docs[i].headline.main + '</a><br>');
    thisDiv.append(data.docs[i].pub_date + '<br>')
    thisDiv.append(data.docs[i].snippet + '<br><br>');
    console.log(thisDiv.text());
    contentDiv.append(thisDiv);
  }
}

$(document).ready(function() {
  // initialize();
  $('#search').click(function() {
    handleSearch();
  });
  $('#clear').click(clear);
});
