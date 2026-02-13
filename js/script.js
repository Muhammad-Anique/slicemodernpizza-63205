'use strict';

/**
 * SliceModernPizza - Main Script
 * Handles Navigation, Menu Filtering, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Data: Menu Items ---
    const menuData = [
        {
            id: 1,
            name: "Classic Margherita",
            category: "pizza",
            price: "$18",
            description: "San Marzano tomatoes, fresh mozzarella, organic basil, extra virgin olive oil.",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=600&h=400&fit=crop",
            popular: true
        },
        {
            id: 2,
            name: "The Spicy Pepperoni",
            category: "pizza",
            price: "$21",
            description: "Spicy salami, chili-infused honey, pomodoro, and creamy fior di latte.",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop",
            popular: true
        },
        {
            id: 3,
            name: "Truffle Mushroom",
            category: "pizza",
            price: "$24",
            description: "Wild portobello, truffle oil, roasted garlic cream, and fresh thyme.",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
            popular: false
        },
        {
            id: 4,
            name: "Garlic Knot Stack",
            category: "sides",
            price: "$9",
            description: "Hand-twisted dough, parsley butter, and spicy marinara dip.",
            image: "https://images.unsplash.com/photo-1619531008298-6e3eec90b9e2?w=600&h=400&fit=crop",
            popular: false
        },
        {
            id: 5,
            name: "Arugula Burrata Salad",
            category: "sides",
            price: "$14",
            description: "Baby arugula, creamy burrata, balsamic glaze, and toasted pine nuts.",
            image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&h=400&fit=crop",
            popular: false
        },
        {
            id: 6,
            name: "House-Made Limonata",
            category: "drinks",
            price: "$6",
            description: "Sicilian lemons, sparkling water, and fresh mint.",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop",
            popular: false
        }
    ];

    // --- Selectors ---
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuContainer = document.getElementById('menu-container');
    const categoryTabs = document.querySelectorAll('.menu-tab');
    const contactForm = document.querySelector('form');

    // --- Mobile Menu Logic ---
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('visible');
        document.body.classList.toggle('overflow-hidden');
    };

    menuToggle?.addEventListener('click', toggleMobileMenu);
    menuClose?.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));

    // --- Sticky Header on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }
    });

    // --- Menu Rendering & Filtering ---
    const renderMenu = (filter = 'all') => {
        if (!menuContainer) return;
        
        menuContainer.innerHTML = '';
        const filteredItems = filter === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === filter);

        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card relative';
            card.innerHTML = `
                ${item.popular ? '<span class="badge-hot">Popular</span>' : ''}
                <div class="h-64 overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 text-left">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">${item.name}</h3>
                        <span class="text-red-600 font-bold">${item.price}</span>
                    </div>
                    <p class="text-stone-500 text-sm">${item.description}</p>
                </div>
            `;
            menuContainer.appendChild(card);
        });
    };

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // UI Toggle
            categoryTabs.forEach(t => {
                t.classList.remove('active', 'bg-red-600', 'text-white');
                t.classList.add('bg-white', 'text-stone-800');
            });
            tab.classList.add('active', 'bg-red-600', 'text-white');
            tab.classList.remove('bg-white', 'text-stone-800');

            // Filtering
            const category = tab.getAttribute('data-category');
            renderMenu(category);
        });
    });

    // --- Smooth Scroll Logic for all Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Form Validation ---
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                alert('Thank you for your message! Our team will get back to you shortly.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        }
    });

    // --- Initialize ---
    renderMenu();
});