import TextRepulsion from './text-repulsion.js';

// function showFluidText() {
//   document.querySelector('.bootcamp-name-hero').classList.remove('bootcamp-name-hero-hide');
// }

// function hideFluidText() {
//   document.querySelector('.bootcamp-name-hero').classList.add('bootcamp-name-hero-hide');
// }

const ascii_art = {

  confidence_icon:
    `-------- |||||||
----------- ||||||||||
------------- ||||||||||||
--------------- ||||||||||||||
-----------            |||||||||||
|||||||||                  |||||||||
|||||||||     ..........      ||||||||
|||||||     ..............     |||||||
|||||||     ................     |||||||
||||||    ..................     |||||||
||||||     ..................     ||||||
******     ..................     ++++++
*******    ..................    +++++++
*******     ................     +++++++
********     ..............     ++++++++
********      ..........      ++++++++
*********                  +++++++++
**********            +++++++++++
"""""""""""""" +++++++++++++++
""""""""""""" +++++++++++++
""""""""""" +++++++++++
""""""" +++++++`,

  case_study:
    `      ###########                                  
   #################                               
  ###########################################      
  ##############################################   
  ####+.. ..      .  .      ..      .   . ..+####  
  ###     .  . .     ..          . . .   .    ###  
  ##-        .         .    .    .  .       . -##  
  ##--#######################################--##  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
   #############################################   
      #######################################`,
  bootcamp_name:
    `
                                ||||      ||                      ||
                                  ||                              ||
 ||||||   || ||||    || ||||      ||    ||||       |||||      ||| ||
      ||  ||||  ||   ||||  ||     ||      ||     ||    ||   ||   |||
 |||||||  ||    ||   ||    ||     ||      ||     ||||||||   ||    ||
||    ||  ||||  ||   ||||  ||     ||      ||     ||         ||   |||
 |||||||  || ||||    || ||||    ||||||  ||||||     ||||||     ||| ||
          ||         ||
          ||         ||

||     ||  ||      ||
||     ||    ||  ||  
||     ||      ||    
||   ||||    ||  ||  
 ||||| ||  ||      ||
                                ||||                  ||          ||
                                  ||                  ||
 ||||||   || ||||     ||||||      ||     ||    ||   ||||||      ||||     ||||||
      ||  ||||   ||        ||     ||     ||    ||     ||          ||    ||     
 |||||||  ||     ||   |||||||     ||     ||   |||     ||          ||    ||     
||    ||  ||     ||  |     ||     ||       ||| ||     ||   ||     ||    ||     
 |||||||  ||     ||   |||||||   ||||||         ||      ||||     ||||||   ||||||
                                         ||    ||
                                           |||||
                                           
Behavioral Decision-Making for Product Teams`,
  asciiIllus01:
    `++++
++++++
+++      ++++++++++      +++
++++++++++++++++++++++++++
++++++++++++++++++++++++++
++++++++++++++++++++++++
+++++++++++  +++++++++++
+++++++++   +  +   +++++++++
+++++++++++++        +++++++++++++
++++++++++                ++++++++++
+++++++++++++        +++++++++++++
+++++++++   +  +   +++++++++
+++++++++++  +++++++++++
++++++++++++++++++++++++
++++++++++++++++++++++++++
++++++++++++++++++++++++++
+++      ++++++++++      +++
++++++
++++`,
  asciiIllus02:
    `+
+
+
+
+++
+++
+++        +++        +++
+++      +++      +++
+++++   +++   +++++
+++++++++++++++
+++++++++++++
+++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++
+++++++++++++
+++++++++++++++
+++++   +++   +++++
+++      +++      +++
+++        +++        +++
+++
+++
+
+
+
+`,
  asciiIllus03:
    `        +++++++++++++++++++++++        
    ++++++++               ++++++++    
 ++++                             ++++ 
+++                                 +++
++                                   ++
+++                                 +++
  +++++                         +++++  
 +++++++++++++           +++++++++++++ 
  +++    +++++++++++++++++++++    +++  
   +++++                       +++++   
     +++++++++++++   +++++++++++++     
     ++   +++++++++++++++++++   ++     
     +++++                   +++++     
       +++++++++++++++++++++++++       
       ++   +++++++++++++++  +++       
        ++++++           ++++++        
         +++++++++++++++++++++         
          ++++++       ++++++          
            +++++++++++++++            
              +++++++++++              `,
  asciiIllus04:
    `                       +++++++++                       
                      +++++++++++                      
                    +++++++++++++++                    
                   +++++++++++++++++                   
                  +++++++++++++++++++                  
                 +++++++++++++++++++++                 
                +++++++++++++++++++++++                
               +++++++++++++++++++++++++               
              +++++++++++++++++++++++++++              
             +++++++++++++++++++++++++++++             
           +++++++++++++++++++++++++++++++++           
          +++++++++++++++++++++++++++++++++++          
       +++++++++++++++++++++++++++++++++++++++++       
++++++++++++++++++++++++++++++++++++++++++++++++++++++ `,
  asciiIllus05:
    `     ++++++++++++     +++++++++++   
  +++++++++++++++   ++++++++++++++  
 +++++++            ++++       ++++ 
++++               ++++         +++ 
+++++++++++++++++  ++++         ++++
+++++++++++++++++  ++++         ++++
++++               ++++         ++++
 ++++++            ++++         ++++
  +++++++++++++++  ++++         ++++
    +++++++++++++  ++++         ++++
    
                                   ++ 
 +++          +++      +++++++++++++
 +++          +++    ++++++++++++++ 
 +++          +++  +++++     ++++++ 
 +++          +++  ++++    +++++++++
 +++          +++  +++    ++++   +++
 +++          +++  ++++ +++++    +++
 ++++        ++++  ++++++++    +++++
  ++++      ++++    ++++++++++++++  
   ++++++++++++     +++++++++++++   
     ++++++++      ++++             `,

  asciiIllus06:
    `↘↘↘↘                            ↙↙↙↙
↘↘↘↘↘↘                        ↙↙↙↙↙↙
↘↘↘↘↘↘↘    ↘↘↘↘    ↙↙↙↙    ↙↙↙↙↙↙↙
↘↘↘↘↘↘↘  ↘↘↘↘    ↙↙↙↙  ↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙


↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗  ↗↗↗↗    ↖↖↖↖  ↖↖↖↖↖↖↖
↗↗↗↗↗↗↗    ↗↗↗↗    ↖↖↖↖    ↖↖↖↖↖↖↖
↗↗↗↗↗↗                        ↖↖↖↖↖↖
↗↗↗↗                            ↖↖↖↖`,
  asciiIllus07:
    `++++++++
+++++++++++
++++++++++++
++++++++++++
++++++++++
++++++++
+++++                    +++++
+++++++++                +++++++++
+++++++++++              +++++++++++
+++++++++++              +++++++++++
+++++++++++              +++++++++++
+++++++++                +++++++++
+++++                    +++++
++++++++
++++++++++
++++++++++++
++++++++++++
++++++++++
++++++++`,

  asciiIllus08:
    `++++++++++      ++++++++++
++++++++++      ++++++++++
+++                    +++
+++                    +++
++++                  ++++
+++++              +++++
+++              +++
++++              ++++
++++++++                ++++++++
++++++++                ++++++++
++++              ++++
+++              +++
+++++              +++++
++++                  ++++
+++                    +++
+++                    +++
++++++++++      ++++++++++
++++++++++      ++++++++++`,

  asciiIllus09:
    `              +++++                 
       ++++++++++++++++++++         
   ++++++    ++         +++++++     
  +++                     ++++++    
 ++++                          ++   
+++              ++++          +++  
++              +++++          ++++ 
++      ++++++++++             ++ ++
++++   +++                ++      ++
 +++  +++                 ++++   +++
  ++++++       ++        +++++++++  
       ++      ++++++++++++     ++  
        ++++++++++++++++       +++  
           +++  ++++++++++++++++    
                   +++  +++++       
                     +++++          
                       +++          `,



  portraitLight:
    `  .      .          .                   ..                    
    .                                  .         .            
          .             ..-+###*=+=:..               .        
        .      .    ...+@@@@@@@@@@%@@@@%#-.   . .             
     .             .-%@@@@@@%@@%%%@%@@%@@@%=..        .       
           ..    ..*@@@@@@@@%%%@@@@@@@@@@@@%+.           .    
   .  .       ....#@@@@@@@@@@@@@@@@%@@@@@@@@#:                
  .    .        .-@@@@@@@@@@%###*+==+*#%@%%%%:.          .    
                .+@@@@@@#+=----::....::-+#@@@%..      .     ..
                .+@@@@%*=---::::.......::-#@@#..              
        ..      .+@@@%*=----:::........::-*%@+..  .   .       
    .           .=@@@*+===--::.........::-=%%-.      .      . 
.               .:%@#**%%%%@%*-::.:=#%###+=%#..          .    
       .        ..#@#++++++++==-::-=+++=---#+.     .         .
     .   .     .:++%#+++*+*+-+=-..:-===-==-**-  .             
       .       .==+*#+==--------:.::::::::-+=:  .            .
                .+**#+=-:::::-=-:.::.....:-+-.                
         .      .-=**+=--::::==-:.:::....:--:.                
 .              . .=*+===-::-+=+=-=-:::::-=:.               . 
    .     ..        .++==--------:::.:::-=-                   
   .           .     :++===-----:::::::---.           .   .   
            .       . -+++=-+*++====---==..   .    .          
                   ..+#***+========---=:            .  .   .  
             .     -@@%#***==---::::--.. .                    
 .              .:#@@@%#***+++=---==+#-.     .             .. 
               :%@@*+@@%**+++++=====+%@*.                     
 .           .:%@#. .#@%#*++========+#@@@=..                  
         .:*%*-#@-   .@@##*+===----=+*@@@@@@#-.  .            
  ...-+*+-.  ..#@-    -@%***+=-----=+=+%@@@@@@@%-.      .     
=%%*:..       .*@=    .*@@*+++=--------=@@*%@@@@@@+%+.        
-.      .     .*@=.    :@#%@#=:::::::::*@%@.+@@@@@@*@+.       
        .  ....+@+.    .#%:.-@@%-:::.-%@:=@=.=@@@@+.*@+.      
            .#@@@+.     :@%.  .-+++=-:...-@%. =%*+. :%%-.   . 
  .       .. .#@#.      .*@*             .%%: .+: .  +@#. .   
.         .   :%@+..    .=@%:         .  .*@- .:#.  ..#@=     
        .      =@@:      :%@=             +@=. .%- .  -@%.    
 .            ..=@@: .   .*@=.  .         :@=.  *#. . .#@-    
.            .  .*@%:     .@*.            .%+.  -@=.  .=@*.   
      .       .  :%@+.    .#%. .       .   *+. ..@+  . .%*. . 
        . .      .%@#. .   -@. .           -*.   %*    .#*.   
                 .#@@..    :%-    .        :*.   *%..  .%*..  
Giảng viên     . .#@@=     .*#.       .   ..+..  =%.   .%*.   
                  .*@%     .+@.   ..       .=..  -%..  :@*.  .
Đỗ Minh Tâm  ›     .@.  .  .=@.  .          =.   :     +.     `,
  portraitDark:
    `                         .              .           .         
                   .  .  .-=+*#%%@@%#*+-.. .                  
                      .+@*.::-..=*:+%@@@@@@#.                 
    .    .         :*@*=+**+==++=-#+.:-*:+@@+               . 
          .  .   .@@---:=--::::-*+-*-=#-:==:#=..  .  ..       
       .  .      +@.-::..........:-:--:=-=*=:*-        ..  . .
  ..           .:@.*:::... .     .......-:-+=+@.       .      
               .#*:::..    .....::==-:...:=+-+@.              
               =@-:...  .:-==++*#%%%%#*+-:..-:#.        .     
   ..          :@:..   .--=++**#%%%%%%##*+..:.%.              
                *...  .:--=+**#%%@%%%%##*+:.::@.              
                -:.  ..::-=+*#%%%@@@%%%#*+-..=@.              
                .*.  ..   ....=###*-... ..:. #@.       .      
     .        . #+.  ........-:=##+-...:---..@= .          .  
               +=... ......-=--=##*+====--=.:=#   .           
       .      .@:-.. .:-=-==++--#%*######*+.-+@. .      .  .  
    .          =#. . .:=+****-:-*%**%%%%%#+.=#%               
                ==:. ..:=****::-*@#**%%%#*-=+@:    .. .     . 
                .-@-...::=++-...:-.-####+-.#@+.       .  . .. 
  .   .  .         .@...::-----=+**#%#*+-:.@:. .   . .        
           .        #*...::----=+**#***=-:@%.  . .           .
         .      .   -@=...:-:..::-=-+=-::@@:                  
.           .    ..#@=..  .:::::::-===:*@=       .            
                 -%*::...  .:-==+**++-@+                     .
         .     :%*:......  ....--::..-#@=      .    .         
       .     -%#:.. ..:..........:..::-*@@+                   
       .:*@@@@%-..  ...........:::::.::-*%@@%-     .  .       
   .=@@@@@%+=-::.. .  .:....:::---::..-:=+*+=+**.             
*@@@@%#++=-:..... .  ...::...::----:.:+*:=*+-:.:=#=%%:        
+=--::::...   ...  .   .:---:.:---=---==-:-++-...:++*@*     . 
..            ...   .  ..-----=+++###***--:-++-::-===*@=      
           ..:::..  .   .:-:...:-=+*#*+=-:::-**++=-:.-*@.. .  
           ..-==:...    ..-:..  ............:=**+=:...-#%     
.           ..-:.........:--..              .:++-..  ..=%#    
    .        ..:.......:::::..        . .   ..-=:.    .:+@.   
          ..  ....    .... ....           .  .:==.    ..=@=   
               ...   .     ....  .      .  .  .:=:.    .-#@.  
           .  .....  .      ...          .  . ..-=..   .:+@:  
     ..      .  .:..       ....                .:=-..  ..=@:  
         .      ..:.. .     ... .            . ..-=..  ..=@.  
                ..:.         ..                 .:-:.  ..-@. .
Giảng viên    .  .:. .       ..         .   .   .:-:.  ..=@.  
                ....    .    ..     .         . .:-:.  ..=%   
Đỗ Minh Tâm  ›   ....        ..                 .:-:.  .:+*   `,
}

// const applieduxanalyticIntroHeader = new SplitType('.bootcamp-section-header h2', {
//   types: 'words, chars'
// });

document.querySelectorAll('.asciiIllus').forEach((element) => {

  const asciiKey = element.getAttribute('data-img-src');
  const asciiText = ascii_art[asciiKey];

  element.innerHTML = buildAsciiHTML(asciiText);

});

function buildAsciiHTML(text) {

  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

    .split('\n')

    .map(line => {

      return `
                <div class="ascii-row">
                    ${line
          .split('')
          .map(char => {

            if (char === ' ') {
              return `<span class="ascii-char space">&nbsp;</span>`;
            }

            return `<span class="ascii-char character">${char}</span>`;

          })
          .join('')
        }
                </div>
            `;

    })

    .join('');
}

// ======================================

window.onload = () => {

  if (document.querySelector('#appliedUxAnalytic_hero_fluidCanvas')) {
    gsap.to('#appliedUxAnalytic_hero_fluidCanvas', {
      scrollTrigger: {
        trigger: '.applied-ux-analytic-container',
        start: 'top top',
        end: 'top top',
        toggleActions: 'play none none reset',
      },
      display: 'none',
    });
  }


  // Click-to-reveal: clicking .bootcamp-goal-card-above fades it out to show .bootcamp-goal-card-below
  document.querySelectorAll('.bootcamp-goal-card-above').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('clicked');
      if (card.getElementsByClassName('avoid-mouse')[0].dataset.avoid === "true") {
        card.getElementsByClassName('avoid-mouse')[0].dataset.avoid = 'false';
      } else {
        card.getElementsByClassName('avoid-mouse')[0].dataset.avoid = 'true';
      }
    });
  });

  if (document.querySelector('.ux-console')) {
    ScrollTrigger.create({
      trigger: ".ux-console",
      start: "top 80%",
      end: "top 80%",
      // markers: true,
      onEnter: () => {
        config.ASCII_COLOR = isDarkMode ? { r: 100, g: 100, b: 100 } : { r: 190, g: 190, b: 190 };
      },
      onEnterBack: () => {
        config.ASCII_COLOR = defaultConfig.ASCII_COLOR;
      },
    });

  }

  if (document.querySelector('.applied-ux-analytic-name-fluid.text')) {
    gsap.to('.applied-ux-analytic-name-fluid.text *', {
      opacity: 1,
      delay: "random(1, 3)",
      ease: "bounce.in",
      duration: 0.5,
      onStart: () => {

        if (document.querySelector('#appliedUxAnalytic_hero_fluidCanvas')) {
          randomSplats(16, 0, 1, 0.4, 0.6);
        }

      },
    });
  }

  let mm = gsap.matchMedia();

  mm.add("(max-width: 991px)", () => {
    document.querySelectorAll('.syllabus-container').forEach(container => {
      // On mobile, just ensure they are visible and have no scroll trigger show/hide
      gsap.set(container.querySelectorAll('.syllabus-ascii'), { opacity: 1 });
      container.getElementsByClassName('syllabus-ascii')[0].style.display = 'block';
      container.getElementsByClassName('syllabus-ascii')[0].style.position = 'relative';
    });
  });


  // Initialize interactive text repulsion
  window.textRepulsion = new TextRepulsion({
    radius: 200,               // Mouse influence radius
    repulsionStrength: 50,     // Strength of the "magnet"
    damping: 0.7,             // Friction (higher = more sluggish)
    returnForce: 0.2,          // Speed of returning to base position
  });
}

function parseFirestoreVal(val) {
  if (!val) return null;
  if (val.stringValue !== undefined) return val.stringValue;
  if (val.integerValue !== undefined) return parseInt(val.integerValue, 10);
  if (val.doubleValue !== undefined) return parseFloat(val.doubleValue);
  if (val.booleanValue !== undefined) return val.booleanValue;
  if (val.arrayValue !== undefined) return (val.arrayValue.values || []).map(parseFirestoreVal);
  return null;
}

function parseFirestoreCohort(doc) {
  const id = doc.name.split('/').pop();
  const d = { id };
  for (const [k, v] of Object.entries(doc.fields || {})) {
    d[k] = parseFirestoreVal(v);
  }
  return d;
}

function renderAuaBootcamps(bootcamps) {
  const container = document.getElementById('appliedUxAnalytic_register_bootcampListContainer');
  const containerSignUp = document.getElementById('signUp_ux_analytic_bootcamp_list');
  if (!container && !containerSignUp) return;

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const selectedBootcamp = params.get('bootcamp_id');

  // 1. Listing trên phần giới thiệu bootcamp: hiện tất cả khóa có listing và isPublic
  if (container) {
    container.innerHTML = '';
    const displayList = bootcamps.filter(item => item.listing == 1);
    displayList.forEach(item => {
      const col = document.createElement('div');
      item.is_open == 1 ? col.classList.add("open-bootcamp") : col.classList.add("closed-bootcamp");
      col.classList.add('col-12', 'col-md-6', 'col-lg-4');
      const formatLocation = item.offline == 1 ? `Offline, ${item.location || 'HN'}` : 'Online';
      const startDateText = item.start_date && item.start_date !== '-' ? `, ${item.start_date}` : '';
      const pricingText = item.pricing ? `, ${item.pricing}` : '';
      const line2 = `${formatLocation}${startDateText}${pricingText}`;
      const courseTitle = item.bootcamp_name || item.title || item.courseTitle || 'Applied UX Analytic';

      col.innerHTML = `
              <span class="mono-caption reverse-color" style="font-weight: 600;">${courseTitle}</span><br>
              <span class="mono-caption reverse-color">${line2}</span><br>
              ${item.is_open == 1 ? `<a href="bootcamp-register.html?bootcamp_id=${encodeURIComponent(item.bootcamp_id)}" class="mono-caption register-link button-reverse">Đăng ký ›</a>` : `<span class="mono-caption reverse-color" style="opacity: 0.5;">Form closed</span>`}
          `;
      container.appendChild(col);
    });
  }

  // 2. Listing trên phần đăng ký
  if (containerSignUp) {
    containerSignUp.innerHTML = '';
    bootcamps.forEach(item => {
      if (item.is_open == 1) {
        const col = document.createElement('span');
        col.classList.add('sign-up-ux-analytic-bootcamp-item', 'col-12', 'col-md-6');
        const formatLocation = item.offline == 1 ? `Offline, ${item.location || 'HN'}` : 'Online';
        const startDateText = item.start_date && item.start_date !== '-' ? `, ${item.start_date}` : '';
        const pricingText = item.pricing ? `, ${item.pricing}` : '';
        const line2 = `${formatLocation}${startDateText}${pricingText}`;
        const courseTitle = item.bootcamp_name || item.title || item.courseTitle || 'Applied UX Analytic';

        col.innerHTML = `
              <label for="bootcamp_${item.bootcamp_id}">
                  <input required type="radio" name="bootcamp_name" value="${courseTitle}" id="bootcamp_${item.bootcamp_id}" ${String(item.bootcamp_id) === String(selectedBootcamp) ? "checked" : ""} />
                  <div class="bootcamp-item-content">
                    <span class="mono-caption reverse-color">[<span class="is_selected">•</span>] ${courseTitle}</span>
                    <span class="mono-caption reverse-color">${line2}</span>
                  </div>
              </label>
          `;
        containerSignUp.appendChild(col);
      }
    });
  }
}

async function loadAuaBootcampData() {
  try {
    const res = await fetch('https://firestore.googleapis.com/v1/projects/uxcampvn/databases/(default)/documents/cohorts?pageSize=100');
    if (res.ok) {
      const json = await res.json();
      const rawCohorts = (json.documents || []).map(parseFirestoreCohort);
      const isAua = (c) => {
        if (c.courseCode === 'AUXA' || c.courseCode === 'UXA') return true;
        if (c.code && (c.code.startsWith('AUXA') || c.code.startsWith('UXA') || c.code.startsWith('analytic'))) return true;
        if (c.courseId === '2106d881-8e2f-4675-9b6d-eb25beae8489') return true;
        if (c.courseTitle && c.courseTitle.includes('Analytic')) return true;
        return false;
      };

      const auaCohorts = rawCohorts.filter(isAua).map(c => ({
        bootcamp_id: c.bootcamp_id || c.code || c.id,
        bootcamp_name: c.bootcamp_name || c.title || c.name || c.code,
        courseTitle: c.courseTitle || 'Applied UX Analytic',
        title: c.title || c.name || c.bootcamp_name || '',
        start_date: c.startDate || c.start_date || c.schedule || '',
        offline: (c.format === 'offline' || c.offline == 1) ? 1 : 0,
        location: c.location || (c.format === 'offline' ? 'HN' : ''),
        pricing: c.tuition || c.pricing || 'Liên hệ',
        is_open: (c.status === 'open' || c.status === 'enrolling' || c.is_open == 1) ? 1 : 0,
        listing: (c.isPublic !== false && c.listing !== 0) ? 1 : 0
      }));

      renderAuaBootcamps(auaCohorts);
      return;
    }
    renderAuaBootcamps([]);
  } catch (err) {
    console.error('[applied-ux-analytic/script.js] Lỗi đọc dữ liệu từ Firestore:', err);
    renderAuaBootcamps([]);
  }
}

loadAuaBootcampData();

gsap.to(".navigation-bar", {
  backgroundColor: 'var(--applied-analytic-background)',
  borderBottom: '1px solid var(--applied-analytic-main)',
  duration: 0.5,
  scrollTrigger: {
    trigger: ".bootcamp-hero-container",
    start: "bottom top",
    end: "bottom top",
    scrub: 1
  }
});