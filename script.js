// Project owned and developed by NoviumNodes

const savedTheme = localStorage.getItem('pb_vanilla_theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
}

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
    { value: 'freelance', label: 'Freelance & Contracting', icon: 'briefcase' },
    { value: 'investment', label: 'Dividends & Assets', icon: 'trending-up' },
    { value: 'other_income', label: 'Miscellaneous Inflow', icon: 'plus-circle' }
  ],
  expense: [
    { value: 'housing', label: 'Housing & Operational Rent', icon: 'home' },
    { value: 'groceries', label: 'Essential Food & Groceries', icon: 'shopping-cart' },
    { value: 'utilities', label: 'Energy, Net & Water Utilities', icon: 'zap' },
    { value: 'transport', label: 'Transport & Fleet Logistics', icon: 'truck' },
    { value: 'eating_out', label: 'Eating Out & Catering', icon: 'coffee' },
    { value: 'comfort', label: 'Lifestyle, Leisure & Comfort', icon: 'smile' },
    { value: 'other_expense', label: 'Unforeseen Outward Debit', icon: 'minus-circle' }
  ]
};

let state = {
  transactions: [],
  formType: 'expense',
  chartTab: 'expense',
  filterType: 'all',
  searchTerm: ''
};

function initApp() {
  document.getElementById('form-date').value = getTodayIsoDate();
  document.getElementById('header-date-tag').innerText = getTodayIsoDate();
  initTheming();
  loadStateFromCache();
  setFormType('expense');
  setChartTab('expense');
  setFilterType('all');
  updateDashboardData();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function getTodayIsoDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  return `${yyyy}-${mm}-${dd}`;
}

function initTheming() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  updateThemeUi();
  btn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pb_vanilla_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pb_vanilla_theme', 'dark');
    }
    updateThemeUi();
  });
}

function updateThemeUi() {
  const icon = document.getElementById('theme-toggle-icon');
  if (!icon) return;
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />`;
  } else {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;
  }
}

function loadStateFromCache() {
  try {
    const serialized = localStorage.getItem('pb_vanilla_transactions');
    if (serialized) {
      state.transactions = JSON.parse(serialized);
    } else {
      state.transactions = [...DEFAULT_SEED_TRANSACTIONS];
      saveStateToCache();
    }
  } catch (err) {
    state.transactions = [...DEFAULT_SEED_TRANSACTIONS];
  }
}

function saveStateToCache() {
  try {
    localStorage.setItem('pb_vanilla_transactions', JSON.stringify(state.transactions));
  } catch (err) {
    console.error('Failed Cache Write:', err);
  }
}

function updateDashboardData() {
  let income = 0;
  let expenses = 0;
  state.transactions.forEach(t => {
    const amt = Number(t.amount);
    if (t.type === 'income') income += amt;
    else expenses += amt;
  });
  const balance = income - expenses;
  let pct = 0;
  if (income > 0) {
    pct = Math.min(100, Math.max(0, (balance / income) * 100));
  }
  document.getElementById('savings-percent-display').innerText = `${pct.toFixed(0)}%`;
  document.getElementById('total-income-display').innerText = formatCurrency(income);
  document.getElementById('total-expenses-display').innerText = formatCurrency(expenses);
  document.getElementById('total-balance-display').innerText = (balance < 0 ? '-' : '') + formatCurrency(Math.abs(balance));
  if (document.getElementById('savings-progress-bar')) document.getElementById('savings-progress-bar').style.width = `${balance < 0 ? 0 : pct}%`;
  
  // Minimize container content and shrink font sizes when numbers exceed standard widths
  adjustCardContent('card-total-income', 'total-income-display', income);
  adjustCardContent('card-total-expenses', 'total-expenses-display', expenses);
  adjustCardContent('card-total-balance', 'total-balance-display', balance);

  updateAdvisoryWarning(balance, income, expenses);
  renderLedgerTransactions();
  renderCategoryAnalytics();
}

function adjustCardContent(cardId, displayId, value) {
  const card = document.getElementById(cardId);
  const display = document.getElementById(displayId);
  if (!card || !display) return;
  
  const absVal = Math.abs(value);
  const numStr = Math.round(absVal).toString();
  const len = numStr.length;
  
  // Reset card padding classes
  card.classList.remove('p-6', 'p-5', 'p-4', 'p-3.5');
  
  // Reset display text size and tracking classes
  display.classList.remove(
    'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs',
    'tracking-widest', 'tracking-wider', 'tracking-normal', 'tracking-tight', 'tracking-tighter'
  );
  
  // Locate card elements to minimize
  const svg = card.querySelector('svg');
  const subtext = card.querySelector('p.text-\\[10px\\]') || card.querySelector('p:last-of-type');
  const progressBarWrapper = card.querySelector('.mt-4') || card.querySelector('.mt-3') || card.querySelector('.mt-2');
  
  if (svg) {
    svg.classList.remove('hidden', 'w-12', 'h-12', 'w-10', 'h-10', 'w-8', 'h-8', 'w-6', 'h-6');
  }
  if (subtext) {
    subtext.classList.remove('hidden', 'mt-2.5', 'mt-2', 'mt-1.5');
  }
  if (progressBarWrapper) {
    progressBarWrapper.classList.remove('hidden', 'mt-4', 'mt-3', 'mt-2');
  }
  
  if (len >= 9) { // 100 Million+ or extremely long numbers
    card.classList.add('p-3.5');
    display.classList.add('text-xs', 'tracking-tighter');
    if (svg) svg.classList.add('hidden');
    if (subtext) subtext.classList.add('hidden');
    if (progressBarWrapper) progressBarWrapper.classList.add('hidden');
  } else if (len >= 7) { // 1 Million+
    card.classList.add('p-4');
    display.classList.add('text-sm', 'tracking-tighter');
    if (svg) svg.classList.add('hidden');
    if (subtext) subtext.classList.add('hidden');
    if (progressBarWrapper) {
      progressBarWrapper.classList.add('mt-2');
    }
  } else if (len >= 5) { // 10,000+
    card.classList.add('p-4');
    display.classList.add('text-base', 'tracking-tighter');
    if (svg) svg.classList.add('w-8', 'h-8');
    if (subtext) subtext.classList.add('mt-1.5');
    if (progressBarWrapper) {
      progressBarWrapper.classList.add('mt-2');
    }
  } else if (len >= 4) { // 1,000+
    card.classList.add('p-5');
    display.classList.add('text-xl', 'tracking-tight');
    if (svg) svg.classList.add('w-10', 'h-10');
    if (subtext) subtext.classList.add('mt-2');
    if (progressBarWrapper) {
      progressBarWrapper.classList.add('mt-3');
    }
  } else { // Small numbers, standard display
    card.classList.add('p-6');
    display.classList.add('text-3xl');
    if (svg) svg.classList.add('w-12', 'h-12');
    if (subtext) subtext.classList.add('mt-2.5');
    if (progressBarWrapper) {
      progressBarWrapper.classList.add('mt-4');
    }
  }
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
    const row = document.createElement('div');
    row.className = "group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50 border border-zinc-150 dark:bg-zinc-950 dark:border-zinc-850 rounded-2xl hover:border-indigo-500 transition-all duration-300 gap-4 shadow-sm";
    row.innerHTML = `<div class="flex items-start gap-3.5"><div class="p-2.5 rounded-xl shrink-0 mt-0.5 border ${isIncome ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'}">${isIncome ? '<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>' : '<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>'}</div><div class="space-y-1.5 min-w-0 pr-2"><h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 break-words text-left">${t.reason}</h4><div class="flex flex-wrap items-center gap-2 text-[8px] uppercase font-bold text-zinc-400 dark:text-zinc-500"><span class="font-mono">${t.date}</span><span class="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span><span class="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">${catDetails.label}</span>${t.personName ? `<span class="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span><span class="px-2 py-0.5 rounded bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 max-w-[130px] truncate">${t.personName}</span>` : ''}</div></div></div><div class="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 border-zinc-200 dark:border-zinc-850 pt-3 sm:pt-0"><span class="text-sm sm:text-base font-extrabold font-mono shrink-0 ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${isIncome ? '+' : '-'}${formatCurrency(t.amount)}</span><button type="button" onclick="deleteTransactionEntry('${t.id}')" class="p-2 text-zinc-400 hover:text-rose-500 dark:hover:bg-rose-500/10 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer focus:outline-none"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>`;
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

function updateAdvisoryWarning(balance, income, expenses) {
  const bar = document.getElementById('advisory-warning-bar'), text = document.getElementById('advisory-warning-text');
  if (!bar || !text) return;
  if (income > 0 && expenses > income) {
    text.innerText = `Danger! Current aggregated expenses (${formatCurrency(expenses)}) exceed Gross Incomes (${formatCurrency(income)}) by ${formatCurrency(expenses - income)}. Avoid non-essential outflows to safeguard treasury liquidity.`;
    bar.classList.remove('hidden');
  } else if (income > 0 && (expenses / income) >= 0.85) {
    text.innerText = `Warning: High leverage ratio detected. Outflows exceed 85% of Gross Incomes. Maintain tight budget limits to prevent asset stagnation.`;
    bar.classList.remove('hidden');
  } else {
    bar.classList.add('hidden');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `transform translate-y-2 opacity-0 pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-bold shadow-xl transition-all duration-300 ${
    type === 'success' ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/25' :
    type === 'error' ? 'bg-rose-500/10 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-500/25' :
    'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
  }`;
  
  let iconSvg = '';
  if (type === 'success') iconSvg = '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  else if (type === 'error') iconSvg = '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
  else iconSvg = '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>';

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);
  
  // Transition in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 50);

  // Transition out and destroy
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Bind handlers to window to ensure global availability across execution and compilation boundaries
window.setFormType = setFormType;
window.handleFormSubmit = handleFormSubmit;
window.deleteTransactionEntry = deleteTransactionEntry;
window.clearAllTransactions = clearAllTransactions;
window.triggerBackupFilePicker = triggerBackupFilePicker;
window.handleImportBackup = handleImportBackup;
window.handleExportBackup = handleExportBackup;
window.setChartTab = setChartTab;
window.setFilterType = setFilterType;
window.handleSearchFilterInput = handleSearchFilterInput;
window.showClearConfirmation = showClearConfirmation;
window.showToast = showToast;