/**
 * Shared certificate data layer — Firestore first, fallback to Google Apps Script.
 */
const CERTIFICATE_API_URL =
  "https://script.google.com/macros/s/AKfycbwW79mfaIZX5DHGSV9jX2o95GDWxCK_GqVlWqTxwmV9ZxVO4RnJnDsCLxF_9HpVM-WZ/exec";

const firebaseConfig = {
  apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
  authDomain: "uxcampvn.firebaseapp.com",
  projectId: "uxcampvn",
  storageBucket: "uxcampvn.firebasestorage.app",
  messagingSenderId: "491407083539",
  appId: "1:491407083539:web:8c1635c421989082a397e6",
  measurementId: "G-NLJWC0L47K"
};

function getFirestoreDb() {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase.firestore();
  }
  return null;
}

/** @type {Array<object>|null} */
let certificateCache = null;

/** @type {Promise<Array<object>>|null} */
let certificateFetchPromise = null;

/**
 * Load all certificates once; subsequent calls reuse cache or in-flight request.
 * @returns {Promise<Array<object>>}
 */
async function loadCertificates() {
  if (certificateCache) {
    return certificateCache;
  }

  if (certificateFetchPromise) {
    return certificateFetchPromise;
  }

  certificateFetchPromise = (async () => {
    // 1. Ưu tiên nạp từ Cloud Firestore collection 'certificates'
    const db = getFirestoreDb();
    if (db) {
      try {
        const snap = await db.collection('certificates').get();
        if (!snap.empty) {
          const list = [];
          snap.forEach(doc => {
            const d = doc.data() || {};
            // Ánh xạ sang cấu trúc tương thích với individual-certificate.js
            list.push({
              certificate_id: doc.id,
              certificate_code: d.certificateCode || '',
              cohort_id: d.cohortId || '',
              course_id: d.courseId || '',
              individual_email: d.recipientEmail || d.studentEmail || d.email || '',
              individual_name: d.recipientName || d.studentName || d.name || '',
              certificate_img_name: d.certificateImgName || (d.certificateImageUrl ? d.certificateImageUrl.replace(/.*\/([^/]+)\.webp$/, '$1') : ''),
              certificate_image_url: d.certificateImageUrl || '',
              bootcamp_cohort_end_date: d.issueDate || d.graduationDate || '',
              individual_social_link: d.recipientSocialLink || d.socialLink || '',
              bootcamp_name: d.courseTitle || d.bootcamp_name || '',
              bootcamp_cohort_name: d.cohortName || d.cohortTitle || d.cohortCode || '',
              certificate_pdf_url: d.certificatePdfUrl || '',
              final_project: d.finalProject || d.project || '',
              status: d.status || 'active',
              raw: d
            });
          });
          certificateCache = list;
          return certificateCache;
        }
      } catch (firestoreErr) {
        console.warn('[certificate-api] Firestore read notice, falling back to Sheet API:', firestoreErr);
      }
    }

    // 2. Fallback sang Google Apps Script API nếu Firestore rỗng hoặc offline
    const response = await fetch(CERTIFICATE_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load certificates (${response.status})`);
    }

    const data = await response.json();
    certificateCache = Array.isArray(data.certificate) ? data.certificate : [];
    return certificateCache;
  })();

  try {
    return await certificateFetchPromise;
  } catch (error) {
    certificateFetchPromise = null;
    throw error;
  }
}

/**
 * Tải trực tiếp thông tin Khóa học & Lớp học từ Firebase Firestore
 * Không sử dụng dữ liệu tĩnh fallback từ bootcamp-content.js.
 * @param {object} certificate
 * @returns {Promise<object|null>}
 */
async function fetchBootcampContentFromFirebase(certificate) {
  const db = getFirestoreDb();
  if (!db || !certificate) return null;

  try {
    let courseData = null;
    let cohortData = null;

    const courseId = certificate.course_id || certificate.raw?.courseId;
    const cohortId = certificate.cohort_id || certificate.raw?.cohortId;

    // 1. Nạp Lớp học (Cohort) theo cohortId từ Firestore
    if (cohortId) {
      try {
        const chDoc = await db.collection('cohorts').doc(cohortId).get();
        if (chDoc.exists) {
          cohortData = { id: chDoc.id, ...chDoc.data() };
          // Cập nhật tên lớp chính xác từ Firestore
          const cName = cohortData.name || cohortData.title || (cohortData.code ? `[${cohortData.code}]` : '');
          if (cName) {
            certificate.bootcamp_cohort_name = cName;
          }
          if (cohortData.endDate) {
            certificate.bootcamp_cohort_end_date = cohortData.endDate;
          }
          // Nếu cert chưa có courseId thì lấy courseId từ cohort
          if (!courseId && cohortData.courseId) {
            certificate.course_id = cohortData.courseId;
          }
        }
      } catch (chErr) {
        console.warn('[fetchBootcampContentFromFirebase] Error loading cohort:', chErr);
      }
    }

    // 2. Nạp Khóa học (Course) theo courseId từ Firestore
    const effectiveCourseId = certificate.course_id || certificate.raw?.courseId || cohortData?.courseId;
    if (effectiveCourseId) {
      try {
        const cDoc = await db.collection('courses').doc(effectiveCourseId).get();
        if (cDoc.exists) {
          courseData = { id: cDoc.id, ...cDoc.data() };
        }
      } catch (cErr) {
        console.warn('[fetchBootcampContentFromFirebase] Error loading course by id:', cErr);
      }
    }

    // Nếu không có courseId, tra cứu khóa học theo tên khóa học từ Firestore
    if (!courseData && certificate.bootcamp_name) {
      try {
        const qSnap = await db.collection('courses').where('title', '==', certificate.bootcamp_name).limit(1).get();
        if (!qSnap.empty) {
          courseData = { id: qSnap.docs[0].id, ...qSnap.docs[0].data() };
        }
      } catch (qErr) {
        console.warn('[fetchBootcampContentFromFirebase] Error querying course by title:', qErr);
      }
    }

    if (courseData) {
      const title = courseData.title || certificate.bootcamp_name || 'Bootcamp';
      certificate.bootcamp_name = title;
      const tagline = courseData.tagline || '';
      const learningDurationHours = courseData.durationHours || courseData.duration || null;

      // Danh sách nội dung đào tạo (What You Will Learn): lấy từ Firestore
      let whatYouWillLearn = [];
      if (Array.isArray(courseData.whatYouWillLearn) && courseData.whatYouWillLearn.length > 0) {
        whatYouWillLearn = courseData.whatYouWillLearn;
      } else if (courseData.desc) {
        whatYouWillLearn = courseData.desc.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      } else if (courseData.description) {
        whatYouWillLearn = courseData.description.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      }

      // Kỹ năng đầu ra (Skills): lấy từ mảng skills trong Firestore
      let skills = [];
      if (Array.isArray(courseData.skills) && courseData.skills.length > 0) {
        skills = courseData.skills;
      } else if (courseData.skills && typeof courseData.skills === 'string') {
        skills = courseData.skills.split(',').map(s => s.trim()).filter(Boolean);
      }

      // CTA Link đến landing page khóa học từ Firestore url / slug
      const ctaHref = courseData.courseUrl || courseData.url || (courseData.slug ? `../${courseData.slug}.html` : '');
      const cta = ctaHref ? {
        label: `Explore this bootcamp →`,
        href: ctaHref
      } : null;

      return {
        title,
        tagline,
        learningDurationHours,
        whatYouWillLearn,
        skills,
        cta,
        cohort: cohortData
      };
    }
  } catch (err) {
    console.warn('[fetchBootcampContentFromFirebase] Error:', err);
  }

  return null;
}
