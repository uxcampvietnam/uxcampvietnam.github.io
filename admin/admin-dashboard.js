/**
 * UXCAMP VIETNAM — ADMIN DASHBOARD CONTROLLER
 */
window.ADMIN_CONFIG = {
	root: '../',
	activeTab: ''
};

window.addEventListener('adminReady', async (e) => {
	const db = e.detail.db;
	if (!db) return;
	try {
		const [u, c, co, cert, cs] = await Promise.all([
			db.collection('authorizedUsers').get(),
			db.collection('courses').get(),
			db.collection('cohorts').get(),
			db.collection('certificates').get(),
			db.collection('caseStudies').get()
		]);
		const elU = document.getElementById('dash-count-users');
		if (elU) elU.textContent = `${u.size} users`;
		const elC = document.getElementById('dash-count-courses');
		if (elC) elC.textContent = `${c.size} courses`;
		const elCo = document.getElementById('dash-count-cohorts');
		if (elCo) elCo.textContent = `${co.size} cohorts`;
		const elCert = document.getElementById('dash-count-certs');
		if (elCert) elCert.textContent = `${cert.size} certs`;
		const elCs = document.getElementById('dash-count-cases');
		if (elCs) elCs.textContent = `${cs.size} bài`;
	} catch (err) {
		console.warn('Dashboard stats error:', err);
	}
});
