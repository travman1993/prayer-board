// State
let currentTab = 'prayer';
let allPosts = [];

// Random responses shown after user posts
const randomResponses = [
  // Classic prayers & support
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
  "Standing with you in faith",
  
  // Encouragement & hope
  "This season will pass",
  "Better days are coming",
  "Keep the faith",
  "You've got this",
  "Stay strong",
  "Hold on to hope",
  "This too shall pass",
  "Brighter days ahead",
  "The struggle is temporary",
  "Victory is coming",
  "Keep pushing forward",
  "Your breakthrough is near",
  "Don't lose faith now",
  "This is not the end",
  "You're capable of amazing things",
  
  // Strength & resilience
  "You are stronger than your struggles",
  "Your strength is inspiring",
  "I believe in you",
  "You're more resilient than you know",
  "Keep fighting the good fight",
  "Your courage is admirable",
  "You've overcome before, you'll overcome again",
  "Your spirit is unbreakable",
  "Stay brave",
  "You've got the strength within you",
  "Rising above, that's what you do",
  "Your warrior spirit shines",
  "Keep being strong for yourself",
  "You are braver than you believe",
  "The light in you is powerful",
  
  // Love & connection
  "You matter so much",
  "You're worthy of love",
  "Your heart is beautiful",
  "You deserve good things",
  "Never forget your worth",
  "You're precious",
  "Your life has meaning",
  "You bring light to others",
  "You're a blessing",
  "Your presence matters",
  "You're more than enough",
  "Your soul is beautiful",
  "You make a difference",
  "Love is heading your way",
  "You deserve peace",
  
  // Spiritual affirmations
  "Faith will carry you through",
  "Trust in divine timing",
  "God sees you",
  "His grace is sufficient",
  "Your faith will move mountains",
  "Trust the process",
  "The Father has you",
  "Divine protection surrounds you",
  "Blessed and highly favored",
  "God's plan is unfolding",
  "You are blessed beyond measure",
  "The Lord is with you",
  "His love never fails",
  "Spirit is guiding you",
  "Favor is following you",
  
  // Peace & calm
  "Find peace in this moment",
  "Breathe, you're going to be okay",
  "Calm is coming",
  "Let peace wash over you",
  "Serenity will find you",
  "Rest in knowing you're cared for",
  "Stillness brings clarity",
  "Peace in the storm",
  "Tranquility awaits",
  "You deserve rest",
  "Be gentle with yourself",
  "Calm your mind, ease your heart",
  "Silence brings strength",
  "In this moment, you're safe",
  "Your soul needs peace, I send it",
  
  // Healing & recovery
  "Healing is happening",
  "Recovery is possible",
  "You will get through this",
  "Restoration is on the way",
  "Your healing journey matters",
  "Wholeness is within reach",
  "The pain won't last forever",
  "Healing doesn't happen overnight, be patient",
  "You're on the mend",
  "Recovery looks good on you",
  "The wounds are closing",
  "You're going to heal",
  "Strength through healing",
  "Becoming whole again",
  "Your recovery inspires me",
  
  // Perspective & wisdom
  "This is just one chapter",
  "The story continues",
  "You're writing your own narrative",
  "Perspective brings power",
  "Every experience shapes you",
  "Growth is happening",
  "You're becoming wiser",
  "Challenges build character",
  "This is making you stronger",
  "You're learning and growing",
  "The lessons will serve you",
  "Your story isn't over",
  "The best is yet to come",
  "You're on a journey",
  "Every day is a new opportunity",
  
  // Action & forward motion
  "Keep moving forward",
  "One step at a time",
  "Progress over perfection",
  "You're doing better than you think",
  "Keep going",
  "Don't give up now",
  "The finish line is closer",
  "Momentum is building",
  "You're heading in the right direction",
  "Every small step counts",
  "You're creating change",
  "Forward is the only way",
  "Keep putting one foot in front",
  "Movement brings hope",
  "You're making it happen",
  
  // Gentle reminders
  "You're doing the best you can",
  "That's enough",
  "Be kind to yourself",
  "You deserve grace",
  "Give yourself permission to rest",
  "Mistakes don't define you",
  "You're allowed to struggle",
  "It's okay to not be okay",
  "Your imperfections make you human",
  "You're learning as you go",
  "Progress isn't linear",
  "You're exactly where you need to be",
  "Self-compassion is strength",
  "You're growing at your own pace",
  "Give yourself credit",
  
  // Hope & possibility
  "Impossible becomes possible",
  "Dreams do come true",
  "Hope is alive in you",
  "Tomorrow brings new mercies",
  "Possibilities are endless",
  "Your potential is limitless",
  "The future is bright",
  "Amazing things await you",
  "You're capable of great things",
  "Your dreams matter",
  "Miracles happen every day",
  "The impossible is becoming possible",
  "Hope rises within you",
  "Wonder is waiting",
  "Your best days are ahead",
  
  // Joy & celebration
  "Smile, better times are coming",
  "Joy is just around the corner",
  "Laughter will return",
  "Happiness is your birthright",
  "You deserve to smile",
  "Light finds its way",
  "Celebrate your growth",
  "Your victory is coming",
  "Happy endings happen",
  "Life is getting better",
  "Good times are returning",
  "You have so much to celebrate",
  "Smile for what's coming",
  "Joy is claiming you",
  "Blessing upon blessing",
  
  // Affirmations of worth
  "You are enough",
  "Your story matters",
  "You have value",
  "Your voice matters",
  "You're important",
  "Your presence is a gift",
  "You bring joy to this world",
  "You're irreplaceable",
  "Your uniqueness is your strength",
  "You were made for greatness",
  "Your dreams are valid",
  "You're destined for great things",
  "Your purpose is real",
  "You're meant for this",
  "Never doubt your worth",
  
  // Community & belonging
  "You belong here",
  "This community cares",
  "You're not forgotten",
  "You're seen and heard",
  "You're part of something bigger",
  "Together we are stronger",
  "You're part of our family",
  "We're here for you",
  "Community lifts you up",
  "You're surrounded by care",
  "Connection heals",
  "You're never truly alone",
  "This circle supports you",
  "Solidarity is with you",
  "You're embraced here",
  
  // Divine love & grace
  "You are divinely loved",
  "Grace surrounds you",
  "Mercy flows abundantly",
  "Divine love protects you",
  "You are blessed beyond measure",
  "Grace is sufficient for today",
  "Love covers a multitude",
  "Forgiveness is yours",
  "Redemption is possible",
  "Second chances exist",
  "You are redeemed",
  "Your soul is precious",
  "Heaven celebrates you",
  "Angels are watching",
  "Divine favor rests on you",
  
  // Specific situations
  "Your family is thinking of you",
  "Someone believes in you",
  "Your struggle is seen",
  "Your pain is valid",
  "Your tears matter",
  "Your voice will be heard",
  "Your burden is being shared",
  "Your exhaustion is understood",
  "Your confusion will clear",
  "Your questions have purpose",
  "Your silence speaks volumes",
  "Your waiting has meaning",
  "Your longing will be fulfilled",
  "Your seeking will find answers",
  "Your hunger will be satisfied",
  
  // Final push encouragement
  "You're almost there",
  "The hardest part is almost over",
  "You're closer than you think",
  "The breakthrough is coming",
  "Victory is yours",
  "This is your moment",
  "You've got what it takes",
  "This is your time to shine",
  "Your moment is now",
  "You're destined for this",
  "The finish line is calling",
  "You're going to make it",
  "Success is within reach",
  "Your day is coming",
  "This is your season"
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