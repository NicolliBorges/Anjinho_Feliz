$(document).ready(function(){
    $('.photo-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function initMap() {
        var service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({
            placeId: 'ChIJc49N5IBnzpQRvlUK8doHbC4' // Certifique-se de usar um placeId válido
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var reviewsContainer = document.getElementById('reviews');
                place.reviews.forEach(function(review) {
                    var reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    reviewElement.innerHTML = `
                        <p><strong>${review.author_name}</strong> - ${review.relative_time_description}</p>
                        <p>${review.text}</p>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                console.error('Erro ao buscar detalhes do local:', status);
            }
        });
    }

    window.initMap = initMap;
});
