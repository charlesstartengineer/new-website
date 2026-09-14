// Supabase initialization
const supabaseUrl = 'https://supabase.io';
const supabaseAnonKey = 'sb_publishable_DkA2tjFsWFHyBKmuKgW4PQ__s1T93Dn';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Set active link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[type="text"]:nth-child(3)').value;
        const message = this.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add hover effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize AOS (Animate On Scroll) - since we're using it in the CSS
document.addEventListener('DOMContentLoaded', function() {
    // Trigger AOS for elements that are already in view
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            el.classList.add('aos-animate');
        }
    });
});

// Add scroll animation to hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        // Create parallax effect for hero title
        heroTitle.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
});

// Add loading animation to aircraft model
document.addEventListener('DOMContentLoaded', function() {
    const aircraftModel = document.querySelector('.aircraft-model');
    if (aircraftModel) {
        // Add initial animation class
        setTimeout(() => {
            aircraftModel.style.opacity = '1';
        }, 500);
    }
});

// Supabase Authentication
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const authModal = document.createElement('div');
authModal.className = 'auth-modal';
authModal.id = 'authModal';
authModal.innerHTML = `
  <div class="auth-container">
    <div class="auth-header">
      <h3 id="authTitle">Sign In</h3>
    </div>
    <form class="auth-form" id="authForm">
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit" class="btn-primary">Sign In</button>
    </form>
    <div class="auth-switch">
      <a href="#" id="switchAuth">Don't have an account? Sign Up</a>
    </div>
  </div>
`;
document.body.appendChild(authModal);

// Show auth modal
signInBtn.addEventListener('click', () => {
  authModal.classList.add('active');
});

// Close auth modal
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('active');
  }
});

// Switch between sign in and sign up
const switchAuth = document.getElementById('switchAuth');
const authTitle = document.getElementById('authTitle');
const authForm = document.getElementById('authForm');

switchAuth.addEventListener('click', (e) => {
  e.preventDefault();
  if (authTitle.textContent === 'Sign In') {
    authTitle.textContent = 'Sign Up';
    switchAuth.textContent = 'Already have an account? Sign In';
    authForm.innerHTML = `
      <input type="text" id="name" placeholder="Full Name" required>
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit" class="btn-primary">Sign Up</button>
    `;
  } else {
    authTitle.textContent = 'Sign In';
    switchAuth.textContent = "Don't have an account? Sign Up";
    authForm.innerHTML = `
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit" class="btn-primary">Sign In</button>
    `;
  }
});

// Handle auth form submission
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    if (authTitle.textContent === 'Sign In') {
      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      console.log('Signed in:', data.user);
      alert('Successfully signed in!');
      authModal.classList.remove('active');
      updateAuthUI();
    } else {
      // Sign up
      const name = document.getElementById('name').value;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error) throw error;
      
      console.log('Signed up:', data.user);
      alert('Successfully signed up! Please check your email to confirm.');
      authModal.classList.remove('active');
      updateAuthUI();
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('Authentication failed: ' + error.message);
  }
});

// Sign out
signOutBtn.addEventListener('click', async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    console.log('Signed out');
    updateAuthUI();
    alert('Successfully signed out!');
  } catch (error) {
    console.error('Sign out error:', error);
    alert('Sign out failed: ' + error.message);
  }
});

// Update UI based on auth state
async function updateAuthUI() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';
    
    // Add user profile to nav
    const navAuth = document.querySelector('.nav-auth');
    if (navAuth && !document.querySelector('.user-profile')) {
      const userProfile = document.createElement('div');
      userProfile.className = 'user-profile';
      userProfile.innerHTML = `
        <div class="user-avatar">${user.email.charAt(0).toUpperCase()}</div>
        <span>${user.email.split('@')[0]}</span>
      `;
      navAuth.appendChild(userProfile);
    }
  } else {
    signInBtn.style.display = 'inline-block';
    signOutBtn.style.display = 'none';
    
    // Remove user profile from nav
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
      userProfile.remove();
    }
  }
}

// Check auth state on page load
window.addEventListener('load', () => {
  updateAuthUI();
});