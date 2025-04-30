document.addEventListener('DOMContentLoaded', () => {
  // Add haptic feedback for touch devices
  document.addEventListener('touchstart', () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, { once: true });

  // Simulate loading time
  setTimeout(() => {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const loadingText = document.getElementById('loadingText');
    
    // Update loading indicator
    loadingIndicator.innerHTML = `
      <div class="ready-indicator">
        <div class="sparkles-icon" style="animation: spin 2s linear infinite;"></div>
        <p class="ready-text">Aplikasi siap!</p>
      </div>
    `;
    
    // Navigate to main content after showing ready state
    setTimeout(() => {
      // Replace with your actual main content URL
      window.location.href = '../content/main.html';
    }, 1000);
  }, 4000);
});