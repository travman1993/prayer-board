// State
let currentTab = 'prayer';
let allPosts = [];

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

// Post submission
postBtn.addEventListener('click', async () => {
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
    showLoading(true);
    
    // Save to Firestore
    await db.collection('posts').add({
      type: currentTab,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      prayedCount: 0,
      reportCount: 0,
      isHidden: false
    });
    
    postTextarea.value = '';
    charCount.textContent = '0 / 1000';
    await refreshFeed();
    
  } catch (error) {
    console.error('Error posting:', error);
    alert('Failed to post. Please try again.');
  } finally {
    showLoading(false);
  }
});

// Refresh feed from Firestore
async function refreshFeed() {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const snapshot = await db.collection('posts')
      .where('type', '==', currentTab)
      .where('isHidden', '==', false)
      .where('createdAt', '>=', sevenDaysAgo)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    allPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    renderFeed();
  } catch (error) {
    console.error('Error refreshing feed:', error);
  }
}

function renderFeed() {
  feedList.innerHTML = '';
  
  if (allPosts.length === 0) {
    feedEmpty.style.display = 'block';
    return;
  }
  
  feedEmpty.style.display = 'none';
  
  allPosts.forEach(post => {
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
    <div class="post__actions">
      <button class="post__action-btn" onclick="handlePrayed('${post.id}')">
        Prayed for you (${post.prayedCount || 0})
      </button>
      <button class="post__action-btn" onclick="handleReport('${post.id}')">
        Report
      </button>
    </div>
  `;
  
  return div;
}

async function handlePrayed(postId) {
  try {
    await db.collection('posts').doc(postId).update({
      prayedCount: firebase.firestore.FieldValue.increment(1)
    });
    await refreshFeed();
  } catch (error) {
    console.error('Error incrementing prayed count:', error);
  }
}

async function handleReport(postId) {
  try {
    const postRef = db.collection('posts').doc(postId);
    const post = await postRef.get();
    const newReportCount = (post.data().reportCount || 0) + 1;
    
    if (newReportCount >= 5) {
      await postRef.update({
        reportCount: newReportCount,
        isHidden: true
      });
    } else {
      await postRef.update({
        reportCount: newReportCount
      });
    }
    
    await refreshFeed();
  } catch (error) {
    console.error('Error reporting post:', error);
  }
}

// Utility functions
function getTimeAgo(timestamp) {
  if (!timestamp) return 'just now';
  
  const now = new Date();
  const postTime = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
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

// Initialize app
function initializeApp() {
  console.log('App initialized');
  updatePlaceholder();
  refreshFeed();
}

// Run on page load
checkOnboarding();