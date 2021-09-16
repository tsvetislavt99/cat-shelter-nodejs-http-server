(function () {
  console.log('meow');
  const delBtns = document.querySelectorAll('.delete');
  delBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('clicked');
    });
  });
})();
