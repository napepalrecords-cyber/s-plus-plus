// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Broker tabs
document.querySelectorAll('.broker-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.broker-tab').forEach(t => t.classList.remove('broker-tab--active'));
    tab.classList.add('broker-tab--active');

    const target = tab.dataset.tab;
    document.getElementById('broker-overseas').classList.toggle('broker-grid--hidden', target !== 'overseas');
    document.getElementById('broker-domestic').classList.toggle('broker-grid--hidden', target !== 'domestic');

    const moreLink = document.getElementById('broker-more-link');
    moreLink.href = target === 'overseas' ? 'brokers-overseas.html' : 'brokers-domestic.html';
    moreLink.textContent = target === 'overseas' ? 'すべての海外証券会社を見る' : 'すべての国内証券会社を見る';
  });
});
