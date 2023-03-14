console.log("gallery initialised")


const gallery = document.querySelector('#paginated_gallery');
const gallery_scroller = gallery.querySelector('div');
console.log(gallery_scroller);
const gallery_item_size = gallery_scroller.querySelector('img').clientWidth;
// console.log(gallery_item_size);

gallery.querySelector('.btn.next').addEventListener('click', scrollToNextPage);
gallery.querySelector('.btn.prev').addEventListener('click', scrollToPrevPage);

// // For paginated scrolling, simply scroll the gallery one item in the given
// // direction and let css scroll snaping handle the specific alignment.
function scrollToNextPage() {
  gallery_scroller.scrollBy(gallery_item_size, 0);
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy(-gallery_item_size, 0);
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
