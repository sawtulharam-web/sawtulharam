// ─── Central sheikh data file ────────────────────────────────────────────────
// Edit names, bios, and titles here. Images are imported from attached_assets/.

import sheikhYasser   from '@assets/الشيخ_ياسر_بن_راشد_بن_حسين_الودعاني_الدوسري_1783531655013.png';
import sheikhMaher    from '@assets/الشيخ_ماهر_بن_حمد_بن_محمد_المعيقلي_1783531655012.png';
import sheikhSudais   from '@assets/الشيخ_عبد_الرحمن_بن_عبد_العزيز_السديس_1783531655010.png';
import sheikhAbdullah from '@assets/الشيخ_عبد_الله_بن_عواد_الجهني_1783531655010.png';
import sheikhBaleelah from '@assets/الشيخ_بندر_بن_عبد_العزيز_بليلة_1783531655012.png';
import sheikhBadr     from '@assets/الشيخ_بدر_بن_محمد_التركي_1783531655008.png';
import sheikhWaleed   from '@assets/الشيخ_الوليد_بن_خالد_الشمسان_1783531655011.png';
import sheikhUsama    from '@assets/الشیخ_أسامة_بن_عبداللہ_خياط.png';
import sheikhFaisal   from '@assets/الشيخ_فيصل_غزاوي.png'
import sheikhSaleh    from '@assets/معالي_الشيخ_صالح_بن_حميد.png'

export interface Sheikh {
  key: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
  youtubeShorts?: string;
  youtubeVideos?: string;
}

// ─── ORDER HERE controls the default carousel order ───────────────────────────
// Yasser, Maher, Sudais appear first as requested.
export const SHEIKHS: Sheikh[] = [
  {
    key: 'yasser',
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور ياسر بن راشد الدوسري',
    nameEn: 'His Eminence Sheikh Professor Dr. Yasser bin Rashid Al-Dossary',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr: `
هو فضيلة الشيخ الأستاذ الدكتور ياسر بن راشد بن حسين الودعاني الدوسري، إمام وخطيب المسجد الحرام، وأستاذ في الفقه المقارن، ومن القرّاء المعروفين بجمال الصوت وحسن الأداء في تلاوة كتاب الله تعالى.

وُلِد الشيخ ياسر الدوسري عام 1400هـ (1980م) في محافظة الخرج بالمملكة العربية السعودية، ونشأ محبًّا للقرآن الكريم منذ صغره؛ حيث أتمَّ حفظ جزء عمّ في سن السادسة قبل التحاقه بالتعليم النظامي، ثم أتمَّ حفظ القرآن الكريم كاملًا قبل بلوغه الخامسة عشرة من عمره.

تلقى الشيخ العلم على أيدي عدد من العلماء والمشايخ، ومن أبرزهم: سماحة الشيخ عبد الله بن جبرين، وسماحة الشيخ عبد العزيز بن عبد الله آل الشيخ، ومعالي الشيخ صالح الفوزان.

حصل الشيخ الدوسري على درجة البكالوريوس في الشريعة الإسلامية من كلية الشريعة بجامعة الإمام محمد بن سعود الإسلامية، ثم نال درجة الماجستير والدكتوراه في الفقه المقارن من المعهد العالي للقضاء بالجامعة نفسها.

ويعمل الشيخ عضوًا في هيئة التدريس بجامعة الملك سعود، وله إسهامات علمية متعددة في الفقه والدراسات الإسلامية.

بدأ الشيخ ياسر الدوسري إمامة عدد من المساجد في مدينة الرياض، ثم كانت أول إمامة له في المسجد الحرام عام 1436هـ لصلاة التراويح والتهجد، وفي يوم 13 صفر 1441هـ صدر الأمر بتعيينه إمامًا رسميًا للمسجد الحرام.

يُعدّ الشيخ الأستاذ الدكتور ياسر الدوسري من أبرز أئمة المسجد الحرام، جمع الله له بين العلم الشرعي، والتعليم الأكاديمي، والعناية بكتاب الله حفظًا وتلاوةً، فكان صوته حاضرًا في قلوب الملايين من المسلمين حول العالم.
`,
    bioEn: `
Sheikh Professor Dr. Yasser bin Rashid Al-Dossary is an Imam and Preacher of Masjid al-Haram. He is known for his beautiful voice, moving recitation, and dedication to the Qur'an.

He was born in Al-Kharj, Saudi Arabia in 1400 AH (1980 CE). He memorized the Qur'an at an early age and studied under renowned scholars.

He obtained his Bachelor's degree in Islamic Law from Imam Muhammad ibn Saud Islamic University, followed by Master's and Doctoral degrees in Comparative Fiqh from the Higher Institute of Judiciary.

He serves as a faculty member at King Saud University and has contributed numerous academic works in Islamic studies.

He began leading prayers in mosques in Riyadh and later served as a guest Imam at Masjid al-Haram during Ramadan before being officially appointed as an Imam of the Holy Mosque in 1441 AH.

He is among the prominent Imams of Masjid al-Haram, combining Islamic scholarship, academic excellence, and beautiful Qur'anic recitation.
`,
    image: sheikhYasser,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pcOPcxAsLt_gQw0AfyFyBfO',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9peFa6uBEtVaHfHuv9EYOtnm',
  },
  {
    key: 'maher',
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور ماهر بن حمد المعيقلي',
    nameEn: 'His Eminence Sheikh Professor Dr. Maher Al-Muaiqly',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr: `
فضيلة الشيخ الدكتور ماهر بن حمد بن معيقل المعيقلي البلوي، إمام وخطيب المسجد الحرام.

حفظ الشيخ القرآن الكريم، ودرس بكلية المعلمين في المدينة المنورة، وتخرج منها معلماً لمادة الرياضيات، ثم انتقل للعمل في مكة المكرمة معلماً، وبعد ذل ك عمل مرشداً طلابياً في مدرسة الأمير عبد المجيد بمكة المكرمة.

حصل الشيخ المعيقلي على درجة الماجستير في الفقه من كلية الشريعة بجامعة أم القرى عام 1425هـ، ثم نال درجة الدكتوراه في التفسير من الجامعة نفسها عام 1432هـ، كما حصل على درجة الدكتوراه في الفقه بتقدير ممتاز مع مرتبة الشرف الأولى.

يعمل الشيخ أستاذاً مساعداً بقسم الدراسات القضائية بكلية الدراسات القضائية والأنظمة بجامعة أم القرى، وشغل منصب وكيل الكلية للدراسات العليا والبحث العلمي.

تولى الشيخ المعيقلي إمامة وخطبة جامع السعدي بحي العوالي بمكة المكرمة، ثم أمَّ المصلين في المسجد النبوي الشريف خلال شهر رمضان عامي 1426هـ و1427هـ.

وفي عام 1428هـ تولى إمامة المصلين في صلاتي التراويح والتهجد بالمسجد الحرام، وعُيّن إماماً رسمياً للمسجد الحرام في العام نفسه، ولا يزال من أئمته حتى اليوم.

يُعد الشيخ ماهر المعيقلي من أشهر قرّاء العالم الإسلامي، وقد اشتهر بصوته الجميل وتلاوته الخاشعة المؤثرة.
`,
    bioEn: `
Sheikh Dr. Maher bin Hamad Al-Muaiqly Al-Balawi is an Imam and Preacher of Masjid al-Haram.

He memorized the Qur'an and studied at the Teachers College in Madinah, graduating as a mathematics teacher before moving to Makkah, where he worked as a teacher and later as a student counselor.

Sheikh Maher obtained his Master's degree in Fiqh from the College of Sharia at Umm Al-Qura University in 1425 AH, followed by a Doctorate in Tafsir from the same university in 1432 AH. He also earned a Doctorate in Fiqh with first-class honors.

He works as an Assistant Professor in the Department of Judicial Studies at Umm Al-Qura University and has served as Vice Dean for Graduate Studies and Scientific Research.

He led prayers at Al-Saadi Mosque in Makkah, then served as an Imam at Masjid an-Nabawi during Ramadan in 1426 AH and 1427 AH.

In 1428 AH, he began leading Taraweeh and Tahajjud prayers at Masjid al-Haram and was officially appointed as an Imam of the Holy Mosque in the same year.

Sheikh Maher Al-Muaiqly is among the most renowned Qur'an reciters in the Islamic world, known for his beautiful voice and deeply moving recitation.
`,
    image: sheikhMaher,
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pfctpwPJcMdx1Zfv2vEzroP',
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pe9ARRHe1BBcAHZt_Ka7f9F',
  },
  { 
    key: 'sudais',
    nameAr: 'معالي الشيخ الأستاذ الدكتور عبدالرحمن بن عبدالعزيز السديس',
    nameEn: 'His Eminence Sheikh Professor Dr. Sheikh Abdulrahman Al-Sudais',
    titleAr: 'رئيس الشؤون الدينية للحرمين الشريفين',
    titleEn: 'President of Religious Affairs of the Two Holy Mosques',
    bioAr: `
معالي الشيخ الأستاذ الدكتور عبد الرحمن بن عبد العزيز السديس، إمام وخطيب المسجد الحرام، ورئيس الشؤون الدينية بالمسجد الحرام والمسجد النبوي.

وُلد الشيخ عبدالرحمن السديس في مدينة الرياض عام 1382هـ، وحفظ القرآن الكريم في سن مبكرة، وتدرج في التعليم حتى تخرج في كلية الشريعة بجامعة الإمام محمد بن سعود الإسلامية عام 1403هـ.

عُيّن إماماً وخطيباً للمسجد الحرام عام 1404هـ، ومنذ ذلك الحين أصبح صوته من أشهر الأصوات القرآنية التي ارتبطت بتلاوات الحرم المكي الشريف.

حصل على درجة الماجستير من كلية الشريعة بجامعة الإمام محمد بن سعود الإسلامية عام 1408هـ، ثم نال درجة الدكتوراه من كلية الشريعة بجامعة أم القرى عام 1416هـ، وعُيّن أستاذاً بالجامعة.

صدر الأمر السامي عام 1433هـ بتعيينه رئيساً لرئاسة شؤون المسجد الحرام والمسجد النبوي، ثم صدر الأمر الكريم عام 1445هـ بتعيينه رئيساً للشؤون الدينية بالمسجد الحرام والمسجد النبوي.

تلقى العلم على أيدي عدد من العلماء، ومن أبرزهم:
سماحة الشيخ عبدالعزيز بن عبدالله بن باز،
والشيخ عبدالرزاق عفيفي،
والشيخ عبدالله بن عبدالرحمن الغديان.

تصدر للتدريس في المسجد الحرام منذ عام 1417هـ، ودرّس عدداً من العلوم الشرعية، ومنها التفسير، والتوحيد، والحديث، والفقه.

وله عدد من المؤلفات والخطب والمحاضرات العلمية، ويُعد من أبرز أئمة المسجد الحرام في العصر الحديث، جمع الله له بين العلم والإمامة والعناية بكتاب الله تعالى.
`,
    bioEn: `
His Excellency Sheikh Professor Dr. Abdulrahman bin Abdulaziz Al-Sudais is the Imam and Preacher of Masjid al-Haram and President of Religious Affairs of the Two Holy Mosques.

Sheikh Abdulrahman Al-Sudais was born in Riyadh in 1382 AH. He memorized the Qur'an at an early age and continued his education until graduating from the College of Sharia at Imam Muhammad ibn Saud Islamic University in 1403 AH.

He was appointed Imam and Preacher of Masjid al-Haram in 1404 AH. Since then, his recitation has become among the most recognized voices associated with the Holy Mosque.

He obtained his Master's degree from the College of Sharia at Imam Muhammad ibn Saud Islamic University in 1408 AH, followed by his Doctorate from the College of Sharia at Umm Al-Qura University in 1416 AH, where he was later appointed as a professor.

In 1433 AH, he was appointed President of the General Presidency for the Affairs of the Two Holy Mosques, and in 1445 AH he was appointed President of Religious Affairs of Masjid al-Haram and Masjid an-Nabawi.

He studied under several renowned scholars, including Sheikh Abdulaziz ibn Baz, Sheikh Abdulrazzaq Afifi, and Sheikh Abdullah Al-Ghadyan.

He has taught at Masjid al-Haram since 1417 AH, teaching various Islamic sciences including Tafsir, Tawheed, Hadith, and Fiqh.

He is among the most prominent Imams of Masjid al-Haram, combining scholarship, leadership, and devotion to the Qur'an.
`,
    image: sheikhSudais,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pfuRHn5fkhWPhXcbStjdt-f',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pcM4NX3-Swiu8FBNkAxtpWc',
  },
  {
    key: 'abdullah',
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور عبدالله بن عواد الجهني',
    nameEn: 'His Eminence Sheikh Professor Dr. Sheikh Abdullah Al-Juhany',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr: `
فضيلة الشيخ الأستاذ الدكتور عبدالله بن عواد الجهني، إمام المسجد الحرام.

هو عبد الله بن عواد بن فهد الذبياني الجهني، وُلد في المدينة المنورة عام 1396هـ، ونشأ محباً لكتاب الله تعالى، حيث حفظ القرآن الكريم في سن مبكرة.

فاز الشيخ بالمركز الأول مكرر في مسابقة القرآن الكريم العالمية في مكة المكرمة وعمره ستة عشر عاماً، ثم واصل دراسته في الجامعة الإسلامية بالمدينة المنورة، وحصل على درجة البكالوريوس من كلية القرآن الكريم.

انتقل بعد ذلك إلى جامعة أم القرى بمكة المكرمة، حيث عمل معيداً بكلية الدعوة وأصول الدين قسم الكتاب والسنة، ثم حصل على درجة الماجستير في تفسير القرآن الكريم عام 1430هـ، ونال درجة الدكتوراه عام 1433هـ.

أمَّ الشيخ الجهني المسلمين في مسجد القبلتين، ثم في المسجد النبوي الشريف، وبعد ذلك عُيّن عضواً في هيئة التدريس بكلية المعلمين بالمدينة المنورة.

صدر له تكليف من المقام السامي بإمامة المسلمين في المسجد الحرام خلال صلاة التراويح في شهر رمضان لعامي 1426هـ و1427هـ، ولا يزال من أئمة المسجد الحرام.

أجازه عدد من علماء القراءات المعروفين، ومنهم الشيخ الزيات، والشيخ إبراهيم الأخضر، والشيخ علي الحذيفي، والشيخ محمد أيوب.
`,
    bioEn: `
Sheikh Professor Dr. Abdullah bin Awad Al-Juhany is an Imam of Masjid al-Haram.

He was born in Madinah in 1396 AH and memorized the Qur'an at an early age. He achieved first place in the International Qur'an Competition in Makkah at the age of sixteen.

He studied at the Islamic University of Madinah and obtained his Bachelor's degree from the College of Qur'an. He later joined Umm Al-Qura University in Makkah, where he worked in the Department of Qur'an and Sunnah.

He obtained his Master's degree in Qur'anic Tafsir in 1430 AH and his Doctorate in 1433 AH.

Sheikh Abdullah Al-Juhany led prayers at Masjid al-Qiblatayn and Masjid an-Nabawi before being appointed to the faculty of the Teachers College in Madinah.

He was assigned to lead Taraweeh prayers at Masjid al-Haram during Ramadan in 1426 AH and 1427 AH and continues to serve as one of the Imams of the Holy Mosque.

He received Qur'anic recitation certifications from several renowned scholars, including Sheikh Al-Zayyat, Sheikh Ibrahim Al-Akhdar, Sheikh Ali Al-Hudhaifi, and Sheikh Muhammad Ayyub.
`,
    image: sheikhAbdullah,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9peA2TStaHODXWdjQvLqnNd4',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pefs9YfJWwf26NWhSMAh9za',
  },
  {
    key: 'baleelah',
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور بندر بن عبدالعزيز بليلة',
    nameEn: 'Sheikh Bandar Baleelah',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr: `
فضيلة الشيخ الدكتور بندر بن عبدالعزيز بليلة، إمام وخطيب المسجد الحرام.

هو بندر بن عبدالعزيز بن سراج بن عبد الملك بليلة، وُلد في مكة المكرمة عام 1395هـ، ونشأ فيها، وحفظ القرآن الكريم منذ صغره وأتقنه على أيدي عدد من أهل القرآن.

التحق بجامعة أم القرى بكلية الشريعة والدراسات الإسلامية، وتخرج منها عام 1417هـ، ثم واصل دراساته العليا في الفقه الإسلامي، وحصل على درجة الماجستير عام 1422هـ.

ثم حصل على درجة الدكتوراه في الفقه الإسلامي من الجامعة الإسلامية بالمدينة المنورة عام 1429هـ بتقدير ممتاز.

عمل مدرساً متعاوناً للفقه في معهد الحرم المكي الشريف، وعُيّن أستاذاً مساعداً بقسم الشريعة في كلية الشريعة والأنظمة بجامعة الطائف.

تولى الإمامة والخطابة في عدد من مساجد مكة المكرمة، ثم كُلّف بإمامة التراويح في المسجد الحرام عام 1434هـ، وعُيّن إماماً رسمياً للمسجد الحرام في العام نفسه.

وفي عام 1441هـ صدر الأمر الملكي الكريم بتعيينه خطيباً للمسجد الحرام، كما صدر الأمر الملكي باختياره عضواً في هيئة كبار العلماء عام 1442هـ.
`,
    bioEn: `
Sheikh Dr. Bandar bin Abdulaziz Baleelah is an Imam and Preacher of Masjid al-Haram.

He was born in Makkah in 1395 AH and memorized the Qur'an at an early age. He studied at Umm Al-Qura University in the College of Sharia and Islamic Studies, graduating in 1417 AH.

He continued his higher studies in Islamic jurisprudence, obtaining his Master's degree in Fiqh in 1422 AH and his Doctorate in Islamic Fiqh from the Islamic University of Madinah in 1429 AH.

He worked as a cooperative lecturer of Fiqh at the Institute of the Grand Mosque of Makkah and later became an Assistant Professor in the Department of Sharia at Taif University.

He served as Imam and preacher in several mosques in Makkah before being assigned to lead Taraweeh prayers at Masjid al-Haram in 1434 AH and appointed as an official Imam of the Holy Mosque that year.

In 1441 AH, he was appointed as a preacher of Masjid al-Haram, and in 1442 AH he was selected as a member of the Council of Senior Scholars.
`,
    image: sheikhBaleelah,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pd6xViQYt7WWdNFAhl1E086',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pf-WkbmP_O3c2TTE6UsI04r',
  },
  {
    key: 'badr',
    nameAr: 'فضيلة الشيخ الأستاذ بدر بن محمد التركي',
    nameEn: 'His Eminence Sheikh Professor Badr Al-Turki',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr: `
فضيلة الشيخ بدر بن محمد بن عبدالله بن صالح التركي، إمام المسجد الحرام.

وُلد الشيخ بدر التركي يوم الثلاثاء 22/11/1404هـ في مدينة بريدة بالمملكة العربية السعودية.

درس مراحل التعليم الأولى في مدينة بريدة، ثم التحق بالمعهد العلمي ببريدة، حيث درس المرحلتين المتوسطة والثانوية.

حصل على درجة البكالوريوس من كلية الدعوة بجامعة الإمام محمد بن سعود الإسلامية بالرياض عام 1433هـ، ثم حصل على درجة الماجستير من المعهد العالي للدعوة والاحتساب عام 1442هـ، وكان عنوان بحثه: "الاحتساب على مخالفات المصاب".

عمل موظفاً في جامعة القصيم لمدة ثماني سنوات، ثم انتقل للعمل في الرئاسة العامة لهيئة الأمر بالمعروف والنهي عن المنكر.

بدأ مسيرته الإمامية مؤذناً ثم إماماً في مسجد الشيخ صالح البليهي ببريدة، ثم تولى الإمامة والخطابة في عدد من الجوامع، منها جامع عمر بن عبدالعزيز وجامع الشيخ عبدالله النصيان.

كُلّف لاحقاً بإمامة وخطابة جامع والدة الأمير بندر بن عبدالعزيز بمدينة الرياض، كما حصل على إجازة بالسند المتصل برواية الإمام عاصم براوييه شعبة وحفص في القراءة والإقراء.

سجّل ختمة كاملة لإذاعة القرآن الكريم في المملكة العربية السعودية عام 1441هـ، وله مشاركات في تسجيل التلاوات القرآنية في عدد من الإذاعات.
`,
    bioEn: `
Sheikh Badr bin Muhammad Al-Turki is an Imam of Masjid al-Haram.

He was born on 22/11/1404 AH in Buraydah, Saudi Arabia.

He completed his early education in Buraydah and later studied at the Scientific Institute of Buraydah.

He obtained his Bachelor's degree from the College of Da'wah at Imam Muhammad ibn Saud Islamic University in Riyadh in 1433 AH. He later earned his Master's degree from the Higher Institute of Da'wah and Accountability in 1442 AH.

He worked at Qassim University for eight years before joining the General Presidency of the Committee for the Promotion of Virtue and Prevention of Vice.

Sheikh Badr began his journey in the mosques as a muezzin and Imam at Sheikh Saleh Al-Bulaihi Mosque in Buraydah. He later served as Imam and preacher at several mosques.

He has received an authenticated Qur'anic recitation chain in the narration of Imam Asim through Shu'bah and Hafs and completed a full Qur'an recitation recording for Saudi Arabia's Qur'an Radio in 1441 AH.
`,
    image: sheikhBadr,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pc8fuwN_WCKR2zQAX0zBRh2',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pczaNd-xShtdB1kWuMOqT2X',
  },
  {
    key: 'waleed',
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور الوليد بن خالد الشمسان',
    nameEn: 'His Eminence Sheikh Professor Dr. Al-Waleed Al-Shamsan',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr: `
فضيلة الدكتور الوليد بن خالد بن إبراهيم الشمسان، إمام المسجد الحرام.

وُلد الشيخ الوليد الشمسان عام 1410هـ، ونشأ محباً لكتاب الله تعالى، وتلقى العلم والقراءات على أيدي عدد من العلماء المتخصصين.

حصل على درجة الماجستير مع مرتبة الشرف الأولى من الجامعة الإسلامية بالمدينة المنورة من كلية القرآن الكريم.

حصل على إسناد القرآن الكريم برواية حفص عن عاصم على يد الشيخ المقرئ الدكتور علي بن عبدالرحمن الحذيفي، كما حصل على إسناد بالقراءات العشر المتواترة من طريق الشاطبية والدرة على يد الشيخ المقرئ الأستاذ الدكتور محمد سلامة ربيع.

عمل أستاذاً مشاركاً في كلية القرآن بالجامعة الإسلامية، ثم أستاذاً مشاركاً في قسم القراءات بجامعة أم القرى، كما أشرف على المقرأة الإلكترونية العالمية وبرنامج الإقراء والقراءات والإجازات القرآنية بالمسجد الحرام.

أمَّ الشيخ في عدد من المساجد، منها جامع السطيحي، ومسجد القبلتين، وجامع الخندق، ومسجد قباء، ثم المسجد الحرام.

كان إماماً لمسجد قباء، ثم كُلّف بإمامة المسجد الحرام عام 1445هـ، وأصبح إماماً رسمياً للمسجد الحرام عام 1446هـ.

يُعد الشيخ الوليد الشمسان من القرّاء المتخصصين في علم القراءات، جمع بين العلم الأكاديمي والعناية بكتاب الله تعالى.
`,
    bioEn: `
Dr. Al-Waleed bin Khalid Al-Shamsan is an Imam of Masjid al-Haram.

He was born in 1410 AH and grew up with a deep connection to the Qur'an and its sciences.

He obtained his Master's degree with first-class honors from the College of Qur'an at the Islamic University of Madinah.

He holds an authenticated Qur'anic chain in the narration of Hafs from Asim through Sheikh Dr. Ali bin Abdulrahman Al-Hudhaifi. He also holds certification in the Ten Mutawatir Qira'at through the Shatibiyyah and Durrah pathways from Sheikh Professor Dr. Muhammad Salamah Rabie.

He served as an Associate Professor at the College of Qur'an at the Islamic University and later in the Department of Qira'at at Umm Al-Qura University. He also supervised the International Electronic Qur'an Institute and Qur'anic recitation programs at Masjid al-Haram.

He led prayers at several mosques including Masjid Quba before becoming an Imam of Masjid al-Haram.

He was assigned as an Imam of Masjid al-Haram in 1445 AH and became an official Imam in 1446 AH.

Sheikh Al-Waleed Al-Shamsan combines academic scholarship with deep dedication to the Qur'an and its recitations.
`,
    image: sheikhWaleed,
    youtubeShorts: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pdkj-YLTbPOe2tTzmcOF-U5',
    youtubeVideos: 'https://www.youtube.com/playlist?list=PLGYh5Ysut9pe0wYNDJ5LIAZUPTrm28fA8',
  },

 {
  key: 'usama',
  nameAr: 'فضيلة الشيخ الدكتور أسامة بن عبدالله خياط',
  nameEn: 'His Eminence Sheikh Dr. Usama bin Abdullah Khayyat',
  titleAr: 'إمام وخطيب المسجد الحرام',
  titleEn: 'Imam & Preacher of Masjid al-Haram',

  bioAr: `
  فضيلة الشيخ الدكتور أسامة بن عبدالله خياط، إمام وخطيب المسجد الحرام.

  هو أسامة بن عبد الله بن عبد الغني بن محمد بن عبد الغني بن إبراهيم خياط، وُلد في مكة المكرمة، ونشأ بها، وتلقى فيها علومه الأولية والابتدائية والمتوسطة والثانوية والجامعية. ونشأ في كنف والده، فضيلة العلامة الشيخ عبد الله بن عبد الغني خياط، إمام وخطيب المسجد الحرام وعضو هيئة كبار العلماء، وحفظ القرآن الكريم على يديه.

  حصل الشيخ أسامة على درجة البكالوريوس في الشريعة الإسلامية من كلية الشريعة والدراسات الإسلامية بجامعة أم القرى في مكة المكرمة عام 1397هـ، بتقدير ممتاز مع مرتبة الشرف الأولى. ثم حصل على درجة الماجستير من الكلية نفسها عام 1402هـ، ونال منها درجة الدكتوراه عام 1408هـ.

  عُيّن معيدًا ثم محاضرًا في قسم الشريعة الإسلامية بكلية الشريعة والدراسات الإسلامية بجامعة أم القرى عام 1403هـ. ثم عُيّن أستاذًا مساعدًا في قسم الكتاب والسنة بكلية الدعوة وأصول الدين بالجامعة عام 1409هـ، وانتُخب لاحقًا رئيسًا للقسم لثلاث فترات متتالية.

  عُيّن إمامًا وخطيبًا لأحد المساجد في مكة المكرمة، ثم مدرسًا في المسجد الحرام، قبل أن يُعيّن إمامًا وخطيبًا فيه عام 1418هـ.

  اختير عضوًا في مجلس الشورى في دورته الأولى عام 1414هـ، كما عُيّن عضوًا في المجلس التأسيسي لرابطة العالم الإسلامي بمكة المكرمة عام 1418هـ، وعمل أمينًا عامًا مساعدًا لهيئة الإعجاز العلمي في القرآن والسنة التابعة لرابطة العالم الإسلامي.

  ومن أبرز العلماء الذين تتلمذ على أيديهم والده، الشيخ عبد الله بن عبد الغني خياط، والشيخ عبد العزيز بن عبد الله بن باز، والأستاذ الدكتور عبد الفتاح بركة.
  `,

    bioEn: `
    Sheikh Dr. Usama bin Abdullah Khayyat is an Imam and Preacher of Masjid al-Haram.

    His full name is Usama bin Abdullah bin Abdul Ghani bin Muhammad bin Abdul Ghani bin Ibrahim Khayyat. He was born and raised in Makkah, where he received his early, primary, intermediate, secondary, and university education. He grew up under the care of his father, the distinguished scholar Sheikh Abdullah bin Abdul Ghani Khayyat, an Imam and Preacher of Masjid al-Haram and a member of the Council of Senior Scholars. He also memorised the Holy Qur'an under his father's guidance.

    In 1397 AH, Sheikh Usama earned a bachelor's degree in Islamic Sharia from the College of Sharia and Islamic Studies at Umm Al-Qura University in Makkah, graduating with an excellent grade and first-class honours. He subsequently obtained his master's degree from the same college in 1402 AH and his doctorate in 1408 AH.

    In 1403 AH, he was appointed as a teaching assistant and subsequently a lecturer in the Department of Islamic Sharia at the College of Sharia and Islamic Studies at Umm Al-Qura University. In 1409 AH, he was appointed Assistant Professor in the Department of the Qur'an and Sunnah at the university's College of Da'wah and Fundamentals of Religion. He was later elected Head of the department for three consecutive terms.

    He was appointed Imam and Preacher of a mosque in Makkah and subsequently served as a teacher at Masjid al-Haram before being appointed an Imam and Preacher there in 1418 AH.

    In 1414 AH, he was selected as a member of the Shura Council during its first term. In 1418 AH, he was also appointed a member of the Founding Council of the Muslim World League in Makkah. He additionally served as Assistant Secretary-General of the Commission on Scientific Signs in the Qur'an and Sunnah affiliated with the Muslim World League.

    Among his most prominent teachers were his father, Sheikh Abdullah bin Abdul Ghani Khayyat; Sheikh Abdul Aziz bin Abdullah bin Baz; and Professor Dr. Abdul Fattah Baraka.
    `,

      image: sheikhUsama,
      youtubeShorts: '',
      youtubeVideos: '',
    },

  {
    key: 'faisal',
    nameAr: 'فضيلة الشيخ الدكتور فيصل غزاوي',
    nameEn: 'His Eminence Sheikh Dr. Faisal Ghazawwi',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',

    bioAr: `
  فضيلة الشيخ الدكتور فيصل غزاوي، إمام وخطيب المسجد الحرام.

  هو فيصل جميل حسن غزاوي، أحد أئمة المسجد الحرام. وُلد في السابع والعشرين من ذي الحجة عام 1385هـ.

  حصل على درجة البكالوريوس في القراءات من جامعة أم القرى عام 1409هـ، ثم نال درجة الماجستير في القراءات من الجامعة نفسها، وأكمل دراساته العليا بحصوله على درجة الدكتوراه عام 1423هـ.

  يشغل الدكتور فيصل غزاوي منصب عميد كلية الدعوة وأصول الدين بجامعة أم القرى في مكة المكرمة. وقد عُيّن إمامًا للمسجد الحرام عام 1428هـ.
  `,

    bioEn: `
  Sheikh Dr. Faisal Ghazawwi is an Imam and Preacher of Masjid al-Haram.

  His full name is Faisal Jameel Hasan Ghazawwi. He is one of the imams of Masjid al-Haram and was born on 27 Dhu al-Hijjah 1385 AH.

  He earned his bachelor's degree in Qur'anic Recitations (Qira'at) from Umm Al-Qura University in 1409 AH. He subsequently obtained a master's degree in the same specialisation from the same university, followed by a doctorate in 1423 AH.

  Dr. Faisal Ghazawwi serves as Dean of the College of Da'wah and Fundamentals of Religion at Umm Al-Qura University in Makkah. He was appointed an Imam of Masjid al-Haram in 1428 AH.
  `,

    image: sheikhFaisal,
    youtubeShorts: '',
    youtubeVideos: '',
  },

  {
  key: 'saleh',
  nameAr: 'معالي الفضيلة الشيخ الدكتور صالح بن حميد',
  nameEn: 'His Excellency His Eminence Sheikh Dr. Saleh bin Hamid',
  titleAr: 'إمام وخطيب المسجد الحرام',
  titleEn: 'Imam & Preacher of Masjid al-Haram',

  bioAr: `
معالي الفضيلة الشيخ الدكتور صالح بن حميد، إمام وخطيب المسجد الحرام.

هو صالح بن عبد الله بن محمد بن حميد، من مواليد مدينة بريدة سنة 1369هـ.

حصل على الثانوية العامة في مكة المكرمة، ثم نال درجة البكالوريوس من كلية الشريعة والدراسات الإسلامية عام 1392هـ، بتقدير ممتاز مع مرتبة الشرف الأولى. ثم حصل على درجة الماجستير من جامعة أم القرى عام 1396هـ، ودرجة الدكتوراه من الجامعة نفسها عام 1402هـ، بتقدير ممتاز مع مرتبة الشرف الأولى.

عمل معيدًا ومحاضرًا وأستاذًا مساعدًا بكلية الشريعة في جامعة أم القرى، حتى أصبح رئيسًا لقسم الاقتصاد الإسلامي. ثم تولى منصب مدير مركز الدراسات العليا الإسلامية بالجامعة، ووكيل كلية الشريعة للدراسات العليا، ثم عميدًا لكلية الشريعة.

أمَّ الشيخ ابن حميد المصلين في المسجد الحرام عام 1403هـ، وعُيّن رسميًا إمامًا فيه عام 1404هـ، ويُعد أول من يحمل درجة الدكتوراه يُعيّن إمامًا للمسجد الحرام.

وتولى لاحقًا منصب نائب الرئيس العام لشؤون المسجد الحرام والمسجد النبوي، ثم أصبح عضوًا في مجلس الشورى من عام 1414هـ إلى عام 1421هـ. وفي عام 1421هـ، عُيّن رئيسًا عامًا لشؤون المسجد الحرام والمسجد النبوي.

وفي 24 ذي القعدة 1422هـ، صدر أمر ملكي بتعيينه رئيسًا لمجلس الشورى. وفي 19 صفر 1430هـ، عُيّن رئيسًا للمجلس الأعلى للقضاء. وفي 24 ربيع الآخر 1433هـ، أُعفي من رئاسة المجلس الأعلى للقضاء بناءً على طلبه، وعُيّن مستشارًا بالديوان الملكي بمرتبة وزير.
`,

  bioEn: `
Sheikh Dr. Saleh bin Hamid is an Imam and Preacher of Masjid al-Haram.

His full name is Saleh bin Abdullah bin Muhammad bin Humaid, and he was born in the city of Buraydah in 1369 AH.

He completed his secondary education in Makkah before earning a bachelor's degree from the College of Sharia and Islamic Studies in 1392 AH, graduating with an excellent grade and first-class honours. He subsequently obtained his master's degree from Umm Al-Qura University in 1396 AH and his doctorate from the same university in 1402 AH, also graduating with an excellent grade and first-class honours.

He served as a teaching assistant, lecturer, and assistant professor at the College of Sharia at Umm Al-Qura University, eventually becoming Head of the Department of Islamic Economics. He subsequently served as Director of the Centre for Islamic Higher Studies, Vice Dean for Postgraduate Studies at the College of Sharia, and Dean of the College.

Sheikh Ibn Humaid first led prayers at Masjid al-Haram in 1403 AH and was officially appointed as an imam in 1404 AH. He is recognised as the first person holding a doctorate to be appointed an imam of Masjid al-Haram.

He later served as Deputy President General for the Affairs of the Two Holy Mosques and subsequently as a member of the Shura Council from 1414 AH to 1421 AH. In 1421 AH, he was appointed President General for the Affairs of Masjid al-Haram and the Prophet's Mosque.

On 24 Dhu al-Qi'dah 1422 AH, a royal decree appointed him President of the Shura Council. On 19 Safar 1430 AH, he was appointed President of the Supreme Judicial Council. On 24 Rabi al-Thani 1433 AH, at his own request, he was relieved of his position as President of the Supreme Judicial Council and appointed an Adviser at the Royal Court with the rank of minister.
`,

  image: sheikhSaleh,
  youtubeShorts: '',
  youtubeVideos: '',
},

];

/** Quick lookup by key */
export const SHEIKH_MAP: Record<string, Sheikh> = Object.fromEntries(
  SHEIKHS.map((s) => [s.key, s])
);

