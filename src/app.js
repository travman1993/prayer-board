// State
let currentTab = 'prayer';
let allPosts = [];

// Random comment prompts to suggest to users
const commentPrompts = [
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
const infoModal = document.getElementById('info-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContent = document.getElementById('modal-content');

// Footer link handlers
const footerAbout = document.getElementById('footer-about');
const footerPrivacy = document.getElementById('footer-privacy');
const footerCookies = document.getElementById('footer-cookies');
const footerContact = document.getElementById('footer-contact');

// ===== LOCALSTORAGE MANAGEMENT =====
function getAllPosts() {
  const stored = localStorage.getItem('lifted-posts');
  return stored ? JSON.parse(stored) : [];
}

function savePosts(posts) {
  localStorage.setItem('lifted-posts', JSON.stringify(posts));
}

function getAllComments() {
  const stored = localStorage.getItem('lifted-comments');
  return stored ? JSON.parse(stored) : [];
}

function saveComments(comments) {
  localStorage.setItem('lifted-comments', JSON.stringify(comments));
}

function generateId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Check onboarding status
function checkOnboarding() {
  const hasSeenOnboarding = localStorage.getItem('lifted-onboarded');
  if (hasSeenOnboarding) {
    hideOnboarding();
  }
}

function hideOnboarding() {
  onboardingModal.classList.remove('modal--active');
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

// Character counter
postTextarea.addEventListener('input', (e) => {
  const count = e.target.value.length;
  charCount.textContent = `${count} / 1000`;
});

// Get random comment prompt
function getRandomPrompt() {
  return commentPrompts[Math.floor(Math.random() * commentPrompts.length)];
}

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

  showLoading(true);

  // Create new post
  const newPost = {
    id: generateId(),
    type: currentTab,
    text: text,
    createdAt: new Date().toISOString(),
    prayedCount: 0,
    reportCount: 0,
    isHidden: false
  };

  // Get all posts, add new one, save
  let posts = getAllPosts();
  posts.unshift(newPost);
  savePosts(posts);

  postTextarea.value = '';
  charCount.textContent = '0 / 1000';
  refreshFeed();

  showLoading(false);
});

// Refresh feed
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
  
  // Random prompt for this post
  const randomPrompt = getRandomPrompt();
  
  div.innerHTML = `
    <span class="post__type ${typeClass}">${typeLabel}</span>
    <div class="post__text">${escapeHtml(post.text)}</div>
    <div class="post__time">${timeAgo}</div>
    <div class="post__actions">
      <button class="post__action-btn" onclick="handlePrayed('${post.id}')">
        Prayed for you (${post.prayedCount || 0})
      </button>
      <button class="post__action-btn" onclick="toggleCommentForm('${post.id}')">
        Comment
      </button>
      <button class="post__action-btn" onclick="handleReport('${post.id}')">
        Report
      </button>
    </div>
    
    <!-- Comment Form (hidden by default) -->
    <div class="post__comment-section" id="comment-section-${post.id}" style="display: none;">
      <div class="post__comment-prompt" id="comment-prompt-${post.id}">
        <p>${randomPrompt}</p>
        <div class="post__comment-prompt-actions">
          <button class="btn btn--small" onclick="acceptCommentPrompt('${post.id}', '${randomPrompt.replace(/'/g, "\\'")}')">Use This</button>
          <button class="btn btn--secondary btn--small" onclick="toggleCustomComment('${post.id}')">Write Custom</button>
        </div>
      </div>
      
      <div class="post__custom-comment" id="custom-comment-${post.id}" style="display: none;">
        <textarea class="post__comment-textarea" id="comment-textarea-${post.id}" placeholder="Your anonymous comment..." maxlength="500"></textarea>
        <div class="post__comment-footer">
          <span class="post__comment-count" id="comment-count-${post.id}">0 / 500</span>
          <button class="btn btn--primary btn--small" onclick="submitComment('${post.id}')">Post Comment</button>
        </div>
      </div>
      
      <!-- Comments List -->
      <div class="post__comments-list" id="comments-list-${post.id}">
        <!-- Comments loaded here -->
      </div>
    </div>
  `;
  
  // Add character counter for custom comment
  const commentTextarea = div.querySelector(`#comment-textarea-${post.id}`);
  if (commentTextarea) {
    commentTextarea.addEventListener('input', (e) => {
      const count = e.target.value.length;
      document.getElementById(`comment-count-${post.id}`).textContent = `${count} / 500`;
    });
  }
  
  return div;
}

// Toggle comment form visibility
function toggleCommentForm(postId) {
  const commentSection = document.getElementById(`comment-section-${postId}`);
  if (commentSection.style.display === 'none') {
    commentSection.style.display = 'block';
    loadComments(postId);
  } else {
    commentSection.style.display = 'none';
  }
}

// Toggle between prompt and custom comment
function toggleCustomComment(postId) {
  const promptDiv = document.getElementById(`comment-prompt-${postId}`);
  const customDiv = document.getElementById(`custom-comment-${postId}`);
  
  if (customDiv.style.display === 'none') {
    promptDiv.style.display = 'none';
    customDiv.style.display = 'block';
  } else {
    promptDiv.style.display = 'block';
    customDiv.style.display = 'none';
  }
}

// Accept the suggested prompt
function acceptCommentPrompt(postId, promptText) {
  submitComment(postId, promptText);
}

// Submit a comment
function submitComment(postId, prefilledText = null) {
  let commentText = prefilledText;
  
  if (!prefilledText) {
    const textarea = document.getElementById(`comment-textarea-${postId}`);
    commentText = textarea.value.trim();
    
    if (!commentText) {
      alert('Please write a comment.');
      return;
    }
    
    if (commentText.length > 500) {
      alert('Comment is too long (max 500 characters).');
      return;
    }
  }

  showLoading(true);

  // Create new comment
  const newComment = {
    id: generateId(),
    postId: postId,
    text: commentText,
    createdAt: new Date().toISOString(),
    reportCount: 0,
    isHidden: false
  };

  // Get all comments, add new one, save
  let comments = getAllComments();
  comments.push(newComment);
  saveComments(comments);

  // Clear textarea if it was custom
  const textarea = document.getElementById(`comment-textarea-${postId}`);
  if (textarea) {
    textarea.value = '';
    document.getElementById(`comment-count-${postId}`).textContent = '0 / 500';
  }
  
  // Hide forms and show comments
  document.getElementById(`comment-prompt-${postId}`).style.display = 'block';
  const customDiv = document.getElementById(`custom-comment-${postId}`);
  if (customDiv) customDiv.style.display = 'none';
  
  // Reload comments
  loadComments(postId);

  showLoading(false);
}

// Load comments for a post
function loadComments(postId) {
  const allComments = getAllComments();
  const comments = allComments
    .filter(c => c.postId === postId && !c.isHidden)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const commentsList = document.getElementById(`comments-list-${postId}`);
  
  if (comments.length === 0) {
    commentsList.innerHTML = '<p class="post__no-comments">No comments yet.</p>';
    return;
  }
  
  commentsList.innerHTML = '';
  
  comments.forEach(comment => {
    const commentEl = document.createElement('div');
    commentEl.className = 'post__comment';
    
    const timeAgo = getTimeAgo(comment.createdAt);
    
    commentEl.innerHTML = `
      <div class="post__comment-body">
        <p class="post__comment-text">${escapeHtml(comment.text)}</p>
        <div class="post__comment-meta">
          <span class="post__comment-time">${timeAgo}</span>
          <button class="post__comment-report" onclick="handleCommentReport('${comment.id}')">
            Report (${comment.reportCount || 0})
          </button>
        </div>
      </div>
    `;
    
    commentsList.appendChild(commentEl);
  });
}

// Report a comment
function handleCommentReport(commentId) {
  let comments = getAllComments();
  const index = comments.findIndex(c => c.id === commentId);
  
  if (index !== -1) {
    comments[index].reportCount = (comments[index].reportCount || 0) + 1;
    
    if (comments[index].reportCount >= 3) {
      comments[index].isHidden = true;
    }
    
    saveComments(comments);
    
    // Reload comments for this post
    const postId = comments[index].postId;
    loadComments(postId);
  }
}

function handlePrayed(postId) {
  let posts = getAllPosts();
  const index = posts.findIndex(p => p.id === postId);
  
  if (index !== -1) {
    posts[index].prayedCount = (posts[index].prayedCount || 0) + 1;
    savePosts(posts);
    refreshFeed();
  }
}

function handleReport(postId) {
  let posts = getAllPosts();
  const index = posts.findIndex(p => p.id === postId);
  
  if (index !== -1) {
    posts[index].reportCount = (posts[index].reportCount || 0) + 1;
    
    if (posts[index].reportCount >= 5) {
      posts[index].isHidden = true;
    }
    
    savePosts(posts);
    refreshFeed();
  }
}

// Utility functions
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

// Footer link handlers
footerAbout.addEventListener('click', (e) => {
  e.preventDefault();
  showInfoModal('About', `
    <h2>About Lifted</h2>
    <p>Lifted is an anonymous community prayer and confession board. We believe in the power of shared faith, vulnerability, and community support.</p>
    <p>Our mission is to provide a safe, judgment-free space where people can share what's on their heart and support one another through prayer and encouragement.</p>
  `);
});

footerPrivacy.addEventListener('click', (e) => {
  e.preventDefault();
  showInfoModal('Privacy Policy', `
    <h2>Privacy Policy</h2>
    <p><strong>We do not collect personal data.</strong></p>
    <p>Lifted is designed to be completely anonymous. All data is stored locally on your device.</p>
    <ul>
      <li>No account creation or login required</li>
      <li>No email or phone number collection</li>
      <li>No user tracking</li>
      <li>All data stored in browser local storage</li>
    </ul>
  `);
});

footerCookies.addEventListener('click', (e) => {
  e.preventDefault();
  showInfoModal('Cookie Policy', `
    <h2>Cookie Policy</h2>
    <p>We use browser local storage only to remember:</p>
    <ul>
      <li>That you've seen the community guidelines</li>
      <li>Your posts and comments</li>
    </ul>
    <p>No tracking or advertising cookies are used.</p>
  `);
});

footerContact.addEventListener('click', (e) => {
  e.preventDefault();
  showInfoModal('Contact', `
    <h2>Contact Us</h2>
    <p>Have a question or feedback?</p>
    <p>Email: <strong>support@lifted-app.com</strong></p>
  `);
});

function showInfoModal(title, content) {
  modalContent.innerHTML = content;
  infoModal.classList.add('modal--active');
}

modalCloseBtn.addEventListener('click', () => {
  infoModal.classList.remove('modal--active');
});

infoModal.addEventListener('click', (e) => {
  if (e.target === infoModal || e.target.classList.contains('modal__overlay')) {
    infoModal.classList.remove('modal--active');
  }
});

// Initialize app
function initializeApp() {
  console.log('App initialized');
  updatePlaceholder();
  refreshFeed();
}

// Run on page load
checkOnboarding();