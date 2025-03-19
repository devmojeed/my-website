document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('blog-search-form');
    const searchInput = document.getElementById('blog-search-input');
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No results found.';
    noResultsMessage.style.display = 'none';
    searchForm.parentElement.appendChild(noResultsMessage);

    let debounceTimer;

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300); // Debounce delay (300ms)
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const blogItems = document.querySelectorAll('.blog-item');
        let resultsFound = false;

        blogItems.forEach(item => {
            const title = item.querySelector('.blog-content h2 a').textContent.toLowerCase();
            const content = item.querySelector('.blog-content p').textContent.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = '';
                highlightSearchTerm(item, searchTerm);
                resultsFound = true;
            } else {
                item.style.display = 'none';
                removeHighlighting(item);
            }
        });

        if (!resultsFound && searchTerm !== "") {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    function highlightSearchTerm(item, searchTerm) {
        const titleElement = item.querySelector('.blog-content h2 a');
        const contentElement = item.querySelector('.blog-content p');

        // Escape special characters in search term
        const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        titleElement.innerHTML = titleElement.textContent.replace(new RegExp(escapedSearchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
        contentElement.innerHTML = contentElement.textContent.replace(new RegExp(escapedSearchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);

        console.log("Title Element:", titleElement);
        console.log("Content Element:", contentElement);
        console.log("Search Term:", searchTerm);
    }

    function removeHighlighting(item) {
        const titleElement = item.querySelector('.blog-content h2 a');
        const contentElement = item.querySelector('.blog-content p');

        titleElement.innerHTML = titleElement.textContent;
        contentElement.innerHTML = contentElement.textContent;
    }
});