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

  $('#user-grail-update').on('submit', function(e) {
    e.preventDefault();
    const inputGrail = $('#user-grail-update input').val();
    const inputCategory = $('#user-grail-update input').attr('category');
    console.log(inputGrail)
    console.log(inputCategory)

    // $.ajax({
    //   "async": true,
    //   "url": `http://localhost:9000/add-grail`,
    //   "method": "POST",
    //   "data": {         
    //     "category": inputCategory,
    //     "grail": inputGrail
    //   }
    // })
    //   .done(function (response) {
    //     console.log(response);
    //  });
  


  const deleteGrailId = $('.user-grail-delete').attr('id');
  console.log(deleteGrailId)

  $.ajax({
    "async": true,
    "url": `http://localhost:9000/api/user/grail/${deleteGrailId}/`,
    "method": "DELETE"
  })
    .done(function (response) {
      console.log(response);
   })

  })
})
  
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
