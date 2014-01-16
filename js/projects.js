jQuery(document).ready(function($) {
  var container = $('.projects');

  $(".form-inline").removeClass("hidden");

  // triggered when a form filter is clicked
  $("form#filters").on('click', 'button', function() {
    // toggle the button state
    $(this).button('toggle');

    // make a list of all the currently active filters
    var filter_arr = [];
    $("form#filters button.active").each(function() {
      filter_arr.push('[data-' + $(this).data('filter') + ']');
    });

    // filter projects
    container.isotope({
      filter: filter_arr.join('')
    });
  });

  var filters = {tags: {}, type: {}, status: {}, language: {}};

  container.find('.record').each(function() {
    // Find the current project's detail URL
    var record = $(this);
    var url = record.data('url');
    record.addClass('expand');

    // de-duplicate filter values
    $.each(filters, function (filter_type) {
      var filter_vals = record.data(filter_type).split(';');
      $.each(filter_vals, function(ignore, filter_val) {
        k = toFilterName(filter_val);
        if (!(k in filters[filter_type]) && k !== '') {
          filters[filter_type][k] = filter_val;
        }
      });
    });

    // Mouse over the record container
    record.hover(function() {
      var record = $(this);
      if (!record.hasClass('loaded')) {
        // Load and display it on hover
        $.get(url, function(data) {
          record.append(
            $(data).find('.record .rhs').html()
          ).addClass('loaded');
        });
      }
    });
  });

  // create filter buttons
  $.each(filters, function(filter_type, filter) {
    $.each(filter, function(k, v) {
      // the '*=' here is a hack. if a filter value is a substring of
      // another (e.g. java and javascript) this will go wrong.
      $('.btn-group.' + filter_type).append('<button type="button" class="btn btn-primary" data-filter="' + filter_type + '*=' + v + '">' + v + '</button>');
    });
  });

  // Parse filter title
  function toFilterName(title) {
    return title.trim().toLowerCase();
  }

  // Create Isotope grid view
  container.isotope({
    itemSelector: '.record',
    layoutMode: 'masonry',
    filter: '[data-featured=true]'
  });

});
