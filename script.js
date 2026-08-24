(function(){
  var C = window.CELSIA;
  document.querySelectorAll('[data-hover]').forEach(function(el){
    var base = el.getAttribute('style') || '', hov = el.getAttribute('data-hover');
    el.addEventListener('mouseenter', function(){ el.setAttribute('style', base + ';' + hov); });
    el.addEventListener('mouseleave', function(){ el.setAttribute('style', base); });
  });
  var state = { model: 'studio', clad: 'thermo', opts: { chiller: false, parni: false, drevo: false }, upl: 1200, nights: 16 };
  function fmt(n){ return C.fmt(n); }
  function set(k, v){ var el = document.querySelector('[data-out="' + k + '"]'); if (el) el.textContent = v; }
  function setPressed(attr, test){
    document.querySelectorAll('[' + attr + ']').forEach(function(el){
      el.setAttribute('aria-pressed', test(el.getAttribute(attr)) ? 'true' : 'false');
    });
  }
  // klikatelne prvky konfiguratoru jsou divy, takze jim rucne dodame
  // roli, fokus a klavesnici (Enter / mezernik)
  function activate(el){
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
        e.preventDefault();
        el.click();
      }
    });
  }
  function render(){
    var model = C.models[state.model];
    var total = model.base;
    var rows = [{ label: model.name, price: fmt(model.base) }];
    var clad = C.cladding[state.clad];
    if (clad.price > 0){ total += clad.price; rows.push({ label: clad.label, price: '+ ' + fmt(clad.price) }); }
    else rows.push({ label: clad.label, price: C.included });
    Object.keys(C.options).forEach(function(k){
      if (state.opts[k] && C.options[k].models.indexOf(state.model) >= 0){
        total += C.options[k].price;
        rows.push({ label: C.options[k].label, price: '+ ' + fmt(C.options[k].price) });
      }
    });
    if (model.chillerStd) rows.push({ label: C.options.chiller.label, price: C.stdRow });
    document.querySelectorAll('[data-mark]').forEach(function(el){
      var p = el.getAttribute('data-mark').split(':'), on = false;
      if (p[0] === 'model') on = state.model === p[1];
      if (p[0] === 'clad') on = state.clad === p[1];
      if (p[0] === 'opt') on = p[1] === 'chiller' ? (state.opts.chiller && !model.chillerStd) : state.opts[p[1]];
      el.style.background = on ? '#f0561d' : 'transparent';
    });
    setPressed('data-pick-model', function(k){ return state.model === k; });
    setPressed('data-pick-clad', function(k){ return state.clad === k; });
    setPressed('data-toggle-opt', function(k){
      if (k === 'chiller' && model.chillerStd) return false;
      return !!state.opts[k];
    });
    var rowCh = document.querySelector('[data-row="chiller"]');
    if (rowCh){ rowCh.style.opacity = model.chillerStd ? '.38' : ''; rowCh.style.pointerEvents = model.chillerStd ? 'none' : ''; }
    var rowPa = document.querySelector('[data-row="parni"]');
    if (rowPa){ var ok = C.options.parni.models.indexOf(state.model) >= 0; rowPa.style.opacity = ok ? '' : '.38'; rowPa.style.pointerEvents = ok ? '' : 'none'; }
    set('chillerPrice', model.chillerStd ? C.stdPrice : C.chillerAdd);
    var sum = document.querySelector('[data-sumrows]');
    if (sum){
      sum.innerHTML = '';
      rows.forEach(function(r){
        var d = document.createElement('div');
        d.setAttribute('style', 'display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid rgba(13,33,37,.08);font-size:14.5px');
        var a = document.createElement('span'); a.textContent = r.label;
        var b = document.createElement('span');
        b.setAttribute('style', "font-family:'Martian Mono',monospace;font-size:12.5px;white-space:nowrap;color:#3c5254");
        b.textContent = r.price;
        d.appendChild(a); d.appendChild(b); sum.appendChild(d);
      });
    }
    set('total', fmt(total));
    var conf = document.querySelector('[data-out-value="conf"]');
    if (conf) conf.value = rows.map(function(r){ return r.label + ' (' + r.price + ')'; }).join(', ') + ' · ' + C.total + ' ' + fmt(total);
    var yearly = state.upl * state.nights * 12;
    var payback = C.models.host.base / yearly;
    var cover = Math.ceil(C.lease / state.upl);
    set('uplKc', fmt(state.upl));
    set('nightsVal', String(state.nights));
    set('yearlyKc', fmt(yearly));
    set('paybackTxt', payback.toLocaleString(C.locale, { maximumFractionDigits: 1 }) + ' ' + C.years);
    set('coverTxt', C.nightWord(cover));
  }
  document.querySelectorAll('[data-pick-model]').forEach(function(el){
    activate(el);
    el.addEventListener('click', function(){
      var m = el.getAttribute('data-pick-model');
      Object.keys(C.options).forEach(function(k){ if (C.options[k].models.indexOf(m) < 0) state.opts[k] = false; });
      if (C.models[m].chillerStd) state.opts.chiller = false;
      state.model = m; render();
    });
  });
  document.querySelectorAll('[data-pick-clad]').forEach(function(el){
    activate(el);
    el.addEventListener('click', function(){ state.clad = el.getAttribute('data-pick-clad'); render(); });
  });
  document.querySelectorAll('[data-toggle-opt]').forEach(function(el){
    activate(el);
    el.addEventListener('click', function(){
      var k = el.getAttribute('data-toggle-opt');
      if (C.options[k].models.indexOf(state.model) < 0) return;
      state.opts[k] = !state.opts[k]; render();
    });
  });
  document.querySelectorAll('[data-slider]').forEach(function(el){
    el.addEventListener('input', function(){ state[el.getAttribute('data-slider')] = +el.value; render(); });
  });
  render();
})();
