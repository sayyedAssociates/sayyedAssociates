const postsPerPage = 9;
let currentPage = 1;

function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = blogPosts.slice(start, end);

  const blogContainer = document.getElementById("blogContainer");
  blogContainer.innerHTML = visiblePosts.map(post => `
        <div class="blog-post">
          <a href="javascript:void(0)" onclick="redirectPost(${post.blogId})" class="blog-img-wrap">
            <img src="${post.thumbnail}" alt="Blog image">
          </a>
          <h3 class="blog-title" onclick="redirectPost(${post.blogId})">${post.title}</h3>
          <h3 class="blog-details">${post.blogDetails1}</h3>
        </div>
      `).join('');
}

function renderPagination() {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const pagination = document.getElementById("pagination");

  let buttons = '';

  for (let i = 1; i <= totalPages; i++) {
    buttons += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  pagination.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  renderPosts();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function redirectPost(id) {
  window.location.href = `blog-detail.html?id=${id}`;
}

renderPosts();
renderPagination();