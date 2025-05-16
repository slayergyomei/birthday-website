document.addEventListener('DOMContentLoaded', () => {
  // Fade in the body content on page load
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 1s ease-in-out';
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  // Add hover effect to all buttons
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 12px 30px rgba(106, 79, 255, 1)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '';
    });
  });
});
