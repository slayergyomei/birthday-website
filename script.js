// JavaScript to handle adding photos/videos dynamically to memories.html gallery

document.addEventListener('DOMContentLoaded', () => {
  const addMediaBtn = document.getElementById('add-media-btn');
  const mediaInput = document.getElementById('media-input');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (addMediaBtn && mediaInput && galleryGrid) {
    addMediaBtn.addEventListener('click', () => {
      mediaInput.click();
    });

    mediaInput.addEventListener('change', (event) => {
      const files = event.target.files;
      if (files.length === 0) return;

      Array.from(files).forEach(file => {
        const fileType = file.type;
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('role', 'listitem');
        galleryItem.setAttribute('aria-label', `User added media: ${file.name}`);

        if (fileType.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.alt = file.name;
          galleryItem.appendChild(img);
        } else if (fileType.startsWith('video/')) {
          const video = document.createElement('video');
          video.controls = true;
          video.preload = 'metadata';
          video.setAttribute('aria-label', file.name);
          const source = document.createElement('source');
          source.src = URL.createObjectURL(file);
          source.type = fileType;
          video.appendChild(source);
          galleryItem.appendChild(video);
        } else {
          // Unsupported file type, ignore
          return;
        }

        galleryGrid.appendChild(galleryItem);
      });

      // Reset input so same file can be selected again if needed
      mediaInput.value = '';
    });
  }
});
