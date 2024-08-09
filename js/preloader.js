window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const loadingPercentage = document.getElementById('loading-percentage');

    let percentage = 0;

    const interval = setInterval(() => {
        percentage += 10; 
        loadingPercentage.textContent = `${percentage}%`;
        if (percentage >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.display = 'none';
                content.style.display = 'block';
                document.body.style.overflow = 'auto'; 
            }, 300); 
        }
    }, 100); 
    snowflakeEffect(); 
});
