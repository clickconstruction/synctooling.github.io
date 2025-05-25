document.addEventListener('DOMContentLoaded', function() {
    // Add interactive elements to the dashboard demo
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Make chart sections expandable
    const expandIcons = document.querySelectorAll('.controls .fa-expand');
    expandIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const chartCard = this.closest('.chart-card');
            if (chartCard) {
                chartCard.classList.toggle('expanded');
                if (chartCard.classList.contains('expanded')) {
                    chartCard.style.gridColumn = 'span 2';
                    this.classList.replace('fa-expand', 'fa-compress');
                } else {
                    chartCard.style.gridColumn = '';
                    this.classList.replace('fa-compress', 'fa-expand');
                }
            }

            const ganttContainer = this.closest('.gantt-container');
            if (ganttContainer) {
                ganttContainer.classList.toggle('expanded');
                if (ganttContainer.classList.contains('expanded')) {
                    ganttContainer.style.height = '400px';
                    this.classList.replace('fa-expand', 'fa-compress');
                } else {
                    ganttContainer.style.height = '';
                    this.classList.replace('fa-compress', 'fa-expand');
                }
            }
        });
    });

    // Add hover effect to timeline bars
    const timelineBars = document.querySelectorAll('.bar');
    timelineBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'timeline-tooltip';
            tooltip.textContent = this.classList.contains('blue') ? 'In Progress - 70% Complete' :
                                 this.classList.contains('green') ? 'On Schedule - 45% Complete' :
                                 this.classList.contains('orange') ? 'At Risk - 30% Complete' :
                                 'Delayed - 15% Complete';
            
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '100';
            tooltip.style.top = '-30px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.whiteSpace = 'nowrap';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            const tooltip = this.querySelector('.timeline-tooltip');
            if (tooltip) {
                this.removeChild(tooltip);
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
