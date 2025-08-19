function renderpracticeAreas() {
  const container = document.getElementById("practiceAreasContainer");
  container.innerHTML = practiceAreas.map(area => `
    <div class="practice-area-box" onclick="redirectpracticeAreas(${area.id})">
      <div class="practice-area-img"><img src="${area.thumbnail}"></div>
      <div class="practice-area-title">${area.title}</div>
      <div class="practice-area-sub-title">${area.description1}</div>
      <div class="practice-areas-learn-more">Learn More <i class="fa-solid fa-arrow-right-long"></i></div>
    </div>
  `).join('');
}

function redirectpracticeAreas(id) {
  // Example redirection — change as needed
  window.location.href = `practice-details.html?id=${id}`;
}

renderpracticeAreas();