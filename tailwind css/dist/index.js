document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    alert(`Searching for "${searchQuery}" on the page...`);
  
  });
  document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault(); 
      document.getElementById('search-button').click(); 
    }
  });
  