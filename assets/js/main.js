/* =========================================================
   IA DOMÍNIO TOTAL — JS Principal
   - Timer de urgência
   - Tracking de eventos (Meta, TikTok, GA4)
   - Smooth CTAs
   ========================================================= */

(function(){
  'use strict';

  // ========== CONFIG (substitua os IDs dos pixels ao hospedar) ==========
  window.IA_CONFIG = window.IA_CONFIG || {
    META_PIXEL_ID: 'SEU_META_PIXEL_AQUI',
    TIKTOK_PIXEL_ID: 'SEU_TIKTOK_PIXEL_AQUI',
    GA4_ID: 'G-SEU_GA4_AQUI',
    CHECKOUT_URL: '#',        // Ex: https://pay.kiwify.com.br/SEUCODIGO
    PRODUCT_VALUE: 17.90,
    CURRENCY: 'BRL',
    PRODUCT_NAME: 'IA Domínio Total'
  };

  // ========== TIMER DE URGÊNCIA (24h rolling) ==========
  function startTimer(){
    const el = document.getElementById('countdown');
    if(!el) return;
    const KEY = 'ia_deadline_v1';
    let deadline = parseInt(localStorage.getItem(KEY) || '0', 10);
    const now = Date.now();
    if(!deadline || deadline < now){
      deadline = now + (1000 * 60 * 60 * 23) + (1000 * 60 * 47);
      localStorage.setItem(KEY, String(deadline));
    }
    function pad(n){return String(n).padStart(2,'0')}
    function tick(){
      const d = deadline - Date.now();
      if(d <= 0){
        deadline = Date.now() + (1000*60*60*23) + (1000*60*47);
        localStorage.setItem(KEY, String(deadline));
      }
      const total = Math.max(0, deadline - Date.now());
      const h = Math.floor(total / 3600000);
      const m = Math.floor((total % 3600000) / 60000);
      const s = Math.floor((total % 60000) / 1000);
      el.innerHTML = '<span>'+pad(h)+'</span>:<span>'+pad(m)+'</span>:<span>'+pad(s)+'</span>';
    }
    tick();
    setInterval(tick, 1000);
  }

  // ========== TRACKING ==========
  function trackEvent(name, params){
    try{
      if(typeof fbq === 'function') fbq('track', name, params || {});
      if(typeof ttq === 'object' && ttq.track) ttq.track(name, params || {});
      if(typeof gtag === 'function') gtag('event', name, params || {});
      console.log('[track]', name, params || {});
    }catch(e){console.warn(e)}
  }
  window.trackEvent = trackEvent;

  // ========== CTAs ==========
  function bindCTAs(){
    document.querySelectorAll('[data-cta]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        const type = btn.getAttribute('data-cta');
        if(type === 'scroll'){
          e.preventDefault();
          const target = document.querySelector(btn.getAttribute('data-target') || '#oferta');
          if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
          trackEvent('Lead', {content_name:'CTA_Scroll', source: btn.textContent.trim()});
        }else if(type === 'checkout'){
          trackEvent('InitiateCheckout', {
            content_name: IA_CONFIG.PRODUCT_NAME,
            value: IA_CONFIG.PRODUCT_VALUE,
            currency: IA_CONFIG.CURRENCY
          });
          if(IA_CONFIG.CHECKOUT_URL && IA_CONFIG.CHECKOUT_URL !== '#'){
            window.location.href = IA_CONFIG.CHECKOUT_URL;
          }else{
            e.preventDefault();
            alert('🚀 Checkout não configurado ainda. Configure CHECKOUT_URL em main.js');
          }
        }
      });
    });
  }

  // ========== VIEW CONTENT ==========
  function viewContent(){
    trackEvent('ViewContent', {
      content_name: IA_CONFIG.PRODUCT_NAME,
      value: IA_CONFIG.PRODUCT_VALUE,
      currency: IA_CONFIG.CURRENCY
    });
  }

  // ========== SCROLL DEPTH ==========
  function scrollTracking(){
    const milestones = [25,50,75,90];
    const fired = {};
    window.addEventListener('scroll', function(){
      const h = document.documentElement;
      const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      milestones.forEach(function(m){
        if(percent >= m && !fired[m]){
          fired[m] = true;
          trackEvent('ScrollDepth', {percent: m});
        }
      });
    }, {passive:true});
  }

  // ========== BOOT ==========
  document.addEventListener('DOMContentLoaded', function(){
    startTimer();
    bindCTAs();
    viewContent();
    scrollTracking();
  });
})();
