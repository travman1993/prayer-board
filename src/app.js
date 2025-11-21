// State - stored only in browser memory (resets on page refresh)
let currentTab = 'prayer';
let allPosts = [];

// DOM Elements
const onboardingModal = document.getElementById('onboarding-modal');
const onboardingBtn = document.getElementById('onboarding-btn');
const appWrapper = document.getElementById('app-wrapper');
const tabBtns = document.querySelectorAll('.tab');
const postTextarea = document.getElementById('post-textarea');
const charCount = document.getElementById('char-count');
const postBtn = document.getElementById('post-btn');
const feedList = document.getElementById('feed-list');
const feedEmpty = document.getElementById('feed-empty');
const loading = document.getElementById('loading');

// Check onboarding status (localStorage)
function checkOnboarding() {
  const hasSeenOnboarding = localStorage.getItem('lifted-onboarded');
  if (hasSeenOnboarding) {
    hideOnboarding();
  }
}

function hideOnboarding() {
  onboardingModal.style.display = 'none';
  appWrapper.style.display = 'block';
}

// Onboarding button handler
onboardingBtn.addEventListener('click', () => {
  localStorage.setItem('lifted-onboarded', 'true');
  hideOnboarding();
  initializeApp();
});

// Tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentTab = e.target.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('tab--active'));
    e.target.classList.add('tab--active');
    updatePlaceholder();
    renderFeed();
  });
});

function updatePlaceholder() {
  if (currentTab === 'prayer') {
    postTextarea.placeholder = 'What would you like prayer for today?';
  } else {
    postTextarea.placeholder = 'What is weighing on your heart?';
  }
}

// Character counter
postTextarea.addEventListener('input', (e) => {
  const count = e.target.value.length;
  charCount.textContent = `${count} / 1000`;
});

// Post submission
postBtn.addEventListener('click', () => {
  const text = postTextarea.value.trim();
  
  if (!text) {
    alert('Please write something.');
    return;
  }

  if (text.length > 1000) {
    alert('Post is too long (max 1000 characters).');
    return;
  }

  try {
    // Get a random response
    const randomResponse = getRandomResponse(currentTab);
    
    // Create user's post object
    const userPost = {
      id: generateId(),
      type: currentTab,
      text: text,
      createdAt: new Date(),
      prayedCount: 0,
      reportCount: 0,
      isHidden: false
    };
    
    // Create response post
    const responsePost = {
      id: generateId(),
      type: currentTab,
      text: randomResponse,
      createdAt: new Date(Date.now() + 1000), // Slightly later
      prayedCount: 0,
      reportCount: 0,
      isHidden: false,
      isSystemResponse: true,
      respondingToId: userPost.id
    };
    
    // Add both to allPosts
    allPosts.unshift(responsePost);
    allPosts.unshift(userPost);
    
    // Clear form
    postTextarea.value = '';
    charCount.textContent = '0 / 1000';
    
    // Refresh display
    renderFeed();
    
    // Show success notification
    showSuccessNotification(randomResponse);
    
  } catch (error) {
    console.error('Error posting:', error);
    alert('Failed to post. Please try again.');
  }
});

function renderFeed() {
  feedList.innerHTML = '';
  
  // Filter posts by current tab
  const filteredPosts = allPosts.filter(post => post.type === currentTab && !post.isHidden);
  
  if (filteredPosts.length === 0) {
    feedEmpty.style.display = 'block';
    return;
  }
  
  feedEmpty.style.display = 'none';
  
  filteredPosts.forEach(post => {
    const postEl = createPostElement(post);
    feedList.appendChild(postEl);
  });
}

function createPostElement(post) {
  const div = document.createElement('div');
  div.className = post.isSystemResponse ? 'post post--response' : 'post';
  
  const typeClass = post.type === 'prayer' ? 'post__type--prayer' : 'post__type--confession';
  const typeLabel = post.type === 'prayer' ? 'Prayer Request' : 'Confession';
  const responseBadge = post.isSystemResponse ? '<span class="post__response-badge">Community Response</span>' : '';
  
  const timeAgo = getTimeAgo(post.createdAt);
  
  div.innerHTML = `
    <div class="post__header">
      <span class="post__type ${typeClass}">${typeLabel}</span>
      ${responseBadge}
    </div>
    <div class="post__text">${escapeHtml(post.text)}</div>
    <div class="post__time">${timeAgo}</div>
    <div class="post__actions">
      <button class="post__action-btn" onclick="handlePrayed('${post.id}')">
        🙏 Prayed for you (${post.prayedCount || 0})
      </button>
      <button class="post__action-btn" onclick="handleReport('${post.id}')">
        Flag
      </button>
    </div>
  `;
  
  return div;
}

function handlePrayed(postId) {
  const post = allPosts.find(p => p.id === postId);
  if (post) {
    post.prayedCount = (post.prayedCount || 0) + 1;
    renderFeed();
  }
}

function handleReport(postId) {
  const post = allPosts.find(p => p.id === postId);
  if (post) {
    post.reportCount = (post.reportCount || 0) + 1;
    
    if (post.reportCount >= 5) {
      post.isHidden = true;
    }
    
    renderFeed();
  }
}

// Success notification for user's post
function showSuccessNotification(response) {
  const notification = document.createElement('div');
  notification.className = 'notification notification--success';
  notification.innerHTML = `
    <div class="notification__content">
      <h4>Your post was shared!</h4>
      <p class="notification__response">"${response}"</p>
      <small>This is one of many responses from our community.</small>
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('notification--show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('notification--show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Utility functions
function generateId() {
  return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showLoading(show) {
  loading.style.display = show ? 'flex' : 'none';
}

// Initialize app
function initializeApp() {
  updatePlaceholder();
  renderFeed();
}

// Run on page load
checkOnboarding();