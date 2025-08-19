const params = new URLSearchParams(window.location.search);
const practiceId = parseInt(params.get('id'));

const selectedPracticeAreas = practiceAreas.find(post => post.id === practiceId);

if (selectedPracticeAreas) {
  document.getElementById("banTitle").innerHTML = selectedPracticeAreas.title;
}

// Render practice areas list with active state
function renderPracticeAreaList() {
  const listContainer = document.getElementById("practiceAreasList");
  if (!listContainer) return;

  listContainer.innerHTML = practiceAreas.map(area => `
    <li class="practice-area-item ${area.id === practiceId ? 'active' : ''}">
      <a href="practice-details.html?id=${area.id}">
        ${area.id === practiceId ? '<i class="fa-solid fa-arrow-right-long"></i>' : ''}
        ${area.title}
      </a>
    </li>
  `).join('');
}

renderPracticeAreaList();

function renderPracticeDetails() {
  const wrapper = document.getElementById("practiceDetailsContent");

  if (!selectedPracticeAreas) {
    wrapper.innerHTML = "<p>Practice area not found.</p>";
    return;
  }

  // Build optional practiceAreaHead if blogDetails2 exists
  const practiceAreaHeadHtml = selectedPracticeAreas.title
    ? `<div class="practice-detail-head">${selectedPracticeAreas.title + ' :' || ''}</div>`
    : '';

  // Start building HTML
  let html = `
    <div class="practice-detail-post">
      <div class="practice-img">
        <img src="${selectedPracticeAreas.image1 || ''}" alt="practice image">
      </div>
      ${practiceAreaHeadHtml}
      <div class="practice-detail" id="blogDetails1">${selectedPracticeAreas.description1 || ''}</div>
    </div>
  `;

  // Conditionally show section-2
  if (selectedPracticeAreas.blogDetails2) {
    html += `
      <div class="practice-detail-post">
        <div class="practice-img justify-end">
          <img src="${selectedPracticeAreas.image2 || ''}" alt="practice image">
        </div>
        <div class="practice-detail" id="blogDetails2">${selectedPracticeAreas.description2 || ''}</div>
      </div>
    `;
  }

  // Conditionally show section-3
  if (selectedPracticeAreas.blogDetails3) {
    html += `
      <div class="practice-detail-post">
        <div class="practice-img">
          <img src="${selectedPracticeAreas.image3 || ''}" alt="practice image">
        </div>
        <div class="practice-detail" id="blogDetails3">${selectedPracticeAreas.description3 || ''}</div>
      </div>
    `;
  }

  wrapper.innerHTML = html;
}

// Run after DOM is ready
renderPracticeDetails();