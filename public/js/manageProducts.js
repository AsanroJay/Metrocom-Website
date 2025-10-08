function setupAddProductModal() {
  const mainImageContainer = document.getElementById('mainImageContainer');
  const mainPreview = document.getElementById('mainPreview');
  const removeMainImage = document.getElementById('removeMainImage');
  const mainPlaceholder = document.getElementById('mainPlaceholder');
  const additionalImages = document.getElementById('additionalImages');
  const addImageBox = document.getElementById('addImageBox');
  const imageInput = document.getElementById('imageInput');
  const uploadImagesBtn = document.getElementById('uploadImagesBtn');

  let mainImageFile = null;
  let additionalImageFiles = [];

  // Drag & drop for main image
  mainImageContainer.addEventListener('click', () => imageInput.click());
  mainImageContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    mainImageContainer.classList.add('dragover');
  });
  mainImageContainer.addEventListener('dragleave', () => {
    mainImageContainer.classList.remove('dragover');
  });
  mainImageContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    mainImageContainer.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      mainImageFile = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        mainPreview.src = event.target.result;
        mainPreview.style.display = 'block';
        mainPlaceholder.style.display = 'none';
        removeMainImage.classList.remove('d-none');
      };
      reader.readAsDataURL(file);
    }
  });

  removeMainImage.addEventListener('click', () => {
    mainImageFile = null;
    mainPreview.src = '';
    mainPreview.style.display = 'none';
    removeMainImage.classList.add('d-none');
    mainPlaceholder.style.display = 'block';
  });

  // Additional image uploads
  addImageBox.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith('image/') && additionalImageFiles.length < 3) {
        additionalImageFiles.push(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('additional-img-wrapper');
          wrapper.innerHTML = `
            <img src="${event.target.result}" alt="Additional Image">
            <button type="button">&times;</button>
          `;
          wrapper.querySelector('button').addEventListener('click', () => {
            additionalImageFiles = additionalImageFiles.filter((f) => f !== file);
            wrapper.remove();
          });
          additionalImages.insertBefore(wrapper, addImageBox);
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // Upload button (optional)
  uploadImagesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Images ready to upload');
  });
}

document.addEventListener('DOMContentLoaded', setupAddProductModal);




document.addEventListener("DOMContentLoaded", () => {

  //Add Item Modal
  setupAddProductModal();
  // Initialize DataTable
  $('#productsTable').DataTable({
    pageLength: 10,
    responsive: true
  });

  $('#productsTable').show();

  const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));

  // Edit button click
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const productId = e.currentTarget.dataset.id;

      try {
        // Fetch product details
        const res = await fetch(`/admin/products/${productId}`);
        const data = await res.json();

        // Fill modal inputs
        document.getElementById('editProductId').value = data._id;
        document.getElementById('editProductName').value = data.name;
        document.getElementById('editProductSKU').value = data.sku;
        document.getElementById('editProductImage').value = data.image || '';

        editModal.show();
      } catch (err) {
        editModal.show();
        console.error(err);
        alert("Failed to load product details.");
      }
    });
  });

  // Handle save
  document.getElementById('editProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editProductId').value;
    const formData = {
      name: document.getElementById('editProductName').value,
      sku: document.getElementById('editProductSKU').value,
      image: document.getElementById('editProductImage').value
    };

    try {
      const res = await fetch(`/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        location.reload(); // Refresh table
      } else {
        alert("Error updating product.");
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Delete button click
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const productId = e.currentTarget.dataset.id;
      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
        const res = await fetch(`/admin/products/${productId}`, { method: 'DELETE' });
        if (res.ok) location.reload();
        else alert("Failed to delete product.");
      } catch (err) {
        console.error(err);
      }
    });
  });
});
