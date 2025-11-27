// app-launcher.js
(function () {
  /**
   * CẤU HÌNH DANH SÁCH ỨNG DỤNG
   */
  const myApps = [
    // --- NHÓM 1: APP CỦA TÔI ---
    {
      name: "VitePhim",
      url: "https://vitephim-fe.vercel.app/",
      logo: "https://cdn-icons-png.flaticon.com/512/3163/3163478.png",
      color: "#111827",
      category: "Giải trí & Media",
      isNew: true,
    },
    {
      name: "MiniQuiz",
      url: "https://vue-mini-quiz.vercel.app/",
      logo: "https://cdn-icons-png.flaticon.com/512/5690/5690084.png",
      color: "#8b5cf6",
      category: "Giáo dục & Game",
      isNew: true,
    },
    {
      name: "Pikutei Editor",
      url: "https://pikutei.com",
      logo: "https://cdn-icons-png.flaticon.com/512/10051/10051263.png",
      color: "#ec4899",
      category: "Công cụ Sáng tạo",
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

  // 2. CSS STYLING (Đã custom Scrollbar "nhẹ nhàng")
  const style = document.createElement("style");
  style.innerHTML = `
    :root {
        --drawer-width: 320px;
        --primary-color: #2563eb;
        --bg-overlay: rgba(0, 0, 0, 0.4);
    }

    /* Nút kích hoạt */
    #launcher-btn {
        position: fixed;
        top: 25vh;
        left: 15px;
        z-index: 9999;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease;
    }
    #launcher-btn:hover { transform: scale(1.05); background: #f9fafb; }
    .btn-icon { width: 24px; height: 24px; fill: #4b5563; }

    /* Overlay */
    #launcher-overlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: var(--bg-overlay);
        backdrop-filter: blur(2px);
        z-index: 9998;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
    }
    #launcher-overlay.active { opacity: 1; visibility: visible; }

    /* Drawer Styles */
    #app-drawer {
        position: fixed;
        top: 0; left: 0; bottom: 0;
        width: var(--drawer-width);
        background: #fff;
        z-index: 10000;
        box-shadow: 5px 0 25px rgba(0,0,0,0.1);
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        border-right: 1px solid #f3f4f6;
        font-family: system-ui, -apple-system, sans-serif;
    }
    #app-drawer.active { transform: translateX(0); }

    /* Header */
    .drawer-header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0; /* Không bị co lại khi scroll */
    }
    .drawer-title { font-weight: 700; font-size: 18px; color: #111; }
    
    .close-btn {
        cursor: pointer;
        width: 30px; height: 30px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 50%;
        color: #6b7280;
        transition: 0.2s;
    }
    .close-btn:hover { background: #f3f4f6; color: #ef4444; }

    /* Search */
    .search-wrapper { 
        padding: 0 20px 20px 20px; 
        flex-shrink: 0;
    }
    .search-group {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .search-icon {
        position: absolute; left: 12px; width: 18px; height: 18px; fill: #9ca3af;
        pointer-events: none;
    }
    .search-input {
        width: 100%;
        padding: 10px 10px 10px 38px;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        outline: none;
        background: #f9fafb;
        font-size: 14px;
        transition: 0.2s;
        box-sizing: border-box; 
    }
    .search-input:focus { background: #fff; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

    /* Content Area */
    .app-content {
        flex: 1;
        overflow-y: auto; /* Cho phép cuộn */
        padding: 0 20px 40px 20px;
        /* Firefox Scrollbar */
        scrollbar-width: thin;
        scrollbar-color: rgba(0,0,0,0.1) transparent;
    }

    /* --- CUSTOM SCROLLBAR (Chrome/Safari/Edge) --- */
    .app-content::-webkit-scrollbar {
        width: 5px; /* Độ rộng siêu mỏng */
    }
    .app-content::-webkit-scrollbar-track {
        background: transparent; /* Nền trong suốt */
    }
    .app-content::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1); /* Màu xám rất nhạt */
        border-radius: 10px; /* Bo tròn hoàn toàn */
        transition: background-color 0.2s;
    }
    .app-content::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.25); /* Đậm hơn xíu khi di chuột vào */
    }
    
    /* Category */
    .category-group { margin-bottom: 24px; }
    .category-title {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        font-weight: 700;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
    }

    /* Grid */
    .app-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    /* App Item */
    .app-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        padding: 10px 5px;
        border-radius: 10px;
        transition: 0.2s;
        cursor: pointer;
        position: relative;
    }
    .app-item:hover { background: #f3f4f6; }
    
    /* Icon Size */
    .app-icon-box {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: white;
        margin-bottom: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        background-color: #fff;
    }
    
    .app-img { width: 100%; height: 100%; object-fit: cover; }

    .app-name {
        font-size: 12px;
        font-weight: 500;
        color: #374151;
        text-align: center;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    /* Nhãn "Mới" */
    .badge-new {
        position: absolute;
        top: 8px; right: 8px;
        background: #ef4444;
        width: 6px; height: 6px;
        border-radius: 50%;
        border: 1px solid white;
    }
  `;
  document.head.appendChild(style);

  // 3. HTML TEMPLATE
  const html = `
    <div id="launcher-btn" title="Menu Ứng dụng">
        <svg class="btn-icon" viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
    </div>

    <div id="launcher-overlay"></div>

    <div id="app-drawer">
        <div class="drawer-header">
            <span class="drawer-title">Apps Center</span>
            <div class="close-btn" id="close-drawer" title="Đóng">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </div>
        </div>

        <div class="search-wrapper">
            <div class="search-group">
                <svg class="search-icon" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/></svg>
                <input type="text" class="search-input" id="app-search" placeholder="Tìm ứng dụng..." />
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
                <div class="app-icon-box" style="${bgStyle}">
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
      searchInput.focus();
    } else {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDrawer(true);
  });
  closeBtn.addEventListener("click", () => toggleDrawer(false));
  overlay.addEventListener("click", () => toggleDrawer(false));
  searchInput.addEventListener("input", (e) => renderApps(e.target.value));
})();
