(function () {
  /**
   * CẤU HÌNH DANH SÁCH ỨNG DỤNG
   */
  const myApps = [
    // --- NHÓM 1: APP CỦA TÔI ---
    {
      id: 'jitracking',
      name: 'Jitracking App',
      url: 'https://jitracking.khucxuantrien.id.vn/',
      logo: 'https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/jitrackinglogo.svg',
      color: "#1e1e1e", // Optional color for background if needed
      category: "Công cụ Sáng tạo",
      isNew: true,
    },
    {
      id: 'kxtfolio',
      name: ' Kxt Portfolio',
      url: 'https://kxtfolio.khucxuantrien.id.vn/',
      logo: 'https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/kxtfolio.png',
      color: "#1e1e1e", // Optional color for background if needed
      category: "Landing Pages",
      isNew: true,
    },
    {
      name: "VitePhim",
      url: "https://vitephim.khucxuantrien.id.vn/",
      logo: "https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/vitephimlogo.png",
      color: "#111827",
      category: "Giải trí & Media",
    },
    {
      name: "Pikutei Editor",
      url: "https://pikutei.khucxuantrien.id.vn/",
      logo: "https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/pikuseilogo.png",
      color: "#ec4899",
      category: "Công cụ Sáng tạo",
    },
    {
      name: "MiniQuiz",
      url: "https://miniquiz.khucxuantrien.id.vn/",
      logo: "https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/miniquizlogo.png",
      color: "#8b5cf6",
      category: "Giáo dục & Game",
    },
     {
      id: 'ji',
      name: 'Jimuno',
      url: 'https://jimuno.khucxuantrien.id.vn/',
      logo: 'https://raw.githubusercontent.com/kxtriendev04/my-app-launcher-scripts/main/jimunologo.svg',
      color: "#1e1e1e",
      category: "Công cụ Sáng tạo",
      isNew: true,
    },

    // --- NHÓM 2: Ý TƯỞNG HỆ THỐNG ---
    {
      name: "Dashboard",
      url: "#",
      logo: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png",
      color: "#3b82f6",
      category: "Quản trị hệ thống",
    },
    {
      name: "Tài khoản",
      url: "#",
      logo: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
      color: "#6b7280",
      category: "Quản trị hệ thống",
    },
    {
      name: "File Drive",
      url: "#",
      logo: "https://cdn-icons-png.flaticon.com/512/3767/3767084.png",
      color: "#f59e0b",
      category: "Tiện ích văn phòng",
    },
    {
      name: "AI Chatbot",
      url: "#",
      logo: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
      color: "#10b981",
      category: "Tiện ích văn phòng",
    },

    // --- NHÓM 3: DOANH NGHIỆP ---
    {
      name: "Tuyển dụng",
      url: "#",
      logo: "",
      icon: "👥",
      color: "#3b82f6",
      category: "Doanh nghiệp",
    },
    {
      name: "Kho hàng",
      url: "#",
      logo: "",
      icon: "🏠",
      color: "#f59e0b",
      category: "Doanh nghiệp",
    },
  ];

  // 2. CSS STYLING
  const style = document.createElement("style");
  style.innerHTML = `
    :root {
        --drawer-width-desktop: 320px;
        --drawer-width-mobile: 85vw;
        --primary-color: #2563eb;
    }

    /* --- NÚT BẤM THÔNG MINH --- */
    #launcher-btn {
        position: fixed;
        top: 15vh;
        left: 0;
        z-index: 9999;
        
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(0,0,0,0.15);    
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        
        width: 12px; 
        height: 40px;
        border-radius: 0 12px 12px 0;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        cursor: grab; 
        touch-action: none; 
        user-select: none;  

        transition: width 0.3s, background 0.3s, border 0.3s, box-shadow 0.3s; 
        backdrop-filter: blur(4px);
        overflow: hidden;
    }

    #launcher-btn:active {
        cursor: grabbing;
    }

    #launcher-btn .btn-icon { 
        width: 24px; height: 24px; 
        fill: #333; 
        opacity: 0; 
        transform: scale(0.5);
        transition: all 0.2s ease;
        pointer-events: none; 
    }

    #launcher-btn:hover {
        width: 50px;
        height: 50px;
        background: #fff;
        opacity: 1;
        border-color: rgba(0,0,0,0.1);
        box-shadow: 4px 4px 20px rgba(0,0,0,0.2);
    }
    
    #launcher-btn:hover .btn-icon {
        opacity: 1;
        transform: scale(1);
    }

    /* Overlay */
    #launcher-overlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.5); 
        backdrop-filter: blur(3px);
        z-index: 9998;
        opacity: 0; visibility: hidden;
        transition: 0.3s;
    }
    #launcher-overlay.active { opacity: 1; visibility: visible; }

    /* Drawer Styles */
    #app-drawer {
        position: fixed;
        top: 0; left: 0; bottom: 0;
        width: var(--drawer-width-desktop);
        background: #fff;
        z-index: 10000;
        box-shadow: 5px 0 25px rgba(0,0,0,0.15);
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        border-right: 1px solid #f3f4f6;
        font-family: system-ui, -apple-system, sans-serif;
    }
    #app-drawer.active { transform: translateX(0); }

    /* --- RESPONSIVE --- */
    @media (max-width: 600px) {
        #app-drawer { width: var(--drawer-width-mobile); max-width: 340px; }
        
        #launcher-btn {
            width: 20px; 
            height: 36px;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        #launcher-btn .btn-icon {
            opacity: 0.5;
            transform: scale(0.8);
            width: 18px; height: 18px;
        }

        #launcher-btn:active {
            width: 50px; background: #fff;
        }
        #launcher-btn:active .btn-icon { opacity: 1; transform: scale(1); }
    }

    /* Header CSS (Đã cập nhật cho nút Home) */
    .drawer-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
    .drawer-title { font-weight: 700; font-size: 18px; color: #111; }
    
    /* Container cho các nút bên phải header */
    .header-actions { display: flex; align-items: center; gap: 8px; }

    /* Style chung cho nút Home và Close */
    .header-icon-btn { 
        cursor: pointer; 
        width: 32px; height: 32px; 
        display: flex; align-items: center; justify-content: center; 
        border-radius: 50%; 
        color: #6b7280; 
        transition: 0.2s; 
        background: #f9fafb; 
        text-decoration: none; /* Cho thẻ a */
    }
    
    /* Hover nút Home (Màu xanh) */
    .header-icon-btn:hover { background: #e5e7eb; color: #2563eb; }
    
    /* Hover nút Close (Màu đỏ - class riêng) */
    .header-icon-btn.close-type:hover { background: #fee2e2; color: #ef4444; }

    .search-wrapper { padding: 0 20px 20px 20px; flex-shrink: 0; }
    .search-group { position: relative; width: 100%; display: flex; align-items: center; }
    .search-icon { position: absolute; left: 12px; width: 18px; height: 18px; fill: #9ca3af; pointer-events: none; }
    .search-input { width: 100%; padding: 10px 10px 10px 38px; border: 1px solid #e5e7eb; border-radius: 10px; outline: none; background: #f9fafb; font-size: 14px; transition: 0.2s; box-sizing: border-box; }
    .search-input:focus { background: #fff; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
    .app-content { flex: 1; overflow-y: auto; padding: 0 20px 40px 20px; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
    .app-content::-webkit-scrollbar { width: 5px; }
    .app-content::-webkit-scrollbar-track { background: transparent; }
    .app-content::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.1); border-radius: 10px; }
    .category-group { margin-bottom: 24px; }
    .category-title { font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin-bottom: 10px; }
    .app-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    @media (max-width: 320px) { .app-grid { grid-template-columns: repeat(2, 1fr); } }
    .app-item { display: flex; flex-direction: column; align-items: center; text-decoration: none; padding: 10px 5px; border-radius: 10px; transition: 0.2s; cursor: pointer; position: relative; }
    .app-item:hover { background: #f3f4f6; }
    
    /* Style mặc định cho icon box */
    .app-icon-box { 
    width: 48px; /* Dùng số chẵn thường giúp engine trình duyệt render chuẩn hơn */
    height: 48px; 
    border-radius: 12px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden; 
    background-color: #fff; 
    /* Thêm các thuộc tính này */
    border: 0.5px solid rgba(0,0,0,0.05); /* Đường viền mảnh giúp định hình icon */
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
    
    /* Class mới để bỏ padding cho các icon SVG đặc biệt */
    .app-icon-box.no-padding {
        padding: 0 !important;
    }

    .app-img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Đổi từ cover sang contain để không bị mất góc icon */
    image-rendering: -webkit-optimize-contrast; /* Giúp ảnh sắc nét hơn trên Safari/iOS */
    image-rendering: crisp-edges;
}
    .app-name { font-size: 12px; font-weight: 500; color: #374151; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%; }
    .badge-new { position: absolute; top: 8px; right: 8px; background: #ef4444; width: 6px; height: 6px; border-radius: 50%; border: 1px solid white; }
  `;
  document.head.appendChild(style);

  // 3. HTML TEMPLATE
  const html = `
    <div id="launcher-btn" title="Menu (Kéo để di chuyển)">
        <svg class="btn-icon" viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
    </div>

    <div id="launcher-overlay"></div>

    <div id="app-drawer">
        <div class="drawer-header">
            <span class="drawer-title">Apps Center</span>
            
            <div class="header-actions">
                <a href="https://khucxuantrien.id.vn/" class="header-icon-btn" title="Trang chủ">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </a>
                
                <div class="header-icon-btn close-type" id="close-drawer" title="Đóng">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                </div>
            </div>
        </div>

        <div class="search-wrapper">
            <div class="search-group">
                <svg class="search-icon" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/></svg>
                <input type="text" class="search-input" id="app-search" placeholder="Tìm kiếm app..." />
            </div>
        </div>

        <div class="app-content" id="app-list-container">
        </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // 4. LOGIC JAVASCRIPT
  const drawer = document.getElementById("app-drawer");
  const overlay = document.getElementById("launcher-overlay");
  const openBtn = document.getElementById("launcher-btn");
  const closeBtn = document.getElementById("close-drawer");
  const searchInput = document.getElementById("app-search");
  const listContainer = document.getElementById("app-list-container");

  // --- LOGIC KÉO THẢ (DRAGGABLE) ---
  function makeDraggable(element) {
    let isDragging = false;
    let startY, startTop;
    let movedDistance = 0; // Để phân biệt click và drag

    // Xử lý sự kiện bắt đầu (Chuột & Touch)
    const onStart = (e) => {
      isDragging = true;
      movedDistance = 0; // Reset quãng đường đã di chuyển

      // Lấy tọa độ Y (hỗ trợ cả Mobile và PC)
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startY = clientY;
      startTop = parseInt(window.getComputedStyle(element).top, 10) || 0;

      // Thêm event listener cho việc di chuyển và thả ra vào window
      if (e.type === "touchstart") {
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onEnd);
      } else {
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onEnd);
      }
    };

    // Xử lý sự kiện di chuyển
    const onMove = (e) => {
      if (!isDragging) return;

      // Ngăn cuộn trang trên mobile khi đang kéo nút
      if (e.type === "touchmove") e.preventDefault();

      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - startY;

      movedDistance = Math.abs(deltaY); // Tính tổng quãng đường di chuyển

      let newTop = startTop + deltaY;

      // Giới hạn không cho kéo ra ngoài màn hình
      const maxTop = window.innerHeight - element.offsetHeight;
      if (newTop < 0) newTop = 0;
      if (newTop > maxTop) newTop = maxTop;

      element.style.top = `${newTop}px`;
    };

    // Xử lý sự kiện kết thúc
    const onEnd = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    element.addEventListener("mousedown", onStart);
    element.addEventListener("touchstart", onStart, { passive: false });

    // Trả về hàm kiểm tra xem vừa rồi là Drag hay Click
    return () => movedDistance > 5; // Nếu di chuyển > 5px thì là Drag
  }

  // Kích hoạt tính năng kéo thả và lấy hàm kiểm tra
  const checkIsDrag = makeDraggable(openBtn);

  // --- RENDER APPS ---
  function groupApps(apps) {
    return apps.reduce((groups, app) => {
      const category = app.category || "Tiện ích khác";
      if (!groups[category]) groups[category] = [];
      groups[category].push(app);
      return groups;
    }, {});
  }

  function renderApps(keyword = "") {
    listContainer.innerHTML = "";
    const lowerKeyword = keyword.toLowerCase();

    const filteredApps = myApps.filter(
      (app) =>
        app.name.toLowerCase().includes(lowerKeyword) ||
        app.category.toLowerCase().includes(lowerKeyword)
    );

    if (filteredApps.length === 0) {
      listContainer.innerHTML = `<div style="text-align:center; color:#9ca3af; margin-top:30px; font-size:13px;">Không tìm thấy kết quả</div>`;
      return;
    }

    const grouped = groupApps(filteredApps);

    for (const [category, apps] of Object.entries(grouped)) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "category-group";
      groupDiv.innerHTML = `<div class="category-title">${category}</div>`;

      const gridDiv = document.createElement("div");
      gridDiv.className = "app-grid";

      apps.forEach((app) => {
        let iconContent = "";
        let bgStyle = "";
        
        // Kiểm tra xem có phải là SVG logo cần bỏ padding không (dựa trên tên file .svg)
        const isSvgLogo = app.logo && app.logo.endsWith('.svg');
        const paddingClass = isSvgLogo ? "no-padding" : "";

        if (app.logo && app.logo.length > 0) {
          iconContent = `<img src="${app.logo}" class="app-img" alt="${
            app.name
          }" onerror="this.style.display='none';this.parentNode.innerText='${app.name.charAt(
            0
          )}'"/>`;
          bgStyle = `border: 1px solid #f3f4f6;`;
        } else {
          iconContent = app.icon || app.name.charAt(0);
          bgStyle = `background-color: ${
            app.color || "#3b82f6"
          }; color: white; border: none;`;
        }

        const badgeHtml = app.isNew ? `<span class="badge-new"></span>` : "";

        gridDiv.innerHTML += `
            <a href="${app.url}" class="app-item">
                <div class="app-icon-box ${paddingClass}" style="${bgStyle}">
                    ${iconContent}
                </div>
                ${badgeHtml}
                <span class="app-name">${app.name}</span>
            </a>
        `;
      });

      groupDiv.appendChild(gridDiv);
      listContainer.appendChild(groupDiv);
    }
  }

  renderApps();

  function toggleDrawer(isOpen) {
    if (isOpen) {
      drawer.classList.add("active");
      overlay.classList.add("active");
      setTimeout(() => searchInput.focus(), 100);
    } else {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  // --- SỰ KIỆN CLICK (Đã sửa để không bị trùng với Kéo) ---
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Kiểm tra: Nếu là kéo thả (di chuyển > 5px) thì KHÔNG mở menu
    if (!checkIsDrag()) {
      toggleDrawer(true);
    }
  });

  closeBtn.addEventListener("click", () => toggleDrawer(false));
  overlay.addEventListener("click", () => toggleDrawer(false));
  searchInput.addEventListener("input", (e) => renderApps(e.target.value));
})();
