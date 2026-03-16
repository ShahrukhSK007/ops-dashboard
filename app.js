/**
 * AI App 3.1 — Operations Dashboard (v4 Final)
 * Works OFFLINE with real data + LIVE with Google Sheets API
 * 
 * To connect live: paste your Google Apps Script Web App URL below.
 * Dashboard auto-refreshes every 60 seconds when connected.
 */

// ╔══════════════════════════════════════════════════════════╗
// ║  PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW        ║
// ╚══════════════════════════════════════════════════════════╝
const API_URL = 'https://script.google.com/macros/s/AKfycbwB_YNqJm64CXBeylOD0-ZKhnzJKrXa1sRWME2UoHqPwUb4MgbYkROA1Jh51iPdA4Y/exec';

// ─── REAL DATA FROM EXCEL FILES (Offline Fallback) ──────────

const OFFLINE_DATA = {
  preIssues: [
    {'S.No':1,'Agent No.':'Agent 7','Issue Title':'Incorrect Mapped Intent','Description':'Incorrect Mapped_intent generated on "Like" or reactive messages. Welcome_Text intent MUST only appear on Thank You or Thanks.','Image/PDF Link':'https://drive.google.com/file/d/1eA_s_2iMZuwp7p3Ccfvg3ga4ktG7QddU/view','Status':'Approved','Notes':'','Assigned To':'LEENA','Ticket Raised':'Yes','Date':'05/03/2026'},
    {'S.No':2,'Agent No.':'Agent 7','Issue Title':'Spanish Customer Translation on 3.1','Description':'Agents having difficulty handling Spanish customers. Need translation options in translator or chat window.','Image/PDF Link':'','Status':'Pending','Notes':'Bilal will clarify the scenario further.','Assigned To':'','Ticket Raised':'No','Date':'04/03/2026'},
    {'S.No':3,'Agent No.':'Agent 10','Issue Title':'Records not reflecting in AI app (3.1)','Description':'System not reflecting any records. Records must be properly displayed for agent accounts.','Image/PDF Link':'https://drive.google.com/file/d/1N4gin1Q-uNbSVX6Me7LpFLDNDlp78BSb/view','Status':'Approved','Notes':'','Assigned To':'CHAND','Ticket Raised':'Yes','Date':'04/03/2026'},
    {'S.No':4,'Agent No.':'Agent 7','Issue Title':'Incorrect Slot Booking Text & Spacing','Description':'Slot booking Text incorrect in AI App (3.1). Must display correct version with proper spacing.','Image/PDF Link':'','Status':'Approved','Notes':'','Assigned To':'CHAND','Ticket Raised':'Yes','Date':'05/03/2026'},
    {'S.No':5,'Agent No.':'Agent 7','Issue Title':'LETME Slot Generated but Not Available','Description':'After LETME slot confirmation reflects "unfortunately we do not have anything". Customer 7669482.','Image/PDF Link':'https://drive.google.com/file/d/1h_COCcT1bUN9FN8wRE8CqV8QR9DCuZ0-/view','Status':'Pending','Notes':'Holding - not consistent across agents.','Assigned To':'CHAND','Ticket Raised':'No','Date':'04/03/2026'},
    {'S.No':6,'Agent No.':'Agent 7','Issue Title':'Customer Details Editing & Reinitiate','Description':'No option to change customer mobile/name/email or reinitiate conversation.','Image/PDF Link':'','Status':'Pending','Notes':'','Assigned To':'','Ticket Raised':'No','Date':'06/03/2026'},
    {'S.No':7,'Agent No.':'Agent 7','Issue Title':'CR Date Time Visibility & VCP Status','Description':'CR Date/Time not appearing in all interactions. VCP true/false not available in automation.','Image/PDF Link':'https://drive.google.com/file/d/1_jbhsSoEwfWYX6TvaSls9eDVTNbDkVZg/view','Status':'Approved','Notes':'','Assigned To':'','Ticket Raised':'Yes','Date':'05/03/2026'},
    {'S.No':8,'Agent No.':'','Issue Title':'Incorrect Confirmation Date During Booking','Description':'Confirmation code generates with different dates creating inconsistency. Serious and urgent issue.','Image/PDF Link':'https://drive.google.com/file/d/1h_COCcT1bUN9FN8wRE8CqV8QR9DCuZ0-/view','Status':'Pending','Notes':'Holding - not consistent.','Assigned To':'','Ticket Raised':'No','Date':'05/03/2026'},
    {'S.No':9,'Agent No.':'','Issue Title':'G-UI Option for Different Model Service in MB','Description':'No G-UI option in MB for different model service requests.','Image/PDF Link':'','Status':'Pending','Notes':'','Assigned To':'','Ticket Raised':'No','Date':'05/03/2026'},
    {'S.No':10,'Agent No.':'','Issue Title':'Sold Date Not Reflecting on RSM Interactions','Description':'Sold Date showing as Null on all RSM interactions on AutoNation enterprises.','Image/PDF Link':'https://drive.google.com/file/d/1iqivb8atr_LBCJljKCba6khXfque-vGp/view','Status':'Approved','Notes':'','Assigned To':'CHAND','Ticket Raised':'Yes','Date':'06/03/2026'},
    {'S.No':11,'Agent No.':'','Issue Title':'Delivery Tick Mark on 3.1 App','Description':'Need delivery mark on messages sent by agent like 3.0 for confirmation.','Image/PDF Link':'https://drive.google.com/file/d/1KrB8YeW5ZFReiQ1btJcROTolycEiiPLr/view','Status':'Approved','Notes':'','Assigned To':'CHAND','Ticket Raised':'Yes','Date':'06/03/2026'},
    {'S.No':12,'Agent No.':'','Issue Title':'Customer & Vehicle Details at Top of Chat','Description':'Customer/vehicle details not at top of chat window in 3.1. Need edit option too.','Image/PDF Link':'https://drive.google.com/file/d/1w-NWwvVFRnrOZe69qQW6aIaiwk4NKgbe/view','Status':'Approved','Notes':'','Assigned To':'','Ticket Raised':'Yes','Date':'06/03/2026'},
    {'S.No':13,'Agent No.':'','Issue Title':'Lead At Risk Screen on 3.1 App','Description':'Need Lead At Risk screen so agent finds pending conversations at a glance.','Image/PDF Link':'https://drive.google.com/file/d/1IJOG5fHmRiSQbePMgQyJh-vkHkNFkcKs/view','Status':'Pending','Notes':'','Assigned To':'','Ticket Raised':'No','Date':'07/03/2026'},
    {'S.No':14,'Agent No.':'','Issue Title':'Follow-Up Not Scheduling on Interactions','Description':'Follow-up not scheduling on 2nd text, Transport, Date/Time, Duration, Status Busy, Slot.','Image/PDF Link':'','Status':'Approved','Notes':'','Assigned To':'','Ticket Raised':'Yes','Date':'07/03/2026'}
  ],
  intents: [
    {Timestamp:'12/03/2026 20:54',ID:'7399456',Problem:'Missing Intent',Description:'',Image:'https://drive.google.com/file/d/1CrB0r4haPuY-lGDJ01m00h6qp0qFCcPz/view',PDF:'https://drive.google.com/file/d/1zeHqQ3RYuyISVGWEHjdrW-weMXcqHT89/view',Status:'Pending'},
    {Timestamp:'12/03/2026 21:48',ID:'4836648',Problem:'Missing Intent',Description:'',Image:'https://drive.google.com/file/d/1zGQSJuhzmVAtOWfvhQEyJSomi0kNW4uh/view',PDF:'https://drive.google.com/file/d/14RmsQKV3ZjXci9vb17RYggGwvdlTm8bX/view',Status:'Pending'},
    {Timestamp:'12/03/2026 21:48',ID:'7359158',Problem:'Missing Intent',Description:'',Image:'https://drive.google.com/file/d/16JMGM0wgs1FsgNGBeJCDF89296OpZC0B/view',PDF:'https://drive.google.com/file/d/1HUb8Guhw5W-Uo61jgn42Q_N7PGS7mF4l/view',Status:'Pending'},
    {Timestamp:'12/03/2026 21:48',ID:'7398747',Problem:'Incorrect Intent',Description:'',Image:'https://drive.google.com/file/d/1daAMUI92xNytyBB8Wrzv343gGmVhPhOH/view',PDF:'https://drive.google.com/file/d/1yhmUOPv9BCT5XBfkGzpBEbcG-yrre5-U/view',Status:'Pending'},
    {Timestamp:'12/03/2026 21:48',ID:'4835412',Problem:'Missing Intent',Description:'',Image:'https://drive.google.com/file/d/1mmpY21Hz9siidWZ8sJaTGtn4j3v3kAO9/view',PDF:'https://drive.google.com/file/d/1HUmrePpNWwJNee9XKOkE_NCZ-VOq04Dz/view',Status:'Pending'},
    {Timestamp:'12/03/2026 21:48',ID:'4526947',Problem:'Missing Intent',Description:'',Image:'https://drive.google.com/file/d/1kbWVAxOqN-g8u4hqMexI_7ufI_vwArA5/view',PDF:'https://drive.google.com/file/d/1qzGav4Bb5uM8c_jODQY9IbquY-U0KWS4/view',Status:'Pending'},
    {Timestamp:'13/03/2026 01:33',ID:'3876424',Problem:'Incorrect Intent',Description:'Should suggest Store location',Image:'https://drive.google.com/file/d/1oCaUKskzozgubKaESAltUZz7MnAPzVLo/view',PDF:'https://drive.google.com/file/d/1QeRHE3qKYLxOxNe9CsftEpIdUP3IhAYC/view',Status:'Pending'},
    {Timestamp:'13/03/2026 21:58',ID:'6126444',Problem:'Incorrect Intent',Description:'Should show take your time in next service',Image:'https://drive.google.com/file/d/1oEtZdNRTlecRogfGf6HcuGUZH556VUhg/view',PDF:'https://drive.google.com/file/d/1UbBdmhUmOE1yijOfyFq0GISA2jKvD2vY/view',Status:'Pending'}
  ],
  syncs: [
    {'S.No':1,BOC:'TX500','Store Name':'Group 1 Toyota Fort Bend','Data Group':'SERVICE_CLOSED','Records Count':10648,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':'',BOC:'',  'Store Name':'','Data Group':'SERVICE_DETAIL_CLOSED','Records Count':-1,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'No'},
    {'S.No':2,BOC:'TX500','Store Name':'Group 1 Toyota SW Houston','Data Group':'SERVICE_CLOSED','Records Count':12746,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':'',BOC:'',  'Store Name':'','Data Group':'SERVICE_DETAIL_CLOSED','Records Count':-1,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'No'},
    {'S.No':3,BOC:'TX500','Store Name':'Sterling McCall Honda','Data Group':'SERVICE_CLOSED','Records Count':5025,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':'',BOC:'',  'Store Name':'','Data Group':'SERVICE_DETAIL_CLOSED','Records Count':-1,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'No'},
    {'S.No':4,BOC:'TX500','Store Name':'Group 1 Hyundai SW Houston','Data Group':'SERVICE_CLOSED','Records Count':3826,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':5,BOC:'TX500','Store Name':'Group 1 Ford SW Houston','Data Group':'SERVICE_CLOSED','Records Count':2244,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':6,BOC:'TX500','Store Name':'Group 1 Chevrolet Spring','Data Group':'SERVICE_CLOSED','Records Count':4545,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':7,BOC:'TX500','Store Name':'Lexus Southwest Houston','Data Group':'SERVICE_CLOSED','Records Count':9894,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':8,BOC:'TX500','Store Name':'Lexus Clear Lake','Data Group':'SERVICE_CLOSED','Records Count':5472,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':'',BOC:'',  'Store Name':'','Data Group':'SERVICE_DETAIL_CLOSED','Records Count':19215,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':9,BOC:'TX500','Store Name':'Sterling McCall Acura','Data Group':'SERVICE_CLOSED','Records Count':2040,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':10,BOC:'TX500','Store Name':'Group 1 Nissan SW Houston','Data Group':'SERVICE_CLOSED','Records Count':4649,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':11,BOC:'TX500','Store Name':'BMW of Houston Midtown','Data Group':'SERVICE_CLOSED','Records Count':5306,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':12,BOC:'TX500','Store Name':'BMW of Clear Lake & MINI','Data Group':'SERVICE_CLOSED','Records Count':3463,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':13,BOC:'TX500','Store Name':'Group 1 GMC Southwest','Data Group':'SERVICE_CLOSED','Records Count':2791,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':14,BOC:'TX500','Store Name':'Mercedes-Benz Clear Lake','Data Group':'SERVICE_CLOSED','Records Count':3579,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':15,BOC:'TX500','Store Name':'Sterling McCall Acura SL','Data Group':'SERVICE_CLOSED','Records Count':1677,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':16,BOC:'TX500','Store Name':'Group 1 Buick GMC North','Data Group':'SERVICE_CLOSED','Records Count':4723,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':17,BOC:'TX500','Store Name':'Group 1 Buick GMC South','Data Group':'SERVICE_CLOSED','Records Count':3559,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':18,BOC:'TX500','Store Name':'GP1 GMC Coastal Bend','Data Group':'SERVICE_CLOSED','Records Count':1025,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':19,BOC:'TX500','Store Name':'Beck & Masten Kia','Data Group':'SERVICE_CLOSED','Records Count':1998,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'},
    {'S.No':20,BOC:'CA700','Store Name':'Folsom Lake Toyota','Data Group':'SERVICE_CLOSED','Records Count':8163,'Sync Date':'Dec 30 2025 - Feb 27 2026','Sync Status':'Yes'}
  ],
  stores: [
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation CDJR South Columbus','Interaction Type':'CDJR_5K_New','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation CDJR Columbus','Interaction Type':'CDJR_5K_New','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'No',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Ford Lincoln Wolfchase','Interaction Type':'FORD_5K_New','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:'Car wash mentioned but missing from Service Includes'},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Honda West Knoxville','Interaction Type':'HONDA_7500_New','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Honda 385','Interaction Type':'HONDA_7500_New','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Honda Columbus','Interaction Type':'HONDA_7500_NEW','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Honda Thornton Rd','Interaction Type':'HONDA_7500_NEW','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Honda Covington Pike','Interaction Type':'HONDA_7500_NEW','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:'First text need to review'},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Hyundai Mall of GA','Interaction Type':'HYUNDAI_7500_NEW','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Hyundai Hilton Head','Interaction Type':'HYUNDAI_7500_NEW','Service Cost':'Yes',Shuttle:'Yes','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:''},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Hyundai Columbus','Interaction Type':'HYUNDAI_7500_NEW','Service Cost':'Yes',Shuttle:'No','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:'Early drop off full stop missing'},
    {'BOC ID':'MK07-SEC','Dealer Name':'AutoNation Hyundai Columbia','Interaction Type':'HYUNDAI_7500_NEW','Service Cost':'Yes',Shuttle:'No','Car Wash':'Yes',Rental:'Yes',Loaner:'Yes',Lyft:'Yes',Notes:'Early drop off full stop missing'}
  ]
};

// ─── State ──────────────────────────────────────────────────
let preIssues = [], intents = [], syncs = [], stores = [];
let charts = {};

// ─── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCharts();
  setupEvents();
  
  if (API_URL !== 'PASTE_YOUR_WEB_APP_URL_HERE') {
    fetchData();
  } else {
    // Use offline data
    preIssues = OFFLINE_DATA.preIssues;
    intents = OFFLINE_DATA.intents;
    syncs = OFFLINE_DATA.syncs;
    stores = OFFLINE_DATA.stores;
    render();
    document.getElementById('lastSync').textContent = 'Offline Mode';
  }
});

// ─── Fetch Live Data ────────────────────────────────────────
async function fetchData() {
  document.getElementById('lastSync').textContent = '🔄 Loading...';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    preIssues = data.preIssues || [];
    intents = data.intents || [];
    syncs = data.syncs || [];
    stores = data.stores || [];
    render();
    document.getElementById('lastSync').textContent = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) + ' ✅ Live';
  } catch(e) {
    console.error(e);
    // Fallback to offline
    preIssues = OFFLINE_DATA.preIssues;
    intents = OFFLINE_DATA.intents;
    syncs = OFFLINE_DATA.syncs;
    stores = OFFLINE_DATA.stores;
    render();
    document.getElementById('lastSync').innerHTML = '<span style="color:#f59e0b">⚠️ Offline Mode</span>';
  }
}

function render() {
  // Initialize filtered arrays with full data
  filteredPreIssues = preIssues.slice();
  filteredIntents = intents.slice();
  filteredSyncs = syncs.slice();
  filteredStores = stores.slice();
  
  updateKPIs();
  updateChartsData();
  populateTables();
  populateAgents();
  populateRecentActivity();
}

// ─── KPIs ───────────────────────────────────────────────────
function updateKPIs() {
  const pending = preIssues.filter(t => t.Status === 'Pending').length;
  const approved = preIssues.filter(t => t.Status === 'Approved').length;
  const raised = preIssues.filter(t => t['Ticket Raised'] === 'Yes').length;
  const synced = syncs.filter(s => s['Sync Status'] === 'Yes').length;
  const syncFail = syncs.filter(s => s['Sync Status'] === 'No').length;
  
  animateCounter('kpiTotal', preIssues.length);
  animateCounter('kpiPending', pending);
  animateCounter('kpiApproved', approved);
  animateCounter('kpiIntent', intents.length);
  animateCounter('kpiTicketsRaised', raised);
  animateCounter('kpiSynced', synced);
  animateCounter('kpiStores', stores.length);
  animateCounter('kpiSyncFail', syncFail);
  
  document.getElementById('navBadgePreIssue').textContent = preIssues.length;
  document.getElementById('navBadgeIntent').textContent = intents.length;
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  const current = parseInt(el.textContent) || 0;
  if (current === target) { el.textContent = target; return; }
  let start = 0;
  const duration = 800;
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ─── Navigation ─────────────────────────────────────────────
function initNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.tab-content');
  const titles = {'dashboard':'Operations Dashboard','pre-issues':'AI Pre-Issue Tickets','intents':'Intent Problems','sync-verify':'Sync Verification','store-check':'Store Template Check'};

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.dataset.tab;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      tabs.forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + id).classList.add('active');
      document.getElementById('pageTitle').textContent = titles[id] || 'Dashboard';
      document.getElementById('sidebar').classList.remove('open');
    });
  });
  document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
}

// ─── Charts ─────────────────────────────────────────────────
function initCharts() {
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = 'rgba(30,41,59,0.5)';
  Chart.defaults.font.family = "'Inter', sans-serif";

  charts.status = new Chart(document.getElementById('statusPieChart'), {type:'doughnut',data:{labels:['Pending','Approved','Sent to Dev','Resolved','On Hold'],datasets:[{data:[0,0,0,0,0],backgroundColor:['#f59e0b','#3b82f6','#8b5cf6','#10b981','#ef4444'],borderColor:'#1a1f35',borderWidth:3,hoverOffset:8}]},options:{cutout:'65%',responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:14,usePointStyle:true,pointStyleWidth:8,font:{size:11}}}},animation:{duration:1200,easing:'easeOutQuart'}}});
  
  charts.intent = new Chart(document.getElementById('intentBarChart'), {type:'bar',data:{labels:['Missing Intent','Incorrect Intent'],datasets:[{data:[0,0],backgroundColor:['rgba(245,158,11,0.7)','rgba(239,68,68,0.7)'],borderColor:['#f59e0b','#ef4444'],borderWidth:1,borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:11}}},y:{beginAtZero:true,grid:{color:'rgba(30,41,59,0.3)'},ticks:{stepSize:1,font:{size:11}}}},animation:{duration:1000,easing:'easeOutQuart'}}});
  
  charts.sync = new Chart(document.getElementById('syncStatusChart'), {type:'doughnut',data:{labels:['Synced','Failed'],datasets:[{data:[0,0],backgroundColor:['#10b981','#ef4444'],borderColor:'#1a1f35',borderWidth:3,hoverOffset:8}]},options:{cutout:'65%',responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:14,usePointStyle:true,pointStyleWidth:8,font:{size:11}}}},animation:{duration:1200,easing:'easeOutQuart'}}});
  
  charts.agent = new Chart(document.getElementById('agentIssuesChart'), {type:'bar',data:{labels:[],datasets:[{data:[],backgroundColor:['rgba(99,102,241,0.7)','rgba(6,182,212,0.7)'],borderColor:['#6366f1','#06b6d4'],borderWidth:1,borderRadius:6,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,ticks:{stepSize:1,font:{size:11}},grid:{color:'rgba(30,41,59,0.3)'}},y:{grid:{display:false},ticks:{font:{size:12,weight:'600'}}}},animation:{duration:1000,easing:'easeOutQuart'}}});
}

function updateChartsData() {
  const pending = preIssues.filter(t => t.Status === 'Pending').length;
  const approved = preIssues.filter(t => t.Status === 'Approved').length;
  const sentDev = preIssues.filter(t => t.Status === 'Sent to Dev').length;
  const resolved = preIssues.filter(t => t.Status === 'Resolved').length;
  const onHold = preIssues.filter(t => t.Status === 'On Hold').length;
  
  charts.status.data.datasets[0].data = [pending,approved,sentDev,resolved,onHold];
  charts.status.update();

  const missing = intents.filter(i => i.Problem === 'Missing Intent').length;
  const incorrect = intents.filter(i => (i.Problem||'').toLowerCase().includes('incorrect')).length;
  charts.intent.data.datasets[0].data = [missing,incorrect];
  charts.intent.update();

  const synced = syncs.filter(s => s['Sync Status'] === 'Yes').length;
  const failed = syncs.filter(s => s['Sync Status'] === 'No').length;
  charts.sync.data.datasets[0].data = [synced,failed];
  charts.sync.update();

  const ac = {};
  preIssues.forEach(t => { const a = t['Agent No.']; if (a) ac[a] = (ac[a]||0)+1; });
  charts.agent.data.labels = Object.keys(ac);
  charts.agent.data.datasets[0].data = Object.values(ac);
  charts.agent.data.datasets[0].backgroundColor = Object.keys(ac).map((_,i) => ['rgba(99,102,241,0.7)','rgba(6,182,212,0.7)'][i%2]);
  charts.agent.data.datasets[0].borderColor = Object.keys(ac).map((_,i) => ['#6366f1','#06b6d4'][i%2]);
  charts.agent.update();
}

// ─── Status Badge ───────────────────────────────────────────
function badge(s) {
  const m = {'Pending':'badge-pending','Approved':'badge-approved','Sent to Dev':'badge-dev','Resolved':'badge-resolved','On Hold':'badge-onhold','Under Review':'badge-review','Missing Intent':'badge-pending','Incorrect Intent':'badge-open','Yes':'badge-resolved','No':'badge-open'};
  return `<span class="badge ${m[s]||'badge-pending'}">${s||'—'}</span>`;
}

// ─── Tables ─────────────────────────────────────────────────
function populateTables() {
  // Dashboard summary
  document.getElementById('dashTicketsBody').innerHTML = preIssues.map(t => `<tr>
    <td style="color:var(--text-accent);font-weight:600">${t['S.No']||''}</td>
    <td>${t['Agent No.']||'—'}</td>
    <td style="max-width:250px;white-space:normal">${t['Issue Title']||''}</td>
    <td>${badge(t.Status)}</td>
    <td>${t['Assigned To']||'—'}</td>
    <td>${t['Ticket Raised']==='Yes'?'✅':'❌'}</td>
    <td>${t.Date||''}</td>
  </tr>`).join('');

  // Full Pre-Issue tab
  document.getElementById('preIssuesBody').innerHTML = preIssues.map(t => `<tr>
    <td>${t['S.No']||''}</td><td>${t['Agent No.']||'—'}</td>
    <td style="max-width:200px;white-space:normal">${t['Issue Title']||''}</td>
    <td style="max-width:300px;white-space:normal">${t.Description||''}</td>
    <td>${t['Image/PDF Link']?`<a href="${t['Image/PDF Link']}" target="_blank" style="color:var(--accent-primary)">📎 View</a>`:'—'}</td>
    <td>${badge(t.Status)}</td>
    <td style="max-width:200px;white-space:normal">${t.Notes||'—'}</td>
    <td>${t['Assigned To']||'—'}</td>
    <td>${t['Ticket Raised']==='Yes'?'✅':'❌'}</td>
    <td>${t.Date||''}</td>
  </tr>`).join('');

  // Intent Problems
  document.getElementById('intentBody').innerHTML = intents.map(i => `<tr>
    <td>${i.Timestamp||''}</td><td style="color:var(--text-accent);font-weight:600">${i.ID||''}</td>
    <td>${badge(i.Problem)}</td>
    <td style="max-width:250px;white-space:normal">${i.Description||'—'}</td>
    <td>${i.Image?`<a href="${i.Image}" target="_blank" style="color:var(--accent-primary)">📸 View</a>`:'—'}</td>
    <td>${i.PDF?`<a href="${i.PDF}" target="_blank" style="color:var(--accent-primary)">📄 View</a>`:'—'}</td>
    <td>${badge(i.Status)}</td>
  </tr>`).join('');

  // Sync Verification
  document.getElementById('syncBody').innerHTML = syncs.map(s => `<tr class="${s['Sync Status']==='No'?'row-danger':''}">
    <td style="font-weight:${s['S.No']?'600':'400'}">${s['S.No']||''}</td><td>${s.BOC||''}</td><td>${s['Store Name']||''}</td>
    <td><span class="data-group-tag ${s['Data Group']==='SERVICE_DETAIL_CLOSED'?'detail':'service'}">${s['Data Group']||''}</span></td>
    <td style="text-align:right;font-weight:600;color:${s['Records Count']<0?'var(--color-red)':'inherit'}">${typeof s['Records Count']==='number'?s['Records Count'].toLocaleString():s['Records Count']}</td>
    <td>${s['Sync Date']||''}</td>
    <td>${badge(s['Sync Status'])}</td>
  </tr>`).join('');

  // Store Template Check
  document.getElementById('storeCheckBody').innerHTML = stores.map(s => `<tr>
    <td>${s['BOC ID']||''}</td><td style="font-weight:${s['Dealer Name']?'600':'400'}">${s['Dealer Name']||''}</td><td>${s['Interaction Type']||''}</td>
    <td>${s['Service Cost']==='Yes'?'✅':s['Service Cost']==='No'?'❌':'—'}</td>
    <td>${s.Shuttle==='Yes'?'✅':s.Shuttle==='No'?'❌':'—'}</td>
    <td>${s['Car Wash']==='Yes'?'✅':s['Car Wash']==='No'?'❌':'—'}</td>
    <td>${s.Rental==='Yes'?'✅':s.Rental==='No'?'❌':'—'}</td>
    <td>${s.Loaner==='Yes'?'✅':s.Loaner==='No'?'❌':'—'}</td>
    <td>${s.Lyft==='Yes'?'✅':s.Lyft==='No'?'❌':'—'}</td>
    <td style="max-width:200px;white-space:normal;color:${s.Notes?'var(--color-orange)':'inherit'}">${s.Notes||'—'}</td>
  </tr>`).join('');
}

// ─── Recent Activity Feed ───────────────────────────────────
function populateRecentActivity() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  
  // Combine all recent items, sorted by date
  const activities = [];
  preIssues.forEach(t => {
    activities.push({
      icon: t.Status === 'Approved' ? '✅' : '⏳',
      text: `<strong>${t['Agent No.']||'System'}</strong> reported: ${t['Issue Title']}`,
      status: t.Status,
      date: t.Date || '',
      type: 'issue'
    });
  });
  intents.slice(0,3).forEach(i => {
    activities.push({
      icon: '💬',
      text: `Intent problem <strong>#${i.ID}</strong>: ${i.Problem}`,
      status: i.Status,
      date: i.Timestamp ? i.Timestamp.split(' ')[0] : '',
      type: 'intent'
    });
  });
  
  feed.innerHTML = activities.slice(0,8).map(a => `
    <div class="activity-item">
      <div class="activity-icon">${a.icon}</div>
      <div class="activity-content">
        <div class="activity-text">${a.text}</div>
        <div class="activity-meta">${badge(a.status)} · ${a.date}</div>
      </div>
    </div>
  `).join('');
}

// ─── Agent Activity ─────────────────────────────────────────
function populateAgents() {
  const colors = ['#6366f1','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#06b6d4'];
  const ac = {};
  preIssues.forEach(t => { const a = t['Agent No.']; if (a) ac[a] = (ac[a]||0)+1; });
  
  document.getElementById('agentList').innerHTML = Object.entries(ac).sort((a,b)=>b[1]-a[1]).map(([name,count],i) => `
    <div class="agent-item">
      <div class="agent-avatar" style="background:${colors[i%colors.length]}">${name.replace('Agent ','A')}</div>
      <div class="agent-info"><div class="agent-name">${name}</div><div class="agent-stats">${count} issues · ${preIssues.filter(t=>t['Agent No.']===name && t['Ticket Raised']==='Yes').length} tickets raised</div></div>
      <div style="text-align:right"><div style="font-size:1.4rem;font-weight:700;color:var(--text-accent)">${count}</div><div style="font-size:0.65rem;color:var(--text-muted)">issues</div></div>
    </div>`).join('');
}

// ─── Date Parsing Helper ────────────────────────────────────
function parseDate(dateStr) {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  dateStr = String(dateStr).trim();
  
  // Try dd/MM/yyyy format 
  var parts = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (parts) return new Date(parts[3], parts[2] - 1, parts[1]);
  
  // Try yyyy-MM-dd (ISO)
  parts = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (parts) return new Date(parts[1], parts[2] - 1, parts[3]);
  
  // Fallback
  var d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

// ─── Global Filter State ────────────────────────────────────
let filteredPreIssues = [], filteredIntents = [], filteredSyncs = [], filteredStores = [];

function applyFilters() {
  const q = (document.getElementById('searchInput').value || '').toLowerCase();
  const fromVal = document.getElementById('dateFrom').value;
  const toVal = document.getElementById('dateTo').value;
  const fromDate = fromVal ? new Date(fromVal) : null;
  const toDate = toVal ? new Date(toVal + 'T23:59:59') : null;
  
  // Filter Pre-Issues by search + date
  filteredPreIssues = preIssues.filter(t => {
    if (q) {
      const text = Object.values(t).join(' ').toLowerCase();
      if (!text.includes(q)) return false;
    }
    if (fromDate || toDate) {
      const d = parseDate(t.Date);
      if (!d) return false;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
    }
    return true;
  });
  
  // Filter Intents by search + date
  filteredIntents = intents.filter(i => {
    if (q) {
      const text = Object.values(i).join(' ').toLowerCase();
      if (!text.includes(q)) return false;
    }
    if (fromDate || toDate) {
      const d = parseDate(i.Timestamp);
      if (!d) return false;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
    }
    return true;
  });
  
  // Filter Syncs by search (no date field)
  filteredSyncs = syncs.filter(s => {
    if (q) {
      const text = Object.values(s).join(' ').toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
  
  // Filter Stores by search (no date field)
  filteredStores = stores.filter(s => {
    if (q) {
      const text = Object.values(s).join(' ').toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
  
  // Re-render everything with filtered data
  renderFiltered();
}

function renderFiltered() {
  updateKPIsFiltered();
  updateChartsFiltered();
  populateTablesFiltered();
  populateAgentsFiltered();
  populateRecentActivity();
}

function updateKPIsFiltered() {
  const pending = filteredPreIssues.filter(t => t.Status === 'Pending').length;
  const approved = filteredPreIssues.filter(t => t.Status === 'Approved').length;
  const raised = filteredPreIssues.filter(t => t['Ticket Raised'] === 'Yes').length;
  const synced = filteredSyncs.filter(s => s['Sync Status'] === 'Yes').length;
  const syncFail = filteredSyncs.filter(s => s['Sync Status'] === 'No').length;
  
  animateCounter('kpiTotal', filteredPreIssues.length);
  animateCounter('kpiPending', pending);
  animateCounter('kpiApproved', approved);
  animateCounter('kpiIntent', filteredIntents.length);
  animateCounter('kpiTicketsRaised', raised);
  animateCounter('kpiSynced', synced);
  animateCounter('kpiStores', filteredStores.length);
  animateCounter('kpiSyncFail', syncFail);
  
  document.getElementById('navBadgePreIssue').textContent = filteredPreIssues.length;
  document.getElementById('navBadgeIntent').textContent = filteredIntents.length;
}

function updateChartsFiltered() {
  const pending = filteredPreIssues.filter(t => t.Status === 'Pending').length;
  const approved = filteredPreIssues.filter(t => t.Status === 'Approved').length;
  const sentDev = filteredPreIssues.filter(t => t.Status === 'Sent to Dev').length;
  const resolved = filteredPreIssues.filter(t => t.Status === 'Resolved').length;
  const onHold = filteredPreIssues.filter(t => t.Status === 'On Hold').length;
  charts.status.data.datasets[0].data = [pending,approved,sentDev,resolved,onHold];
  charts.status.update();

  const missing = filteredIntents.filter(i => i.Problem === 'Missing Intent').length;
  const incorrect = filteredIntents.filter(i => (i.Problem||'').toLowerCase().includes('incorrect')).length;
  charts.intent.data.datasets[0].data = [missing,incorrect];
  charts.intent.update();

  const synced = filteredSyncs.filter(s => s['Sync Status'] === 'Yes').length;
  const failed = filteredSyncs.filter(s => s['Sync Status'] === 'No').length;
  charts.sync.data.datasets[0].data = [synced,failed];
  charts.sync.update();

  const ac = {};
  filteredPreIssues.forEach(t => { const a = t['Agent No.']; if (a) ac[a] = (ac[a]||0)+1; });
  charts.agent.data.labels = Object.keys(ac);
  charts.agent.data.datasets[0].data = Object.values(ac);
  charts.agent.data.datasets[0].backgroundColor = Object.keys(ac).map((_,i) => ['rgba(99,102,241,0.7)','rgba(6,182,212,0.7)'][i%2]);
  charts.agent.data.datasets[0].borderColor = Object.keys(ac).map((_,i) => ['#6366f1','#06b6d4'][i%2]);
  charts.agent.update();
}

function populateTablesFiltered() {
  // Dashboard summary
  document.getElementById('dashTicketsBody').innerHTML = filteredPreIssues.length ? filteredPreIssues.map(t => `<tr>
    <td style="color:var(--text-accent);font-weight:600">${t['S.No']||''}</td>
    <td>${t['Agent No.']||'—'}</td>
    <td style="max-width:250px;white-space:normal">${t['Issue Title']||''}</td>
    <td>${badge(t.Status)}</td>
    <td>${t['Assigned To']||'—'}</td>
    <td>${t['Ticket Raised']==='Yes'?'✅':'❌'}</td>
    <td>${t.Date||''}</td>
  </tr>`).join('') : '<tr><td colspan="7" class="no-results">No matching issues found</td></tr>';

  // Full Pre-Issue tab
  document.getElementById('preIssuesBody').innerHTML = filteredPreIssues.length ? filteredPreIssues.map(t => `<tr>
    <td>${t['S.No']||''}</td><td>${t['Agent No.']||'—'}</td>
    <td style="max-width:200px;white-space:normal">${t['Issue Title']||''}</td>
    <td style="max-width:300px;white-space:normal">${t.Description||''}</td>
    <td>${t['Image/PDF Link']?`<a href="${t['Image/PDF Link']}" target="_blank" style="color:var(--accent-primary)">📎 View</a>`:'—'}</td>
    <td>${badge(t.Status)}</td>
    <td style="max-width:200px;white-space:normal">${t.Notes||'—'}</td>
    <td>${t['Assigned To']||'—'}</td>
    <td>${t['Ticket Raised']==='Yes'?'✅':'❌'}</td>
    <td>${t.Date||''}</td>
  </tr>`).join('') : '<tr><td colspan="10" class="no-results">No matching tickets found</td></tr>';

  // Intent Problems
  document.getElementById('intentBody').innerHTML = filteredIntents.length ? filteredIntents.map(i => `<tr>
    <td>${i.Timestamp||''}</td><td style="color:var(--text-accent);font-weight:600">${i.ID||''}</td>
    <td>${badge(i.Problem)}</td>
    <td style="max-width:250px;white-space:normal">${i.Description||'—'}</td>
    <td>${i.Image?`<a href="${i.Image}" target="_blank" style="color:var(--accent-primary)">📸 View</a>`:'—'}</td>
    <td>${i.PDF?`<a href="${i.PDF}" target="_blank" style="color:var(--accent-primary)">📄 View</a>`:'—'}</td>
    <td>${badge(i.Status)}</td>
  </tr>`).join('') : '<tr><td colspan="7" class="no-results">No matching intent problems found</td></tr>';

  // Sync Verification
  document.getElementById('syncBody').innerHTML = filteredSyncs.length ? filteredSyncs.map(s => `<tr class="${s['Sync Status']==='No'?'row-danger':''}">
    <td style="font-weight:${s['S.No']?'600':'400'}">${s['S.No']||''}</td><td>${s.BOC||''}</td><td>${s['Store Name']||''}</td>
    <td><span class="data-group-tag ${s['Data Group']==='SERVICE_DETAIL_CLOSED'?'detail':'service'}">${s['Data Group']||''}</span></td>
    <td style="text-align:right;font-weight:600;color:${s['Records Count']<0?'var(--color-red)':'inherit'}">${typeof s['Records Count']==='number'?s['Records Count'].toLocaleString():s['Records Count']}</td>
    <td>${s['Sync Date']||''}</td>
    <td>${badge(s['Sync Status'])}</td>
  </tr>`).join('') : '<tr><td colspan="7" class="no-results">No matching sync records found</td></tr>';

  // Store Template Check
  document.getElementById('storeCheckBody').innerHTML = filteredStores.length ? filteredStores.map(s => `<tr>
    <td>${s['BOC ID']||''}</td><td style="font-weight:${s['Dealer Name']?'600':'400'}">${s['Dealer Name']||''}</td><td>${s['Interaction Type']||''}</td>
    <td>${s['Service Cost']==='Yes'?'✅':s['Service Cost']==='No'?'❌':'—'}</td>
    <td>${s.Shuttle==='Yes'?'✅':s.Shuttle==='No'?'❌':'—'}</td>
    <td>${s['Car Wash']==='Yes'?'✅':s['Car Wash']==='No'?'❌':'—'}</td>
    <td>${s.Rental==='Yes'?'✅':s.Rental==='No'?'❌':'—'}</td>
    <td>${s.Loaner==='Yes'?'✅':s.Loaner==='No'?'❌':'—'}</td>
    <td>${s.Lyft==='Yes'?'✅':s.Lyft==='No'?'❌':'—'}</td>
    <td style="max-width:200px;white-space:normal;color:${s.Notes?'var(--color-orange)':'inherit'}">${s.Notes||'—'}</td>
  </tr>`).join('') : '<tr><td colspan="10" class="no-results">No matching stores found</td></tr>';
}

function populateAgentsFiltered() {
  const colors = ['#6366f1','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#06b6d4'];
  const ac = {};
  filteredPreIssues.forEach(t => { const a = t['Agent No.']; if (a) ac[a] = (ac[a]||0)+1; });
  
  document.getElementById('agentList').innerHTML = Object.entries(ac).sort((a,b)=>b[1]-a[1]).map(([name,count],i) => `
    <div class="agent-item">
      <div class="agent-avatar" style="background:${colors[i%colors.length]}">${name.replace('Agent ','A')}</div>
      <div class="agent-info"><div class="agent-name">${name}</div><div class="agent-stats">${count} issues · ${filteredPreIssues.filter(t=>t['Agent No.']===name && t['Ticket Raised']==='Yes').length} tickets raised</div></div>
      <div style="text-align:right"><div style="font-size:1.4rem;font-weight:700;color:var(--text-accent)">${count}</div><div style="font-size:0.65rem;color:var(--text-muted)">issues</div></div>
    </div>`).join('') || '<div class="no-results">No agent activity found</div>';
}

// ─── Events ─────────────────────────────────────────────────
function setupEvents() {
  // Global search — debounced
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 250);
  });

  // Date range filter
  document.getElementById('dateFrom').addEventListener('change', applyFilters);
  document.getElementById('dateTo').addEventListener('change', applyFilters);
  
  // Clear date range
  document.getElementById('dateClearBtn').addEventListener('click', () => {
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    applyFilters();
  });

  // Status filter on dashboard
  document.getElementById('statusFilter').addEventListener('change', function() {
    const val = this.value;
    const filtered = val === 'all' ? filteredPreIssues : filteredPreIssues.filter(t => t.Status === val);
    document.getElementById('dashTicketsBody').innerHTML = filtered.length ? filtered.map(t => `<tr>
      <td style="color:var(--text-accent);font-weight:600">${t['S.No']||''}</td>
      <td>${t['Agent No.']||'—'}</td>
      <td style="max-width:250px;white-space:normal">${t['Issue Title']||''}</td>
      <td>${badge(t.Status)}</td>
      <td>${t['Assigned To']||'—'}</td>
      <td>${t['Ticket Raised']==='Yes'?'✅':'❌'}</td>
      <td>${t.Date||''}</td>
    </tr>`).join('') : '<tr><td colspan="7" class="no-results">No matching issues</td></tr>';
  });

  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', () => {
    if (API_URL !== 'PASTE_YOUR_WEB_APP_URL_HERE') fetchData();
    else { render(); document.getElementById('lastSync').textContent = 'Refreshed (Offline)'; }
  });

  // Auto-refresh every 60 seconds when connected
  setInterval(() => {
    if (API_URL !== 'PASTE_YOUR_WEB_APP_URL_HERE') fetchData();
  }, 60000);
}
