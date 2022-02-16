var conf = {
    itemPerRow:15, 
    itemWidth:7,
    responsive: {
        1000: [5, 20],
        800: [4, 25],
        600: [3, 34],
    },
}

document.addEventListener("DOMContentLoaded", () => {
    /* numContainer = 3 */

    document.querySelector(".own-carousel__container").ownCarousel(conf);
    responsive();

/*     for (let i = 1; i < numContainer +1; i++) {
        document.querySelector(".own-carousel__container_" + numContainer).ownCarousel(conf);
        responsive(".own-carousel__container_" + numContainer);        
    } */
});

/* 
1000: [4, 24],
800: [3, 33],
600: [2, 49],
400: [1, 100]
 */