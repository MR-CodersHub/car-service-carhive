(function() {
  function initBlog() {
    var blogGrid = document.getElementById('blogGrid');
    var searchInput = document.getElementById('blogSearch');
    var filterButtons = document.querySelectorAll('.filter-btn');
    if (!blogGrid) return;

    var currentFilter = 'all';
    var currentSearch = '';

    function getBlogPosts() {
      return (window.CarHive && window.CarHive.blogPosts) ? window.CarHive.blogPosts : [];
    }

    function getBasePath() {
      var path = window.location.pathname;
      if (path.indexOf('/public/pages/') !== -1) return '../../';
      return './';
    }

    function renderBlogCards() {
      var posts = getBlogPosts();
      var basePath = getBasePath();
      var filtered = posts.filter(function(post) {
        var matchesFilter = currentFilter === 'all' || post.category.toLowerCase() === currentFilter.toLowerCase();
        var matchesSearch = currentSearch === '' ||
          post.title.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 ||
          post.excerpt.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 ||
          post.category.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1;
        return matchesFilter && matchesSearch;
      });

      if (filtered.length === 0) {
        blogGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--steel);"><p style="font-size:18px;margin-bottom:16px;">No articles found</p><p>Try adjusting your search or filter criteria.</p></div>';
        return;
      }

      blogGrid.innerHTML = filtered.map(function(post) {
        var imgUrl = (post.image.indexOf('http') === 0 || post.image.indexOf('/') === 0) ? post.image : (basePath + post.image);
        return '<article class="blog-card" data-category="' + post.category + '">' +
          '<div class="blog-card-img">' +
            '<a href="' + basePath + 'public/pages/blog-details.html?id=' + post.id + '">' +
              '<img src="' + imgUrl + '" alt="' + post.title + '" loading="lazy">' +
            '</a>' +
            '<span class="blog-tag">' + post.category + '</span>' +
          '</div>' +
          '<div class="blog-card-body">' +
            '<div class="blog-meta"><span>' + post.date + '</span><span>' + post.readTime + '</span></div>' +
            '<h3><a href="' + basePath + 'public/pages/blog-details.html?id=' + post.id + '">' + post.title + '</a></h3>' +
            '<p>' + post.excerpt + '</p>' +
            '<a href="' + basePath + 'public/pages/blog-details.html?id=' + post.id + '" class="blog-card-link">Read Article →</a>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterButtons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.dataset.filter || 'all';
        renderBlogCards();
      });
    });

    if (searchInput) {
      var debounceTimer;
      searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          currentSearch = e.target.value.trim();
          renderBlogCards();
        }, 300);
      });
    }

    // Check URL for category param
    var urlParams = new URLSearchParams(window.location.search);
    var catParam = urlParams.get('category');
    if (catParam) {
      currentFilter = catParam;
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.filter === catParam) btn.classList.add('active');
      });
    }

    renderBlogCards();
  }

  window.CarHive = window.CarHive || {};
  window.CarHive.initBlog = initBlog;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  } else {
    initBlog();
  }
})();