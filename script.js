const DEFAULT_SEED_TRANSACTIONS = [
  { id: 'seed-1', type: 'income', amount: 54000.00, reason: 'Staff Consultancy Payout', personName: 'Arab Lab Corp', category: 'freelance', date: '2026-06-15' },
  { id: 'seed-2', type: 'expense', amount: 14500.00, reason: 'Monthly Office Rental', personName: 'Self Managed', category: 'housing', date: '2026-06-16' },
  { id: 'seed-3', type: 'expense', amount: 2800.00, reason: 'Organic Groceries Basket', personName: 'Omar', category: 'groceries', date: '2026-06-17' },
  { id: 'seed-4', type: 'income', amount: 9200.00, reason: 'Dividends Equities Index', personName: 'EGP Equities Portfolio', category: 'investment', date: '2026-06-18' },
  { id: 'seed-5', type: 'expense', amount: 1250.00, reason: 'Dinner Celebration Catering', personName: 'Sarah', category: 'eating_out', date: '2026-06-18' }
];

const CATEGORIES = {
  income: [
    { value: 'salary', label: 'Fixed Salary Source', icon: 'wallet' },
    { value: 'freelance', label: 'Freelance & Contract', icon: 'briefcase' },
    { value: 'investment', label: 'Dividends & Yields', icon: 'trending-up' },
    { value: 'other_income', label: 'Other Gift Cashflow', icon: 'plus-circle' }
  ],
  expense: [
    { value: 'groceries', label: 'Foods & Groceries', icon: 'shopping-cart' },
    { value: 'housing', label: 'Housing Rent & Utility Bills', icon: 'home' },
    { value: 'transport', label: 'Logistics, Commutes & Transport', icon: 'car' },
    { value: 'entertainment', label: 'Entertainment & Leisure', icon: 'activity' },
    { value: 'eating_out', label: 'Dining Out, Cafes & Cuisines', icon: 'coffee' },
    { value: 'other_expense', label: 'Unclassified Miscellaneous Spend', icon: 'minus-circle' }
  ]
};

const CATEGORY_ICONS = {
  // Income
  salary: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2h-2" /></svg>`,
  freelance: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  investment: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 7l-8.5 8.5-5-5L2 18M22 7h-6M22 7v6"/></svg>`,
  other_income: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8M8 12h8"/></svg>`,

  // Expenses
  groceries: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"/></svg>`,
  housing: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 22V12h6v10"/></svg>`,
  transport: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
  entertainment: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  eating_out: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
  other_expense: `<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8"/></svg>`
};

let state = {
  transactions: [],
  formType: 'income',
  chartTab: 'expense',
  filterType: 'all',
  searchTerm: ''
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form-date').value = getTodayIsoDate();
  document.getElementById('header-date-tag').innerText = getTodayIsoDate();
  initTheming();
  initLedgerRecords();
});

function getTodayIsoDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function initTheming() {
  const savedTheme = localStorage.getItem('pb_vanilla_theme') || 'dark';
  if (savedTheme === 'light') { setLightMode(); } else { setDarkMode(); }
  document.getElementById('btn-theme-switcher').addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) { setLightMode(); } else { setDarkMode(); }
  });
}

function setDarkMode() {
  document.documentElement.classList.add('dark');
  localStorage.setItem('pb_vanilla_theme', 'dark');
  document.getElementById('theme-sun-icon').classList.remove('hidden');
  document.getElementById('theme-moon-icon').classList.add('hidden');
}

function setLightMode() {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('pb_vanilla_theme', 'light');
  document.getElementById('theme-sun-icon').classList.add('hidden');
  document.getElementById('theme-moon-icon').classList.remove('hidden');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `pointer-events-auto toast-enter toast-${type}`;
  toast.innerHTML = `${type === 'success' ? '<svg class="w-4.5 h-4.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>' : type === 'error' ? '<svg class="w-4.5 h-4.5 text-rose-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>' : '<svg class="w-4.5 h-4.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083 1.083l-.041.02-.041-.02a.75.75 0 01-1.083-1.083l.041-.02zM12 21a9 9 0 100-18 9 9 0 000 18z"/></svg>'} <span class="flex-1">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-active');
  }, 10);
  setTimeout(() => {
    toast.classList.remove('toast-active');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function initLedgerRecords() {
  const cached = localStorage.getItem('pb_vanilla_transactions');
  if (cached) { try { state.transactions = JSON.parse(cached); } catch (e) { state.transactions = [...DEFAULT_SEED_TRANSACTIONS]; saveStateToCache(); } } 
  else { state.transactions = [...DEFAULT_SEED_TRANSACTIONS]; saveStateToCache(); }
  renderCategoriesDropdown();
  setFormType('income');
  setChartTab('expense');
  setFilterType('all');
  updateDashboardData();
}

function saveStateToCache() { localStorage.setItem('pb_vanilla_transactions', JSON.stringify(state.transactions)); }

function updateAdvisoryWarning(balance, netIncome, netExpense) {
  const banner = document.getElementById('advisor-banner');
  const badge = document.getElementById('advisor-badge');
  const text = document.getElementById('advisor-text');
  const title = document.getElementById('advisor-title');
  if (!banner || !badge || !text || !title) return;
  if (balance < 0) {
    banner.className = "mb-8 p-4 rounded-3xl border bg-rose-50/80 border-rose-200 dark:bg-rose-950/15 dark:border-rose-900/40 text-rose-800 dark:text-rose-200 theme-transition shadow-sm flex items-start gap-4";
    badge.className = "p-2 rounded-2xl shrink-0 mt-0.5 border bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400";
    title.innerText = "Budget Risk Advisory";
    text.innerHTML = `⚠️ Deficit detected: Expenses outstrip income by <strong class="font-mono font-bold text-sm">${formatCurrency(Math.abs(balance))}</strong>. Review categorized items to trim spends.`;
  } else if (balance === 0) {
    banner.className = "mb-8 p-4 rounded-3xl border bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 theme-transition shadow-sm flex items-start gap-4";
    badge.className = "p-2 rounded-2xl shrink-0 mt-0.5 border bg-zinc-500/10 border-zinc-500/20 text-zinc-500 dark:text-zinc-400";
    title.innerText = "Flat Liquid Advisory";
    text.innerHTML = `⚖️ Cashflow is perfectly flat. Offsets perfectly balance incoming and outgoing items.`;
  } else {
    banner.className = "mb-8 p-4 rounded-3xl border bg-emerald-50/80 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 theme-transition shadow-sm flex items-start gap-4";
    badge.className = "p-2 rounded-2xl shrink-0 mt-0.5 border bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400";
    title.innerText = "Ledger Inflows Healthy";
    text.innerHTML = `🎉 Active surplus holding: <strong class="font-mono font-bold text-sm">${formatCurrency(balance)}</strong> left over. Export backup ledger arrays regularly to store safely.`;
  }
}

function updateDashboardData() {
  let income = 0, expenses = 0;
  state.transactions.forEach(t => { if (t.type === 'income') income += Number(t.amount); else expenses += Number(t.amount); });
  const balance = income - expenses;
  const pct = income > 0 ? Math.max(0, Math.min(100, (balance / income) * 100)) : 0;
  document.getElementById('total-income-display').innerText = formatCurrency(income);
  document.getElementById('total-expenses-display').innerText = formatCurrency(expenses);
  document.getElementById('total-balance-display').innerText = (balance < 0 ? '-' : '') + formatCurrency(Math.abs(balance));
  if (document.getElementById('savings-progress-bar')) document.getElementById('savings-progress-bar').style.width = `${balance < 0 ? 0 : pct}%`;
  updateAdvisoryWarning(balance, income, expenses);
  renderLedgerTransactions();
  renderCategoryAnalytics();
}

function formatCurrency(val) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EGP' }).format(val); }

function setChartTab(tab) {
  state.chartTab = tab;
  const btnExp = document.getElementById('tab-chart-expense'), btnInc = document.getElementById('tab-chart-income');
  if (!btnExp || !btnInc) return;
  if (tab === 'expense') {
    btnExp.className = "px-2.5 py-1.5 rounded-lg font-bold text-[8px] tracking-wider uppercase transition-all bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 focus:outline-none";
    btnInc.className = "px-2.5 py-1.5 rounded-lg font-bold text-[8px] tracking-wider uppercase transition-all text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 focus:outline-none";
  } else {
    btnInc.className = "px-2.5 py-1.5 rounded-lg font-bold text-[8px] tracking-wider uppercase transition-all bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 focus:outline-none";
    btnExp.className = "px-2.5 py-1.5 rounded-lg font-bold text-[8px] tracking-wider uppercase transition-all text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 focus:outline-none";
  }
  renderCategoryAnalytics();
}

function renderCategoryAnalytics() {
  const isIncome = state.chartTab === 'income', items = state.transactions.filter(t => t.type === state.chartTab);
  let localSum = 0; items.forEach(i => localSum += Number(i.amount));
  document.getElementById('chart-total-value').innerText = formatCurrency(localSum);
  const targetContainer = document.getElementById('categories-chart-container');
  if (!targetContainer) return;
  targetContainer.innerHTML = '';
  if (items.length === 0) {
    targetContainer.innerHTML = `<div class="flex-1 flex flex-col items-center justify-center py-12 px-4 select-none"><div class="p-3.5 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 text-zinc-400 mb-3 animate-pulse"><svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg></div><p class="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">No transactions active</p></div>`;
    return;
  }
  const categoriesList = CATEGORIES[state.chartTab] || [], groupings = {};
  items.forEach(item => groupings[item.category] = (groupings[item.category] || 0) + Number(item.amount));
  Object.keys(groupings).sort((a,b) => groupings[b] - groupings[a]).forEach(catKey => {
    const amount = groupings[catKey], pct = localSum > 0 ? (amount / localSum) * 100 : 0;
    const metadata = categoriesList.find(c => c.value === catKey) || { label: catKey };
    const itemEl = document.createElement('div');
    itemEl.className = "space-y-1.5";
    itemEl.innerHTML = `<div class="flex items-center justify-between text-xs font-semibold"><div class="flex items-center gap-2"><div class="p-1 px-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold">${pct.toFixed(0)}%</div><span class="font-bold text-zinc-700 dark:text-zinc-300">${metadata.label}</span></div><span class="font-bold text-zinc-900 dark:text-zinc-100 font-mono">${formatCurrency(amount)}</span></div><div class="h-2 w-full bg-zinc-100 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all duration-700 ease-out ${isIncome ? 'bg-gradient-to-r from-emerald-500 to-sky-400' : 'bg-gradient-to-r from-rose-500 to-indigo-500'}" style="width: ${pct}%"></div></div>`;
    targetContainer.appendChild(itemEl);
  });
}

function renderCategoriesDropdown() {
  const select = document.getElementById('form-category'); if (!select) return;
  select.innerHTML = '';
  (CATEGORIES[state.formType] || []).forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value; option.innerText = opt.label;
    option.className = "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100";
    select.appendChild(option);
  });
}

function setFormType(type) {
  state.formType = type;
  const btnInc = document.getElementById('form-btn-income'), btnExp = document.getElementById('form-btn-expense');
  if (!btnInc || !btnExp) return;
  if (type === 'income') {
    btnInc.className = "flex-1 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 focus:outline-none";
    btnExp.className = "flex-1 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 focus:outline-none";
  } else {
    btnExp.className = "flex-1 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer bg-rose-500/10 border border-rose-500/40 text-rose-600 dark:text-rose-400 focus:outline-none";
    btnInc.className = "flex-1 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 focus:outline-none";
  }
  renderCategoriesDropdown();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const amountVal = Number(document.getElementById('form-amount').value);
  const reasonVal = document.getElementById('form-reason').value.trim();
  const personVal = document.getElementById('form-person').value.trim();
  const categoryVal = document.getElementById('form-category').value;
  const dateVal = document.getElementById('form-date').value;
  if (!amountVal || !reasonVal || !dateVal) { showToast('Please properly populate the required ledger fields.', 'error'); return; }
  state.transactions.unshift({ id: 'user-' + Date.now(), type: state.formType, amount: amountVal, reason: reasonVal, personName: personVal || null, category: categoryVal, date: dateVal });
  saveStateToCache();
  document.getElementById('form-amount').value = ''; document.getElementById('form-reason').value = ''; document.getElementById('form-person').value = '';
  document.getElementById('form-date').value = getTodayIsoDate();
  showToast('Successfully recorded ledger transaction item.', 'success');
  updateDashboardData();
}

function setFilterType(type) {
  state.filterType = type;
  ['all', 'income', 'expense'].forEach(tab => {
    const btn = document.getElementById(`filter-btn-${tab}`); if (!btn) return;
    if (tab === type) btn.className = "py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase transition-all bg-indigo-600 text-white shadow-sm focus:outline-none";
    else btn.className = "py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase transition-all text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 focus:outline-none";
  });
  renderLedgerTransactions();
}

function handleSearchFilterInput() { state.searchTerm = document.getElementById('ledger-search-box').value.toLowerCase(); renderLedgerTransactions(); }

function renderLedgerTransactions() {
  const container = document.getElementById('transactions-list-viewport'); if (!container) return;
  container.innerHTML = '';
  const filtered = state.transactions.filter(t => {
    if (state.filterType !== 'all' && t.type !== state.filterType) return false;
    if (state.searchTerm) {
      const matchReason = t.reason.toLowerCase().includes(state.searchTerm), matchPerson = t.personName && t.personName.toLowerCase().includes(state.searchTerm);
      const matchedLabel = ((CATEGORIES[t.type] || []).find(c => c.value === t.category)?.label || t.category).toLowerCase();
      return matchReason || matchPerson || matchedLabel.includes(state.searchTerm);
    }
    return true;
  });
  document.getElementById('ledger-count-tag').innerText = `Showing ${filtered.length} of ${state.transactions.length} records`;
  if (filtered.length === 0) {
    container.innerHTML = `<div class="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-950/40 select-none"><h3 class="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-center">No transactions active</h3></div>`;
    return;
  }
  filtered.forEach(t => {
    const isIncome = t.type === 'income', catDetails = (CATEGORIES[t.type] || []).find(c => c.value === t.category) || { label: t.category };
    const iconSvg = CATEGORY_ICONS[t.category] || (isIncome ? '<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>' : '<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>');
    const row = document.createElement('div');
    row.className = "group flex flex-col sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-col lg:items-stretch xl:flex-row xl:items-center justify-between p-4 bg-zinc-50 border border-zinc-150 dark:bg-zinc-950 dark:border-zinc-855 rounded-2xl hover:border-indigo-500 transition-all duration-300 gap-4 shadow-sm";
    row.innerHTML = `<div class="flex items-start gap-3.5"><div class="p-2.5 rounded-xl shrink-0 mt-0.5 border ${isIncome ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'}">${iconSvg}</div><div class="space-y-1.5 min-w-0 pr-2"><h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 break-words text-left">${t.reason}</h4><div class="flex flex-wrap items-center gap-2 text-[8px] uppercase font-bold text-zinc-400 dark:text-zinc-500"><span class="font-mono">${t.date}</span><span class="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span><span class="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">${catDetails.label}</span>${t.personName ? `<span class="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span><span class="px-2 py-0.5 rounded bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 max-w-[130px] truncate">${t.personName}</span>` : ''}</div></div></div><div class="flex items-center justify-between sm:justify-end md:justify-between lg:justify-between xl:justify-end gap-5 border-t sm:border-t-0 md:border-t lg:border-t xl:border-t-0 border-zinc-200 dark:border-zinc-850 pt-3 sm:pt-0 md:pt-3 lg:pt-3 xl:pt-0"><span class="text-sm sm:text-base font-extrabold font-mono shrink-0 ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${isIncome ? '+' : '-'}${formatCurrency(t.amount)}</span><button type="button" onclick="deleteTransactionEntry('${t.id}')" class="p-2 text-zinc-400 hover:text-rose-500 dark:hover:bg-rose-500/10 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer focus:outline-none"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>`;
    container.appendChild(row);
  });
}

function deleteTransactionEntry(id) { state.transactions = state.transactions.filter(t => t.id !== id); saveStateToCache(); showToast('Successfully deleted ledger transaction item.', 'success'); updateDashboardData(); }

function showClearConfirmation(show) {
  const btn = document.getElementById('btn-clear-trigger'), conf = document.getElementById('clear-confirmation');
  if (!btn || !conf) return;
  if (show) { btn.className = "hidden"; conf.className = "flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-950 border border-rose-500/30 p-1 rounded-xl"; } 
  else { btn.className = "text-[9px] uppercase font-bold px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:text-zinc-400 text-zinc-650 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all cursor-pointer focus:outline-none"; conf.className = "hidden"; }
}

function clearAllTransactions() { state.transactions = []; saveStateToCache(); showClearConfirmation(false); showToast('All transactions wiped successfully.', 'info'); updateDashboardData(); }
function triggerBackupFilePicker() { document.getElementById('backup-file-picker').click(); }

function handleImportBackup(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        const validated = importedData.filter(t => t.id && t.type && t.amount && t.reason && t.category && t.date);
        if (validated.length === 0 && importedData.length > 0) { showToast('Malformed structure in uploaded JSON.', 'error'); return; }
        state.transactions = validated; saveStateToCache(); updateDashboardData();
        showToast(`Budget ledger successfully restored: loaded ${validated.length} transactions.`, 'success');
      } else { showToast('Format error: Backup must be a valid transaction array.', 'error'); }
    } catch (err) { showToast('Failed to parse file. Verify JSON backup validity.', 'error'); }
  };
  reader.readAsText(file); event.target.value = '';
}

function handleExportBackup() {
  if (state.transactions.length === 0) { showToast('Your offline ledger contains zero records to export.', 'error'); return; }
  const element = document.createElement('a');
  element.href = URL.createObjectURL(new Blob([JSON.stringify(state.transactions, null, 2)], { type: 'application/json' }));
  element.download = `EGP-Ledger-Backup-${getTodayIsoDate()}.json`;
  document.body.appendChild(element); element.click(); document.body.removeChild(element);
  showToast('Successfully exported backup file.', 'success');
}
