// script.js
// 教程数据
// let tutorialData = {};
/**
const tutorialData = {
    "LVGL教程": {
        "手把手、轻松实现Windows+vscode环境开发LVGL": {
            "百度网盘资料链接": "https://pan.baidu.com/s/10a6duAFRjSe9p-cLk_IhQQ?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1eWLgzrEPq/"
        },
        "手把手、简单实现esp32+Windows+vscode环境开发esp-idf项目 定制插件提高开发效率 esp-idf": {
            "百度网盘资料链接": "https://pan.baidu.com/s/1JTAipnSz0CL6r59wFb4C1Q?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1YUL1z3Ee2/"
        }
    },
    "ESP32教程": {
        "ESP32环境搭建教程1": {
            "百度网盘资料链接": "https://pan.baidu.com/s/10a6duAFRjSe9p-cLk_IhQQ?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1eWLgzrEPq/"
        },
        "ESP32环境搭建教程2": {
            "百度网盘资料链接": "https://pan.baidu.com/s/10a6duAFRjSe9p-cLk_IhQQ?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1eWLgzrEPq/"
        }
    },
    "STM32教程": {
        "STM32环境搭建教程1": {
            "百度网盘资料链接": "https://pan.baidu.com/s/10a6duAFRjSe9p-cLk_IhQQ?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1eWLgzrEPq/"
        },
        "STM32环境搭建教程2": {
            "百度网盘资料链接": "https://pan.baidu.com/s/10a6duAFRjSe9p-cLk_IhQQ?pwd=unkx",
            "Bilibili视频教程": "https://www.bilibili.com/video/BV1eWLgzrEPq/"
        }
    }
};
*/

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', async function() {
    try {

        // 使用 fetch API 获取 data.json 文件
        // const response = await fetch('./index.html','./data.json');
        const response = await fetch('./data.json');
        // 解析 JSON 数据

        tutorialData = await response.json();


        // 初始化分类导航
        initCategoryNav();

        // 默认显示第一个分类的教程
        if (Object.keys(tutorialData).length > 0) {
            showTutorialCategory(Object.keys(tutorialData)[0]);
        }

        // 页面切换功能 - 桌面导航
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');

                // 隐藏所有页面
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });

                // 显示选中的页面
                document.getElementById(pageId).classList.add('active');

                // 更新导航栏活动状态
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(navLink => {
                    navLink.style.color = '#fff';
                });
                this.style.color = '#00f7ff';

                // 如果是资料获取页，默认显示第一个分类的教程
                if (pageId === 'resources' && Object.keys(tutorialData).length > 0) {
                    showTutorialCategory(Object.keys(tutorialData)[0]);
                }

                // 平滑滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        // 页面切换功能 - 移动端导航
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');

                // 隐藏所有页面
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });

                // 显示选中的页面
                document.getElementById(pageId).classList.add('active');

                // 更新导航栏活动状态
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(navLink => {
                    navLink.style.color = '#fff';
                });
                this.style.color = '#00f7ff';

                // 如果是资料获取页，默认显示第一个分类的教程
                if (pageId === 'resources' && Object.keys(tutorialData).length > 0) {
                    showTutorialCategory(Object.keys(tutorialData)[0]);
                }

                // 关闭移动端菜单
                document.getElementById('mobile-menu').classList.add('hidden');

                // 平滑滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        // Logo点击跳转功能
        document.querySelector('header a[href="#home"]').addEventListener('click', function(e) {
            e.preventDefault();

            // 隐藏所有页面
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // 显示资料获取页
            document.getElementById('home').classList.add('active');

            // 更新导航栏活动状态
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(navLink => {
                navLink.style.color = '#fff';
            });
            document.querySelector('.nav-link[data-page="resources"]').style.color = '#00f7ff';

            // 显示第一个分类的教程
            if (Object.keys(tutorialData).length > 0) {
                showTutorialCategory(Object.keys(tutorialData)[0]);
            }

            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 移动端菜单切换
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // 初始化轮播图
        initCarousel();

        // 添加粒子背景效果
        initParticles();

    } catch (error) {
        console.error('Error loading tutorial data:', error);
    }
});

// 初始化分类导航
function initCategoryNav() {
    const categoryNav = document.getElementById('category-nav');

    // 清空现有内容
    categoryNav.innerHTML = '';

    // 遍历数据中的分类
    Object.keys(tutorialData).forEach((category, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'sidebar-link';
        a.setAttribute('data-category', category);
        a.textContent = category;

        // 第一个分类设置为active
        if (index === 0) {
            a.classList.add('active');
        }

        // 点击事件
        a.addEventListener('click', function(e) {
            e.preventDefault();

            // 更新活动状态
            document.querySelectorAll('.sidebar-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');

            // 显示对应的教程列表
            showTutorialCategory(category);
        });

        li.appendChild(a);
        categoryNav.appendChild(li);
    });
}

// 显示指定分类的教程
function showTutorialCategory(category) {
    const tutorialList = document.getElementById('tutorial-list');
    const categoryTitle = document.getElementById('category-title');

    // 更新内容标题
    categoryTitle.textContent = category;

    // 清空现有内容
    tutorialList.innerHTML = '';

    // 检查分类是否存在
    if (!tutorialData[category]) {
        const li = document.createElement('li');
        li.textContent = '暂无教程';
        tutorialList.appendChild(li);
        return;
    }

    // 遍历分类下的教程
    Object.keys(tutorialData[category]).forEach(tutorialName => {
        const li = document.createElement('li');
        li.className = 'tutorial-item';
        li.setAttribute('data-tutorial', `${category}-${tutorialName.replace(/\s+/g, '-')}`);

        const h3 = document.createElement('h3');
        h3.textContent = tutorialName;

        const p = document.createElement('p');
        p.textContent = '点击查看教程资料';

        li.appendChild(h3);
        li.appendChild(p);

        // 点击事件
        li.addEventListener('click', function() {
            showTutorialModal(category, tutorialName);
        });

        // 添加动画效果
        li.style.opacity = 0;
        setTimeout(() => {
            li.style.transition = 'opacity 0.5s ease';
            li.style.opacity = 1;
        }, 100);

        tutorialList.appendChild(li);
    });
}

// 显示教程模态框
function showTutorialModal(category, tutorialName) {
    const modal = document.getElementById('tutorial-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    // 设置弹窗标题
    modalTitle.textContent = tutorialName;
    modalBody.innerHTML = '';

    // 获取教程数据
    const tutorial = tutorialData[category][tutorialName];

    // 创建链接类型到按钮的映射
    const buttonConfigs = {
        'Bilibili': { text: '观看教程', class: 'watch-btn' },
        '百度网盘': { text: '点击跳转', class: 'jump-btn' },
        '阿里网盘': { text: '前往网盘', class: 'ali-btn' }
    };

    // 遍历教程的链接
    Object.keys(tutorial).forEach(linkName => {
        const linkItem = document.createElement('div');
        linkItem.className = 'link-item';

        // 创建标题
        const title = document.createElement('h4');
        title.textContent = linkName;
        linkItem.appendChild(title);

        // 创建链接容器
        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container flex flex-col md:flex-row justify-between items-start md:items-center gap-3';

        // 创建可点击的链接
        const linkAnchor = document.createElement('a');
        linkAnchor.className = 'link-anchor break-all';
        linkAnchor.href = tutorial[linkName];
        linkAnchor.target = '_blank';
        linkAnchor.textContent = tutorial[linkName];
        linkAnchor.addEventListener('click', (e) => e.stopPropagation());
        linkContainer.appendChild(linkAnchor);

        // 创建按钮容器 - 靠右对齐
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container flex gap-2 justify-end w-full';

        // 为特定链接类型添加专用按钮
        Object.keys(buttonConfigs).forEach(key => {
            if (linkName.includes(key)) {
                const config = buttonConfigs[key];
                const actionBtn = document.createElement('button');
                actionBtn.className = `${config.class} base-btn px-4 py-1 rounded text-sm`;
                actionBtn.textContent = config.text;
                actionBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.open(tutorial[linkName], '_blank');
                });
                buttonContainer.appendChild(actionBtn);
            }
        });

        // 添加复制按钮（所有链接都有）
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn base-btn px-4 py-1 rounded text-sm';
        copyBtn.textContent = '复制链接';
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(tutorial[linkName]).then(() => {
                    copyBtn.textContent = '已复制!';
                    setTimeout(() => {
                        copyBtn.textContent = '复制链接';
                    }, 2000);
                }).catch(() => {
                    alert('复制失败，请手动复制链接。');
                });
            } else {
                alert('当前浏览器不支持自动复制，请手动复制链接。');
            }
        });
        buttonContainer.appendChild(copyBtn);

        linkContainer.appendChild(buttonContainer);
        linkItem.appendChild(linkContainer);
        modalBody.appendChild(linkItem);
    });

    // 显示弹窗
    modal.style.display = 'flex';
    // 添加弹窗动画效果
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = 1;
    }, 100);
}

// 初始化轮播图
function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) {
        console.error('未找到幻灯片元素，请检查HTML结构。');
        return;
    }

    // 显示指定幻灯片
    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        document.querySelector('.carousel-inner').style.transform = `translateX(-${index * 100 / (window.innerWidth >= 768 ? 3 : 1)}%)`;

        // 更新指示器
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    // 上一张按钮
    document.querySelector('.prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // 下一张按钮
    document.querySelector('.next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // 自动轮播
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // 关闭弹窗
    document.querySelector('.close-btn').addEventListener('click', function() {
        const modal = document.getElementById('tutorial-modal');
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('tutorial-modal');
        if (e.target === modal) {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = 0;
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

// 初始化粒子背景效果
function initParticles() {
    particlesJS.load('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00f7ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f7ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
