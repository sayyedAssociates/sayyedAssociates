const params = new URLSearchParams(window.location.search);
const blogId = parseInt(params.get('id'));

const selectedPost = blogPosts.find(post => post.blogId === blogId);

if (selectedPost) {
  document.getElementById("banTitle").innerHTML = selectedPost.title;
}

function renderBlogDetails() {
  const wrapper = document.getElementById("blogDetailsWrapper");

  if (!selectedPost) {
    wrapper.innerHTML = "<p>Blog not found.</p>";
    return;
  }

  // Build optional blogHead if blogDetails2 exists
  const blogHeadHtml = selectedPost.title
    ? `<div class="blog-detail-head">${selectedPost.title + ' :' || ''}</div>`
    : '';

  // Start building HTML
  let html = `
    <div class="blog-detail-post">
      <div class="blog-img">
        <img src="${selectedPost.image1 || ''}" alt="blog image">
      </div>
      ${blogHeadHtml}
      <div class="blog-detail" id="blogDetails1">${selectedPost.blogDetails1 || ''}</div>
    </div>
  `;

  // Conditionally show section-2
  if (selectedPost.blogDetails2) {
    html += `
      <div class="blog-detail-post">
        <div class="blog-img justify-end">
          <img src="${selectedPost.image2 || ''}" alt="blog image">
        </div>
        <div class="blog-detail" id="blogDetails2">${selectedPost.blogDetails2}</div>
      </div>
    `;
  }

  // Conditionally show section-3
  if (selectedPost.blogDetails3) {
    html += `
      <div class="blog-detail-post">
        <div class="blog-img">
          <img src="${selectedPost.image3 || ''}" alt="blog image">
        </div>
        <div class="blog-detail" id="blogDetails3">${selectedPost.blogDetails3}</div>
      </div>
    `;
  }

  wrapper.innerHTML = html;
}

// Run after DOM is ready
renderBlogDetails();


function renderRecentArticles() {
  const recentContainer = document.getElementById("recentArticles");

  // Get last 3 posts (assumes blogPosts is already loaded)
  const recentPosts = blogPosts.slice(-3).reverse();

  recentContainer.innerHTML = recentPosts.map(post => `
    <div class="recent-article-post">
      <div class="recent-article-img" onclick="redirectPost(${post.blogId})">
        <img src="${post.thumbnail}" alt="recent image">
      </div>
      <h3 class="recent-article-title" onclick="redirectPost(${post.blogId})">${post.title}</h3>
      <h3 class="recent-article-details">${post.blogDetails1}</h3>
    </div>
  `).join('');
}

// Call the function after DOM and blogPosts are ready
renderRecentArticles();

function redirectPost(id) {
  window.location.href = `blog-detail.html?id=${id}`;
}