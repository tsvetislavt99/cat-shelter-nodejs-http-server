(function () {
  console.log('meow');
  const delBtns = document.querySelectorAll('.delete');
  delBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const idToDel = btn.parentElement.parentElement.children[1].id;
      await fetch(`http://localhost:3000/delete-cat/${idToDel}`, {
        method: 'POST',
      });
      location.reload();

      console.log('clicked');
    });
  });
})();
