$(document).ready(function() {
	$('.cta-open').on('click', function() {
		$('.toggle-form, .formwrap').addClass('active');
		$('.icon-close').addClass('open');
	});
	$('.icon-close').on('click', function() {
		$('.toggle-form, .formwrap').removeClass('active');
		$('.icon-close').removeClass('open');
  });

  $('.edit').on('click', function(e) {
    e.preventDefault();
    console.log(e.target.id)
    $(e.target).css('display', 'none');
    $(`#${e.target.id}.user-grail-text`).css('display', 'none');
    $(`#${e.target.id}.user-grail-delete`).css('display', 'none');
    $(`#${e.target.id}.user-grail-form`).css('display', 'block');
  });

  $('input[type="radio"]').click(function(){
    const checkedValue = $("input[name='filter']:checked").val();
    if(checkedValue === 'category') {
      $('#search-user-bar').css('display', 'none');
      $('#search-category-bar').css('display', 'block');
    } else {
      $('#search-category-bar').css('display', 'none');
      $('#search-user-bar').css('display', 'block');
    }
  })
})

function userGrailUpdate(deleteGrailId, updateCategory) {
  // e.preventDefault();
  const updateGrail = $(`#${deleteGrailId}-input`).val();
  console.log(updateCategory)
  console.log(updateGrail)

  $.ajax({
    "async": true,
    "url": `http://localhost:9000/api/add-grail`,
    "method": "POST",
    "data": {         
      "category": updateCategory,
      "grail": updateGrail
    }
  })
    .done(function (response) {
      console.log(response);
   });

  $.ajax({
    "async": true,
    "url": `http://localhost:9000/api/user/grail/${deleteGrailId}/`,
    "method": "DELETE"
  })
    .done(function (response) {
      console.log(response);
      window.location.reload();
  })
   return false;

  }
