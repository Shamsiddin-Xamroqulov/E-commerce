document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartSidebarBody = document.querySelector(".offcanvas-body");
  const cartCountBadge = document.querySelector(".btn.btn-outline-dark .badge");

  // Backenddan savatni olish va UI ni yangilash uchun funksiya
  async function fetchCart() {
    try {
      const response = await fetch("/api/order");
      if (!response.ok) throw new Error("Savatcha ma'lumotini olishda xatolik");
      const data = await response.json();
      updateCartUI(data.res || []);
    } catch (err) {
      console.error(err);
    }
  }

  // UI ni yangilash (backenddan olingan buyurtmalar bilan)
  function updateCartUI(cartItems) {
    cartSidebarBody.innerHTML = "";

    if (cartItems.length === 0) {
      cartSidebarBody.innerHTML = "<p>Savat bo‘sh.</p>";
    } else {
      const ul = document.createElement("ul");
      ul.classList.add("list-group");

      cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );
        li.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>$${item.price}</small>
                    </div>
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">&times;</button>
                `;
        ul.appendChild(li);
      });

      cartSidebarBody.appendChild(ul);
    }

    cartCountBadge.textContent = cartItems.length;
  }

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const productIdRaw = button.getAttribute("data-id");
      const productId = Number(productIdRaw);

      if (!productId) {
        alert("Mahsulot ID topilmadi yoki noto‘g‘ri");
        return;
      }

      try {
        const res = await fetch("/api/order/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: productId }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          alert(
            "Buyurtma qo‘shishda xatolik: " +
              (errorData.message || res.statusText)
          );
          return;
        }

        const data = await res.json();
        window.location.reload()
      } catch (error) {
        alert("Buyurtma qo‘shishda xatolik yuz berdi: " + error.message);
      }
    });
  });

  // Savatdan buyurtmani o'chirish uchun event listener
  cartSidebarBody.addEventListener("click", async function (e) {
    if (e.target.classList.contains("remove-item")) {
      const idToRemove = Number(e.target.getAttribute("data-id"));
  
      try {
        const response = await fetch(`/api/order/delete/${idToRemove}`, {
          method: "DELETE",
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Buyurtma o‘chirishda xatolik yuz berdi");
        }
  
        alert(data.message || "Buyurtma o‘chirildi");
        await fetchCart();
      } catch (err) {
        console.error("Buyurtma o‘chirishda xatolik:", err);
        alert(`Buyurtma o‘chirishda xatolik: ${err.message}`);
      }
    }
  });
  

  fetchCart();
});
