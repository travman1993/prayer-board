// State
let currentTab = 'prayer';
let allPosts = [];

// Random responses shown after user posts
const randomResponses = [
  "Praying for you 🙏",
  "You're not alone in this",
  "Sending strength your way",
  "This is in my prayers",
  "God's got you",
  "Holding you in my thoughts",
  "You are loved",
  "Believing for breakthrough",
  "Lifting you up",
  "In prayer for you",
  "You're stronger than you know",
  "Never give up",
  "Peace be with you",
  "Light and healing coming your way",
  "Standing with you in faith"
];

// DOM Elements
const onboardingModal = document.getElementById('onboarding-modal');
const onboardingBtn = document.getElementById('onboarding-btn');
const tabBtns = document.querySelectorAll('.tab');
const postTextarea = document.getElementById('post-textarea');
const charCount = document.getElementById('char-count');
const postBtn = document.getElementById('post-btn');
const feedList = document.getElementById('feed-list');
const feedEmpty = document.getElementById('feed-empty');
const loading = document.getElementById('loading');
const responseBox = document.getElementById('response-box');
const responseText = document.getElementById('response-text');
const responseCloseBtn = document.getElementById('response-close-btn');

// ===== STORAGE FUNCTIONS =====
function getAllPosts() {
  const stored = localStorage.getItem('lifted-posts');
  return stored ? JSON.parse(stored) : [];
}

function savePosts(posts) {
  localStorage.setItem('lifted-posts', JSON.stringify(posts));
}

function generateId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function getRandomResponse() {
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

// ===== ONBOARDING =====
function checkOnboarding() {
  const hasSeenOnboarding = localStorage.getItem('lifted-onboarded');
  if (hasSeenOnboarding) {
    hideOnboarding();
  }
}

function hideOnboarding() {
  onboardingModal.classList.remove('modal--active');
}

onboardingBtn.addEventListener('click', () => {
  localStorage.setItem('lifted-onboarded', 'true');
  hideOnboarding();
  initializeApp();
});

// ===== TAB SWITCHING =====
tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentTab = e.target.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('tab--active'));
    e.target.classList.add('tab--active');
    updatePlaceholder();
    refreshFeed();
  });
});

function updatePlaceholder() {
  if (currentTab === 'prayer') {
    postTextarea.placeholder = 'What would you like prayer for today?';
  } else {
    postTextarea.placeholder = 'What is weighing on your heart?';
  }
}

// ===== CHARACTER COUNTER =====
postTextarea.addEventListener('input', (e) => {
  const count = e.target.value.length;
  charCount.textContent = `${count} / 1000`;
});

// ===== POST SUBMISSION =====
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

  showLoading(true);

  // Create new post
  const newPost = {
    id: generateId(),
    type: currentTab,
    text: text,
    createdAt: new Date().toISOString(),
    isHidden: false
  };

  // Save to localStorage
  let posts = getAllPosts();
  posts.unshift(newPost);
  savePosts(posts);

  // Clear textarea
  postTextarea.value = '';
  charCount.textContent = '0 / 1000';

  // Show random response
  const response = getRandomResponse();
  showResponse(response);

  // Refresh feed
  refreshFeed();

  showLoading(false);
});

// ===== RESPONSE BOX =====
function showResponse(message) {
  responseText.textContent = message;
  responseBox.style.display = 'flex';
}

function hideResponse() {
  responseBox.style.display = 'none';
}

responseCloseBtn.addEventListener('click', hideResponse);

// Close response box when clicking outside
responseBox.addEventListener('click', (e) => {
  if (e.target === responseBox) {
    hideResponse();
  }
});

// ===== FEED MANAGEMENT =====
function refreshFeed() {
  const posts = getAllPosts();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Filter: current tab, not hidden, not too old
  allPosts = posts.filter(post => {
    return post.type === currentTab && 
           !post.isHidden && 
           new Date(post.createdAt) >= sevenDaysAgo;
  });

  renderFeed();
}

function renderFeed() {
  feedList.innerHTML = '';
  
  if (allPosts.length === 0) {
    feedEmpty.style.display = 'block';
    return;
  }
  
  feedEmpty.style.display = 'none';
  
  allPosts.forEach((post) => {
    const postEl = createPostElement(post);
    feedList.appendChild(postEl);
  });
}

function createPostElement(post) {
  const div = document.createElement('div');
  div.className = 'post';
  
  const typeClass = post.type === 'prayer' ? 'post__type--prayer' : 'post__type--confession';
  const typeLabel = post.type === 'prayer' ? 'Prayer Request' : 'Confession';
  
  const timeAgo = getTimeAgo(post.createdAt);
  
  div.innerHTML = `
    <span class="post__type ${typeClass}">${typeLabel}</span>
    <div class="post__text">${escapeHtml(post.text)}</div>
    <div class="post__time">${timeAgo}</div>
  `;
  
  return div;
}

// ===== UTILITY FUNCTIONS =====
function getTimeAgo(timestamp) {
  if (!timestamp) return 'just now';
  
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffMs = now - postTime;
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

// ===== INIT =====
function initializeApp() {
  console.log('Lifted initialized');
  updatePlaceholder();
  refreshFeed();
}

checkOnboarding();