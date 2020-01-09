$(document).ready(function() {
	$('.cta-open').on('click', function() {
		$('.toggle-form, .formwrap').addClass('active');
		$('.icon-close').addClass('open');
	});
	$('.icon-close').on('click', function() {
		$('.toggle-form, .formwrap').removeClass('active');
		$('.icon-close').removeClass('open');
  });

  $('.pencil').on('click', function(e) {
    e.preventDefault();
    console.log(e.target.id)
    $(e.target).css('display', 'none');
    $(`#${e.target.id}.user-grail-text`).css('display', 'none');
    $(`#${e.target.id}.user-grail-delete`).css('display', 'none');
    $(`#${e.target.id}.user-grail-form`).css('display', 'block');
  });
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
  })
   return false;

  }
  
  // $('#edit-button').on('click', function(e) {
  //   e.preventDefault();
  //   console.log(e.target)
  // })



// $('#grail-card').on('click', function() {
//   window.location.href='/grails/show';
// })

// var settings = {
//   "async": true,
//   "url": "http://localhost:9000/add-grail",
//   "method": "POST",
//   "data": {
//     "category": "Sweatpants",
//     "grail": "Muji"
//   }
// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// const axios = require('axios');

// changeHandler = e => {
//   this.setState({ [e.target.name]: e.target.value })
// };

// $('add-grail').on('submit', function(e) {
//   e.preventDefault();
//   axios.post('http://localhost:9000/add-grail', )
//   .then(res => {
//     console.log(res.data);
//   })
// })
