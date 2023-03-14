console.log("gallery initialised")


const gallery = document.querySelector('#paginated_gallery');
const gallery_scroller = gallery.querySelector('div');
console.log(gallery_scroller);
const gallery_item_size = gallery_scroller.querySelector('img').clientWidth;
// console.log(gallery_item_size);

const nxt = gallery.querySelector('.btn.next')
nxt.addEventListener('click', scrollToNextPage);
const prev = gallery.querySelector('.btn.prev')
prev.addEventListener('click', scrollToPrevPage);
gallery_scroller.addEventListener('scroll', e => {
    if (gallery_scroller.scrollLeft > 0) {
        prev.style.display = "block"
    } else {
        prev.style.display = "none"
    }

    const scrollable = gallery_scroller.scrollWidth  - gallery_scroller.offsetWidth
    if (gallery_scroller.scrollLeft >= scrollable) {
        nxt.style.display = "none"
    } else {
        nxt.style.display = "block"
    }

    // 985
    
    // console.log("scrollable", scrollable);
    // console.log("scrollWidth", gallery_scroller.scrollWidth);
    // console.log("offsetWidth", gallery_scroller.offsetWidth);
    // console.log("clientWidth", gallery_scroller.clientWidth);
    // console.log("scrollLeft", gallery_scroller.scrollLeft);

    // if scrollLeft > 0 then show next btn
    // console.log(gallery_scroller.scrollLeft + '/' + (gallery_scroller.offsetWidth - gallery_scroller.clientWidth));
    // console.log(gallery_scroller.offsetWidth);
});

// // For paginated scrolling, simply scroll the gallery one item in the given
// // direction and let css scroll snaping handle the specific alignment.
function scrollToNextPage() {
  gallery_scroller.scrollBy({
    left: gallery_item_size,
    top: 0,
    behavior: 'smooth'
  });
//   updateBtns()
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy({
    left: -gallery_item_size,
    top: 0,
    behavior: 'smooth'
  });
//   updateBtns()
}

function updateBtns () {
    console.log("scrolled one way or another");
}

// function updateAlignment(event) {
//   const alignment = event.target.value;
//   for (item of gallery.querySelectorAll('.gallery_scroller > div'))
//     item.style.scrollSnapAlign = alignment;

//   // Currently changing scroll alignment does not force a re-snap in Chrome.
//   // This is a bug: http://crbug.com/866127
//   // In meantime, if desired a scroll snap can be triggered using a small 
//   // scripted scroll e.g.: `gallery_scroller.scrollBy(1, 0);`
// }
