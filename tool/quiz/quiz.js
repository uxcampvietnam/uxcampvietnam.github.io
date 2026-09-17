/**
 * ==========================================================================
 * UXCamp Vietnam — LMS & Quiz Platform Engine (quiz.js)
 * Fully featured BCNF LMS: Classroom Management, Roster Batch Enroll,
 * Quiz Curriculum, Gradebook Matrix, Real-time Playing, Host Analytics,
 * and Digital Certificates Issuance & Verification.
 * ==========================================================================
 */

(function () {
	'use strict';

	// ==========================================================================
	// 1. FIREBASE INITIALIZATION & CONFIG
	// ==========================================================================
	const firebaseConfig = {
		apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
		authDomain: "uxcampvn.firebaseapp.com",
		projectId: "uxcampvn",
		storageBucket: "uxcampvn.firebasestorage.app",
		messagingSenderId: "491407083539",
		appId: "1:491407083539:web:8c1635c421989082a397e6",
		measurementId: "G-NLJWC0L47K"
	};

	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	const auth = firebase.auth();
	const db = firebase.firestore();
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	googleProvider.setCustomParameters({ prompt: 'select_account' });

	// ==========================================================================
	// 2. GLOBAL APPLICATION STATE
	// ==========================================================================
	const state = {
		currentUser: null,
		userRole: 'member',
		currentTab: 'tabPlayer',
		quizzes: [],
		hostRooms: [],
		classes: [],
		activeWorkspaceClass: null,
		activeWorkspaceEnrollments: [],
		activeWorkspaceCurriculum: [],
		previewGridQuestions: [],
		editingQuizId: null,
		editingClassId: null,
		activePlayingSession: null,
		activeAnalyticsRoom: null,
		activeAnalyticsSubmissions: [],
		analyticsListenerUnsub: null,
		html5QrScanner: null
	};

	// Sample Questions for Fast Testing
	const sampleQuestionsData = [
		{
			question: "Phương pháp nào sau đây là phương pháp định tính (Qualitative Research) trong UX Research?",
			type: "MCQ",
			options: [
				{ key: "A", text: "Phỏng vấn sâu 1:1 (In-depth Interview)" },
				{ key: "B", text: "A/B Testing trên 10,000 người dùng" },
				{ key: "C", text: "Phân tích số liệu tỷ lệ chuyển đổi (Conversion Rate)" },
				{ key: "D", text: "Đo lường thời gian hoàn thành tác vụ qua Google Analytics" }
			],
			correctAnswers: ["A"],
			image: "",
			explanation: "Phỏng vấn sâu 1:1 giúp thấu hiểu động cơ, cảm xúc và lý do 'Tại sao' (Why) của người dùng.",
			points: 10
		},
		{
			question: "Trong 10 nguyên lý Usability Heuristics của Jakob Nielsen, những nguyên lý nào dưới đây là ĐÚNG? (Chọn nhiều đáp án)",
			type: "MSQ",
			options: [
				{ key: "A", text: "Hiển thị trạng thái hệ thống (Visibility of system status)" },
				{ key: "B", text: "Tự do và kiểm soát của người dùng (User control and freedom)" },
				{ key: "C", text: "Nhất quán và tuân thủ tiêu chuẩn (Consistency and standards)" },
				{ key: "D", text: "Ép buộc người dùng đăng ký trước khi xem nội dung" }
			],
			correctAnswers: ["A", "B", "C"],
			image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
			explanation: "A, B, C đều thuộc 10 nguyên lý kinh điển của Nielsen Norman Group.",
			points: 10
		},
		{
			question: "Chỉ số SUS (System Usability Scale) có thang điểm chuẩn trung bình là bao nhiêu?",
			type: "MCQ",
			options: [
				{ key: "A", text: "50 điểm" },
				{ key: "B", text: "68 điểm" },
				{ key: "C", text: "85 điểm" },
				{ key: "D", text: "100 điểm" }
			],
			correctAnswers: ["B"],
			image: "",
			explanation: "Điểm chuẩn trung bình của thang đo SUS là 68. Điểm trên 68 được coi là trên mức trung bình.",
			points: 10
		}
	];

	// ==========================================================================
	// 3. DOM ELEMENTS CACHE
	// ==========================================================================
	const DOM = {
		// Auth Gate
		authGate: document.getElementById('authGate'),
		authGateSpinner: document.getElementById('authGateSpinner'),
		authGateAction: document.getElementById('authGateAction'),
		btnGoogleLoginGate: document.getElementById('btnGoogleLoginGate'),

		// App Shell
		quizApp: document.getElementById('quizApp'),
		userDisplayName: document.getElementById('userDisplayName'),
		userRoleBadge: document.getElementById('userRoleBadge'),
		userAvatarImg: document.getElementById('userAvatarImg'),
		btnLogout: document.getElementById('btnLogout'),
		mainNavTabs: document.getElementById('mainNavTabs'),

		// Sections
		sections: {
			tabPlayer: document.getElementById('tabPlayer'),
			tabStudentClasses: document.getElementById('tabStudentClasses'),
			tabClassesHub: document.getElementById('tabClassesHub'),
			tabQuizBank: document.getElementById('tabQuizBank'),
			tabHostRooms: document.getElementById('tabHostRooms'),
			quizPlayScreen: document.getElementById('quizPlayScreen'),
			quizResultScreen: document.getElementById('quizResultScreen')
		},

		// Player Join View
		inputRoomPin: document.getElementById('inputRoomPin'),
		btnJoinRoomSubmit: document.getElementById('btnJoinRoomSubmit'),
		btnOpenScanner: document.getElementById('btnOpenScanner'),
		activeRoomsListContainer: document.getElementById('activeRoomsListContainer'),
		btnRefreshActiveRooms: document.getElementById('btnRefreshActiveRooms'),

		// Student Portal Sub-tabs & Views
		btnSubTabEnrolledClasses: document.getElementById('btnSubTabEnrolledClasses'),
		btnSubTabMyCertificates: document.getElementById('btnSubTabMyCertificates'),
		btnSubTabHistory: document.getElementById('btnSubTabHistory'),
		viewStudentEnrolledClasses: document.getElementById('viewStudentEnrolledClasses'),
		viewStudentCertificates: document.getElementById('viewStudentCertificates'),
		viewStudentHistory: document.getElementById('viewStudentHistory'),
		studentClassesListContainer: document.getElementById('studentClassesListContainer'),
		studentCertificatesListContainer: document.getElementById('studentCertificatesListContainer'),
		historyListContainer: document.getElementById('historyListContainer'),
		btnRefreshStudentClasses: document.getElementById('btnRefreshStudentClasses'),
		btnRefreshStudentCertificates: document.getElementById('btnRefreshStudentCertificates'),
		btnRefreshHistory: document.getElementById('btnRefreshHistory'),

		// LMS Classes Hub
		hostClassesListContainer: document.getElementById('hostClassesListContainer'),
		btnOpenCreateClassModal: document.getElementById('btnOpenCreateClassModal'),
		modalCreateClass: document.getElementById('modalCreateClass'),
		modalCreateClassTitle: document.getElementById('modalCreateClassTitle'),
		inputClassCode: document.getElementById('inputClassCode'),
		inputClassTitle: document.getElementById('inputClassTitle'),
		selectClassCourse: document.getElementById('selectClassCourse'),
		selectClassStatus: document.getElementById('selectClassStatus'),
		inputClassMinScore: document.getElementById('inputClassMinScore'),
		inputClassReqQuizzes: document.getElementById('inputClassReqQuizzes'),
		inputClassDesc: document.getElementById('inputClassDesc'),
		btnSaveClassToFirestore: document.getElementById('btnSaveClassToFirestore'),

		// Class Workspace Modal (Roster, Curriculum, Gradebook)
		modalClassWorkspace: document.getElementById('modalClassWorkspace'),
		wsClassCodeBadge: document.getElementById('wsClassCodeBadge'),
		wsClassTitle: document.getElementById('wsClassTitle'),
		wsClassSubtitle: document.getElementById('wsClassSubtitle'),
		tabBtnWsRoster: document.getElementById('tabBtnWsRoster'),
		tabBtnWsCurriculum: document.getElementById('tabBtnWsCurriculum'),
		tabBtnWsGradebook: document.getElementById('tabBtnWsGradebook'),
		viewWsRoster: document.getElementById('viewWsRoster'),
		viewWsCurriculum: document.getElementById('viewWsCurriculum'),
		viewWsGradebook: document.getElementById('viewWsGradebook'),
		rawRosterPasteInput: document.getElementById('rawRosterPasteInput'),
		btnBatchEnrollStudents: document.getElementById('btnBatchEnrollStudents'),
		tbodyClassRoster: document.getElementById('tbodyClassRoster'),
		classCurriculumListContainer: document.getElementById('classCurriculumListContainer'),
		btnOpenAssignQuizModal: document.getElementById('btnOpenAssignQuizModal'),
		gradebookMatrixContainer: document.getElementById('gradebookMatrixContainer'),
		btnExportClassGradebookCsv: document.getElementById('btnExportClassGradebookCsv'),

		// Assign Quiz Modal
		modalAssignQuiz: document.getElementById('modalAssignQuiz'),
		selectAssignQuizId: document.getElementById('selectAssignQuizId'),
		inputAssignOrder: document.getElementById('inputAssignOrder'),
		inputAssignPassingScore: document.getElementById('inputAssignPassingScore'),
		checkAssignRequired: document.getElementById('checkAssignRequired'),
		btnSubmitAssignQuiz: document.getElementById('btnSubmitAssignQuiz'),

		// Issue Certificate Modal
		modalIssueCert: document.getElementById('modalIssueCert'),
		inputIssueStudentName: document.getElementById('inputIssueStudentName'),
		inputIssueStudentEmail: document.getElementById('inputIssueStudentEmail'),
		selectIssueGrade: document.getElementById('selectIssueGrade'),
		inputIssueCertId: document.getElementById('inputIssueCertId'),
		inputIssueSigner: document.getElementById('inputIssueSigner'),
		btnSubmitIssueCert: document.getElementById('btnSubmitIssueCert'),

		// Digital Certificate Viewer Modal
		modalDigitalCertViewer: document.getElementById('modalDigitalCertViewer'),
		viewCertRecipientName: document.getElementById('viewCertRecipientName'),
		viewCertCourseName: document.getElementById('viewCertCourseName'),
		viewCertGradeBadge: document.getElementById('viewCertGradeBadge'),
		viewCertIdCode: document.getElementById('viewCertIdCode'),
		viewCertIssuedDate: document.getElementById('viewCertIssuedDate'),
		viewCertQrCanvas: document.getElementById('viewCertQrCanvas'),
		viewCertSigner: document.getElementById('viewCertSigner'),
		btnViewCertOnLookup: document.getElementById('btnViewCertOnLookup'),

		// Quiz Bank View & Modal
		quizBankListContainer: document.getElementById('quizBankListContainer'),
		btnOpenCreateQuizModal: document.getElementById('btnOpenCreateQuizModal'),
		modalCreateQuiz: document.getElementById('modalCreateQuiz'),
		quizModalTitle: document.getElementById('quizModalTitle'),
		inputQuizTitle: document.getElementById('inputQuizTitle'),
		inputQuizDesc: document.getElementById('inputQuizDesc'),
		tabBtnSheetImport: document.getElementById('tabBtnSheetImport'),
		tabBtnManualEditor: document.getElementById('tabBtnManualEditor'),
		viewSheetImport: document.getElementById('viewSheetImport'),
		viewManualEditor: document.getElementById('viewManualEditor'),
		rawSheetTextarea: document.getElementById('rawSheetTextarea'),
		btnTriggerCsvUpload: document.getElementById('btnTriggerCsvUpload'),
		inputCsvFile: document.getElementById('inputCsvFile'),
		btnFillSampleQuestions: document.getElementById('btnFillSampleQuestions'),
		btnDownloadTemplateCsv: document.getElementById('btnDownloadTemplateCsv'),
		gridQuestionCountBadge: document.getElementById('gridQuestionCountBadge'),
		btnAddGridRow: document.getElementById('btnAddGridRow'),
		tablePreviewGrid: document.getElementById('tablePreviewGrid'),
		tbodyPreviewGrid: document.getElementById('tbodyPreviewGrid'),
		manualQuestionsList: document.getElementById('manualQuestionsList'),
		btnAddManualQuestion: document.getElementById('btnAddManualQuestion'),
		btnSaveQuizToFirestore: document.getElementById('btnSaveQuizToFirestore'),

		// Host Live Room Manager & Modals
		hostRoomsListContainer: document.getElementById('hostRoomsListContainer'),
		btnOpenCreateRoomModal: document.getElementById('btnOpenCreateRoomModal'),
		modalCreateRoom: document.getElementById('modalCreateRoom'),
		selectRoomQuiz: document.getElementById('selectRoomQuiz'),
		selectRoomClass: document.getElementById('selectRoomClass'),
		inputRoomName: document.getElementById('inputRoomName'),
		inputRoomTimeLimit: document.getElementById('inputRoomTimeLimit'),
		checkShuffleQ: document.getElementById('checkShuffleQ'),
		checkShuffleOpt: document.getElementById('checkShuffleOpt'),
		inputRoomAllowedEmails: document.getElementById('inputRoomAllowedEmails'),
		btnSubmitCreateRoom: document.getElementById('btnSubmitCreateRoom'),

		// Projector Modal
		modalProjectorQR: document.getElementById('modalProjectorQR'),
		btnCloseProjectorQR: document.getElementById('btnCloseProjectorQR'),
		projectorRoomName: document.getElementById('projectorRoomName'),
		projectorQrCanvas: document.getElementById('projectorQrCanvas'),
		projectorRoomCode: document.getElementById('projectorRoomCode'),
		btnCopyRoomLink: document.getElementById('btnCopyRoomLink'),
		btnCopyRoomCode: document.getElementById('btnCopyRoomCode'),

		// Analytics Modal
		modalRoomAnalytics: document.getElementById('modalRoomAnalytics'),
		analyticsModalRoomTitle: document.getElementById('analyticsModalRoomTitle'),
		analyticsModalSubtitle: document.getElementById('analyticsModalSubtitle'),
		btnExportLeaderboardCsv: document.getElementById('btnExportLeaderboardCsv'),
		statTotalSubmissions: document.getElementById('statTotalSubmissions'),
		statAvgScore: document.getElementById('statAvgScore'),
		statAvgAccuracy: document.getElementById('statAvgAccuracy'),
		statHardestQuestion: document.getElementById('statHardestQuestion'),
		btnTabLeaderboard: document.getElementById('btnTabLeaderboard'),
		btnTabQuestionStats: document.getElementById('btnTabQuestionStats'),
		viewAnalyticsLeaderboard: document.getElementById('viewAnalyticsLeaderboard'),
		viewAnalyticsQuestions: document.getElementById('viewAnalyticsQuestions'),
		tbodyLeaderboard: document.getElementById('tbodyLeaderboard'),
		analyticsQuestionsList: document.getElementById('analyticsQuestionsList'),

		// QR Reader Modal
		qrReaderModal: document.getElementById('qrReaderModal'),
		btnCloseQrScanner: document.getElementById('btnCloseQrScanner'),

		// Quiz Playing View
		playRoomTitle: document.getElementById('playRoomTitle'),
		playQuestionCounter: document.getElementById('playQuestionCounter'),
		playTimerBadge: document.getElementById('playTimerBadge'),
		playTimerText: document.getElementById('playTimerText'),
		btnExitPlaying: document.getElementById('btnExitPlaying'),
		playProgressFill: document.getElementById('playProgressFill'),
		playQuestionPills: document.getElementById('playQuestionPills'),
		activeQTypeBadge: document.getElementById('activeQTypeBadge'),
		activeQPoints: document.getElementById('activeQPoints'),
		activeQText: document.getElementById('activeQText'),
		activeQImageContainer: document.getElementById('activeQImageContainer'),
		activeQImg: document.getElementById('activeQImg'),
		activeQOptionsContainer: document.getElementById('activeQOptionsContainer'),
		btnPrevQuestion: document.getElementById('btnPrevQuestion'),
		btnNextQuestion: document.getElementById('btnNextQuestion'),
		btnSubmitQuizEarly: document.getElementById('btnSubmitQuizEarly'),

		// Result View
		resStatusBadge: document.getElementById('resStatusBadge'),
		resQuizTitle: document.getElementById('resQuizTitle'),
		resRoomInfo: document.getElementById('resRoomInfo'),
		resScoreNum: document.getElementById('resScoreNum'),
		resScoreMax: document.getElementById('resScoreMax'),
		resStatCorrect: document.getElementById('resStatCorrect'),
		resStatAccuracy: document.getElementById('resStatAccuracy'),
		resStatTime: document.getElementById('resStatTime'),
		btnScrollToReview: document.getElementById('btnScrollToReview'),
		btnBackToHomeFromRes: document.getElementById('btnBackToHomeFromRes'),
		reviewQuestionsList: document.getElementById('reviewQuestionsList'),

		// Toast
		quizToast: document.getElementById('quizToast')
	};

	// Bootstrap Modal Instances
	let bsModalCreateQuiz = null;
	let bsModalCreateRoom = null;
	let bsModalRoomAnalytics = null;
	let bsModalCreateClass = null;
	let bsModalClassWorkspace = null;
	let bsModalAssignQuiz = null;
	let bsModalIssueCert = null;
	let bsModalDigitalCertViewer = null;

	function initModals() {
		if (typeof bootstrap !== 'undefined') {
			if (DOM.modalCreateQuiz) bsModalCreateQuiz = new bootstrap.Modal(DOM.modalCreateQuiz);
			if (DOM.modalCreateRoom) bsModalCreateRoom = new bootstrap.Modal(DOM.modalCreateRoom);
			if (DOM.modalRoomAnalytics) bsModalRoomAnalytics = new bootstrap.Modal(DOM.modalRoomAnalytics);
			if (DOM.modalCreateClass) bsModalCreateClass = new bootstrap.Modal(DOM.modalCreateClass);
			if (DOM.modalClassWorkspace) bsModalClassWorkspace = new bootstrap.Modal(DOM.modalClassWorkspace);
			if (DOM.modalAssignQuiz) bsModalAssignQuiz = new bootstrap.Modal(DOM.modalAssignQuiz);
			if (DOM.modalIssueCert) bsModalIssueCert = new bootstrap.Modal(DOM.modalIssueCert);
			if (DOM.modalDigitalCertViewer) bsModalDigitalCertViewer = new bootstrap.Modal(DOM.modalDigitalCertViewer);
		}
	}

	function showToast(message, duration = 3000) {
		if (!DOM.quizToast) return;
		DOM.quizToast.textContent = message;
		DOM.quizToast.classList.add('show');
		setTimeout(() => {
			DOM.quizToast.classList.remove('show');
		}, duration);
	}

	// ==========================================================================
	// 4. AUTHENTICATION & AUTHORIZATION FLOW
	// ==========================================================================
	async function checkUserAuthorization(email) {
		try {
			const doc = await db.collection('authorized_users').doc(email.toLowerCase()).get();
			if (doc.exists) {
				return { authorized: true, data: doc.data() };
			}
			return { authorized: true, data: { role: 'member' } };
		} catch (error) {
			console.warn('Firestore authorization check fallback:', error);
			return { authorized: true, data: { role: 'member' } };
		}
	}

	function setupAuthObserver() {
		// Check cached auth in sessionStorage first
		try {
			const cached = sessionStorage.getItem('uxcamp_auth');
			if (cached) {
				const parsed = JSON.parse(cached);
				if (parsed && parsed.email) {
					state.currentUser = {
						uid: parsed.uid || 'user_' + Date.now(),
						email: parsed.email.toLowerCase(),
						displayName: parsed.displayName || parsed.email.split('@')[0],
						photoURL: parsed.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(parsed.displayName || parsed.email)}&background=e2a03f&color=000`
					};
					state.userRole = parsed.role || 'member';

					DOM.userDisplayName.textContent = state.currentUser.displayName;
					DOM.userAvatarImg.src = state.currentUser.photoURL;
					DOM.userRoleBadge.textContent = state.userRole.toUpperCase();

					DOM.authGate.style.display = 'none';
					DOM.quizApp.style.display = 'block';

					initModals();
					handleInitialRouteAndData();
				}
			}
		} catch (e) {
			console.warn('Session storage read error:', e);
		}

		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const authCheck = await checkUserAuthorization(user.email);

				state.currentUser = {
					uid: user.uid,
					email: user.email.toLowerCase(),
					displayName: user.displayName || user.email.split('@')[0],
					photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=e2a03f&color=000`
				};
				state.userRole = authCheck.data?.role || 'member';

				sessionStorage.setItem('uxcamp_auth', JSON.stringify({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					role: state.userRole,
					authorized: true
				}));

				DOM.userDisplayName.textContent = state.currentUser.displayName;
				DOM.userAvatarImg.src = state.currentUser.photoURL;
				DOM.userRoleBadge.textContent = state.userRole.toUpperCase();

				DOM.authGate.style.display = 'none';
				DOM.quizApp.style.display = 'block';

				initModals();
				handleInitialRouteAndData();

			} else {
				if (!sessionStorage.getItem('uxcamp_auth')) {
					state.currentUser = null;
					DOM.authGateSpinner.style.display = 'none';
					DOM.authGateAction.style.display = 'block';
					DOM.authGate.style.display = 'flex';
					DOM.quizApp.style.display = 'none';
				}
			}
		});
	}

	if (DOM.btnGoogleLoginGate) {
		DOM.btnGoogleLoginGate.addEventListener('click', async () => {
			try {
				DOM.authGateSpinner.style.display = 'block';
				DOM.authGateAction.style.display = 'none';
				await auth.signInWithPopup(googleProvider);
			} catch (error) {
				DOM.authGateSpinner.style.display = 'none';
				DOM.authGateAction.style.display = 'block';
				showToast('Đăng nhập thất bại: ' + error.message);
			}
		});
	}

	if (DOM.btnLogout) {
		DOM.btnLogout.addEventListener('click', async () => {
			try {
				if (state.analyticsListenerUnsub) state.analyticsListenerUnsub();
				await auth.signOut();
				sessionStorage.removeItem('uxcamp_auth');
				showToast('Đã đăng xuất');
			} catch (err) {
				console.error(err);
			}
		});
	}

	// ==========================================================================
	// 5. NAVIGATION & TAB SWITCHING
	// ==========================================================================
	function switchTab(tabId) {
		state.currentTab = tabId;

		const buttons = DOM.mainNavTabs.querySelectorAll('.nav-tab-btn');
		buttons.forEach(btn => {
			if (btn.dataset.tab === tabId) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});

		Object.keys(DOM.sections).forEach(key => {
			if (DOM.sections[key]) {
				if (key === tabId) {
					DOM.sections[key].classList.add('active');
					DOM.sections[key].style.display = (key === 'quizPlayScreen') ? 'flex' : 'block';
				} else {
					DOM.sections[key].classList.remove('active');
					DOM.sections[key].style.display = 'none';
				}
			}
		});

		if (tabId === 'tabPlayer') loadActiveRoomsForPlayer();
		if (tabId === 'tabStudentClasses') loadStudentPortal();
		if (tabId === 'tabClassesHub') loadHostClasses();
		if (tabId === 'tabQuizBank') loadQuizBank();
		if (tabId === 'tabHostRooms') loadHostRooms();
	}

	if (DOM.mainNavTabs) {
		DOM.mainNavTabs.addEventListener('click', (e) => {
			const btn = e.target.closest('.nav-tab-btn');
			if (btn && btn.dataset.tab) {
				switchTab(btn.dataset.tab);
			}
		});
	}

	function handleInitialRouteAndData() {
		loadActiveRoomsForPlayer();
		loadQuizBank();
		loadHostClasses();

		const urlParams = new URLSearchParams(window.location.search);
		const roomParam = urlParams.get('room') || urlParams.get('join');
		if (roomParam) {
			DOM.inputRoomPin.value = roomParam.toUpperCase().trim();
			setTimeout(() => {
				joinRoomByCode(roomParam.toUpperCase().trim());
			}, 300);
		}
	}

	// ==========================================================================
	// 6. BCNF LMS: CLASSROOM MANAGEMENT (classes, class_enrollments, class_quizzes)
	// ==========================================================================
	async function saveClassToFirestore() {
		const classCode = DOM.inputClassCode.value.trim().toUpperCase();
		const title = DOM.inputClassTitle.value.trim();
		const courseId = DOM.selectClassCourse.value;
		const status = DOM.selectClassStatus.value;
		const minScore = parseInt(DOM.inputClassMinScore.value, 10) || 80;
		const reqQuizzes = parseInt(DOM.inputClassReqQuizzes.value, 10) || 1;
		const desc = DOM.inputClassDesc.value.trim();

		if (!classCode) {
			showToast('Vui lòng nhập Mã lớp!');
			DOM.inputClassCode.focus();
			return;
		}
		if (!title) {
			showToast('Vui lòng nhập Tên lớp học!');
			DOM.inputClassTitle.focus();
			return;
		}

		try {
			DOM.btnSaveClassToFirestore.disabled = true;
			const classId = state.editingClassId || `cls_${classCode.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

			const classPayload = {
				classId: classId,
				classCode: classCode,
				title: title,
				courseId: courseId,
				instructorEmail: state.currentUser.email,
				instructorName: state.currentUser.displayName,
				status: status,
				minPassingScore: minScore,
				requiredQuizzesCount: reqQuizzes,
				description: desc,
				updatedAt: firebase.firestore.FieldValue.serverTimestamp()
			};

			if (state.editingClassId) {
				await db.collection('classes').doc(state.editingClassId).update(classPayload);
				showToast('Đã cập nhật thông tin lớp học!');
			} else {
				classPayload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
				classPayload.studentCount = 0;
				classPayload.quizCount = 0;
				await db.collection('classes').doc(classId).set(classPayload);
				showToast('Đã tạo lớp học mới thành công!');
			}

			if (bsModalCreateClass) bsModalCreateClass.hide();
			loadHostClasses();

		} catch (error) {
			console.error('Save class error:', error);
			showToast('Lỗi khi lưu lớp học: ' + error.message);
		} finally {
			DOM.btnSaveClassToFirestore.disabled = false;
		}
	}

	if (DOM.btnSaveClassToFirestore) {
		DOM.btnSaveClassToFirestore.addEventListener('click', saveClassToFirestore);
	}

	if (DOM.btnOpenCreateClassModal) {
		DOM.btnOpenCreateClassModal.addEventListener('click', () => {
			state.editingClassId = null;
			DOM.modalCreateClassTitle.textContent = 'Tạo Lớp Học Mới';
			DOM.inputClassCode.value = '';
			DOM.inputClassTitle.value = '';
			DOM.inputClassDesc.value = '';
			DOM.inputClassMinScore.value = '80';
			DOM.inputClassReqQuizzes.value = '3';
			if (bsModalCreateClass) bsModalCreateClass.show();
		});
	}

	async function loadHostClasses() {
		try {
			const snapshot = await db.collection('classes')
				.orderBy('createdAt', 'desc')
				.limit(40)
				.get();

			state.classes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			// Update select class dropdowns across app
			if (DOM.selectRoomClass) {
				DOM.selectRoomClass.innerHTML = '<option value="">-- Không theo lớp (Mở tự do) --</option>';
				state.classes.forEach(c => {
					const opt = document.createElement('option');
					opt.value = c.classId;
					opt.textContent = `[${c.classCode}] ${c.title}`;
					DOM.selectRoomClass.appendChild(opt);
				});
			}

			if (DOM.hostClassesListContainer) {
				if (state.classes.length === 0) {
					DOM.hostClassesListContainer.innerHTML = `
						<div class="col-12 text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Chưa có lớp học nào. Hãy tạo lớp học đầu tiên để quản lý học viên và bài kiểm tra!</p>
							<button class="btn-gold" onclick="document.getElementById('btnOpenCreateClassModal').click()">+ Tạo Lớp Đầu Tiên</button>
						</div>
					`;
					return;
				}

				DOM.hostClassesListContainer.innerHTML = '';
				state.classes.forEach(cls => {
					const card = document.createElement('div');
					card.className = 'class-card';
					card.innerHTML = `
						<div class="d-flex justify-content-between align-items-start">
							<span class="class-code-badge">${cls.classCode}</span>
							<span class="class-status-badge ${cls.status || 'active'}">${cls.status === 'active' ? 'Đang diễn ra' : (cls.status === 'upcoming' ? 'Sắp mở' : 'Đã kết thúc')}</span>
						</div>
						<div>
							<h3 class="h6 medium m-0" style="color: var(--quiz-text-main);">${escapeHtml(cls.title)}</h3>
							<span class="x-small" style="color: var(--quiz-text-muted);">${escapeHtml(cls.description || 'Chương trình đào tạo UXCamp')}</span>
						</div>
						<div class="d-flex justify-content-between align-items-center x-small" style="color: var(--quiz-gold);">
							<span>Điểm Pass: &ge;${cls.minPassingScore || 80}%</span>
							<span>Giảng viên: ${escapeHtml(cls.instructorName || cls.instructorEmail)}</span>
						</div>
						<div class="d-flex gap-2 mt-2">
							<button class="btn-gold flex-1 py-1 px-2" style="font-size: 13px;" onclick="window.__openClassWorkspace('${cls.classId}')">
								<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
								<span>Không Gian Lớp Học</span>
							</button>
							<button class="btn-secondary-dark py-1 px-2" onclick="window.__editClass('${cls.classId}')">Sửa</button>
							<button class="btn-danger-dark py-1 px-2" onclick="window.__deleteClass('${cls.classId}')">Xóa</button>
						</div>
					`;
					DOM.hostClassesListContainer.appendChild(card);
				});
			}
		} catch (error) {
			console.error('Load host classes error:', error);
		}
	}

	window.__editClass = (classId) => {
		const cls = state.classes.find(c => c.classId === classId);
		if (!cls) return;
		state.editingClassId = classId;
		DOM.modalCreateClassTitle.textContent = 'Chỉnh Sửa Lớp Học';
		DOM.inputClassCode.value = cls.classCode || '';
		DOM.inputClassTitle.value = cls.title || '';
		DOM.selectClassCourse.value = cls.courseId || 'applied-ux-analytic';
		DOM.selectClassStatus.value = cls.status || 'active';
		DOM.inputClassMinScore.value = cls.minPassingScore || 80;
		DOM.inputClassReqQuizzes.value = cls.requiredQuizzesCount || 3;
		DOM.inputClassDesc.value = cls.description || '';
		if (bsModalCreateClass) bsModalCreateClass.show();
	};

	window.__deleteClass = async (classId) => {
		if (!confirm('Bạn có chắc chắn muốn xóa lớp học này không?')) return;
		try {
			await db.collection('classes').doc(classId).delete();
			showToast('Đã xóa lớp học thành công');
			loadHostClasses();
		} catch (e) {
			showToast('Lỗi xóa lớp: ' + e.message);
		}
	};

	// ==========================================================================
	// 7. CLASS WORKSPACE (Roster, Curriculum, Gradebook Matrix)
	// ==========================================================================
	window.__openClassWorkspace = async (classId) => {
		const cls = state.classes.find(c => c.classId === classId);
		if (!cls) return;

		state.activeWorkspaceClass = cls;
		DOM.wsClassCodeBadge.textContent = cls.classCode;
		DOM.wsClassTitle.textContent = cls.title;
		DOM.wsClassSubtitle.textContent = `Giảng viên: ${cls.instructorName || cls.instructorEmail} • Điểm chuẩn tốt nghiệp: ≥${cls.minPassingScore || 80}%`;

		// Switch to Tab Roster by default
		switchWorkspaceTab('viewWsRoster');

		if (bsModalClassWorkspace) bsModalClassWorkspace.show();

		await Promise.all([
			loadClassRoster(classId),
			loadClassCurriculum(classId)
		]);

		generateGradebookMatrix(classId);
	};

	function switchWorkspaceTab(viewId) {
		DOM.viewWsRoster.style.display = (viewId === 'viewWsRoster') ? 'block' : 'none';
		DOM.viewWsCurriculum.style.display = (viewId === 'viewWsCurriculum') ? 'block' : 'none';
		DOM.viewWsGradebook.style.display = (viewId === 'viewWsGradebook') ? 'block' : 'none';

		DOM.tabBtnWsRoster.classList.toggle('active', viewId === 'viewWsRoster');
		DOM.tabBtnWsCurriculum.classList.toggle('active', viewId === 'viewWsCurriculum');
		DOM.tabBtnWsGradebook.classList.toggle('active', viewId === 'viewWsGradebook');

		if (viewId === 'viewWsGradebook' && state.activeWorkspaceClass) {
			generateGradebookMatrix(state.activeWorkspaceClass.classId);
		}
	}

	if (DOM.tabBtnWsRoster) DOM.tabBtnWsRoster.addEventListener('click', () => switchWorkspaceTab('viewWsRoster'));
	if (DOM.tabBtnWsCurriculum) DOM.tabBtnWsCurriculum.addEventListener('click', () => switchWorkspaceTab('viewWsCurriculum'));
	if (DOM.tabBtnWsGradebook) DOM.tabBtnWsGradebook.addEventListener('click', () => switchWorkspaceTab('viewWsGradebook'));

	// 7.1 Class Roster Management (Batch Google Sheet Enroll)
	async function loadClassRoster(classId) {
		try {
			const snapshot = await db.collection('class_enrollments')
				.where('classId', '==', classId)
				.orderBy('enrolledAt', 'desc')
				.get();

			state.activeWorkspaceEnrollments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

			if (DOM.tbodyClassRoster) {
				if (state.activeWorkspaceEnrollments.length === 0) {
					DOM.tbodyClassRoster.innerHTML = `<tr><td colspan="8" class="text-center py-4" style="color: var(--quiz-text-muted);">Lớp chưa có học viên. Hãy dán danh sách email từ Google Sheet vào ô phía trên để ghi danh.</td></tr>`;
					return;
				}

				DOM.tbodyClassRoster.innerHTML = '';
				state.activeWorkspaceEnrollments.forEach((enr, idx) => {
					const tr = document.createElement('tr');
					const dateStr = enr.enrolledAt ? new Date(enr.enrolledAt.toDate()).toLocaleDateString('vi-VN') : '-';
					const isCompleted = enr.status === 'completed';

					tr.innerHTML = `
						<td class="text-center" style="color: var(--quiz-text-muted);">${idx + 1}</td>
						<td>
							<div class="d-flex align-items-center gap-2">
								<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(enr.studentName || enr.userEmail)}&background=e2a03f&color=000" style="width: 24px; height: 24px; border-radius: 50%;">
								<span class="fw-bold">${escapeHtml(enr.studentName || 'Học viên')}</span>
							</div>
						</td>
						<td class="font-monospace x-small" style="color: var(--quiz-text-muted);">${escapeHtml(enr.userEmail)}</td>
						<td class="x-small">${dateStr}</td>
						<td class="x-small" style="color: var(--quiz-gold);">${enr.passedQuizzesCount || 0} Quiz đạt</td>
						<td class="font-monospace fw-bold" style="color: var(--quiz-green);">${enr.gpaScore ? Math.round(enr.gpaScore) : '—'}</td>
						<td>
							<span class="badge ${isCompleted ? 'bg-success' : 'bg-secondary'}">${isCompleted ? 'Đã Tốt Nghiệp' : 'Đang học'}</span>
						</td>
						<td>
							<div class="d-flex gap-1">
								<button class="btn-outline-gold py-1 px-2" style="font-size: 11px;" onclick="window.__prepareIssueCert('${enr.id}', '${escapeHtml(enr.studentName || '')}', '${enr.userEmail}', ${enr.gpaScore || 85})">
									${enr.certificateId ? 'Xem/Cấp lại' : 'Cấp Chứng Chỉ'}
								</button>
								<button class="btn-danger-dark py-1 px-1" style="font-size: 11px;" onclick="window.__removeEnrollment('${enr.id}')" title="Xóa học viên">✕</button>
							</div>
						</td>
					`;
					DOM.tbodyClassRoster.appendChild(tr);
				});
			}
		} catch (error) {
			console.error('Load class roster error:', error);
		}
	}

	async function handleBatchEnrollStudents() {
		const raw = DOM.rawRosterPasteInput.value.trim();
		if (!raw) {
			showToast('Vui lòng dán danh sách học viên từ Google Sheet!');
			return;
		}

		if (!state.activeWorkspaceClass) return;
		const classId = state.activeWorkspaceClass.classId;

		const lines = raw.split(/\r\n|\n|\r/);
		let count = 0;

		try {
			DOM.btnBatchEnrollStudents.disabled = true;
			DOM.btnBatchEnrollStudents.textContent = 'Đang ghi danh...';

			for (const line of lines) {
				if (!line.trim()) continue;
				const parts = line.split(/[\t,;]/).map(p => p.trim());
				const email = parts.find(p => p.includes('@'));
				if (!email) continue;

				const name = parts.find(p => !p.includes('@') && p.length > 0) || email.split('@')[0];
				const normEmail = email.toLowerCase();
				const enrollmentId = `${classId}_${normEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

				await db.collection('class_enrollments').doc(enrollmentId).set({
					classId: classId,
					classCode: state.activeWorkspaceClass.classCode,
					classTitle: state.activeWorkspaceClass.title,
					userEmail: normEmail,
					studentName: name,
					status: 'studying',
					gpaScore: 0,
					passedQuizzesCount: 0,
					enrolledAt: firebase.firestore.FieldValue.serverTimestamp()
				}, { merge: true });

				count++;
			}

			DOM.rawRosterPasteInput.value = '';
			showToast(`Đã ghi danh thành công ${count} học viên vào lớp!`);
			loadClassRoster(classId);

		} catch (e) {
			console.error('Batch enroll error:', e);
			showToast('Lỗi ghi danh: ' + e.message);
		} finally {
			DOM.btnBatchEnrollStudents.disabled = false;
			DOM.btnBatchEnrollStudents.textContent = '+ Ghi danh danh sách học viên';
		}
	}

	if (DOM.btnBatchEnrollStudents) {
		DOM.btnBatchEnrollStudents.addEventListener('click', handleBatchEnrollStudents);
	}

	window.__removeEnrollment = async (enrollmentId) => {
		if (!confirm('Bạn có chắc muốn xóa học viên này khỏi lớp?')) return;
		try {
			await db.collection('class_enrollments').doc(enrollmentId).delete();
			showToast('Đã xóa học viên khỏi lớp');
			if (state.activeWorkspaceClass) loadClassRoster(state.activeWorkspaceClass.classId);
		} catch (e) {
			showToast('Lỗi: ' + e.message);
		}
	};

	// 7.2 Class Curriculum Management (Assign Quizzes to Class)
	async function loadClassCurriculum(classId) {
		try {
			const snapshot = await db.collection('class_quizzes')
				.where('classId', '==', classId)
				.orderBy('orderIndex', 'asc')
				.get();

			state.activeWorkspaceCurriculum = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

			if (DOM.classCurriculumListContainer) {
				if (state.activeWorkspaceCurriculum.length === 0) {
					DOM.classCurriculumListContainer.innerHTML = `
						<div class="text-center py-4" style="color: var(--quiz-text-muted);">
							Lớp chưa được gán bộ quiz nào. Hãy bấm <b>"+ Gán Quiz từ Kho"</b> để thêm bài học.
						</div>
					`;
					return;
				}

				DOM.classCurriculumListContainer.innerHTML = '';
				state.activeWorkspaceCurriculum.forEach(cq => {
					const div = document.createElement('div');
					div.className = 'student-quiz-item';
					div.innerHTML = `
						<div class="d-flex align-items-center gap-3">
							<span class="badge bg-secondary font-monospace">Buổi ${cq.orderIndex || 1}</span>
							<div>
								<h4 class="h6 m-0" style="color: var(--quiz-text-main); font-size: 14px;">${escapeHtml(cq.quizTitle)}</h4>
								<span class="x-small" style="color: var(--quiz-text-muted);">Điểm đạt yêu cầu: &ge;${cq.passingScore || 80}% ${cq.isRequired ? '• Bắt buộc tốt nghiệp' : ''}</span>
							</div>
						</div>
						<div class="d-flex gap-2">
							<button class="btn-gold py-1 px-2" style="font-size: 12px;" onclick="window.__launchClassLiveRoom('${cq.classId}', '${cq.quizId}', '${escapeHtml(cq.quizTitle)}')">
								⚡ Mở Room Live Cho Lớp
							</button>
							<button class="btn-danger-dark py-1 px-2" style="font-size: 12px;" onclick="window.__removeClassQuiz('${cq.id}')">Gỡ</button>
						</div>
					`;
					DOM.classCurriculumListContainer.appendChild(div);
				});
			}
		} catch (e) {
			console.error('Load class curriculum error:', e);
		}
	}

	if (DOM.btnOpenAssignQuizModal) {
		DOM.btnOpenAssignQuizModal.addEventListener('click', () => {
			if (state.quizzes.length === 0) {
				showToast('Kho quiz chưa có dữ liệu. Vui lòng tạo bộ quiz trước!');
				return;
			}

			DOM.selectAssignQuizId.innerHTML = '';
			state.quizzes.forEach(q => {
				const opt = document.createElement('option');
				opt.value = q.id;
				opt.textContent = `${q.title} (${q.totalQuestions || 0} câu)`;
				DOM.selectAssignQuizId.appendChild(opt);
			});

			DOM.inputAssignOrder.value = state.activeWorkspaceCurriculum.length + 1;
			if (bsModalAssignQuiz) bsModalAssignQuiz.show();
		});
	}

	if (DOM.btnSubmitAssignQuiz) {
		DOM.btnSubmitAssignQuiz.addEventListener('click', async (e) => {
			e.preventDefault();
			const quizId = DOM.selectAssignQuizId.value;
			const order = parseInt(DOM.inputAssignOrder.value, 10) || 1;
			const passingScore = parseInt(DOM.inputAssignPassingScore.value, 10) || 80;
			const isRequired = DOM.checkAssignRequired.checked;

			if (!quizId || !state.activeWorkspaceClass) return;
			const classId = state.activeWorkspaceClass.classId;
			const quiz = state.quizzes.find(q => q.id === quizId);

			try {
				const classQuizId = `${classId}_${quizId}`;
				await db.collection('class_quizzes').doc(classQuizId).set({
					classId: classId,
					quizId: quizId,
					quizTitle: quiz?.title || 'Quiz',
					orderIndex: order,
					passingScore: passingScore,
					isRequired: isRequired,
					createdAt: firebase.firestore.FieldValue.serverTimestamp()
				});

				showToast('Đã gán Quiz vào chương trình đào tạo của lớp!');
				if (bsModalAssignQuiz) bsModalAssignQuiz.hide();
				loadClassCurriculum(classId);

			} catch (err) {
				showToast('Lỗi gán quiz: ' + err.message);
			}
		});
	}

	window.__removeClassQuiz = async (classQuizId) => {
		if (!confirm('Bạn có chắc muốn gỡ quiz này khỏi chương trình lớp?')) return;
		try {
			await db.collection('class_quizzes').doc(classQuizId).delete();
			showToast('Đã gỡ quiz khỏi lớp');
			if (state.activeWorkspaceClass) loadClassCurriculum(state.activeWorkspaceClass.classId);
		} catch (e) {
			showToast('Lỗi: ' + e.message);
		}
	};

	window.__launchClassLiveRoom = async (classId, quizId, quizTitle) => {
		const cls = state.classes.find(c => c.classId === classId);
		const roomCode = generateRoomCode();

		try {
			// Pre-populate whitelist with enrolled students of this class
			const enrollments = state.activeWorkspaceEnrollments.length > 0 ?
				state.activeWorkspaceEnrollments :
				(await db.collection('class_enrollments').where('classId', '==', classId).get()).docs.map(d => d.data());

			const allowedEmails = enrollments.map(e => e.userEmail);

			await db.collection('quiz_rooms').doc(roomCode).set({
				code: roomCode,
				name: `[${cls?.classCode || 'Class'}] ${quizTitle}`,
				classId: classId,
				quizId: quizId,
				quizTitle: quizTitle,
				hostEmail: state.currentUser.email,
				hostName: state.currentUser.displayName,
				status: 'active',
				settings: {
					timeLimitMinutes: 15,
					shuffleQuestions: true,
					shuffleOptions: true,
					allowedEmails: allowedEmails
				},
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				submissionCount: 0
			});

			if (bsModalClassWorkspace) bsModalClassWorkspace.hide();
			openProjectorModal(roomCode, `[${cls?.classCode}] ${quizTitle}`);
			showToast(`Đã mở phòng thi cho lớp ${cls?.classCode}!`);
			loadHostRooms();

		} catch (err) {
			showToast('Lỗi mở phòng: ' + err.message);
		}
	};

	// 7.3 Gradebook Matrix Engine (Students x Quizzes)
	async function generateGradebookMatrix(classId) {
		const container = DOM.gradebookMatrixContainer;
		if (!container) return;

		container.innerHTML = '<div class="text-center py-4 text-muted">Đang tính toán bảng điểm ma trận...</div>';

		try {
			const enrollments = state.activeWorkspaceEnrollments;
			const curriculum = state.activeWorkspaceCurriculum;

			if (enrollments.length === 0 || curriculum.length === 0) {
				container.innerHTML = `<div class="text-center py-4 text-muted">Cần có ít nhất 1 học viên và 1 bài quiz để hiển thị bảng điểm ma trận.</div>`;
				return;
			}

			// Fetch submissions for this class
			const subsSnapshot = await db.collection('quiz_submissions')
				.where('classId', '==', classId)
				.get();

			const submissions = subsSnapshot.docs.map(d => d.data());

			// Build Matrix Table HTML
			let theadThs = `
				<th class="sticky-col-header" style="min-width: 180px;">Học viên</th>
				<th style="min-width: 180px;">Email</th>
			`;

			curriculum.forEach(cq => {
				theadThs += `<th class="text-center" style="min-width: 120px;">Buổi ${cq.orderIndex}: ${escapeHtml(cq.quizTitle)}<br><span class="x-small" style="font-weight: 400; color: var(--quiz-gold);">Pass: &ge;${cq.passingScore}%</span></th>`;
			});

			theadThs += `
				<th class="text-center" style="min-width: 90px;">Điểm GPA</th>
				<th class="text-center" style="min-width: 100px;">Tiến độ</th>
				<th class="text-center" style="min-width: 130px;">Chứng Chỉ</th>
			`;

			let tbodyTrs = '';
			enrollments.forEach(enr => {
				let totalScore = 0;
				let quizzesTaken = 0;
				let quizzesPassed = 0;
				let quizCells = '';

				curriculum.forEach(cq => {
					// Find student submission for this quiz
					const sub = submissions.find(s => s.userEmail === enr.userEmail && s.quizId === cq.quizId);
					if (sub) {
						quizzesTaken++;
						const scorePct = sub.accuracy || Math.round((sub.score / (sub.maxScore || 100)) * 100);
						totalScore += scorePct;
						const isPassed = scorePct >= (cq.passingScore || 80);
						if (isPassed) quizzesPassed++;

						quizCells += `
							<td class="text-center">
								<span class="gradebook-score-cell ${isPassed ? 'passed' : 'failed'}">${scorePct}%</span>
							</td>
						`;
					} else {
						quizCells += `
							<td class="text-center">
								<span class="gradebook-score-cell not-taken">—</span>
							</td>
						`;
					}
				});

				const gpa = quizzesTaken > 0 ? Math.round(totalScore / quizzesTaken) : 0;
				const isAllPassed = (quizzesPassed >= curriculum.length);

				tbodyTrs += `
					<tr>
						<td class="sticky-col">
							<div class="d-flex align-items-center gap-2">
								<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(enr.studentName || enr.userEmail)}&background=e2a03f&color=000" style="width: 20px; height: 20px; border-radius: 50%;">
								<span class="fw-bold">${escapeHtml(enr.studentName || 'Học viên')}</span>
							</div>
						</td>
						<td class="font-monospace x-small" style="color: var(--quiz-text-muted);">${escapeHtml(enr.userEmail)}</td>
						${quizCells}
						<td class="text-center font-monospace fw-bold" style="color: ${gpa >= 80 ? 'var(--quiz-green)' : 'var(--quiz-gold)'};">${gpa > 0 ? gpa : '—'}</td>
						<td class="text-center x-small" style="color: var(--quiz-gold);">${quizzesPassed}/${curriculum.length} Pass</td>
						<td class="text-center">
							${enr.certificateId ? '<span class="badge bg-success">Đã Cấp CC</span>' : (isAllPassed ? '<span class="badge bg-primary">Đủ Điều Kiện</span>' : '<span class="badge bg-secondary">Chưa Đạt</span>')}
						</td>
					</tr>
				`;
			});

			container.innerHTML = `
				<table class="gradebook-table">
					<thead><tr>${theadThs}</tr></thead>
					<tbody>${tbodyTrs}</tbody>
				</table>
			`;

		} catch (error) {
			console.error('Generate gradebook matrix error:', error);
			container.innerHTML = `<div class="text-danger text-center py-4">Lỗi tính toán ma trận: ${error.message}</div>`;
		}
	}

	if (DOM.btnExportClassGradebookCsv) {
		DOM.btnExportClassGradebookCsv.addEventListener('click', () => {
			const cls = state.activeWorkspaceClass;
			const enrollments = state.activeWorkspaceEnrollments;
			const curriculum = state.activeWorkspaceCurriculum;

			if (!cls || enrollments.length === 0) {
				showToast('Chưa có dữ liệu học viên để xuất!');
				return;
			}

			let csv = "STT,Ho va Ten,Email," + curriculum.map(c => `"${c.quizTitle}"`).join(",") + ",Diem GPA,So Quiz Dat,Trang Thai\n";

			enrollments.forEach((enr, idx) => {
				csv += `"${idx + 1}","${enr.studentName || ''}","${enr.userEmail || ''}",` + curriculum.map(() => '""').join(",") + `,"${enr.gpaScore || 0}","${enr.passedQuizzesCount || 0}","${enr.status || 'studying'}"\n`;
			});

			const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `BangDiem_${cls.classCode}_${Date.now()}.csv`;
			link.click();
			showToast('Đã xuất file bảng điểm CSV thành công!');
		});
	}

	// ==========================================================================
	// 8. DIGITAL CERTIFICATE ENGINE (BCNF certificates table)
	// ==========================================================================
	window.__prepareIssueCert = (enrollmentId, studentName, studentEmail, gpaScore) => {
		if (!state.activeWorkspaceClass) return;
		const cls = state.activeWorkspaceClass;

		DOM.inputIssueStudentName.value = studentName || studentEmail.split('@')[0];
		DOM.inputIssueStudentEmail.value = studentEmail;

		// Suggest Grade based on GPA
		if (gpaScore >= 90) DOM.selectIssueGrade.value = 'Distinction';
		else if (gpaScore >= 80) DOM.selectIssueGrade.value = 'Merit';
		else DOM.selectIssueGrade.value = 'Pass';

		const year = new Date().getFullYear();
		const randomCode = Math.floor(1000 + Math.random() * 9000);
		DOM.inputIssueCertId.value = `UXC-${cls.classCode}-${year}-${randomCode}`;

		if (bsModalIssueCert) bsModalIssueCert.show();
	};

	if (DOM.btnSubmitIssueCert) {
		DOM.btnSubmitIssueCert.addEventListener('click', async (e) => {
			e.preventDefault();
			const certId = DOM.inputIssueCertId.value.trim();
			const studentName = DOM.inputIssueStudentName.value.trim();
			const studentEmail = DOM.inputIssueStudentEmail.value.trim().toLowerCase();
			const grade = DOM.selectIssueGrade.value;
			const signer = DOM.inputIssueSigner.value.trim();

			if (!certId || !studentName || !state.activeWorkspaceClass) return;
			const cls = state.activeWorkspaceClass;

			try {
				DOM.btnSubmitIssueCert.disabled = true;

				// 1. Create Certificate in BCNF certificates table
				const verifyUrl = `${window.location.origin}/certificate/find-your-certificate.html?email=${encodeURIComponent(studentEmail)}`;

				await db.collection('certificates').doc(certId).set({
					certificateId: certId,
					classId: cls.classId,
					classCode: cls.classCode,
					classTitle: cls.title,
					courseId: cls.courseId || 'applied-ux-analytic',
					userEmail: studentEmail,
					studentName: studentName,
					grade: grade,
					issuedAt: firebase.firestore.FieldValue.serverTimestamp(),
					issuedBy: signer || 'UXCamp Academic Board',
					verifyUrl: verifyUrl
				});

				// 2. Update class_enrollments status
				const enrollmentId = `${cls.classId}_${studentEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
				await db.collection('class_enrollments').doc(enrollmentId).update({
					status: 'completed',
					certificateId: certId,
					completedAt: firebase.firestore.FieldValue.serverTimestamp()
				});

				showToast(`Đã phát hành chứng chỉ số ${certId} cho học viên!`);
				if (bsModalIssueCert) bsModalIssueCert.hide();

				loadClassRoster(cls.classId);

			} catch (err) {
				console.error('Issue cert error:', err);
				showToast('Lỗi phát hành chứng chỉ: ' + err.message);
			} finally {
				DOM.btnSubmitIssueCert.disabled = false;
			}
		});
	}

	window.__viewDigitalCertificate = async (certId) => {
		try {
			const doc = await db.collection('certificates').doc(certId).get();
			if (!doc.exists) {
				showToast('Không tìm thấy chứng chỉ này!');
				return;
			}

			const cert = doc.data();
			DOM.viewCertRecipientName.textContent = cert.studentName || 'Học viên';
			DOM.viewCertCourseName.textContent = cert.classTitle || 'Chương trình đào tạo UXCamp';
			DOM.viewCertGradeBadge.textContent = `Xếp loại: ${cert.grade || 'Đạt'}`;
			DOM.viewCertIdCode.textContent = cert.certificateId;
			DOM.viewCertSigner.textContent = cert.issuedBy || 'UXCamp Vietnam Academic Board';

			const dateStr = cert.issuedAt ? new Date(cert.issuedAt.toDate()).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
			DOM.viewCertIssuedDate.textContent = `Ngày cấp: ${dateStr}`;

			// Generate verification QR code
			DOM.viewCertQrCanvas.innerHTML = '';
			if (typeof QRCode !== 'undefined') {
				new QRCode(DOM.viewCertQrCanvas, {
					text: cert.verifyUrl || `${window.location.origin}/certificate/find-your-certificate.html`,
					width: 80,
					height: 80,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.M
				});
			}

			if (bsModalDigitalCertViewer) bsModalDigitalCertViewer.show();

		} catch (e) {
			showToast('Lỗi tải chứng chỉ: ' + e.message);
		}
	};

	// ==========================================================================
	// 9. STUDENT PORTAL (My Classes, Progress & My Certificates)
	// ==========================================================================
	function switchStudentPortalSubTab(tabName) {
		DOM.viewStudentEnrolledClasses.style.display = (tabName === 'classes') ? 'block' : 'none';
		DOM.viewStudentCertificates.style.display = (tabName === 'certs') ? 'block' : 'none';
		DOM.viewStudentHistory.style.display = (tabName === 'history') ? 'block' : 'none';

		DOM.btnSubTabEnrolledClasses.classList.toggle('active', tabName === 'classes');
		DOM.btnSubTabMyCertificates.classList.toggle('active', tabName === 'certs');
		DOM.btnSubTabHistory.classList.toggle('active', tabName === 'history');
	}

	if (DOM.btnSubTabEnrolledClasses) DOM.btnSubTabEnrolledClasses.addEventListener('click', () => switchStudentPortalSubTab('classes'));
	if (DOM.btnSubTabMyCertificates) DOM.btnSubTabMyCertificates.addEventListener('click', () => switchStudentPortalSubTab('certs'));
	if (DOM.btnSubTabHistory) DOM.btnSubTabHistory.addEventListener('click', () => switchStudentPortalSubTab('history'));

	async function loadStudentPortal() {
		if (!state.currentUser) return;
		const userEmail = state.currentUser.email;

		try {
			// 1. Fetch Student Enrolled Classes
			const enrollmentsSnapshot = await db.collection('class_enrollments')
				.where('userEmail', '==', userEmail)
				.get();

			const enrollments = enrollmentsSnapshot.docs.map(d => d.data());

			if (DOM.studentClassesListContainer) {
				if (enrollments.length === 0) {
					DOM.studentClassesListContainer.innerHTML = `
						<div class="text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Bạn chưa được ghi danh vào lớp học nào.</p>
							<span class="x-small">Hãy liên hệ ban tổ chức hoặc nhập mã phòng thi trực tiếp ở tab <b>"Vào Phòng Thi"</b>.</span>
						</div>
					`;
				} else {
					DOM.studentClassesListContainer.innerHTML = '';

					for (const enr of enrollments) {
						// Fetch class details and curriculum quizzes
						const [clsDoc, curSnapshot, subSnapshot] = await Promise.all([
							db.collection('classes').doc(enr.classId).get(),
							db.collection('class_quizzes').where('classId', '==', enr.classId).orderBy('orderIndex', 'asc').get(),
							db.collection('quiz_submissions').where('classId', '==', enr.classId).where('userEmail', '==', userEmail).get()
						]);

						const cls = clsDoc.exists ? clsDoc.data() : { title: enr.classTitle, classCode: enr.classCode };
						const curriculum = curSnapshot.docs.map(d => d.data());
						const submissions = subSnapshot.docs.map(d => d.data());

						let quizItemsHtml = '';
						let passedCount = 0;

						curriculum.forEach(cq => {
							const sub = submissions.find(s => s.quizId === cq.quizId);
							const isPassed = sub && (sub.accuracy || 0) >= (cq.passingScore || 80);
							if (isPassed) passedCount++;

							quizItemsHtml += `
								<div class="student-quiz-item">
									<div>
										<span class="badge bg-secondary font-monospace">Buổi ${cq.orderIndex}</span>
										<span class="fw-bold ms-2" style="font-size: 13.5px; color: var(--quiz-text-main);">${escapeHtml(cq.quizTitle)}</span>
										<span class="x-small d-block mt-1" style="color: var(--quiz-text-muted);">Điểm yêu cầu: &ge;${cq.passingScore}% ${sub ? `• Điểm của bạn: ${sub.accuracy}%` : ''}</span>
									</div>
									<div>
										${isPassed ? '<span class="badge bg-success py-2 px-3">✓ Đã Hoàn Thành</span>' : `<button class="btn-gold py-1 px-3" style="font-size: 12.5px;" onclick="window.__directJoinClassQuiz('${enr.classId}', '${cq.quizId}')">${sub ? 'Làm Lại' : 'Vào Làm Quiz'}</button>`}
									</div>
								</div>
							`;
						});

						const pct = curriculum.length > 0 ? Math.round((passedCount / curriculum.length) * 100) : 0;

						const card = document.createElement('div');
						card.className = 'student-class-card';
						card.innerHTML = `
							<div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
								<div>
									<span class="class-code-badge">${cls.classCode || enr.classCode}</span>
									<h3 class="h5 medium mt-1 mb-0" style="color: var(--quiz-text-main);">${escapeHtml(cls.title || enr.classTitle)}</h3>
									<span class="x-small" style="color: var(--quiz-text-muted);">Giảng viên: ${escapeHtml(cls.instructorName || cls.instructorEmail || 'UXCamp')}</span>
								</div>
								<div class="text-end">
									<span class="caption fw-bold" style="color: var(--quiz-gold);">${passedCount}/${curriculum.length} Quiz đạt</span>
									<div class="progress mt-1" style="height: 6px; width: 120px; background: var(--quiz-surface-3);">
										<div class="progress-bar bg-warning" style="width: ${pct}%;"></div>
									</div>
								</div>
							</div>
							<div class="d-flex flex-column gap-2 mt-2">${quizItemsHtml || '<div class="x-small text-muted">Lớp chưa có quiz nào trong chương trình.</div>'}</div>
							${enr.certificateId ? `<div class="mt-2 text-end"><button class="btn-outline-gold py-1 px-3" style="font-size: 13px;" onclick="window.__viewDigitalCertificate('${enr.certificateId}')">🏆 Xem Chứng Chỉ Tốt Nghiệp</button></div>` : ''}
						`;
						DOM.studentClassesListContainer.appendChild(card);
					}
				}
			}

			// 2. Fetch Student Certificates
			const certSnapshot = await db.collection('certificates')
				.where('userEmail', '==', userEmail)
				.orderBy('issuedAt', 'desc')
				.get();

			const certs = certSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

			if (DOM.studentCertificatesListContainer) {
				if (certs.length === 0) {
					DOM.studentCertificatesListContainer.innerHTML = `
						<div class="text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Bạn chưa có chứng chỉ nào.</p>
							<span class="x-small">Hãy hoàn thành các bài quiz trong lớp học để được cấp chứng chỉ tốt nghiệp!</span>
						</div>
					`;
				} else {
					DOM.studentCertificatesListContainer.innerHTML = '';
					certs.forEach(cert => {
						const dateStr = cert.issuedAt ? new Date(cert.issuedAt.toDate()).toLocaleDateString('vi-VN') : 'Mới đây';
						const card = document.createElement('div');
						card.className = 'room-card-item';
						card.innerHTML = `
							<div class="d-flex flex-column gap-1">
								<div class="d-flex align-items-center gap-2">
									<span class="class-code-badge font-monospace">${cert.certificateId}</span>
									<span class="cert-badge-grade">${cert.grade || 'Pass'}</span>
								</div>
								<h3 class="h6 medium m-0" style="color: var(--quiz-text-main);">${escapeHtml(cert.classTitle || 'Chứng chỉ UXCamp')}</h3>
								<span class="x-small" style="color: var(--quiz-text-muted);">Cấp ngày: ${dateStr} • Người ký: ${escapeHtml(cert.issuedBy)}</span>
							</div>
							<div>
								<button class="btn-gold py-1 px-3" style="font-size: 13px;" onclick="window.__viewDigitalCertificate('${cert.id}')">
									🏆 Xem &amp; Tra Cứu Chứng Chỉ
								</button>
							</div>
						`;
						DOM.studentCertificatesListContainer.appendChild(card);
					});
				}
			}

			loadPlayerHistory();

		} catch (error) {
			console.error('Load student portal error:', error);
		}
	}

	if (DOM.btnRefreshStudentClasses) DOM.btnRefreshStudentClasses.addEventListener('click', loadStudentPortal);
	if (DOM.btnRefreshStudentCertificates) DOM.btnRefreshStudentCertificates.addEventListener('click', loadStudentPortal);

	window.__directJoinClassQuiz = async (classId, quizId) => {
		try {
			const quizDoc = await db.collection('quiz_banks').doc(quizId).get();
			const clsDoc = await db.collection('classes').doc(classId).get();
			if (!quizDoc.exists) return;

			const quizData = quizDoc.data();
			const clsData = clsDoc.exists ? clsDoc.data() : { title: 'Lớp học' };

			const roomData = {
				name: `[${clsData.classCode || 'Lớp'}] ${quizData.title}`,
				quizId: quizId,
				quizTitle: quizData.title,
				classId: classId,
				settings: { timeLimitMinutes: 15, shuffleQuestions: true, shuffleOptions: true }
			};

			startPlayingSession(`CLS-${classId.substring(0, 6).toUpperCase()}`, roomData, quizData, quizData.questions || []);

		} catch (e) {
			showToast('Lỗi vào làm quiz: ' + e.message);
		}
	};

	// ==========================================================================
	// 10. GOOGLE SHEET & CSV FAST PARSER (Kho câu hỏi)
	// ==========================================================================
	function parseSheetOrCsv(rawText) {
		if (!rawText || !rawText.trim()) return [];

		const lines = rawText.trim().split(/\r\n|\n|\r/);
		const questions = [];

		lines.forEach((line, idx) => {
			if (!line.trim()) return;

			let parts = [];
			if (line.includes('\t')) {
				parts = line.split('\t');
			} else if (line.includes(';') && (line.match(/;/g) || []).length >= 4) {
				parts = line.split(';');
			} else {
				parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
			}

			parts = parts.map(p => p.trim().replace(/^["']|["']$/g, ''));

			const firstCol = parts[0]?.toLowerCase() || '';
			if (idx === 0 && (firstCol.includes('câu hỏi') || firstCol.includes('question') || firstCol.includes('stt') || firstCol === 'id')) {
				return;
			}

			if (parts.length >= 2) {
				let qText = parts[0] || '';
				let qType = 'MCQ';
				let optA = '', optB = '', optC = '', optD = '';
				let correctRaw = 'A';
				let img = '';
				let explanation = '';

				if (parts.length >= 7) {
					if (['mcq', 'msq'].includes(parts[1].toLowerCase())) {
						qType = parts[1].toUpperCase();
						optA = parts[2] || '';
						optB = parts[3] || '';
						optC = parts[4] || '';
						optD = parts[5] || '';
						correctRaw = parts[6] || 'A';
						img = parts[7] || '';
						explanation = parts[8] || '';
					} else {
						optA = parts[1] || '';
						optB = parts[2] || '';
						optC = parts[3] || '';
						optD = parts[4] || '';
						correctRaw = parts[5] || 'A';
						img = parts[6] || '';
						explanation = parts[7] || '';
					}
				} else {
					optA = parts[1] || '';
					optB = parts[2] || '';
					optC = parts[3] || '';
					optD = parts[4] || '';
					correctRaw = parts[5] || 'A';
				}

				const correctAnswers = parseCorrectAnswerString(correctRaw);
				if (correctAnswers.length > 1) qType = 'MSQ';

				questions.push({
					id: 'q_' + Math.random().toString(36).substr(2, 9),
					question: qText,
					type: qType,
					options: [
						{ key: 'A', text: optA },
						{ key: 'B', text: optB },
						{ key: 'C', text: optC },
						{ key: 'D', text: optD }
					],
					correctAnswers: correctAnswers.length ? correctAnswers : ['A'],
					image: img,
					explanation: explanation,
					points: 10
				});
			}
		});

		return questions;
	}

	function parseCorrectAnswerString(str) {
		if (!str) return ['A'];
		const normalized = str.toUpperCase().replace(/[^A-D]/g, '');
		const set = new Set(normalized.split(''));
		return Array.from(set).filter(k => ['A', 'B', 'C', 'D'].includes(k));
	}

	function renderPreviewGrid(questions) {
		state.previewGridQuestions = questions;
		DOM.tbodyPreviewGrid.innerHTML = '';
		DOM.gridQuestionCountBadge.textContent = `${questions.length} câu hỏi`;

		questions.forEach((q, idx) => {
			const tr = document.createElement('tr');
			tr.dataset.index = idx;

			tr.innerHTML = `
				<td class="text-center font-monospace" style="color: var(--quiz-text-muted);">${idx + 1}</td>
				<td><input type="text" class="grid-input" data-field="question" value="${escapeHtml(q.question)}" placeholder="Nhập câu hỏi..."></td>
				<td>
					<select class="grid-input" data-field="type">
						<option value="MCQ" ${q.type === 'MCQ' ? 'selected' : ''}>MCQ (1 đáp án)</option>
						<option value="MSQ" ${q.type === 'MSQ' ? 'selected' : ''}>MSQ (Nhiều đáp án)</option>
					</select>
				</td>
				<td><input type="text" class="grid-input" data-field="optA" value="${escapeHtml(q.options[0]?.text || '')}" placeholder="Đáp án A"></td>
				<td><input type="text" class="grid-input" data-field="optB" value="${escapeHtml(q.options[1]?.text || '')}" placeholder="Đáp án B"></td>
				<td><input type="text" class="grid-input" data-field="optC" value="${escapeHtml(q.options[2]?.text || '')}" placeholder="Đáp án C"></td>
				<td><input type="text" class="grid-input" data-field="optD" value="${escapeHtml(q.options[3]?.text || '')}" placeholder="Đáp án D"></td>
				<td><input type="text" class="grid-input text-uppercase font-monospace" data-field="correct" value="${q.correctAnswers.join(',')}" placeholder="A hoặc A,C"></td>
				<td><input type="text" class="grid-input" data-field="image" value="${escapeHtml(q.image || '')}" placeholder="https://..."></td>
				<td><input type="text" class="grid-input" data-field="explanation" value="${escapeHtml(q.explanation || '')}" placeholder="Giải thích..."></td>
				<td class="cell-del">
					<button type="button" class="btn-cell-del" title="Xóa dòng" data-action="delete-row">✕</button>
				</td>
			`;

			DOM.tbodyPreviewGrid.appendChild(tr);
		});
	}

	if (DOM.tbodyPreviewGrid) {
		DOM.tbodyPreviewGrid.addEventListener('input', (e) => {
			const target = e.target;
			const tr = target.closest('tr');
			if (!tr) return;
			const idx = parseInt(tr.dataset.index, 10);
			const q = state.previewGridQuestions[idx];
			if (!q) return;

			const field = target.dataset.field;
			if (field === 'question') q.question = target.value;
			if (field === 'type') q.type = target.value;
			if (field === 'optA') q.options[0].text = target.value;
			if (field === 'optB') q.options[1].text = target.value;
			if (field === 'optC') q.options[2].text = target.value;
			if (field === 'optD') q.options[3].text = target.value;
			if (field === 'correct') q.correctAnswers = parseCorrectAnswerString(target.value);
			if (field === 'image') q.image = target.value;
			if (field === 'explanation') q.explanation = target.value;
		});

		DOM.tbodyPreviewGrid.addEventListener('click', (e) => {
			const btnDel = e.target.closest('[data-action="delete-row"]');
			if (btnDel) {
				const tr = btnDel.closest('tr');
				const idx = parseInt(tr.dataset.index, 10);
				state.previewGridQuestions.splice(idx, 1);
				renderPreviewGrid(state.previewGridQuestions);
			}
		});
	}

	if (DOM.btnAddGridRow) {
		DOM.btnAddGridRow.addEventListener('click', () => {
			state.previewGridQuestions.push({
				id: 'q_' + Math.random().toString(36).substr(2, 9),
				question: 'Câu hỏi mới?',
				type: 'MCQ',
				options: [
					{ key: 'A', text: 'Lựa chọn A' },
					{ key: 'B', text: 'Lựa chọn B' },
					{ key: 'C', text: 'Lựa chọn C' },
					{ key: 'D', text: 'Lựa chọn D' }
				],
				correctAnswers: ['A'],
				image: '',
				explanation: '',
				points: 10
			});
			renderPreviewGrid(state.previewGridQuestions);
		});
	}

	if (DOM.rawSheetTextarea) {
		DOM.rawSheetTextarea.addEventListener('input', () => {
			const parsed = parseSheetOrCsv(DOM.rawSheetTextarea.value);
			if (parsed.length > 0) renderPreviewGrid(parsed);
		});
	}

	if (DOM.btnFillSampleQuestions) {
		DOM.btnFillSampleQuestions.addEventListener('click', () => {
			renderPreviewGrid(JSON.parse(JSON.stringify(sampleQuestionsData)));
			showToast('Đã dán dữ liệu câu hỏi mẫu!');
		});
	}

	if (DOM.btnDownloadTemplateCsv) {
		DOM.btnDownloadTemplateCsv.addEventListener('click', () => {
			const csvHeader = "Câu hỏi\tLoại\tĐáp án A\tĐáp án B\tĐáp án C\tĐáp án D\tĐáp án đúng\tHình ảnh\tGiải thích\n";
			const csvRow1 = "UX Research là gì?\tMCQ\tNghiên cứu người dùng\tThiết kế đồ họa\tLập trình\tBán hàng\tA\t\tGiúp thấu hiểu hành vi người dùng\n";
			const csvRow2 = "Các phương pháp Discovery?\tMSQ\tPhỏng vấn 1:1\tKhảo sát diện rộng\tQuan sát ngữ cảnh\tSao chép đối thủ\tA,B,C\t\tSao chép đối thủ không phải là nghiên cứu\n";

			const blob = new Blob([csvHeader + csvRow1 + csvRow2], { type: 'text/tab-separated-values;charset=utf-8;' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = "UXCamp_Quiz_Template.tsv";
			link.click();
		});
	}

	if (DOM.btnTriggerCsvUpload && DOM.inputCsvFile) {
		DOM.btnTriggerCsvUpload.addEventListener('click', () => DOM.inputCsvFile.click());
		DOM.inputCsvFile.addEventListener('change', (e) => {
			const file = e.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (evt) => {
				const content = evt.target.result;
				DOM.rawSheetTextarea.value = content;
				const parsed = parseSheetOrCsv(content);
				renderPreviewGrid(parsed);
				showToast(`Đã đọc thành công ${parsed.length} câu hỏi từ file!`);
			};
			reader.readAsText(file);
		});
	}

	// Quiz Bank Firestore Save
	async function saveQuizToFirestore() {
		const title = DOM.inputQuizTitle.value.trim();
		const desc = DOM.inputQuizDesc.value.trim();

		if (!title) {
			showToast('Vui lòng nhập tên bộ Quiz!');
			DOM.inputQuizTitle.focus();
			return;
		}

		if (state.previewGridQuestions.length === 0) {
			showToast('Vui lòng nhập ít nhất 1 câu hỏi vào bảng xem trước!');
			return;
		}

		try {
			DOM.btnSaveQuizToFirestore.disabled = true;
			DOM.btnSaveQuizToFirestore.textContent = 'Đang lưu vào Firestore...';

			const quizPayload = {
				title: title,
				description: desc,
				createdBy: state.currentUser.email,
				authorName: state.currentUser.displayName,
				questions: state.previewGridQuestions,
				totalQuestions: state.previewGridQuestions.length,
				updatedAt: firebase.firestore.FieldValue.serverTimestamp()
			};

			if (state.editingQuizId) {
				await db.collection('quiz_banks').doc(state.editingQuizId).update(quizPayload);
				showToast('Đã cập nhật bộ Quiz thành công!');
			} else {
				quizPayload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
				await db.collection('quiz_banks').add(quizPayload);
				showToast('Đã tạo mới bộ Quiz thành công!');
			}

			if (bsModalCreateQuiz) bsModalCreateQuiz.hide();
			loadQuizBank();

		} catch (error) {
			console.error('Save quiz error:', error);
			showToast('Lỗi khi lưu Quiz: ' + error.message);
		} finally {
			DOM.btnSaveQuizToFirestore.disabled = false;
			DOM.btnSaveQuizToFirestore.innerHTML = `
				<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
				<span>Lưu Bộ Quiz vào Firebase</span>
			`;
		}
	}

	if (DOM.btnSaveQuizToFirestore) DOM.btnSaveQuizToFirestore.addEventListener('click', saveQuizToFirestore);

	async function loadQuizBank() {
		try {
			const snapshot = await db.collection('quiz_banks').orderBy('createdAt', 'desc').limit(50).get();
			state.quizzes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			if (DOM.selectRoomQuiz) {
				DOM.selectRoomQuiz.innerHTML = '<option value="">-- Chọn bộ quiz từ kho --</option>';
				state.quizzes.forEach(q => {
					const opt = document.createElement('option');
					opt.value = q.id;
					opt.textContent = `${q.title} (${q.totalQuestions || q.questions?.length || 0} câu)`;
					DOM.selectRoomQuiz.appendChild(opt);
				});
			}

			if (DOM.quizBankListContainer) {
				if (state.quizzes.length === 0) {
					DOM.quizBankListContainer.innerHTML = `
						<div class="text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Chưa có bộ quiz nào được tạo trong kho.</p>
							<button class="btn-gold" onclick="document.getElementById('btnOpenCreateQuizModal').click()">+ Tạo bộ Quiz đầu tiên</button>
						</div>
					`;
					return;
				}

				DOM.quizBankListContainer.innerHTML = '';
				state.quizzes.forEach(q => {
					const card = document.createElement('div');
					card.className = 'room-card-item';
					card.innerHTML = `
						<div class="d-flex flex-column gap-1" style="max-width: 60%;">
							<h3 class="h6 medium m-0" style="color: var(--quiz-text-main);">${escapeHtml(q.title)}</h3>
							<span class="x-small" style="color: var(--quiz-text-muted);">${escapeHtml(q.description || 'Không có mô tả')}</span>
							<span class="x-small" style="color: var(--quiz-gold);">${q.totalQuestions || q.questions?.length || 0} câu hỏi • Tác giả: ${escapeHtml(q.authorName || q.createdBy)}</span>
						</div>
						<div class="d-flex gap-2 flex-wrap">
							<button class="btn-gold py-1 px-3" style="font-size: 13px;" onclick="window.__createRoomFromQuiz('${q.id}')">
								⚡ Mở Room Thi
							</button>
							<button class="btn-secondary-dark py-1 px-2" onclick="window.__editQuiz('${q.id}')">Sửa</button>
							<button class="btn-danger-dark py-1 px-2" onclick="window.__deleteQuiz('${q.id}')">Xóa</button>
						</div>
					`;
					DOM.quizBankListContainer.appendChild(card);
				});
			}
		} catch (error) {
			console.error('Load quiz bank error:', error);
		}
	}

	if (DOM.btnOpenCreateQuizModal) {
		DOM.btnOpenCreateQuizModal.addEventListener('click', () => {
			state.editingQuizId = null;
			DOM.quizModalTitle.textContent = 'Tạo Bộ Quiz Mới';
			DOM.inputQuizTitle.value = '';
			DOM.inputQuizDesc.value = '';
			DOM.rawSheetTextarea.value = '';
			renderPreviewGrid(JSON.parse(JSON.stringify(sampleQuestionsData)));
			if (bsModalCreateQuiz) bsModalCreateQuiz.show();
		});
	}

	window.__editQuiz = (quizId) => {
		const q = state.quizzes.find(item => item.id === quizId);
		if (!q) return;

		state.editingQuizId = quizId;
		DOM.quizModalTitle.textContent = 'Chỉnh Sửa Bộ Quiz';
		DOM.inputQuizTitle.value = q.title || '';
		DOM.inputQuizDesc.value = q.description || '';
		renderPreviewGrid(q.questions || []);
		if (bsModalCreateQuiz) bsModalCreateQuiz.show();
	};

	window.__deleteQuiz = async (quizId) => {
		if (!confirm('Bạn có chắc chắn muốn xóa bộ quiz này không?')) return;
		try {
			await db.collection('quiz_banks').doc(quizId).delete();
			showToast('Đã xóa bộ quiz thành công');
			loadQuizBank();
		} catch (error) {
			showToast('Lỗi khi xóa quiz: ' + error.message);
		}
	};

	window.__createRoomFromQuiz = (quizId) => {
		if (DOM.selectRoomQuiz) DOM.selectRoomQuiz.value = quizId;
		const q = state.quizzes.find(item => item.id === quizId);
		if (q && DOM.inputRoomName) DOM.inputRoomName.value = `Kiểm tra - ${q.title}`;
		if (bsModalCreateRoom) bsModalCreateRoom.show();
	};

	// ==========================================================================
	// 11. LIVE ROOM CREATOR & PROJECTOR QR
	// ==========================================================================
	function generateRoomCode() {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		let code = '';
		for (let i = 0; i < 6; i++) {
			code += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return code;
	}

	async function handleCreateRoom() {
		const quizId = DOM.selectRoomQuiz.value;
		const classId = DOM.selectRoomClass.value || null;
		const roomName = DOM.inputRoomName.value.trim();
		const timeLimit = parseInt(DOM.inputRoomTimeLimit.value, 10) || 0;
		const shuffleQ = DOM.checkShuffleQ.checked;
		const shuffleOpt = DOM.checkShuffleOpt.checked;
		const allowedEmailsRaw = DOM.inputRoomAllowedEmails.value.trim();

		if (!quizId) {
			showToast('Vui lòng chọn bộ quiz!');
			return;
		}
		if (!roomName) {
			showToast('Vui lòng nhập tên phòng thi!');
			return;
		}

		const quiz = state.quizzes.find(q => q.id === quizId);
		if (!quiz) {
			showToast('Không tìm thấy thông tin bộ quiz!');
			return;
		}

		let allowedEmails = [];
		if (allowedEmailsRaw) {
			allowedEmails = allowedEmailsRaw.split(/[\n,;\s]+/).map(e => e.trim().toLowerCase()).filter(e => e.includes('@'));
		}

		// If class is selected, auto-include enrolled students of that class
		if (classId) {
			const enrollments = await db.collection('class_enrollments').where('classId', '==', classId).get();
			enrollments.docs.forEach(d => {
				const e = d.data().userEmail;
				if (e && !allowedEmails.includes(e.toLowerCase())) allowedEmails.push(e.toLowerCase());
			});
		}

		const roomCode = generateRoomCode();

		try {
			DOM.btnSubmitCreateRoom.disabled = true;

			const roomPayload = {
				code: roomCode,
				name: roomName,
				quizId: quizId,
				quizTitle: quiz.title,
				classId: classId,
				hostEmail: state.currentUser.email,
				hostName: state.currentUser.displayName,
				status: 'active',
				settings: {
					timeLimitMinutes: timeLimit,
					shuffleQuestions: shuffleQ,
					shuffleOptions: shuffleOpt,
					allowedEmails: allowedEmails
				},
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				submissionCount: 0
			};

			await db.collection('quiz_rooms').doc(roomCode).set(roomPayload);

			if (bsModalCreateRoom) bsModalCreateRoom.hide();
			showToast(`Đã tạo phòng thành công! Mã PIN: ${roomCode}`);

			loadHostRooms();
			openProjectorModal(roomCode, roomName);

		} catch (error) {
			console.error('Create room error:', error);
			showToast('Lỗi tạo phòng: ' + error.message);
		} finally {
			DOM.btnSubmitCreateRoom.disabled = false;
		}
	}

	if (DOM.btnSubmitCreateRoom) {
		DOM.btnSubmitCreateRoom.addEventListener('click', (e) => {
			e.preventDefault();
			handleCreateRoom();
		});
	}

	if (DOM.btnOpenCreateRoomModal) {
		DOM.btnOpenCreateRoomModal.addEventListener('click', () => {
			if (state.quizzes.length === 0) {
				showToast('Kho quiz chưa có dữ liệu. Vui lòng tạo bộ quiz trước!');
				return;
			}
			if (bsModalCreateRoom) bsModalCreateRoom.show();
		});
	}

	async function loadHostRooms() {
		try {
			const snapshot = await db.collection('quiz_rooms')
				.orderBy('createdAt', 'desc')
				.limit(30)
				.get();

			state.hostRooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			if (DOM.hostRoomsListContainer) {
				if (state.hostRooms.length === 0) {
					DOM.hostRoomsListContainer.innerHTML = `
						<div class="text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Bạn chưa mở phòng thi nào.</p>
							<button class="btn-gold" onclick="document.getElementById('btnOpenCreateRoomModal').click()">+ Mở phòng đầu tiên</button>
						</div>
					`;
					return;
				}

				DOM.hostRoomsListContainer.innerHTML = '';
				state.hostRooms.forEach(room => {
					const card = document.createElement('div');
					card.className = 'room-card-item';
					const isActive = room.status === 'active';

					card.innerHTML = `
						<div class="d-flex flex-column gap-1" style="max-width: 55%;">
							<div class="d-flex align-items-center gap-2">
								<span class="room-code-badge">${room.code}</span>
								<h3 class="h6 medium m-0" style="color: var(--quiz-text-main);">${escapeHtml(room.name)}</h3>
								<span class="room-status-badge ${isActive ? 'active' : 'closed'}">${isActive ? 'Đang mở' : 'Đã đóng'}</span>
							</div>
							<span class="x-small" style="color: var(--quiz-text-muted);">Quiz: ${escapeHtml(room.quizTitle)}</span>
							<span class="x-small" style="color: var(--quiz-gold);">
								${room.settings?.timeLimitMinutes ? room.settings.timeLimitMinutes + ' phút' : 'Không giới hạn thời gian'} •
								${room.settings?.allowedEmails?.length ? 'Lớp (' + room.settings.allowedEmails.length + ' emails)' : 'Mở công khai'}
							</span>
						</div>
						<div class="d-flex gap-2 flex-wrap align-items-center">
							<button class="btn-outline-gold py-1 px-2" style="font-size: 12.5px;" onclick="window.__openProjector('${room.code}', '${escapeHtml(room.name)}')">
								<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
								</svg>
								<span>Mã QR</span>
							</button>
							<button class="btn-gold py-1 px-3" style="font-size: 12.5px;" onclick="window.__openRoomAnalytics('${room.code}')">
								📊 Báo Cáo
							</button>
							<button class="btn-secondary-dark py-1 px-2" style="font-size: 12px;" onclick="window.__toggleRoomStatus('${room.code}', '${room.status}')">
								${isActive ? 'Đóng phòng' : 'Mở lại'}
							</button>
							<button class="btn-danger-dark py-1 px-2" style="font-size: 12px;" onclick="window.__deleteRoom('${room.code}')">Xóa</button>
						</div>
					`;
					DOM.hostRoomsListContainer.appendChild(card);
				});
			}
		} catch (error) {
			console.error('Load host rooms error:', error);
		}
	}

	window.__openProjector = (roomCode, roomName) => {
		openProjectorModal(roomCode, roomName);
	};

	function openProjectorModal(roomCode, roomName) {
		DOM.projectorRoomName.textContent = roomName;
		DOM.projectorRoomCode.textContent = roomCode;

		const joinUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;

		DOM.projectorQrCanvas.innerHTML = '';
		if (typeof QRCode !== 'undefined') {
			new QRCode(DOM.projectorQrCanvas, {
				text: joinUrl,
				width: 200,
				height: 200,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.M
			});
		}

		DOM.btnCopyRoomLink.onclick = () => {
			navigator.clipboard.writeText(joinUrl);
			showToast('Đã sao chép link tham gia phòng!');
		};

		DOM.btnCopyRoomCode.onclick = () => {
			navigator.clipboard.writeText(roomCode);
			showToast('Đã sao chép mã PIN!');
		};

		DOM.modalProjectorQR.classList.add('visible');
	}

	if (DOM.btnCloseProjectorQR) {
		DOM.btnCloseProjectorQR.addEventListener('click', () => {
			DOM.modalProjectorQR.classList.remove('visible');
		});
	}

	window.__toggleRoomStatus = async (roomCode, currentStatus) => {
		const newStatus = currentStatus === 'active' ? 'closed' : 'active';
		try {
			await db.collection('quiz_rooms').doc(roomCode).update({ status: newStatus });
			showToast(newStatus === 'active' ? 'Đã mở lại phòng' : 'Đã đóng phòng nhận bài');
			loadHostRooms();
		} catch (err) {
			showToast('Lỗi: ' + err.message);
		}
	};

	window.__deleteRoom = async (roomCode) => {
		if (!confirm('Bạn có chắc muốn xóa phòng này không?')) return;
		try {
			await db.collection('quiz_rooms').doc(roomCode).delete();
			showToast('Đã xóa phòng thành công');
			loadHostRooms();
		} catch (err) {
			showToast('Lỗi: ' + err.message);
		}
	};

	// ==========================================================================
	// 12. PLAYER JOIN ROOM & INTERACTIVE PLAYING ENGINE
	// ==========================================================================
	async function joinRoomByCode(roomCode) {
		if (!roomCode) {
			showToast('Vui lòng nhập mã phòng PIN!');
			return;
		}

		try {
			DOM.btnJoinRoomSubmit.disabled = true;
			DOM.btnJoinRoomSubmit.textContent = 'Đang kiểm tra phòng...';

			const roomDoc = await db.collection('quiz_rooms').doc(roomCode).get();
			if (!roomDoc.exists) {
				showToast('Mã phòng không tồn tại! Vui lòng kiểm tra lại.');
				return;
			}

			const roomData = roomDoc.data();
			if (roomData.status !== 'active') {
				showToast('Phòng thi này hiện đã đóng nhận bài.');
				return;
			}

			// Whitelist check
			const allowed = roomData.settings?.allowedEmails || [];
			if (allowed.length > 0) {
				const userEmail = state.currentUser.email.toLowerCase();
				const isPermitted = allowed.some(email => email.toLowerCase() === userEmail);
				if (!isPermitted) {
					showToast('Email của bạn không nằm trong danh sách lớp học này. Vui lòng liên hệ giảng viên.');
					return;
				}
			}

			const quizDoc = await db.collection('quiz_banks').doc(roomData.quizId).get();
			if (!quizDoc.exists) {
				showToast('Không tìm thấy dữ liệu bộ quiz của phòng này!');
				return;
			}

			const quizData = quizDoc.data();
			let questions = JSON.parse(JSON.stringify(quizData.questions || []));

			if (questions.length === 0) {
				showToast('Bộ quiz này chưa có câu hỏi!');
				return;
			}

			if (roomData.settings?.shuffleQuestions) questions = shuffleArray(questions);
			if (roomData.settings?.shuffleOptions) {
				questions.forEach(q => { q.options = shuffleArray(q.options); });
			}

			startPlayingSession(roomCode, roomData, quizData, questions);

		} catch (error) {
			console.error('Join room error:', error);
			showToast('Lỗi khi vào phòng: ' + error.message);
		} finally {
			DOM.btnJoinRoomSubmit.disabled = false;
			DOM.btnJoinRoomSubmit.innerHTML = `
				<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
				<span>Vào phòng thi</span>
			`;
		}
	}

	if (DOM.btnJoinRoomSubmit) {
		DOM.btnJoinRoomSubmit.addEventListener('click', () => {
			const code = DOM.inputRoomPin.value.toUpperCase().trim();
			joinRoomByCode(code);
		});

		DOM.inputRoomPin.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				const code = DOM.inputRoomPin.value.toUpperCase().trim();
				joinRoomByCode(code);
			}
		});
	}

	async function loadActiveRoomsForPlayer() {
		try {
			const snapshot = await db.collection('quiz_rooms')
				.where('status', '==', 'active')
				.orderBy('createdAt', 'desc')
				.limit(10)
				.get();

			const activeRooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			const accessibleRooms = activeRooms.filter(room => {
				const allowed = room.settings?.allowedEmails || [];
				if (allowed.length === 0) return true;
				return allowed.some(e => e.toLowerCase() === state.currentUser?.email);
			});

			if (DOM.activeRoomsListContainer) {
				if (accessibleRooms.length === 0) {
					DOM.activeRoomsListContainer.innerHTML = `<div class="text-center py-3" style="color: var(--quiz-text-muted);">Hiện không có phòng thi nào đang mở dành cho bạn.</div>`;
					return;
				}

				DOM.activeRoomsListContainer.innerHTML = '';
				accessibleRooms.forEach(room => {
					const div = document.createElement('div');
					div.className = 'd-flex align-items-center justify-content-between p-3 rounded-3';
					div.style.background = 'var(--quiz-surface-2)';
					div.style.border = '0.5px solid var(--quiz-border)';

					div.innerHTML = `
						<div>
							<div class="d-flex align-items-center gap-2">
								<span class="room-code-badge font-monospace" style="font-size: 14px;">${room.code}</span>
								<span class="fw-bold" style="color: var(--quiz-text-main); font-size: 14px;">${escapeHtml(room.name)}</span>
							</div>
							<span class="x-small" style="color: var(--quiz-text-muted);">Quiz: ${escapeHtml(room.quizTitle)} • Host: ${escapeHtml(room.hostName || room.hostEmail)}</span>
						</div>
						<button class="btn-gold py-1 px-3" style="font-size: 13px;" onclick="window.__directJoin('${room.code}')">Vào phòng</button>
					`;
					DOM.activeRoomsListContainer.appendChild(div);
				});
			}
		} catch (err) {
			console.error('Load active rooms error:', err);
		}
	}

	if (DOM.btnRefreshActiveRooms) DOM.btnRefreshActiveRooms.addEventListener('click', loadActiveRoomsForPlayer);

	window.__directJoin = (code) => {
		DOM.inputRoomPin.value = code;
		joinRoomByCode(code);
	};

	function startPlayingSession(roomCode, roomData, quizData, questions) {
		state.activePlayingSession = {
			roomCode: roomCode,
			roomData: roomData,
			quizData: quizData,
			questions: questions,
			currentIdx: 0,
			answers: {},
			timeLimitSeconds: (roomData.settings?.timeLimitMinutes || 0) * 60,
			timeRemaining: (roomData.settings?.timeLimitMinutes || 0) * 60,
			startTime: Date.now(),
			timerInterval: null
		};

		switchTab('quizPlayScreen');
		DOM.playRoomTitle.textContent = roomData.name;

		renderQuestionNavigatorPills();
		renderCurrentActiveQuestion();

		if (state.activePlayingSession.timeLimitSeconds > 0) {
			DOM.playTimerBadge.style.display = 'inline-flex';
			startSessionTimer();
		} else {
			DOM.playTimerBadge.style.display = 'none';
		}
	}

	function startSessionTimer() {
		if (state.activePlayingSession.timerInterval) clearInterval(state.activePlayingSession.timerInterval);

		updateTimerDisplay();

		state.activePlayingSession.timerInterval = setInterval(() => {
			state.activePlayingSession.timeRemaining--;

			if (state.activePlayingSession.timeRemaining <= 60) {
				DOM.playTimerBadge.classList.add('urgent');
			} else {
				DOM.playTimerBadge.classList.remove('urgent');
			}

			if (state.activePlayingSession.timeRemaining <= 0) {
				clearInterval(state.activePlayingSession.timerInterval);
				showToast('Đã hết giờ làm bài! Hệ thống tự động nộp bài.');
				submitQuizPlaying();
				return;
			}

			updateTimerDisplay();
		}, 1000);
	}

	function updateTimerDisplay() {
		const rem = Math.max(0, state.activePlayingSession.timeRemaining);
		const mins = Math.floor(rem / 60);
		const secs = rem % 60;
		DOM.playTimerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}

	function renderQuestionNavigatorPills() {
		const total = state.activePlayingSession.questions.length;
		DOM.playQuestionPills.innerHTML = '';

		for (let i = 0; i < total; i++) {
			const pill = document.createElement('div');
			pill.className = 'q-nav-pill';
			pill.textContent = i + 1;

			if (i === state.activePlayingSession.currentIdx) pill.classList.add('current');
			if (state.activePlayingSession.answers[i] && state.activePlayingSession.answers[i].length > 0) {
				pill.classList.add('answered');
			}

			pill.addEventListener('click', () => {
				state.activePlayingSession.currentIdx = i;
				renderCurrentActiveQuestion();
				renderQuestionNavigatorPills();
			});

			DOM.playQuestionPills.appendChild(pill);
		}
	}

	function renderCurrentActiveQuestion() {
		const session = state.activePlayingSession;
		const idx = session.currentIdx;
		const total = session.questions.length;
		const q = session.questions[idx];

		DOM.playQuestionCounter.textContent = `Câu ${idx + 1} / ${total}`;
		const progressPct = ((idx + 1) / total) * 100;
		DOM.playProgressFill.style.width = `${progressPct}%`;

		const isMsq = q.type === 'MSQ';
		DOM.activeQTypeBadge.textContent = isMsq ? 'MSQ (Chọn nhiều đáp án)' : 'MCQ (Chọn 1 đáp án)';
		DOM.activeQTypeBadge.className = `q-type-badge ${isMsq ? 'msq' : 'mcq'}`;
		DOM.activeQPoints.textContent = `${q.points || 10} Điểm`;

		DOM.activeQText.textContent = q.question;
		if (q.image && q.image.trim()) {
			DOM.activeQImg.src = q.image;
			DOM.activeQImageContainer.style.display = 'flex';
		} else {
			DOM.activeQImageContainer.style.display = 'none';
		}

		DOM.activeQOptionsContainer.innerHTML = '';
		const currentSelected = session.answers[idx] || [];

		q.options.forEach((opt, optIndex) => {
			const letter = opt.key || String.fromCharCode(65 + optIndex);
			const isSelected = currentSelected.includes(letter);

			const btn = document.createElement('div');
			btn.className = `option-btn ${isSelected ? 'selected' : ''}`;
			btn.dataset.letter = letter;

			btn.innerHTML = `
				<div class="option-letter">${letter}</div>
				<span class="option-label-text">${escapeHtml(opt.text)}</span>
				<svg class="option-check-icon" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
				</svg>
			`;

			btn.addEventListener('click', () => {
				handleOptionClick(letter, isMsq);
			});

			DOM.activeQOptionsContainer.appendChild(btn);
		});

		DOM.btnPrevQuestion.disabled = (idx === 0);
		DOM.btnNextQuestion.textContent = (idx === total - 1) ? 'Hoàn thành' : 'Câu tiếp →';
	}

	function handleOptionClick(letter, isMsq) {
		const session = state.activePlayingSession;
		const idx = session.currentIdx;
		if (!session.answers[idx]) session.answers[idx] = [];

		if (isMsq) {
			if (session.answers[idx].includes(letter)) {
				session.answers[idx] = session.answers[idx].filter(l => l !== letter);
			} else {
				session.answers[idx].push(letter);
			}
		} else {
			session.answers[idx] = [letter];
		}

		renderCurrentActiveQuestion();
		renderQuestionNavigatorPills();
	}

	if (DOM.btnPrevQuestion) {
		DOM.btnPrevQuestion.addEventListener('click', () => {
			if (state.activePlayingSession && state.activePlayingSession.currentIdx > 0) {
				state.activePlayingSession.currentIdx--;
				renderCurrentActiveQuestion();
				renderQuestionNavigatorPills();
			}
		});
	}

	if (DOM.btnNextQuestion) {
		DOM.btnNextQuestion.addEventListener('click', () => {
			if (!state.activePlayingSession) return;
			const total = state.activePlayingSession.questions.length;
			if (state.activePlayingSession.currentIdx < total - 1) {
				state.activePlayingSession.currentIdx++;
				renderCurrentActiveQuestion();
				renderQuestionNavigatorPills();
			} else {
				confirmSubmitQuiz();
			}
		});
	}

	if (DOM.btnSubmitQuizEarly) DOM.btnSubmitQuizEarly.addEventListener('click', confirmSubmitQuiz);

	if (DOM.btnExitPlaying) {
		DOM.btnExitPlaying.addEventListener('click', () => {
			if (confirm('Bạn có chắc muốn thoát phòng thi? Tiến độ làm bài hiện tại sẽ không được lưu.')) {
				if (state.activePlayingSession?.timerInterval) clearInterval(state.activePlayingSession.timerInterval);
				state.activePlayingSession = null;
				switchTab('tabPlayer');
			}
		});
	}

	function confirmSubmitQuiz() {
		const session = state.activePlayingSession;
		if (!session) return;

		const total = session.questions.length;
		const answeredCount = Object.keys(session.answers).filter(k => session.answers[k].length > 0).length;
		const unansweredCount = total - answeredCount;

		let msg = `Bạn đã trả lời ${answeredCount}/${total} câu hỏi.`;
		if (unansweredCount > 0) {
			msg += `\nCòn ${unansweredCount} câu chưa chọn đáp án. Bạn có chắc chắn muốn nộp bài?`;
		} else {
			msg += `\nBạn có muốn nộp bài ngay bây giờ?`;
		}

		if (confirm(msg)) {
			submitQuizPlaying();
		}
	}

	// ==========================================================================
	// 13. SCORING ENGINE & RESULT REVIEW
	// ==========================================================================
	async function submitQuizPlaying() {
		const session = state.activePlayingSession;
		if (!session) return;

		if (session.timerInterval) clearInterval(session.timerInterval);

		const durationSeconds = Math.round((Date.now() - session.startTime) / 1000);
		const questions = session.questions;
		let totalScore = 0;
		let maxScore = 0;
		let correctCount = 0;

		const detailedResults = questions.map((q, idx) => {
			const userAns = (session.answers[idx] || []).sort();
			const correctAns = (q.correctAnswers || []).sort();
			const points = q.points || 10;
			maxScore += points;

			let isCorrect = false;
			if (userAns.length === correctAns.length && userAns.every((val, i) => val === correctAns[i])) {
				isCorrect = true;
				totalScore += points;
				correctCount++;
			}

			return {
				questionId: q.id,
				question: q.question,
				type: q.type,
				options: q.options,
				userAnswers: userAns,
				correctAnswers: correctAns,
				isCorrect: isCorrect,
				pointsEarned: isCorrect ? points : 0,
				explanation: q.explanation || ''
			};
		});

		const accuracyPct = Math.round((correctCount / questions.length) * 100);

		try {
			const subPayload = {
				roomCode: session.roomCode,
				classId: session.roomData.classId || null,
				quizId: session.quizData.id || session.roomData.quizId,
				quizTitle: session.quizData.title || session.roomData.quizTitle,
				roomName: session.roomData.name,
				userEmail: state.currentUser.email,
				userName: state.currentUser.displayName,
				userAvatar: state.currentUser.photoURL,
				answers: session.answers,
				detailedResults: detailedResults,
				score: totalScore,
				maxScore: maxScore,
				correctCount: correctCount,
				totalQuestions: questions.length,
				accuracy: accuracyPct,
				durationSeconds: durationSeconds,
				submittedAt: firebase.firestore.FieldValue.serverTimestamp()
			};

			const subId = `${session.roomCode}_${state.currentUser.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
			await db.collection('quiz_submissions').doc(subId).set(subPayload);

			// Update submission count on room
			await db.collection('quiz_rooms').doc(session.roomCode).update({
				submissionCount: firebase.firestore.FieldValue.increment(1)
			});

			// If belongs to class, update student enrollment stats
			if (session.roomData.classId) {
				const classId = session.roomData.classId;
				const enrollmentId = `${classId}_${state.currentUser.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
				const isPassed = accuracyPct >= 80;

				await db.collection('class_enrollments').doc(enrollmentId).set({
					classId: classId,
					userEmail: state.currentUser.email,
					studentName: state.currentUser.displayName,
					gpaScore: accuracyPct,
					passedQuizzesCount: isPassed ? firebase.firestore.FieldValue.increment(1) : firebase.firestore.FieldValue.increment(0),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				}, { merge: true });
			}

		} catch (error) {
			console.error('Save submission error:', error);
		}

		displayQuizResult(session.roomData.name, session.roomCode, totalScore, maxScore, correctCount, questions.length, accuracyPct, durationSeconds, detailedResults);
	}

	function displayQuizResult(roomName, roomCode, score, maxScore, correctCount, totalQuestions, accuracy, durationSeconds, detailedResults) {
		switchTab('quizResultScreen');

		DOM.resQuizTitle.textContent = roomName;
		DOM.resRoomInfo.textContent = `Phòng: ${roomCode} • Hoàn thành trong ${formatDuration(durationSeconds)}`;
		DOM.resScoreNum.textContent = score;
		DOM.resScoreMax.textContent = `/ ${maxScore} điểm`;
		DOM.resStatCorrect.textContent = `${correctCount} / ${totalQuestions}`;
		DOM.resStatAccuracy.textContent = `${accuracy}%`;
		DOM.resStatTime.textContent = formatDuration(durationSeconds);

		if (accuracy >= 80) {
			DOM.resStatusBadge.textContent = 'Hoàn thành xuất sắc 🏆';
			DOM.resStatusBadge.className = 'result-badge-pill excellent';
			if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
		} else if (accuracy >= 50) {
			DOM.resStatusBadge.textContent = 'Kết quả tốt 👍';
			DOM.resStatusBadge.className = 'result-badge-pill good';
		} else {
			DOM.resStatusBadge.textContent = 'Cần cố gắng thêm 📖';
			DOM.resStatusBadge.className = 'result-badge-pill fair';
		}

		DOM.reviewQuestionsList.innerHTML = '';
		detailedResults.forEach((res, idx) => {
			const card = document.createElement('div');
			card.className = `review-question-card ${res.isCorrect ? 'correct' : 'incorrect'}`;

			let optionsHtml = '';
			res.options.forEach(opt => {
				const letter = opt.key;
				const isCorrect = res.correctAnswers.includes(letter);
				const isUserSelected = res.userAnswers.includes(letter);

				let optClass = '';
				if (isCorrect) optClass = 'is-correct-ans';
				else if (isUserSelected && !isCorrect) optClass = 'is-user-wrong';

				optionsHtml += `
					<div class="review-opt-item ${optClass}">
						<span class="fw-bold font-monospace">${letter}.</span>
						<span class="flex-1">${escapeHtml(opt.text)}</span>
						${isCorrect ? '<span class="badge bg-success ms-auto">Đáp án đúng</span>' : ''}
						${(isUserSelected && !isCorrect) ? '<span class="badge bg-danger ms-auto">Bạn đã chọn</span>' : ''}
					</div>
				`;
			});

			card.innerHTML = `
				<div class="d-flex justify-content-between align-items-center mb-2">
					<span class="fw-bold" style="color: ${res.isCorrect ? 'var(--quiz-green)' : 'var(--quiz-red)'}; font-size: 14px;">
						Câu ${idx + 1}: ${res.isCorrect ? '✓ Đúng (+10đ)' : '✗ Sai (0đ)'}
					</span>
					<span class="x-small" style="color: var(--quiz-text-muted);">${res.type}</span>
				</div>
				<h4 class="h6 mb-3" style="color: var(--quiz-text-main); line-height: 1.4;">${escapeHtml(res.question)}</h4>
				<div class="d-flex flex-column gap-1">${optionsHtml}</div>
				${res.explanation ? `<div class="review-explanation-box"><b>Giải thích:</b> ${escapeHtml(res.explanation)}</div>` : ''}
			`;

			DOM.reviewQuestionsList.appendChild(card);
		});
	}

	if (DOM.btnScrollToReview) {
		DOM.btnScrollToReview.addEventListener('click', () => {
			document.getElementById('detailedReviewContainer').scrollIntoView({ behavior: 'smooth' });
		});
	}

	if (DOM.btnBackToHomeFromRes) {
		DOM.btnBackToHomeFromRes.addEventListener('click', () => {
			state.activePlayingSession = null;
			switchTab('tabPlayer');
		});
	}

	// ==========================================================================
	// 14. SUBMISSION HISTORY & REVIEW
	// ==========================================================================
	async function loadPlayerHistory() {
		if (!state.currentUser) return;
		try {
			const snapshot = await db.collection('quiz_submissions')
				.where('userEmail', '==', state.currentUser.email)
				.orderBy('submittedAt', 'desc')
				.limit(30)
				.get();

			const historyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			if (DOM.historyListContainer) {
				if (historyList.length === 0) {
					DOM.historyListContainer.innerHTML = `
						<div class="text-center py-5" style="color: var(--quiz-text-muted);">
							<p class="mb-3">Bạn chưa tham gia làm bài quiz nào.</p>
							<button class="btn-gold" onclick="switchTab('tabPlayer')">Tham gia phòng thi ngay</button>
						</div>
					`;
					return;
				}

				DOM.historyListContainer.innerHTML = '';
				historyList.forEach(sub => {
					const dateStr = sub.submittedAt ? new Date(sub.submittedAt.toDate()).toLocaleString('vi-VN') : 'Vừa xong';
					const card = document.createElement('div');
					card.className = 'room-card-item';

					card.innerHTML = `
						<div class="d-flex flex-column gap-1">
							<div class="d-flex align-items-center gap-2">
								<span class="room-code-badge font-monospace" style="font-size: 13px;">${sub.roomCode}</span>
								<h3 class="h6 medium m-0" style="color: var(--quiz-text-main);">${escapeHtml(sub.roomName || 'Phòng thi')}</h3>
							</div>
							<span class="x-small" style="color: var(--quiz-text-muted);">Quiz: ${escapeHtml(sub.quizTitle || '')} • Nộp lúc: ${dateStr}</span>
						</div>
						<div class="d-flex align-items-center gap-3">
							<div class="text-end">
								<span class="h5 medium d-block m-0" style="color: var(--quiz-gold);">${sub.score} / ${sub.maxScore || 100}</span>
								<span class="x-small" style="color: var(--quiz-green);">${sub.correctCount}/${sub.totalQuestions} câu đúng (${sub.accuracy || 0}%)</span>
							</div>
							<button class="btn-secondary-dark py-1 px-3" style="font-size: 13px;" onclick="window.__reviewHistorySub('${sub.id}')">Xem lại bài làm</button>
						</div>
					`;
					DOM.historyListContainer.appendChild(card);
				});
			}
		} catch (error) {
			console.error('Load history error:', error);
		}
	}

	if (DOM.btnRefreshHistory) DOM.btnRefreshHistory.addEventListener('click', loadPlayerHistory);

	window.__reviewHistorySub = async (subId) => {
		try {
			const doc = await db.collection('quiz_submissions').doc(subId).get();
			if (!doc.exists) return;
			const sub = doc.data();
			displayQuizResult(
				sub.roomName || 'Bài làm cũ',
				sub.roomCode,
				sub.score,
				sub.maxScore,
				sub.correctCount,
				sub.totalQuestions,
				sub.accuracy,
				sub.durationSeconds || 0,
				sub.detailedResults || []
			);
		} catch (err) {
			showToast('Lỗi xem lại bài làm: ' + err.message);
		}
	};

	// ==========================================================================
	// 15. HOST ROOM ANALYTICS & REAL-TIME LEADERBOARD
	// ==========================================================================
	window.__openRoomAnalytics = (roomCode) => {
		const room = state.hostRooms.find(r => r.code === roomCode);
		if (!room) return;

		state.activeAnalyticsRoom = room;
		DOM.analyticsModalRoomTitle.textContent = `Báo Cáo: ${room.name}`;
		DOM.analyticsModalSubtitle.textContent = `Mã phòng: ${room.code} • Quiz: ${room.quizTitle}`;

		if (bsModalRoomAnalytics) bsModalRoomAnalytics.show();

		if (state.analyticsListenerUnsub) state.analyticsListenerUnsub();

		state.analyticsListenerUnsub = db.collection('quiz_submissions')
			.where('roomCode', '==', roomCode)
			.orderBy('submittedAt', 'desc')
			.onSnapshot((snapshot) => {
				state.activeAnalyticsSubmissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				renderRoomAnalyticsDashboard();
			}, (err) => {
				console.error('Submissions listener error:', err);
			});
	};

	function renderRoomAnalyticsDashboard() {
		const subs = state.activeAnalyticsSubmissions;
		DOM.statTotalSubmissions.textContent = subs.length;

		if (subs.length === 0) {
			DOM.statAvgScore.textContent = '0';
			DOM.statAvgAccuracy.textContent = '0%';
			DOM.statHardestQuestion.textContent = '-';
			DOM.tbodyLeaderboard.innerHTML = `<tr><td colspan="7" class="text-center py-4" style="color: var(--quiz-text-muted);">Chưa có học viên nào nộp bài.</td></tr>`;
			DOM.analyticsQuestionsList.innerHTML = `<div class="text-center py-4" style="color: var(--quiz-text-muted);">Chưa có dữ liệu phân tích.</div>`;
			return;
		}

		const totalScores = subs.reduce((acc, s) => acc + (s.score || 0), 0);
		DOM.statAvgScore.textContent = Math.round(totalScores / subs.length);

		const totalAccuracy = subs.reduce((acc, s) => acc + (s.accuracy || 0), 0);
		DOM.statAvgAccuracy.textContent = `${Math.round(totalAccuracy / subs.length)}%`;

		const sortedLeaderboard = [...subs].sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return (a.durationSeconds || 0) - (b.durationSeconds || 0);
		});

		DOM.tbodyLeaderboard.innerHTML = '';
		sortedLeaderboard.forEach((sub, rankIdx) => {
			const tr = document.createElement('tr');
			let rankClass = '';
			if (rankIdx === 0) rankClass = 'top-1';
			else if (rankIdx === 1) rankClass = 'top-2';
			else if (rankIdx === 2) rankClass = 'top-3';

			const dateStr = sub.submittedAt ? new Date(sub.submittedAt.toDate()).toLocaleTimeString('vi-VN') : '-';

			tr.innerHTML = `
				<td><span class="rank-badge ${rankClass}">${rankIdx + 1}</span></td>
				<td>
					<div class="d-flex align-items-center gap-2">
						<img src="${sub.userAvatar || 'https://ui-avatars.com/api/?name=U'}" style="width: 24px; height: 24px; border-radius: 50%;">
						<span class="fw-bold">${escapeHtml(sub.userName || 'Thành viên')}</span>
					</div>
				</td>
				<td class="font-monospace x-small" style="color: var(--quiz-text-muted);">${escapeHtml(sub.userEmail)}</td>
				<td class="fw-bold" style="color: var(--quiz-gold);">${sub.score} / ${sub.maxScore || 100}</td>
				<td style="color: var(--quiz-green);">${sub.correctCount} / ${sub.totalQuestions}</td>
				<td class="font-monospace">${formatDuration(sub.durationSeconds || 0)}</td>
				<td class="x-small" style="color: var(--quiz-text-muted);">${dateStr}</td>
			`;
			DOM.tbodyLeaderboard.appendChild(tr);
		});

		const sampleDetailed = subs[0]?.detailedResults || [];
		const questionStats = sampleDetailed.map((qTemplate, qIdx) => {
			let correctInThisQ = 0;
			const optionDistribution = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };

			subs.forEach(sub => {
				const qResult = sub.detailedResults?.[qIdx];
				if (qResult) {
					if (qResult.isCorrect) correctInThisQ++;
					(qResult.userAnswers || []).forEach(letter => {
						if (optionDistribution[letter] !== undefined) optionDistribution[letter]++;
					});
				}
			});

			return {
				index: qIdx + 1,
				question: qTemplate.question,
				options: qTemplate.options,
				correctAnswers: qTemplate.correctAnswers,
				accuracy: Math.round((correctInThisQ / subs.length) * 100),
				distribution: optionDistribution
			};
		});

		if (questionStats.length > 0) {
			const sortedByHard = [...questionStats].sort((a, b) => a.accuracy - b.accuracy);
			DOM.statHardestQuestion.textContent = `Câu ${sortedByHard[0].index} (${sortedByHard[0].accuracy}% đúng)`;
		}

		DOM.analyticsQuestionsList.innerHTML = '';
		questionStats.forEach(stat => {
			const card = document.createElement('div');
			card.className = 'analytics-question-card';

			let optBarsHtml = '';
			(stat.options || []).forEach(opt => {
				const letter = opt.key;
				const isCorrect = stat.correctAnswers.includes(letter);
				const count = stat.distribution[letter] || 0;
				const pct = Math.round((count / subs.length) * 100);

				optBarsHtml += `
					<div class="stat-bar-row">
						<span class="stat-bar-lbl">${letter}.</span>
						<div class="stat-bar-track">
							<div class="stat-bar-fill ${isCorrect ? 'correct-opt' : ''}" style="width: ${pct}%;"></div>
						</div>
						<span class="stat-bar-pct">${pct}% (${count})</span>
						<span class="x-small text-truncate" style="max-width: 250px; color: ${isCorrect ? 'var(--quiz-green)' : 'var(--quiz-text-muted)'};">${escapeHtml(opt.text)}</span>
					</div>
				`;
			});

			card.innerHTML = `
				<div class="d-flex justify-content-between align-items-center mb-2">
					<span class="fw-bold" style="color: var(--quiz-text-main);">Câu ${stat.index}: ${escapeHtml(stat.question)}</span>
					<span class="badge" style="background: ${stat.accuracy >= 70 ? 'var(--quiz-green-bg)' : 'var(--quiz-red-bg)'}; color: ${stat.accuracy >= 70 ? 'var(--quiz-green)' : 'var(--quiz-red)'};">
						${stat.accuracy}% Trả lời đúng
					</span>
				</div>
				<div class="stat-bar-container">${optBarsHtml}</div>
			`;

			DOM.analyticsQuestionsList.appendChild(card);
		});
	}

	if (DOM.btnTabLeaderboard && DOM.btnTabQuestionStats) {
		DOM.btnTabLeaderboard.addEventListener('click', () => {
			DOM.btnTabLeaderboard.classList.add('active');
			DOM.btnTabQuestionStats.classList.remove('active');
			DOM.viewAnalyticsLeaderboard.style.display = 'block';
			DOM.viewAnalyticsQuestions.style.display = 'none';
		});

		DOM.btnTabQuestionStats.addEventListener('click', () => {
			DOM.btnTabQuestionStats.classList.add('active');
			DOM.btnTabLeaderboard.classList.remove('active');
			DOM.viewAnalyticsLeaderboard.style.display = 'none';
			DOM.viewAnalyticsQuestions.style.display = 'block';
		});
	}

	if (DOM.btnExportLeaderboardCsv) {
		DOM.btnExportLeaderboardCsv.addEventListener('click', () => {
			const subs = state.activeAnalyticsSubmissions;
			const room = state.activeAnalyticsRoom;
			if (subs.length === 0) {
				showToast('Chưa có bài nộp để xuất dữ liệu!');
				return;
			}

			let csv = "Hang,Ho va Ten,Email,Diem So,Diem Toi Da,So Cau Dung,Tong Cau,Do Chinh Xac,Thoi Gian (Giay),Thoi Gian Nop\n";
			subs.forEach((s, idx) => {
				const dateStr = s.submittedAt ? new Date(s.submittedAt.toDate()).toISOString() : '';
				csv += `"${idx + 1}","${s.userName || ''}","${s.userEmail || ''}","${s.score}","${s.maxScore}","${s.correctCount}","${s.totalQuestions}","${s.accuracy}%","${s.durationSeconds}","${dateStr}"\n`;
			});

			const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `BaoCao_${room?.code || 'Room'}_${Date.now()}.csv`;
			link.click();
			showToast('Đã xuất báo cáo CSV thành công!');
		});
	}

	// ==========================================================================
	// 16. IN-APP CAMERA QR SCANNER
	// ==========================================================================
	if (DOM.btnOpenScanner) {
		DOM.btnOpenScanner.addEventListener('click', () => {
			if (typeof Html5Qrcode === 'undefined') {
				showToast('Trình quét camera QR chưa sẵn sàng.');
				return;
			}

			DOM.qrReaderModal.classList.add('visible');
			state.html5QrScanner = new Html5Qrcode("qr-reader");

			state.html5QrScanner.start(
				{ facingMode: "environment" },
				{ fps: 10, qrbox: { width: 250, height: 250 } },
				(decodedText) => {
					state.html5QrScanner.stop().then(() => {
						DOM.qrReaderModal.classList.remove('visible');
					});

					let code = decodedText.trim();
					if (code.includes('room=')) code = code.split('room=')[1].split('&')[0];
					else if (code.includes('join=')) code = code.split('join=')[1].split('&')[0];

					DOM.inputRoomPin.value = code.toUpperCase();
					joinRoomByCode(code.toUpperCase());
				},
				() => {}
			).catch(err => {
				console.warn('Camera scan start error:', err);
				showToast('Không thể mở camera. Vui lòng cho phép quyền camera.');
				DOM.qrReaderModal.classList.remove('visible');
			});
		});
	}

	if (DOM.btnCloseQrScanner) {
		DOM.btnCloseQrScanner.addEventListener('click', () => {
			if (state.html5QrScanner) {
				state.html5QrScanner.stop().catch(() => {}).finally(() => {
					DOM.qrReaderModal.classList.remove('visible');
				});
			} else {
				DOM.qrReaderModal.classList.remove('visible');
			}
		});
	}

	// ==========================================================================
	// 17. HELPER UTILITIES
	// ==========================================================================
	function escapeHtml(text) {
		if (!text) return '';
		return String(text)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function shuffleArray(array) {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	function formatDuration(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}

	// ==========================================================================
	// 18. DOM INITIALIZATION
	// ==========================================================================
	document.addEventListener('DOMContentLoaded', () => {
		setupAuthObserver();
	});

})();
