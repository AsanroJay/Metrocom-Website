document.addEventListener("DOMContentLoaded", () => {
  // Initialize DataTable
  $('#productsTable').DataTable({
    pageLength: 10,
    responsive: true
  });

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
