// melody_gaga.js - Lady Gaga主題網頁互動功能only tony&melody can use

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Lady Gaga主題網頁已載入');
    
    // ============================================
    // 背景音樂控制功能
    // ============================================
    
    const bgMusicToggle = document.getElementById('bgMusicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // 檢查瀏覽器是否支援自動播放
    let userInteracted = false;
    
    // 監聽使用者互動
    document.addEventListener('click', function initAudio() {
        if (!userInteracted) {
            userInteracted = true;
            console.log('使用者已互動，可以播放音樂');
            
            // 如果開關是開啟狀態，嘗試播放音樂
            if (bgMusicToggle && bgMusicToggle.checked) {
                playBackgroundMusic();
            }
            
            // 移除監聽器
            document.removeEventListener('click', initAudio);
        }
    });
    
    // 切換開關事件
    if (bgMusicToggle && backgroundMusic) {
        bgMusicToggle.addEventListener('change', function() {
            if (this.checked) {
                playBackgroundMusic();
            } else {
                pauseBackgroundMusic();
            }
        });
        
        // 音樂播放事件
        backgroundMusic.addEventListener('play', function() {
            console.log('背景音樂開始播放');
            updateMusicToggle(true);
        });
        
        backgroundMusic.addEventListener('pause', function() {
            console.log('背景音樂暫停');
            updateMusicToggle(false);
        });
        
        backgroundMusic.addEventListener('error', function(e) {
            console.error('音樂播放錯誤:', e);
            bgMusicToggle.checked = false;
            alert('無法播放背景音樂，請檢查音樂檔案路徑或瀏覽器支援');
        });
    }
    
    // 播放背景音樂
    function playBackgroundMusic() {
        if (backgroundMusic) {
            // 檢查是否有音訊來源
            if (backgroundMusic.src || backgroundMusic.children.length > 0) {
                backgroundMusic.play()
                    .then(() => {
                        console.log('背景音樂播放成功');
                        updateMusicToggle(true);
                    })
                    .catch(error => {
                        console.warn('自動播放被阻止:', error);
                        // 顯示提示訊息
                        showMusicAlert('請點擊頁面任意處啟用音樂播放');
                        bgMusicToggle.checked = false;
                    });
            } else {
                console.log('沒有背景音樂檔案，跳過播放');
                bgMusicToggle.checked = false;
            }
        }
    }
    
    // 暫停背景音樂
    function pauseBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            updateMusicToggle(false);
        }
    }
    
    // 更新開關狀態
    function updateMusicToggle(isPlaying) {
        if (bgMusicToggle) {
            bgMusicToggle.checked = isPlaying;
        }
    }
    
    // 顯示音樂提示
    function showMusicAlert(message) {
        // 創建提示元素
        const alertDiv = document.createElement('div');
        alertDiv.className = 'music-alert';
        alertDiv.innerHTML = `
            <i class="fas fa-volume-up"></i>
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        // 樣式
        alertDiv.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: linear-gradient(135deg, var(--gaga-purple), var(--gaga-blue));
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1001;
            border: 2px solid var(--gaga-gold);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.5s ease;
            max-width: 300px;
        `;
        
        // 關閉按鈕樣式
        const closeBtn = alertDiv.querySelector('.close-alert');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s;
        `;
        
        // 關閉按鈕事件
        closeBtn.addEventListener('click', function() {
            alertDiv.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 500);
        });
        
        // 自動消失
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 500);
            }
        }, 5000);
        
        // 動畫
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
            .close-alert:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(alertDiv);
    }
    
    // ============================================
    // 追蹤外部連結點擊
    // ============================================
    
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log(`🔗 點擊外部連結: ${this.href}`);
            
            // 如果是音樂平台連結，發送分析事件
            if (this.href.includes('youtube.com') || 
                this.href.includes('spotify.com') || 
                this.href.includes('apple.com')) {
                
                const platform = this.href.includes('youtube') ? 'YouTube' :
                               this.href.includes('spotify') ? 'Spotify' : 'Apple Music';
                
                console.log(`🎵 開啟 ${platform} 音樂平台`);
                
                // 可以在此處添加Google Analytics或其他分析工具
                // gtag('event', 'click', { 'event_category': 'Music Platform', 'event_label': platform });
            }
        });
    });
    
    // ============================================
    // 滾動動畫效果
    // ============================================
    
    // 監聽滾動事件，為元素添加淡入效果
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.compare-card, .song-card, .style-card, .platform-card, .track-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // 添加CSS動畫類
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // ============================================
    // 音訊條動畫強化
    // ============================================
    
    const musicBars = document.querySelectorAll('.music-bar .bar');
    if (musicBars.length > 0) {
        // 隨機化動畫延遲
        musicBars.forEach((bar, index) => {
            const randomDelay = Math.random() * 0.5;
            bar.style.animationDelay = `${randomDelay}s`;
        });
        
        // 滑鼠懸停時加速動畫
        const musicBarContainer = document.querySelector('.music-bar');
        if (musicBarContainer) {
            musicBarContainer.addEventListener('mouseenter', () => {
                musicBars.forEach(bar => {
                    bar.style.animationDuration = '0.8s';
                });
            });
            
            musicBarContainer.addEventListener('mouseleave', () => {
                musicBars.forEach(bar => {
                    bar.style.animationDuration = '1.5s';
                });
            });
        }
    }
    
    // ============================================
    // 頁面載入完成效果
    // ============================================
    
    // 頁面載入後添加載入完成類
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // 創建載入完成動畫
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .page-loaded .header {
                animation: headerReveal 1s ease;
            }
            @keyframes headerReveal {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(loadingStyle);
        
        console.log('🚀 頁面完全載入完成');
    });
    
    // ============================================
    // 錯誤處理與相容性檢查
    // ============================================
    
    // 檢查瀏覽器相容性
    function checkBrowserCompatibility() {
        const issues = [];
        
        // 檢查Flexbox支援
        if (!('flex' in document.documentElement.style)) {
            issues.push('您的瀏覽器不支援Flexbox佈局，部分樣式可能無法正常顯示');
        }
        
        // 檢查CSS Grid支援
        if (!('grid' in document.documentElement.style)) {
            issues.push('您的瀏覽器不支援CSS Grid，部分佈局可能受影響');
        }
        
        // 檢查音訊元素支援
        const audio = document.createElement('audio');
        if (!audio.canPlayType) {
            issues.push('您的瀏覽器不支援HTML5音訊播放');
        }
        
        // 如果有問題，顯示警告
        if (issues.length > 0) {
            console.warn('相容性問題:', issues);
            // 可以選擇性地顯示給使用者
            // showCompatibilityWarning(issues);
        }
    }
    
    // 執行相容性檢查
    checkBrowserCompatibility();
    
    // ============================================
    // 工具函數
    // ============================================
    
    // 防抖函數
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 節流函數
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // 初始化完成
    console.log('🎬 Lady Gaga主題網頁初始化完成');
});